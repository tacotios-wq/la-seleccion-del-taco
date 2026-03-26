import AnimateOnScroll from "../AnimateOnScroll";

const TEAM = [
  {
    nombre: "Gloria L\u00f3pez Morales",
    titulo: "Consejera Gastron\u00f3mica",
    credencial: "Impulsora de la declaraci\u00f3n de la gastronom\u00eda mexicana como Patrimonio Inmaterial de la Humanidad por la UNESCO.",
    inicial: "G",
  },
  {
    nombre: "Bill Esparza",
    titulo: "Autoridad Internacional",
    credencial: "James Beard Award 2016. Referente global de la gastronom\u00eda mexicana para medios como LA Times.",
    inicial: "B",
  },
  {
    nombre: "@tacotios",
    titulo: "Creador y Director",
    credencial: "2 millones de seguidores. 3 a\u00f1os documentando la gastronom\u00eda mexicana desde la trinchera.",
    inicial: "A",
  },
];

export default function TeamSection() {
  return (
    <section id="equipo" className="py-24 px-6">
      <div className="max-w-[680px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-red mb-5">
            El Equipo
          </p>
          <h2 className="text-[clamp(34px,5vw,48px)] font-light tracking-[-0.02em] mb-4 text-text">
            Qui&eacute;nes est&aacute;n detr&aacute;s
          </h2>
          <p className="text-text-body max-w-[500px] mx-auto text-[14px] leading-relaxed">
            Autoridades gastron&oacute;micas que avalan cada selecci&oacute;n.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {TEAM.map((member, i) => (
            <AnimateOnScroll key={member.nombre} delay={i * 0.1}>
              <div className="bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.03)] p-8 text-center transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_16px_40px_rgba(0,0,0,0.06)]">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-bg border border-border mx-auto mb-5 flex items-center justify-center">
                  <span className="text-[24px] font-bold text-red">
                    {member.inicial}
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold text-text mb-1 tracking-[-0.01em]">
                  {member.nombre}
                </h3>
                <p className="text-red text-[12px] font-bold tracking-[2px] uppercase mb-3">
                  {member.titulo}
                </p>
                <p className="text-[13px] text-text-muted leading-relaxed">
                  {member.credencial}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Quote */}
        <AnimateOnScroll>
          <div className="bg-[#0077C806] border-l-[3px] border-red rounded-r-[6px] py-3.5 px-4 max-w-[600px] mx-auto">
            <p className="text-[14px] text-text-body leading-relaxed">
              &ldquo;La primera plataforma que documenta y gamifica la gastronom&iacute;a mexicana con el rigor de quienes han dedicado su vida a ella.&rdquo;
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
