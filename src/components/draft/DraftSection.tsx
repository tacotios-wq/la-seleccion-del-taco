"use client";

import { getRealTaquerias } from "@/lib/data";
import { useDraft } from "@/hooks/useDraft";
import AnimateOnScroll from "../AnimateOnScroll";

function regionLabel(region: string) {
  if (region === "cdmx") return "CDMX";
  if (region === "gdl") return "GDL";
  if (region === "mty") return "MTY";
  return region;
}

export default function DraftSection() {
  const taquerias = getRealTaquerias();
  const { picks, togglePick, isPicked, isFull, count, max } = useDraft();

  const pickedTaquerias = picks
    .map((id) => taquerias.find((t) => t.id === id))
    .filter(Boolean);

  return (
    <section id="draft" className="py-24 px-6">
      <div className="max-w-[680px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <AnimateOnScroll>
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-red mb-5">
              La Quiniela
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <h2 className="text-[clamp(34px,5vw,48px)] font-light tracking-[-0.02em] mb-4 text-text">
              Arma tu <span className="text-red">seleccion</span>
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2}>
            <p className="text-text-body max-w-[460px] mx-auto text-[14px] leading-relaxed">
              Elige las 5 taquerias que crees que llegaran mas lejos. Comparte tu quiniela y compite con tus amigos.
            </p>
          </AnimateOnScroll>
        </div>

        {/* My picks display */}
        <AnimateOnScroll delay={0.3}>
          <div className="bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 mb-10">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] font-bold tracking-[4px] uppercase text-text-muted">
                Mi seleccion
              </p>
              <p className="text-[13px] font-bold text-red">
                {count}<span className="text-text-muted font-normal">/{max}</span>
              </p>
            </div>

            {/* 5 slots */}
            <div className="grid grid-cols-5 gap-3 mb-5">
              {Array.from({ length: max }, (_, i) => {
                const pick = pickedTaquerias[i];
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-[8px] flex flex-col items-center justify-center text-center p-2 transition-all duration-300 ${
                      pick
                        ? "bg-[#CC000006] border-2 border-red/20"
                        : "bg-bg border-2 border-dashed border-border-strong"
                    }`}
                  >
                    {pick ? (
                      <>
                        <span className="text-[20px] mb-1">🌮</span>
                        <span className="text-[9px] font-semibold text-text leading-tight line-clamp-2">
                          {pick.nombre}
                        </span>
                        <span className="text-[8px] text-text-muted mt-0.5">
                          {regionLabel(pick.region)}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-[18px] text-text-muted/30 font-light">+</span>
                        <span className="text-[8px] text-text-muted/40 mt-0.5">Elige</span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-bg rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-red rounded-full transition-all duration-500"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>

            {/* Share button */}
            {count === max ? (
              <button className="w-full py-3 text-[10px] font-bold tracking-[1px] uppercase bg-red text-white rounded-full hover:bg-red/90 transition-colors">
                Compartir mi quiniela
              </button>
            ) : (
              <p className="text-center text-[12px] text-text-muted">
                Elige {max - count} taqueria{max - count !== 1 ? "s" : ""} mas para completar tu quiniela
              </p>
            )}
          </div>
        </AnimateOnScroll>

        {/* Available taquerías to pick */}
        <AnimateOnScroll>
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-text-muted mb-4">
            Taquerias disponibles
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 gap-3">
          {taquerias.map((t, i) => {
            const picked = isPicked(t.id);
            const disabled = isFull && !picked;

            return (
              <AnimateOnScroll key={t.id} delay={i * 0.03}>
                <button
                  onClick={() => togglePick(t.id)}
                  disabled={disabled}
                  className={`w-full text-left bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.03)] p-4 transition-all duration-300 ${
                    picked
                      ? "ring-2 ring-red/30 shadow-[0_2px_8px_rgba(204,0,0,0.1)]"
                      : disabled
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_16px_40px_rgba(0,0,0,0.06)] cursor-pointer"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Check / number */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
                      picked
                        ? "bg-red text-white"
                        : "bg-bg text-text-muted"
                    }`}>
                      {picked ? "✓" : String(i + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-text leading-tight truncate">
                        {t.nombre}
                      </p>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        {t.especialidad} · {t.ubicacion.ciudad}
                      </p>
                      {t.edad && (
                        <p className="text-[10px] text-text-muted/60 mt-0.5">
                          {t.edad} anos
                        </p>
                      )}
                    </div>

                    {/* Region badge */}
                    <span className={`text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full shrink-0 ${
                      t.region === "cdmx"
                        ? "bg-[#CC000008] text-red"
                        : t.region === "gdl"
                        ? "bg-[#00684708] text-green"
                        : "bg-[#C4A26508] text-gold"
                    }`}>
                      {regionLabel(t.region)}
                    </span>
                  </div>
                </button>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
