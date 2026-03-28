import Navbar from "@/components/Navbar";
import PassportSection from "@/components/pasaporte/PassportSection";

export const metadata = {
  title: "Pasaporte Taquero \u2014 La Selecci\u00f3n del Taco",
  description: "Crea tu pasaporte taquero. Visita las 16 taquer\u00edas, colecciona sellos y presume tu recorrido.",
};

export default function PasaportePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero mini */}
        <section className="py-16 px-6 text-center">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-blue mb-4">
            Tu recorrido
          </p>
          <h1 className="text-[clamp(34px,6vw,52px)] font-light tracking-[-0.02em] mb-4 text-text">
            Pasaporte <span className="text-blue">Taquero</span>
          </h1>
          <p className="text-text-body max-w-[460px] mx-auto text-[14px] leading-relaxed">
            Visita las taquer&iacute;as, colecciona sellos y presume tu recorrido.
          </p>
        </section>

        {/* Pasaporte */}
        <PassportSection />
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-border">
        <a href="/" className="text-[10px] font-bold tracking-[4px] uppercase text-blue mb-2 block">
          La Selecci&oacute;n del Taco
        </a>
        <p className="text-[11px] text-text-muted/60">
          &copy; 2026 La Selecci&oacute;n del Taco. Una iniciativa de @tacotios.
        </p>
      </footer>
    </>
  );
}
