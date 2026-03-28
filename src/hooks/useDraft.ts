"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const STORAGE_KEY = "lsdt_draft";
const MAX_PICKS = 3;

export function useDraft() {
  const [picks, setPicks] = useState<string[]>([]);
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

  // Load picks from Supabase or localStorage
  useEffect(() => {
    async function loadPicks() {
      if (userId) {
        const { data } = await supabase
          .from("drafts")
          .select("picks")
          .eq("user_id", userId)
          .single();

        if (data?.picks && data.picks.length > 0) {
          setPicks(data.picks);
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data.picks)); } catch {}
        } else {
          // Migrate localStorage picks
          try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
              const localPicks = JSON.parse(stored) as string[];
              setPicks(localPicks);
              if (localPicks.length > 0) {
                await supabase.from("drafts").upsert({
                  user_id: userId,
                  picks: localPicks,
                  updated_at: new Date().toISOString(),
                }, { onConflict: "user_id" });
              }
            }
          } catch {}
        }
      } else {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) setPicks(JSON.parse(stored));
        } catch {}
      }
    }
    loadPicks();
  }, [userId]);

  // Sync picks to Supabase
  async function syncToSupabase(newPicks: string[]) {
    if (!userId) return;
    await supabase.from("drafts").upsert({
      user_id: userId,
      picks: newPicks,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
  }

  const togglePick = useCallback((taqueriaId: string) => {
    setPicks((prev) => {
      let next: string[];
      if (prev.includes(taqueriaId)) {
        next = prev.filter((id) => id !== taqueriaId);
      } else {
        if (prev.length >= MAX_PICKS) return prev;
        next = [...prev, taqueriaId];
      }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      syncToSupabase(next);
      return next;
    });
  }, [userId]);

  const isPicked = useCallback(
    (taqueriaId: string) => picks.includes(taqueriaId),
    [picks]
  );

  const isFull = picks.length >= MAX_PICKS;

  return { picks, togglePick, isPicked, isFull, count: picks.length, max: MAX_PICKS };
}
