"use client";

import { useState } from "react";
import { getRealTaquerias } from "@/lib/data";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "../auth/AuthModal";
import StampModal from "./StampModal";
import AnimateOnScroll from "../AnimateOnScroll";
import type { Taqueria } from "@/types";

function regionLabel(region: string) {
  if (region === "cdmx") return "CDMX";
  if (region === "gdl") return "GDL";
  if (region === "mty") return "MTY";
  return region;
}

export default function PassportSection() {
  const taquerias = getRealTaquerias();
  const { user, profile, stamps, hasStamp, addStamp, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [stampTarget, setStampTarget] = useState<Taqueria | null>(null);
  const stampCount = stamps.length;

  function handleStampClick(t: Taqueria) {
    if (!user) {
      setShowAuth(true);
      return;
    }
    if (hasStamp(t.id)) return;
    setStampTarget(t);
  }

  return (
    <>
      <section id="pasaporte" className="py-24 px-6">
        <div className="max-w-[680px] mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <AnimateOnScroll>
              <p className="text-[10px] font-bold tracking-[4px] uppercase text-red mb-5">
                Pasaporte Taquero
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <h2 className="text-[clamp(34px,5vw,48px)] font-light tracking-[-0.02em] mb-4 text-text">
                Visita, sella, <span className="text-red">compite</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <p className="text-text-body max-w-[460px] mx-auto text-[14px] leading-relaxed">
                Sube una Story etiquetando a @tacotios y @telcel desde la taqueria para obtener tu sello.
              </p>
            </AnimateOnScroll>
          </div>

          {/* User state */}
          {user ? (
            <AnimateOnScroll delay={0.3}>
              <div className="bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.03)] p-6 sm:p-8 mb-8">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[15px] font-semibold text-text">{profile?.nombre || "Usuario"}</p>
                    <p className="text-[11px] text-text-muted">{profile?.email || user?.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[28px] font-bold text-red leading-none">{stampCount}</p>
                    <p className="text-[10px] text-text-muted tracking-[1px] uppercase">sellos</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="h-1.5 bg-bg rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-red rounded-full transition-all duration-700"
                    style={{ width: `${(stampCount / 16) * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-text-muted text-center">
                  {stampCount} de 16 sellos
                </p>

                <button
                  onClick={logout}
                  className="text-[10px] text-text-muted hover:text-red transition-colors mt-3 block mx-auto"
                >
                  Cerrar sesion
                </button>
              </div>
            </AnimateOnScroll>
          ) : (
            <AnimateOnScroll delay={0.3}>
              <div className="bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.03)] p-8 text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-bg border-2 border-dashed border-border-strong mx-auto mb-4 flex items-center justify-center">
                  <span className="text-[24px]">🌮</span>
                </div>
                <h3 className="text-[18px] font-light text-text mb-2">Crea tu pasaporte</h3>
                <p className="text-[12px] text-text-muted mb-5">
                  Registrate para empezar a coleccionar sellos
                </p>
                <button
                  onClick={() => setShowAuth(true)}
                  className="py-3 px-8 text-[10px] font-bold tracking-[1px] uppercase bg-red text-white rounded-full hover:bg-red/90 transition-colors"
                >
                  Crear mi pasaporte
                </button>
              </div>
            </AnimateOnScroll>
          )}

          {/* Stamp grid */}
          <AnimateOnScroll>
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-text-muted mb-4">
              Las 16 taquerias
            </p>
          </AnimateOnScroll>

          <div className="space-y-2">
            {taquerias.map((t, i) => {
              const stamped = user ? hasStamp(t.id) : false;
              const stampData = stamps.find((s) => s.taqueria_id === t.id);

              return (
                <AnimateOnScroll key={t.id} delay={i * 0.03}>
                  <div
                    className={`flex items-center gap-4 bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.03)] p-4 transition-all duration-300 ${
                      stamped
                        ? "ring-1 ring-green/20"
                        : "hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_16px_40px_rgba(0,0,0,0.06)] cursor-pointer"
                    }`}
                    onClick={() => !stamped && handleStampClick(t)}
                  >
                    {/* Stamp circle */}
                    <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center overflow-hidden ${
                      stamped
                        ? "border-2 border-green"
                        : "border-2 border-dashed border-border-strong"
                    }`}>
                      {stamped && stampData?.photo_url ? (
                        <img src={stampData.photo_url} alt="" className="w-full h-full object-cover" />
                      ) : stamped ? (
                        <span className="text-green text-[16px]">✓</span>
                      ) : (
                        <span className="text-text-muted/30 text-[14px]">+</span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-semibold text-text truncate">{t.nombre}</p>
                        {t.patrimonio && (
                          <span className="text-[8px] font-bold tracking-[1px] uppercase text-gold bg-[#C4A26510] px-1.5 py-0.5 rounded-full shrink-0">
                            Patrimonio
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-text-muted">
                        {t.especialidad} · {t.ubicacion.ciudad}{t.edad > 0 ? ` · ${t.edad} anos` : ""}
                      </p>
                    </div>

                    {/* Region + status */}
                    <div className="text-right shrink-0">
                      <span className={`text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full ${
                        t.region === "cdmx" ? "bg-[#0077C808] text-red" :
                        t.region === "gdl" ? "bg-[#00684708] text-green" :
                        "bg-[#C4A26508] text-gold"
                      }`}>
                        {regionLabel(t.region)}
                      </span>
                      {stamped && (
                        <p className="text-[9px] text-green font-semibold mt-1">Sellado</p>
                      )}
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modals */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      {stampTarget && (
        <StampModal
          taqueria={stampTarget}
          onStamp={(photoUrl) => addStamp(stampTarget.id, photoUrl)}
          onClose={() => setStampTarget(null)}
        />
      )}
    </>
  );
}
