export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center items-center text-center px-6 py-20">
      {/* Content */}
      <div className="relative z-10 max-w-[680px] mx-auto">
        {/* Badge */}
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-red mb-10">
          La Seleccion del Taco &middot; 2026
        </p>

        {/* Headline */}
        <h1
          className="text-[clamp(34px,7vw,58px)] font-light leading-[1.08] tracking-[-0.02em] mb-5 text-text"
        >
          Mientras el mundo ve futbol,
          <br />
          Mexico vota por su{" "}
          <span className="text-red">verdadera seleccion.</span>
        </h1>

        {/* Sub */}
        <p className="text-[14px] font-normal text-text-muted max-w-[460px] mx-auto mt-6 mb-10 leading-relaxed">
          32 taquerias. Eliminatoria directa. Tu voto decide quien avanza. Solo queda una.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="#torneo"
            className="inline-flex items-center gap-2 bg-red text-white font-semibold text-[10px] tracking-[1px] uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-red/90 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(204,0,0,0.2)]"
          >
            Vota ahora
          </a>
          <a
            href="#taquerias"
            className="inline-flex items-center gap-2 border border-border-strong text-text font-semibold text-[10px] tracking-[1px] uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:border-text/30 hover:-translate-y-0.5"
          >
            Ver taquerias
          </a>
        </div>

        {/* Steps */}
        <div className="flex justify-center gap-8 mt-16">
          {[
            { num: "1", label: "Vota" },
            { num: "2", label: "Visita" },
            { num: "3", label: "Colecciona" },
          ].map((step) => (
            <div key={step.num} className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-red text-white flex items-center justify-center text-[12px] font-bold">
                {step.num}
              </div>
              <span className="text-[11px] font-medium text-text-muted tracking-wide uppercase">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-[float_2.5s_ease-in-out_infinite]">
        <span className="text-[10px] tracking-[2px] uppercase text-text-muted font-medium">
          Descubre
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-text-muted"
        >
          <path
            d="M10 3v14M4 11l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
