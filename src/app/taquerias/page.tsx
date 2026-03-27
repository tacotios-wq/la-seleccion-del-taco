import Navbar from "@/components/Navbar";
import TaqueriaList from "@/components/TaqueriaList";
import DraftSection from "@/components/draft/DraftSection";

export const metadata = {
  title: "Taquer\u00edas \u2014 La Selecci\u00f3n del Taco",
  description: "16 taquer\u00edas seleccionadas de CDMX, Guadalajara y Monterrey. Conoce su historia y vota por tu favorita.",
};

export default function TaqueriasPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero mini */}
        <section className="py-16 px-6 text-center">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-red mb-4">
            Las seleccionadas
          </p>
          <h1 className="text-[clamp(34px,6vw,52px)] font-light tracking-[-0.02em] mb-4 text-text">
            Las taquer&iacute;as
          </h1>
          <p className="text-text-body max-w-[460px] mx-auto text-[14px] leading-relaxed">
            16 taquer&iacute;as de 3 ciudades. Sin filtros ni favores.
          </p>
        </section>

        {/* Lista de taquerías */}
        <TaqueriaList />

        {/* Divider */}
        <div className="flex justify-center py-4">
          <div className="w-[30px] h-[2px] bg-red rounded-full" />
        </div>

        {/* Quiniela */}
        <DraftSection />
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-border">
        <a href="/" className="text-[10px] font-bold tracking-[4px] uppercase text-red mb-2 block">
          La Selecci&oacute;n del Taco
        </a>
        <p className="text-[11px] text-text-muted/60">
          &copy; 2026 La Selecci&oacute;n del Taco. Una iniciativa de @tacotios.
        </p>
      </footer>
    </>
  );
}
