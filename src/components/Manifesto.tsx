import AnimateOnScroll from "./AnimateOnScroll";

export default function Manifesto() {
  return (
    <section className="py-24 px-6 max-w-[680px] mx-auto">
      <AnimateOnScroll>
        <p className="text-[clamp(16px,2.5vw,20px)] leading-[1.8] mb-8 text-text-body font-light">
          Mexico tiene mas de <strong className="font-semibold text-text">300,000 taquerias.</strong> Algunas llevan tres generaciones sirviendo el mismo taco. Otras abrieron ayer y ya tienen cola de dos horas.
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.1}>
        <p className="text-[clamp(16px,2.5vw,20px)] leading-[1.8] mb-8 text-text-body font-light">
          Pero nadie habia hecho esto: <span className="text-red">reunir a las mejores en un torneo donde Mexico decide.</span> No un ranking de criticos. No una lista de un periodico. Un voto popular, respaldado por las autoridades gastronomicas mas importantes del pais.
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.2}>
        <p className="text-[clamp(16px,2.5vw,20px)] leading-[1.8] mb-8 text-text-body font-light">
          Mientras el mundo se prepara para el Mundial 2026, nosotros organizamos <strong className="font-semibold text-text">la otra seleccion.</strong>
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.3}>
        <p className="text-[clamp(16px,2.5vw,20px)] leading-[1.8] text-text-body font-light">
          La que se juega en comales, en esquinas, en mercados. <strong className="font-semibold text-text">Taqueria por taqueria. Taco por taco. Bocado por bocado.</strong>
        </p>
      </AnimateOnScroll>
    </section>
  );
}
