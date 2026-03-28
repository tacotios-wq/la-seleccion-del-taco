import { getActiveMatchup, getMatchupTaquerias, getMatchups } from "@/lib/data";
import MatchupCard from "./MatchupCard";
import BracketView from "./BracketView";
import AnimateOnScroll from "../AnimateOnScroll";

export default function TournamentSection() {
  const active = getActiveMatchup();

  let activeTaquerias = null;
  if (active) {
    const { taqueria1, taqueria2 } = getMatchupTaquerias(active);
    if (taqueria1 && taqueria2) {
      activeTaquerias = { taqueria1, taqueria2 };
    }
  }

  return (
    <section id="torneo" className="py-24 px-6 relative">
      <div className="max-w-[900px] mx-auto relative z-10">
        {/* Header — minimal */}
        <div className="text-center mb-16">
          <AnimateOnScroll>
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-blue mb-6">
              El Torneo
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <p className="text-text-body max-w-[500px] mx-auto text-[14px] leading-relaxed">
              Tu voto decide qui&eacute;n avanza. Solo queda una.
            </p>
          </AnimateOnScroll>
        </div>

        {/* BRACKET VISUAL — first, above everything */}
        <AnimateOnScroll>
          <div className="mb-16">
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-text-muted mb-6 text-center">
              El cuadro completo
            </p>
            <BracketView />
          </div>
        </AnimateOnScroll>

        {/* Stats bar */}
        <AnimateOnScroll delay={0.3}>
          <div className="flex justify-center gap-8 sm:gap-14 mb-14">
            {[
              { value: "16", label: "Taquer\u00edas" },
              { value: "6", label: "CDMX" },
              { value: "6", label: "GDL" },
              { value: "4", label: "MTY" },
              { value: "3,370", label: "Votos" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[clamp(22px,3.5vw,32px)] font-bold text-blue leading-none">
                  {stat.value}
                </p>
                <p className="text-[10px] tracking-[2px] uppercase text-text-muted mt-1.5 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* FOMO banner */}
        <AnimateOnScroll delay={0.35}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white py-2.5 px-5 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
              <span className="w-2 h-2 rounded-full bg-green animate-[pulse-live_2s_ease-in-out_infinite]" />
              <span className="text-[11px] font-semibold text-green tracking-wide">
                247 personas votando ahora mismo
              </span>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Voting multiplier */}
        <AnimateOnScroll delay={0.4}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-[#0077C806] py-2.5 px-5 rounded-full">
              <span className="text-[11px] text-text-body">
                Vota en <span className="font-bold text-text">Instagram</span> o en la <span className="font-bold text-blue">webapp &times;3</span>
              </span>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Active matchup — THE MAIN EVENT */}
        {active && activeTaquerias && (
          <AnimateOnScroll delay={0.1}>
            <div className="max-w-[680px] mx-auto mb-16">
              <p className="text-[10px] font-bold tracking-[4px] uppercase text-blue mb-4 text-center">
                Enfrentamiento activo
              </p>
              <MatchupCard
                matchup={active}
                taqueria1={activeTaquerias.taqueria1}
                taqueria2={activeTaquerias.taqueria2}
                featured
              />
            </div>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
