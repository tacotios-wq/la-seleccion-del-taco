import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Manifesto from "@/components/Manifesto";
import TournamentSection from "@/components/torneo/TournamentSection";
import TeamSection from "@/components/equipo/TeamSection";
import SignupSection from "@/components/SignupSection";

function Divider() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-[30px] h-[2px] bg-red rounded-full" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <Hero />

        {/* Manifesto */}
        <Manifesto />

        <Divider />

        {/* EL TORNEO — bracket */}
        <TournamentSection />

        <Divider />

        {/* Equipo legitimador */}
        <TeamSection />

        {/* Signup */}
        <SignupSection />
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-border">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-red mb-2">
          La Selecci&oacute;n del Taco
        </p>
        <p className="text-[11px] text-text-muted/60 mb-0.5">
          &copy; 2026 La Selecci&oacute;n del Taco. Una iniciativa de @tacotios.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          {["Instagram", "TikTok", "YouTube"].map((name) => (
            <a
              key={name}
              href={`https://${name === "Instagram" ? "instagram.com" : name === "TikTok" ? "tiktok.com/@" : "youtube.com/@"}tacotios`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted text-[11px] font-medium hover:text-red transition-colors"
            >
              {name}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
