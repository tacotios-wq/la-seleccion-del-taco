import AnimateOnScroll from "./AnimateOnScroll";

const STEPS = [
  {
    num: "01",
    title: "Vota",
    desc: "Cada semana hay un enfrentamiento. Dos taquerias, un voto. Tu decides quien avanza a la siguiente ronda.",
  },
  {
    num: "02",
    title: "Visita",
    desc: "Ve a las taquerias, prueba los tacos. Tu voto pesa mas si verificas que estuviste ahi.",
  },
  {
    num: "03",
    title: "Colecciona",
    desc: "Cada visita te da un sello en tu pasaporte taquero. Completa la coleccion de los 16 participantes.",
  },
  {
    num: "04",
    title: "Descubre",
    desc: "Explora el mapa con todas las taquerias seleccionadas. Filtra por tipo de taco, zona o precio.",
  },
  {
    num: "05",
    title: "Comparte",
    desc: "Comparte tus matchups favoritos, presume tu pasaporte, reta a tus amigos a coleccionar mas sellos.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,104,71,0.12)_0%,transparent_50%)]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[0.7rem] font-semibold tracking-[0.35em] uppercase text-dorado mb-4">
            Como funciona
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-black mb-4">
            Cinco pasos para ser parte
          </h2>
          <p className="text-gris max-w-[600px] mx-auto text-[0.95rem]">
            No solo miras. Participas. Votas, visitas, coleccionas y descubres.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <AnimateOnScroll key={step.num} delay={i * 0.08}>
              <div className="bg-crema/[0.03] border border-dorado/[0.12] p-8 transition-all duration-300 hover:border-dorado/[0.35] hover:bg-crema/[0.05] hover:-translate-y-[3px]">
                <div className="font-[family-name:var(--font-display)] text-[2.5rem] font-black text-dorado/40 leading-none mb-3">
                  {step.num}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-[0.88rem] text-gris leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
