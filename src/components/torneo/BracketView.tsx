"use client";

import { getMatchups, getTaqueria } from "@/lib/data";
import type { Matchup } from "@/types";

function BracketSlot({ matchup, compact = false }: { matchup: Matchup; compact?: boolean }) {
  const t1 = getTaqueria(matchup.taqueria1_id);
  const t2 = getTaqueria(matchup.taqueria2_id);
  const isActive = matchup.estado === "activo";
  const isClosed = matchup.estado === "cerrado";
  const total = matchup.votos1 + matchup.votos2;
  const pct1 = total > 0 ? Math.round((matchup.votos1 / total) * 100) : 0;
  const pct2 = total > 0 ? Math.round((matchup.votos2 / total) * 100) : 0;

  return (
    <div
      className={`bg-white rounded-[8px] overflow-hidden transition-all duration-300 ${
        isActive
          ? "shadow-[0_2px_8px_rgba(204,0,0,0.12),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-red/20"
          : "shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
      } ${compact ? "text-[11px]" : "text-[12px]"}`}
    >
      {/* Team 1 */}
      <div className={`flex items-center justify-between px-3 ${compact ? "py-2" : "py-2.5"} border-b border-border`}>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green shrink-0" />}
          <span className={`truncate ${t1 ? "text-text font-medium" : "text-text-muted"}`}>
            {t1 ? t1.nombre : "Por definir"}
          </span>
          {t1 && (
            <span className="text-[9px] text-text-muted shrink-0 hidden sm:inline">
              {t1.ubicacion.ciudad}
            </span>
          )}
        </div>
        {total > 0 && (
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <div className="w-10 h-1 bg-bg rounded-full overflow-hidden">
              <div className="h-full bg-green rounded-full" style={{ width: `${pct1}%` }} />
            </div>
            <span className={`font-bold tabular-nums ${matchup.votos1 >= matchup.votos2 ? "text-green" : "text-text-muted"}`}>
              {pct1}%
            </span>
          </div>
        )}
      </div>
      {/* Team 2 */}
      <div className={`flex items-center justify-between px-3 ${compact ? "py-2" : "py-2.5"}`}>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />}
          <span className={`truncate ${t2 ? "text-text font-medium" : "text-text-muted"}`}>
            {t2 ? t2.nombre : "Por definir"}
          </span>
          {t2 && (
            <span className="text-[9px] text-text-muted shrink-0 hidden sm:inline">
              {t2.ubicacion.ciudad}
            </span>
          )}
        </div>
        {total > 0 && (
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <div className="w-10 h-1 bg-bg rounded-full overflow-hidden">
              <div className="h-full bg-red rounded-full" style={{ width: `${pct2}%` }} />
            </div>
            <span className={`font-bold tabular-nums ${matchup.votos2 >= matchup.votos1 ? "text-red" : "text-text-muted"}`}>
              {pct2}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function RoundColumn({ title, matchups, compact = false }: { title: string; matchups: Matchup[]; compact?: boolean }) {
  return (
    <div className="flex flex-col gap-2 flex-1 min-w-[140px]">
      <p className="text-[9px] font-bold tracking-[3px] uppercase text-red text-center mb-1">
        {title}
      </p>
      <div className={`flex flex-col ${compact ? "gap-2" : "gap-3"} justify-around h-full`}>
        {matchups.map((m) => (
          <BracketSlot key={m.id} matchup={m} compact={compact} />
        ))}
      </div>
    </div>
  );
}

function Connector({ pairs }: { pairs: number }) {
  return (
    <div className="flex flex-col justify-around w-6 shrink-0 h-full">
      {Array.from({ length: pairs }).map((_, i) => (
        <div key={i} className="flex flex-col items-center" style={{ flex: 1, justifyContent: "center" }}>
          <svg width="24" height="48" viewBox="0 0 24 48" fill="none" className="text-border-strong">
            <path d="M0 8 H12 V24 H24" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M0 40 H12 V24 H24" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function BracketView() {
  const octavos = getMatchups("octavos");
  const cuartos = getMatchups("cuartos");
  const semis = getMatchups("semis");
  const final1 = getMatchups("final");
  const hasActive = octavos.some((m) => m.estado === "activo");

  return (
    <div className="w-full">
      {/* Desktop bracket */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="min-w-[800px] flex items-stretch gap-0 py-4">
          <RoundColumn title="Octavos" matchups={octavos} compact />
          <Connector pairs={4} />
          <RoundColumn title="Cuartos" matchups={cuartos} compact />
          <Connector pairs={2} />
          <RoundColumn title="Semis" matchups={semis} compact />
          <Connector pairs={1} />
          <RoundColumn title="Final" matchups={final1} compact />
        </div>
      </div>

      {/* Mobile: stacked rounds */}
      <div className="lg:hidden space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-red">Octavos de final</p>
            {hasActive && (
              <span className="flex items-center gap-1 text-[9px] font-bold text-green">
                <span className="w-1.5 h-1.5 rounded-full bg-green animate-[pulse-live_2s_ease-in-out_infinite]" />
                En curso
              </span>
            )}
          </div>
          <div className="space-y-2">
            {octavos.map((m) => (
              <BracketSlot key={m.id} matchup={m} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-text-muted mb-3">Cuartos de final</p>
          <div className="space-y-2">
            {cuartos.map((m) => (
              <BracketSlot key={m.id} matchup={m} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-text-muted mb-3">Semifinales</p>
          <div className="space-y-2">
            {semis.map((m) => (
              <BracketSlot key={m.id} matchup={m} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-text-muted mb-3">Gran Final</p>
          <div className="space-y-2">
            {final1.map((m) => (
              <BracketSlot key={m.id} matchup={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
