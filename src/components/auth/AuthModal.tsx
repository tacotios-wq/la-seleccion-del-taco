"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

type Mode = "login" | "register";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { register, login, loginWithProvider } = useAuth();
  const [mode, setMode] = useState<Mode>("register");
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "register") {
        if (!form.nombre || !form.email || !form.telefono || !form.password) {
          setError("Todos los campos son obligatorios");
          setSubmitting(false);
          return;
        }
        if (form.password.length < 6) {
          setError("La contrasena debe tener al menos 6 caracteres");
          setSubmitting(false);
          return;
        }
        await register(form);
        onClose();
      } else {
        if (!form.email || !form.password) {
          setError("Email y contrasena son obligatorios");
          setSubmitting(false);
          return;
        }
        await login(form.email, form.password);
        onClose();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al procesar";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleProvider(provider: "google" | "apple") {
    try {
      await loginWithProvider(provider);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error con el proveedor";
      setError(message);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[8px]"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-[12px] w-full max-w-[400px] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.15)] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-bg flex items-center justify-center text-text-muted hover:text-text transition-colors text-[14px]"
        >
          &times;
        </button>

        <div className="text-center mb-6">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-red mb-2">
            La Seleccion del Taco
          </p>
          <h3 className="text-[24px] font-light text-text tracking-[-0.02em]">
            {mode === "register" ? "Crea tu cuenta" : "Inicia sesion"}
          </h3>
          <p className="text-[12px] text-text-muted mt-1">
            {mode === "register"
              ? "Para votar, sellar tu pasaporte y competir"
              : "Accede a tu pasaporte taquero"}
          </p>
        </div>

        {/* Social buttons */}
        <div className="space-y-2 mb-5">
          <button
            onClick={() => handleProvider("google")}
            className="w-full flex items-center justify-center gap-2 py-3 border border-border-strong rounded-full text-[12px] font-semibold text-text hover:bg-bg transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.68 8.18c0-.567-.05-1.113-.145-1.636H8v3.094h4.305a3.68 3.68 0 01-1.597 2.415v2.007h2.585C14.82 12.74 15.68 10.66 15.68 8.18z" fill="#4285F4"/>
              <path d="M8 16c2.16 0 3.97-.716 5.293-1.94l-2.585-2.008c-.716.48-1.633.763-2.708.763-2.083 0-3.846-1.407-4.476-3.298H.858v2.073A7.997 7.997 0 008 16z" fill="#34A853"/>
              <path d="M3.524 9.517A4.81 4.81 0 013.273 8c0-.526.09-1.038.25-1.517V4.41H.859A7.997 7.997 0 000 8c0 1.29.31 2.512.858 3.59l2.666-2.073z" fill="#FBBC05"/>
              <path d="M8 3.185c1.174 0 2.229.404 3.058 1.196l2.294-2.294C11.966.792 10.156 0 8 0A7.997 7.997 0 00.858 4.41l2.666 2.073C4.154 4.592 5.917 3.185 8 3.185z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </button>
          <button
            onClick={() => handleProvider("apple")}
            className="w-full flex items-center justify-center gap-2 py-3 border border-border-strong rounded-full text-[12px] font-semibold text-text hover:bg-bg transition-colors"
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
              <path d="M13.32 12.33c-.3.7-.66 1.34-1.08 1.93-.57.8-1.04 1.35-1.4 1.66-.56.5-1.16.76-1.8.77-.46 0-1.02-.13-1.66-.4-.65-.26-1.24-.4-1.78-.4-.57 0-1.18.14-1.83.4-.66.27-1.19.41-1.59.43-.62.03-1.23-.24-1.83-.81C.09 15.62-.24 15.2 0 14.38c-.24-.82-.36-1.7-.36-2.62 0-.97.21-1.8.63-2.52a3.72 3.72 0 013.1-1.87c.49-.01 1.13.15 1.93.48.8.34 1.31.5 1.53.5.17 0 .73-.2 1.68-.58.9-.36 1.66-.51 2.28-.45 1.69.14 2.96.81 3.8 2.02-1.51.92-2.26 2.2-2.24 3.84.02 1.28.48 2.34 1.37 3.2.4.39.86.69 1.36.9-.11.31-.22.61-.35.9zM10.2.16c0 1-.37 1.94-1.1 2.8-.88 1.03-1.95 1.63-3.1 1.54a3.12 3.12 0 01-.02-.38c0-.96.42-2 1.17-2.84.37-.43.85-.78 1.43-1.06.58-.27 1.12-.42 1.63-.46 0 .13.01.27.01.4h-.02z"/>
            </svg>
            Continuar con Apple
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] text-text-muted tracking-[1px] uppercase">o con email</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "register" && (
            <div>
              <label className="text-[10px] font-semibold tracking-[1px] uppercase text-text-muted mb-1 block">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full py-2.5 px-3 text-[13px] bg-white border border-border-strong rounded-[6px] text-text outline-none focus:border-red transition-colors placeholder:text-text-muted/50"
              />
            </div>
          )}

          <div>
            <label className="text-[10px] font-semibold tracking-[1px] uppercase text-text-muted mb-1 block">
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full py-2.5 px-3 text-[13px] bg-white border border-border-strong rounded-[6px] text-text outline-none focus:border-red transition-colors placeholder:text-text-muted/50"
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="text-[10px] font-semibold tracking-[1px] uppercase text-text-muted mb-1 block">
                Telefono
              </label>
              <input
                type="tel"
                placeholder="+52 55 1234 5678"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                className="w-full py-2.5 px-3 text-[13px] bg-white border border-border-strong rounded-[6px] text-text outline-none focus:border-red transition-colors placeholder:text-text-muted/50"
              />
            </div>
          )}

          <div>
            <label className="text-[10px] font-semibold tracking-[1px] uppercase text-text-muted mb-1 block">
              Contrasena
            </label>
            <input
              type="password"
              placeholder="Minimo 6 caracteres"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full py-2.5 px-3 text-[13px] bg-white border border-border-strong rounded-[6px] text-text outline-none focus:border-red transition-colors placeholder:text-text-muted/50"
            />
          </div>

          {error && (
            <p className="text-[12px] text-red">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 text-[10px] font-bold tracking-[1px] uppercase bg-red text-white rounded-full hover:bg-red/90 transition-colors mt-2 disabled:opacity-60"
          >
            {submitting ? "Procesando..." : mode === "register" ? "Crear cuenta" : "Entrar"}
          </button>
        </form>

        <p className="text-center text-[12px] text-text-muted mt-5">
          {mode === "register" ? "Ya tienes cuenta?" : "No tienes cuenta?"}{" "}
          <button
            onClick={() => { setMode(mode === "register" ? "login" : "register"); setError(""); }}
            className="text-red font-semibold hover:underline"
          >
            {mode === "register" ? "Inicia sesion" : "Registrate"}
          </button>
        </p>
      </div>
    </div>
  );
}
