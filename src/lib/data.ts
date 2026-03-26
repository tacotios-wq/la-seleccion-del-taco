import type { Taqueria, Matchup, Ronda } from "@/types";
import taqueriasData from "@/data/taquerias.json";
import matchupsData from "@/data/matchups.json";

export function getTaquerias(): Taqueria[] {
  return taqueriasData as Taqueria[];
}

export function getTaqueria(id: string): Taqueria | undefined {
  return getTaquerias().find((t) => t.id === id);
}

export function getRealTaquerias(): Taqueria[] {
  return getTaquerias().filter((t) => !t.placeholder);
}

export function getMatchups(ronda?: Ronda): Matchup[] {
  const all = matchupsData as Matchup[];
  if (ronda) return all.filter((m) => m.ronda === ronda);
  return all;
}

export function getActiveMatchup(): Matchup | undefined {
  return getMatchups().find((m) => m.estado === "activo");
}

export function getMatchup(id: string): Matchup | undefined {
  return getMatchups().find((m) => m.id === id);
}

export function getMatchupTaquerias(matchup: Matchup): {
  taqueria1: Taqueria | undefined;
  taqueria2: Taqueria | undefined;
} {
  return {
    taqueria1: getTaqueria(matchup.taqueria1_id),
    taqueria2: getTaqueria(matchup.taqueria2_id),
  };
}

export function getTotalVotos(matchup: Matchup): number {
  return matchup.votos1 + matchup.votos2;
}

export function getVotoPorcentaje(matchup: Matchup): {
  pct1: number;
  pct2: number;
} {
  const total = getTotalVotos(matchup);
  if (total === 0) return { pct1: 50, pct2: 50 };
  return {
    pct1: Math.round((matchup.votos1 / total) * 100),
    pct2: Math.round((matchup.votos2 / total) * 100),
  };
}
