"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Torneo", href: "#torneo" },
  { label: "Quiniela", href: "#draft" },
  { label: "Taquerias", href: "#taquerias" },
  { label: "Equipo", href: "#equipo" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(245,240,235,0.92)] backdrop-blur-[20px] border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[680px] mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <a
          href="#"
          className="text-[11px] font-bold tracking-[4px] uppercase text-text hover:text-red transition-colors"
        >
          LA SELECCION
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[10px] font-semibold tracking-[1px] uppercase text-text-muted hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#torneo"
            className="text-[10px] font-semibold tracking-[1px] uppercase bg-red text-white px-3 py-1.5 rounded-full hover:bg-red/90 transition-colors"
          >
            Votar
          </a>
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`w-5 h-px bg-text transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`w-5 h-px bg-text transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-px bg-text transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[rgba(245,240,235,0.96)] backdrop-blur-[20px] border-t border-border px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[11px] font-semibold tracking-[1px] uppercase text-text-muted hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#torneo"
            onClick={() => setMenuOpen(false)}
            className="text-[11px] font-semibold tracking-[1px] uppercase text-red"
          >
            Votar
          </a>
        </div>
      </div>
    </nav>
  );
}
