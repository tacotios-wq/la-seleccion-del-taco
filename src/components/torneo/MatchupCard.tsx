"use client";

import { useState } from "react";
import type { Matchup, Taqueria } from "@/types";
import { getVotoPorcentaje, getTotalVotos } from "@/lib/data";
import { useVotes } from "@/hooks/useVotes";
import VoteConfetti from "./VoteConfetti";

interface Props {
  matchup: Matchup;
  taqueria1: Taqueria;
  taqueria2: Taqueria;
  featured?: boolean;
}

function TaqueriaSlot({
  taqueria,
  side,
  isVoted,
  onVote,
  disabled,
  pct,
}: {
  taqueria: Taqueria;
  side: "left" | "right";
  isVoted: boolean;
  onVote: () => void;
  disabled: boolean;
  pct: number;
}) {
  const votedBg = side === "left" ? "bg-green" : "bg-red";

  return (
    <div className="flex flex-col items-center text-center gap-4 flex-1 min-w-0">
      {/* Photo area */}
      <div className="w-full aspect-[4/3] bg-bg-dark/5 rounded-[8px] overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Pct overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[28px] font-bold text-white/70">
            {pct}%
          </span>
        </div>
        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[15px] font-semibold text-white leading-tight drop-shadow-lg">
            {taqueria.nombre}
          </p>
          <p className="text-[11px] text-white/60 mt-0.5">{taqueria.ubicacion.colonia}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-1.5">
        <span className="bg-bg text-red py-1 px-3 text-[11px] font-medium rounded-full">
          {taqueria.especialidad}
        </span>
        <span className="bg-bg text-text-muted py-1 px-3 text-[11px] font-medium rounded-full">
          {taqueria.precioRango}
        </span>
      </div>

      {/* Vote button */}
      <button
        onClick={onVote}
        disabled={disabled}
        className={`w-full py-3 px-6 text-[10px] font-bold tracking-[1px] uppercase rounded-full transition-all duration-300 ${
          isVoted
            ? `${votedBg} text-white shadow-lg`
            : `border border-border-strong text-text hover:border-text/30 hover:bg-white/60 active:scale-95`
        } ${disabled && !isVoted ? "opacity-20 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {isVoted ? (
          <span className="flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Tu voto
          </span>
        ) : "Votar"}
      </button>
    </div>
  );
}

export default function MatchupCard({ matchup, taqueria1, taqueria2, featured = false }: Props) {
  const { vote, hasVoted, getVote } = useVotes();
  const [showConfetti, setShowConfetti] = useState(false);
  const [localMatchup, setLocalMatchup] = useState(matchup);

  const { pct1, pct2 } = getVotoPorcentaje(localMatchup);
  const total = getTotalVotos(localMatchup);
  const voted = hasVoted(matchup.id);
  const votedFor = getVote(matchup.id);

  const handleVote = (taqueriaId: string, side: 1 | 2) => {
    if (voted) return;
    vote(matchup.id, taqueriaId);
    setShowConfetti(true);
    setLocalMatchup((prev) => ({
      ...prev,
      votos1: side === 1 ? prev.votos1 + 1 : prev.votos1,
      votos2: side === 2 ? prev.votos2 + 1 : prev.votos2,
    }));
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <div className={`relative bg-white rounded-[10px] p-5 sm:p-8 overflow-hidden ${
      featured
        ? "shadow-[0_1px_4px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.06)]"
        : "shadow-[0_1px_4px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.03)]"
    } transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_16px_40px_rgba(0,0,0,0.06)]`}>
      <VoteConfetti active={showConfetti} />

      {/* Live indicator */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green animate-[pulse-live_2s_ease-in-out_infinite]" />
          <span className="text-[10px] font-bold tracking-[4px] uppercase text-green">
            {matchup.estado === "activo" ? "En vivo" : "Proximo"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-text-muted flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v5l3 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/></svg>
            Cierra {matchup.fecha_fin}
          </span>
          <span className="text-[11px] text-red font-semibold">
            {total.toLocaleString()} votos
          </span>
        </div>
      </div>

      {/* Ronda badge */}
      {featured && (
        <div className="text-center mb-6">
          <span className="inline-block bg-[#CC000006] text-red text-[10px] font-bold tracking-[4px] uppercase py-2 px-5 rounded-full">
            {matchup.ronda === "octavos" && "Octavos de final"}
            {matchup.ronda === "cuartos" && "Cuartos de final"}
            {matchup.ronda === "semis" && "Semifinal"}
            {matchup.ronda === "final" && "Gran Final"}
          </span>
        </div>
      )}

      {/* Matchup layout */}
      <div className="flex gap-3 sm:gap-6 items-start">
        <TaqueriaSlot
          taqueria={taqueria1}
          side="left"
          isVoted={votedFor === taqueria1.id}
          onVote={() => handleVote(taqueria1.id, 1)}
          disabled={voted}
          pct={pct1}
        />

        {/* VS center */}
        <div className="flex flex-col items-center justify-center pt-12 sm:pt-16 shrink-0 gap-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-border-strong flex items-center justify-center bg-bg">
            <span className="text-[14px] sm:text-[16px] font-bold text-red tracking-wide">
              VS
            </span>
          </div>
        </div>

        <TaqueriaSlot
          taqueria={taqueria2}
          side="right"
          isVoted={votedFor === taqueria2.id}
          onVote={() => handleVote(taqueria2.id, 2)}
          disabled={voted}
          pct={pct2}
        />
      </div>

      {/* Progress bar */}
      <div className="mt-8 space-y-2">
        <div className="flex justify-between text-[13px] font-bold">
          <span className={votedFor === taqueria1.id ? "text-green" : "text-text/40"}>
            {pct1}%
          </span>
          <span className="text-[10px] tracking-[1px] uppercase text-text-muted self-center font-medium">
            {total.toLocaleString()} votos
          </span>
          <span className={votedFor === taqueria2.id ? "text-red" : "text-text/40"}>
            {pct2}%
          </span>
        </div>
        <div className="h-2 bg-bg rounded-full overflow-hidden flex">
          <div
            className="bg-green transition-all duration-1000 ease-out rounded-l-full"
            style={{ width: `${pct1}%` }}
          />
          <div className="w-px bg-white shrink-0" />
          <div
            className="bg-red transition-all duration-1000 ease-out rounded-r-full"
            style={{ width: `${pct2}%` }}
          />
        </div>
      </div>

      {/* Share CTA */}
      {voted && (
        <div className="mt-6 text-center">
          <button className="text-[11px] text-text-muted hover:text-red transition-colors tracking-[1px] uppercase font-medium flex items-center gap-2 mx-auto">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4.5 8L9.5 5.5M4.5 6L9.5 8.5M10 4.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM4 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 12.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" stroke="currentColor" strokeWidth="1"/></svg>
            Comparte tu voto
          </button>
        </div>
      )}
    </div>
  );
}
