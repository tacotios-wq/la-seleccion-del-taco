"use client";

import { getRealTaquerias } from "@/lib/data";
import AnimateOnScroll from "../AnimateOnScroll";

const DEMO_STAMPS = ["el-vilsito", "los-cocuyos", "el-huequito"];

export default function PassportSection() {
  const taquerias = getRealTaquerias();
  const totalSlots = 32;
  const collected = DEMO_STAMPS.length;

  return (
    <section id="pasaporte" className="py-24 px-6 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,104,71,0.08)_0%,transparent_60%)]">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[0.7rem] font-semibold tracking-[0.35em] uppercase text-dorado mb-4">
            Tu Pasaporte Taquero
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-black mb-4">
            Colecciona los 32 sellos
          </h2>
          <p className="text-gris max-w-[600px] mx-auto text-[0.95rem] mb-6">
            Visita las taquerias, verifica tu visita y llena tu pasaporte.
          </p>
          {/* Counter */}
          <div className="inline-flex items-baseline gap-1">
            <span className="font-[family-name:var(--font-display)] text-4xl font-black text-dorado">
              {collected}
            </span>
            <span className="text-gris text-lg">/ {totalSlots}</span>
            <span className="text-gris text-sm ml-1">sellos</span>
          </div>
        </div>

        {/* Stamp grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-12">
          {Array.from({ length: totalSlots }, (_, i) => {
            const taqueria = taquerias[i];
            const isCollected = taqueria && DEMO_STAMPS.includes(taqueria.id);
            const hasData = !!taqueria;

            return (
              <AnimateOnScroll key={i} delay={i * 0.02}>
                <div
                  className={`aspect-square rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-default group relative ${
                    isCollected
                      ? "border-dorado bg-dorado/10 hover:bg-dorado/20 hover:scale-105"
                      : "border-dorado/10 bg-carbon-lighter/30 hover:border-dorado/20"
                  }`}
                  title={hasData ? taqueria.nombre : `Taqueria #${i + 1}`}
                >
                  {isCollected ? (
                    <span className="text-dorado text-lg">&#9733;</span>
                  ) : (
                    <span className="text-gris/30 text-xs">?</span>
                  )}
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "📍", title: "Visita", desc: "Ve a una taqueria seleccionada" },
            { icon: "✓", title: "Verifica", desc: "Confirma tu visita con ubicacion" },
            { icon: "★", title: "Colecciona", desc: "Obtén tu sello exclusivo" },
          ].map((step, i) => (
            <AnimateOnScroll key={step.title} delay={i * 0.1}>
              <div className="text-center py-4">
                <div className="text-2xl mb-2">{step.icon}</div>
                <p className="font-[family-name:var(--font-display)] font-bold text-sm mb-1">{step.title}</p>
                <p className="text-xs text-gris">{step.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
