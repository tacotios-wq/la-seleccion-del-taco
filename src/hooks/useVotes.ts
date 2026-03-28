"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "lsdt_votes";

type VotesMap = Record<string, string>; // matchupId -> taqueriaId

// Aggregate counts from Supabase: matchupId -> { taqueriaId -> weightedTotal }
type VoteCounts = Record<string, Record<string, number>>;

export function useVotes() {
  const [votes, setVotes] = useState<VotesMap>({});
  const [counts, setCounts] = useState<VoteCounts>({});
  const [userId, setUserId] = useState<string | null>(null);

  // Get current user
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load user's votes from Supabase (or localStorage as fallback)
  useEffect(() => {
    async function loadVotes() {
      if (userId) {
        // Logged in: load from Supabase
        const { data } = await supabase
          .from("votes")
          .select("matchup_id, taqueria_id")
          .eq("user_id", userId);

        if (data && data.length > 0) {
          const map: VotesMap = {};
          data.forEach((v: { matchup_id: string; taqueria_id: string }) => {
            map[v.matchup_id] = v.taqueria_id;
          });
          setVotes(map);
          // Sync to localStorage as cache
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); } catch {}
        } else {
          // Check if there are localStorage votes to migrate
          try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
              const localVotes = JSON.parse(stored) as VotesMap;
              setVotes(localVotes);
              // Migrate localStorage votes to Supabase
              const inserts = Object.entries(localVotes).map(([matchup_id, taqueria_id]) => ({
                user_id: userId,
                matchup_id,
                taqueria_id,
                source: "webapp" as const,
                weight: 3,
              }));
              if (inserts.length > 0) {
                await supabase.from("votes").upsert(inserts, { onConflict: "user_id,matchup_id" });
              }
            }
          } catch {}
        }
      } else {
        // Not logged in: use localStorage
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) setVotes(JSON.parse(stored));
        } catch {}
      }
    }
    loadVotes();
  }, [userId]);

  // Load aggregate vote counts from Supabase view
  useEffect(() => {
    async function loadCounts() {
      const { data } = await supabase
        .from("vote_counts")
        .select("matchup_id, taqueria_id, total_weighted");

      if (data) {
        const c: VoteCounts = {};
        data.forEach((row: { matchup_id: string; taqueria_id: string; total_weighted: number }) => {
          if (!c[row.matchup_id]) c[row.matchup_id] = {};
          c[row.matchup_id][row.taqueria_id] = row.total_weighted;
        });
        setCounts(c);
      }
    }
    loadCounts();
  }, []);

  const vote = useCallback(
    async (matchupId: string, taqueriaId: string) => {
      // Prevent double vote
      if (votes[matchupId]) return;

      // Optimistic update
      const next = { ...votes, [matchupId]: taqueriaId };
      setVotes(next);

      // Update counts optimistically (webapp = weight 3)
      setCounts((prev) => {
        const matchupCounts = { ...(prev[matchupId] || {}) };
        matchupCounts[taqueriaId] = (matchupCounts[taqueriaId] || 0) + 3;
        return { ...prev, [matchupId]: matchupCounts };
      });

      // Save to localStorage as cache
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}

      // Save to Supabase if logged in
      if (userId) {
        await supabase.from("votes").insert({
          user_id: userId,
          matchup_id: matchupId,
          taqueria_id: taqueriaId,
          source: "webapp",
          weight: 3,
        });
      }
    },
    [votes, userId]
  );

  const hasVoted = useCallback(
    (matchupId: string) => !!votes[matchupId],
    [votes]
  );

  const getVote = useCallback(
    (matchupId: string) => votes[matchupId] || null,
    [votes]
  );

  // Get weighted vote counts for a matchup
  const getMatchupCounts = useCallback(
    (matchupId: string, taqueria1Id: string, taqueria2Id: string) => {
      const mc = counts[matchupId] || {};
      const v1 = mc[taqueria1Id] || 0;
      const v2 = mc[taqueria2Id] || 0;
      const total = v1 + v2;
      return {
        votes1: v1,
        votes2: v2,
        total,
        pct1: total > 0 ? Math.round((v1 / total) * 100) : 50,
        pct2: total > 0 ? Math.round((v2 / total) * 100) : 50,
      };
    },
    [counts]
  );

  return { vote, hasVoted, getVote, getMatchupCounts };
}
