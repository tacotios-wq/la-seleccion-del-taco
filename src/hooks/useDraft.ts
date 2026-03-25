"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "lsdt_draft";
const MAX_PICKS = 5;

export function useDraft() {
  const [picks, setPicks] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setPicks(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const togglePick = useCallback((taqueriaId: string) => {
    setPicks((prev) => {
      let next: string[];
      if (prev.includes(taqueriaId)) {
        next = prev.filter((id) => id !== taqueriaId);
      } else {
        if (prev.length >= MAX_PICKS) return prev;
        next = [...prev, taqueriaId];
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const isPicked = useCallback(
    (taqueriaId: string) => picks.includes(taqueriaId),
    [picks]
  );

  const isFull = picks.length >= MAX_PICKS;

  return { picks, togglePick, isPicked, isFull, count: picks.length, max: MAX_PICKS };
}
