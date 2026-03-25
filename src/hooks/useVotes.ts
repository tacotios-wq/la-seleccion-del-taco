"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "lsdt_votes";

type VotesMap = Record<string, string>; // matchupId -> taqueriaId

export function useVotes() {
  const [votes, setVotes] = useState<VotesMap>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setVotes(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const vote = useCallback(
    (matchupId: string, taqueriaId: string) => {
      setVotes((prev) => {
        if (prev[matchupId]) return prev; // already voted
        const next = { ...prev, [matchupId]: taqueriaId };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const hasVoted = useCallback(
    (matchupId: string) => !!votes[matchupId],
    [votes]
  );

  const getVote = useCallback(
    (matchupId: string) => votes[matchupId] || null,
    [votes]
  );

  return { vote, hasVoted, getVote };
}
