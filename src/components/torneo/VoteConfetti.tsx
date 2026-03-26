"use client";

import { useEffect, useState } from "react";

const COLORS = ["#006847", "#CE1126", "#C4A265", "#FFFFFF", "#D4B87A"];

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

export default function VoteConfetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) return;
    const ps: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.3,
      duration: 1 + Math.random() * 0.8,
      rotation: Math.random() * 720 - 360,
      size: 4 + Math.random() * 6,
    }));
    setParticles(ps);
    const timer = setTimeout(() => setParticles([]), 2000);
    return () => clearTimeout(timer);
  }, [active]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration}s ease-out ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
