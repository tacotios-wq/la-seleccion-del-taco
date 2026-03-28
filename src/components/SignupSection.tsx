"use client";

import { useState } from "react";

export default function SignupSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;
    const email = input.value;

    try {
      const emails = JSON.parse(localStorage.getItem("lsdt_emails") || "[]");
      emails.push({ email, date: new Date().toISOString() });
      localStorage.setItem("lsdt_emails", JSON.stringify(emails));
    } catch {
      // ignore
    }

    input.value = "";
    setSubmitted(true);
  }

  return (
    <section
      id="signup"
      className="py-32 px-6 text-center"
    >
      <div className="max-w-[680px] mx-auto">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-blue mb-5">
          No te lo pierdas
        </p>
        <h2 className="text-[clamp(34px,5vw,48px)] font-light tracking-[-0.02em] mb-4 text-text">
          Se el primero en votar
        </h2>
        <p className="text-text-body max-w-[460px] mx-auto text-[14px] mb-10 leading-relaxed">
          Cuando el torneo abra, te avisamos antes que a nadie.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-0 max-w-[480px] mx-auto"
        >
          <input
            type="email"
            placeholder="tu@email.com"
            required
            className="flex-1 py-3.5 px-5 text-[13px] bg-white border border-border-strong sm:border-r-0 text-text rounded-full sm:rounded-r-none outline-none transition-colors focus:border-blue placeholder:text-text-muted/60"
          />
          <button
            type="submit"
            disabled={submitted}
            className="py-3.5 px-7 text-[10px] font-bold tracking-[1px] uppercase bg-blue text-white border border-blue cursor-pointer transition-all hover:bg-blue/90 whitespace-nowrap rounded-full sm:rounded-l-none disabled:opacity-60"
          >
            {submitted ? "Listo" : "Avisame"}
          </button>
        </form>

        {submitted && (
          <p className="mt-6 text-blue font-medium text-[13px]">
            Ya estas dentro. Te avisamos cuando arranque la votacion.
          </p>
        )}

        <p className="text-[12px] text-text-muted mt-4">
          Sin spam. Solo el inicio del torneo.
        </p>
      </div>
    </section>
  );
}
