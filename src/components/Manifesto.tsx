import AnimateOnScroll from "./AnimateOnScroll";

export default function Manifesto() {
  return (
    <section className="py-24 px-6 max-w-[680px] mx-auto">
      <AnimateOnScroll>
        <p className="text-[clamp(16px,2.5vw,20px)] leading-[1.8] mb-8 text-text-body font-light">
          M&eacute;xico tiene m&aacute;s de <strong className="font-semibold text-text">300,000 taquer&iacute;as.</strong> Algunas llevan tres generaciones sirviendo el mismo taco. Otras abrieron ayer y ya tienen cola de dos horas.
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.1}>
        <p className="text-[clamp(16px,2.5vw,20px)] leading-[1.8] mb-8 text-text-body font-light">
          Pero nadie hab&iacute;a hecho esto: <span className="text-red">reunir a las mejores en un torneo donde M&eacute;xico decide.</span> No un ranking de cr&iacute;ticos. No una lista de un peri&oacute;dico. Un voto popular, respaldado por las autoridades gastron&oacute;micas m&aacute;s importantes del pa&iacute;s.
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.2}>
        <p className="text-[clamp(16px,2.5vw,20px)] leading-[1.8] mb-8 text-text-body font-light">
          Mientras el mundo se prepara para el Mundial 2026, nosotros organizamos <strong className="font-semibold text-text">la otra selecci&oacute;n.</strong>
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={0.3}>
        <p className="text-[clamp(16px,2.5vw,20px)] leading-[1.8] text-text-body font-light">
          La que se juega en comales, en esquinas, en mercados. <strong className="font-semibold text-text">Taquer&iacute;a por taquer&iacute;a. Taco por taco. Bocado por bocado.</strong>
        </p>
      </AnimateOnScroll>
    </section>
  );
}
