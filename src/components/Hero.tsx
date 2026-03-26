export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center items-center text-center px-6 py-20">
      {/* Content */}
      <div className="relative z-10 max-w-[680px] mx-auto">
        {/* Title — one line, prominent */}
        <h1 className="text-[clamp(34px,7vw,58px)] font-light leading-[1.08] tracking-[-0.02em] mb-5 text-text">
          La Selecci&oacute;n{" "}
          <span className="text-blue">del Taco</span>
        </h1>

        {/* Divider */}
        <div className="w-8 h-[2px] bg-blue mx-auto mb-8" />

        {/* Slogan */}
        <p className="text-[clamp(16px,2.5vw,20px)] font-light text-text-body max-w-[460px] mx-auto mb-10 leading-relaxed tracking-[-0.01em]">
          El sabor de M&eacute;xico llega donde est&eacute;s.
        </p>

        {/* Sub */}
        <p className="text-[13px] font-normal text-text-muted max-w-[400px] mx-auto mb-10 leading-relaxed">
          Vota por tu favorita
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="#torneo"
            className="inline-flex items-center gap-2 bg-blue text-white font-semibold text-[10px] tracking-[1px] uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-blue/90 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,119,200,0.2)]"
          >
            Vota ahora
          </a>
          <a
            href="#torneo"
            className="inline-flex items-center gap-2 border border-border-strong text-text font-semibold text-[10px] tracking-[1px] uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:border-text/30 hover:-translate-y-0.5"
          >
            Ver clasificaci&oacute;n
          </a>
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
