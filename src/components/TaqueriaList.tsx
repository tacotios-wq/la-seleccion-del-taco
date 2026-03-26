import { getRealTaquerias } from "@/lib/data";
import AnimateOnScroll from "./AnimateOnScroll";

export default function TaqueriaList() {
  const taquerias = getRealTaquerias();

  return (
    <section id="taquerias" className="py-24 px-6">
      <div className="max-w-[680px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-red mb-5">
            Las seleccionadas
          </p>
          <h2 className="text-[clamp(34px,5vw,48px)] font-light tracking-[-0.02em] mb-4 text-text">
            Las taquerias
          </h2>
          <p className="text-text-body max-w-[500px] mx-auto text-[14px] leading-relaxed">
            16 taquerias seleccionadas. Una a una. Sin filtros ni favores.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {taquerias.map((t, i) => (
            <AnimateOnScroll key={t.id} delay={i * 0.05}>
              <div className="bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_16px_40px_rgba(0,0,0,0.06)]">
                <div className="p-6 sm:p-8">
                  {/* Number + Name */}
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-[44px] font-bold text-red leading-none shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-[clamp(24px,4vw,32px)] font-light tracking-[-0.02em] text-text leading-tight">
                        {t.nombre}
                      </h3>
                      <p className="text-[12px] text-text-muted mt-1">
                        {t.especialidad} &middot; {t.ubicacion.colonia} &middot; {t.ubicacion.direccion}
                      </p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="bg-[#0077C806] border-l-[3px] border-red rounded-r-[6px] py-3.5 px-4 my-5">
                    <p className="text-[13px] text-text-body leading-relaxed">
                      {t.historia.length > 200 ? t.historia.slice(0, 200) + "..." : t.historia}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-bg text-text-body py-1 px-3 text-[12px] font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Tips row */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] text-text-muted mb-5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red inline-block" />
                      {t.precioRango}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red inline-block" />
                      {t.horario}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red inline-block" />
                      {t.ubicacion.ciudad}
                    </span>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3">
                    <a
                      href={t.ubicacion.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-3 text-[10px] font-bold tracking-[1px] uppercase bg-red text-white rounded-full hover:bg-red/90 transition-colors"
                    >
                      Ver en mapa
                    </a>
                    <a
                      href="#torneo"
                      className="flex-1 text-center py-3 text-[10px] font-bold tracking-[1px] uppercase border border-border-strong text-text rounded-full hover:border-text/30 transition-colors"
                    >
                      Votar
                    </a>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <p className="text-center text-[12px] text-text-muted mt-8">
          6 CDMX · 6 GDL · 4 MTY
        </p>
      </div>
    </section>
  );
}
