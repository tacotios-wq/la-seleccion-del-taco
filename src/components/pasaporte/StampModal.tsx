"use client";

import { useState } from "react";
import type { Taqueria } from "@/types";

type Step = "instructions" | "upload" | "confirmed";

export default function StampModal({
  taqueria,
  onStamp,
  onClose,
}: {
  taqueria: Taqueria;
  onStamp: (photoUrl: string) => void;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("instructions");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleConfirm() {
    if (photoPreview) {
      onStamp(photoPreview);
      setStep("confirmed");
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[8px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-[12px] w-full max-w-[400px] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-bg flex items-center justify-center text-text-muted hover:text-text transition-colors text-[14px]"
        >
          &times;
        </button>

        {step === "instructions" && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#0077C806] mx-auto mb-4 flex items-center justify-center">
                <span className="text-[28px]">📸</span>
              </div>
              <h3 className="text-[20px] font-light text-text tracking-[-0.02em] mb-2">
                Sella tu pasaporte
              </h3>
              <p className="text-[13px] text-text-muted leading-relaxed">
                <span className="font-semibold text-text">{taqueria.nombre}</span>
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-red text-white flex items-center justify-center text-[11px] font-bold shrink-0">1</div>
                <div>
                  <p className="text-[13px] font-semibold text-text">Visita la taqueria</p>
                  <p className="text-[12px] text-text-muted">Ve a {taqueria.nombre} y prueba sus tacos</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-red text-white flex items-center justify-center text-[11px] font-bold shrink-0">2</div>
                <div>
                  <p className="text-[13px] font-semibold text-text">Sube una Story</p>
                  <p className="text-[12px] text-text-muted">Publica una foto en Instagram Stories etiquetando a <span className="font-semibold text-red">@tacotios</span> y <span className="font-semibold text-red">@telcel</span></p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-red text-white flex items-center justify-center text-[11px] font-bold shrink-0">3</div>
                <div>
                  <p className="text-[13px] font-semibold text-text">Sube la captura</p>
                  <p className="text-[12px] text-text-muted">Toma screenshot de tu Story y subela aqui para verificar</p>
                </div>
              </div>
            </div>

            {/* Reminder tags */}
            <div className="bg-[#0077C806] rounded-[8px] py-3 px-4 mb-6">
              <p className="text-[11px] text-text-body text-center">
                Etiqueta a <span className="font-bold text-red">@tacotios</span> + <span className="font-bold text-red">@telcel</span> en tu Story
              </p>
            </div>

            <button
              onClick={() => setStep("upload")}
              className="w-full py-3 text-[10px] font-bold tracking-[1px] uppercase bg-red text-white rounded-full hover:bg-red/90 transition-colors"
            >
              Ya subi mi Story
            </button>
          </>
        )}

        {step === "upload" && (
          <>
            <div className="text-center mb-6">
              <h3 className="text-[20px] font-light text-text tracking-[-0.02em] mb-2">
                Sube tu captura
              </h3>
              <p className="text-[12px] text-text-muted">
                Screenshot de tu Story en {taqueria.nombre}
              </p>
            </div>

            {/* Upload area */}
            <label className="block mb-5 cursor-pointer">
              {photoPreview ? (
                <div className="relative rounded-[8px] overflow-hidden">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full max-h-[300px] object-cover rounded-[8px]"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-[12px] font-semibold">Cambiar foto</span>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border-strong rounded-[8px] py-12 flex flex-col items-center gap-2 hover:border-red/30 transition-colors">
                  <span className="text-[32px]">📷</span>
                  <p className="text-[12px] text-text-muted font-medium">
                    Toca para subir tu screenshot
                  </p>
                  <p className="text-[10px] text-text-muted/60">
                    JPG, PNG — max 10MB
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Verification checklist */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-[12px] text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-red" />
                Se ve el nombre de la taqueria
              </div>
              <div className="flex items-center gap-2 text-[12px] text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-red" />
                Etiqueta @tacotios visible
              </div>
              <div className="flex items-center gap-2 text-[12px] text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-red" />
                Etiqueta @telcel visible
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!photoPreview}
              className={`w-full py-3 text-[10px] font-bold tracking-[1px] uppercase rounded-full transition-colors ${
                photoPreview
                  ? "bg-red text-white hover:bg-red/90"
                  : "bg-bg text-text-muted cursor-not-allowed"
              }`}
            >
              Verificar y sellar
            </button>
          </>
        )}

        {step === "confirmed" && (
          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-[#0077C806] mx-auto mb-5 flex items-center justify-center">
              <span className="text-[40px]">✅</span>
            </div>
            <h3 className="text-[22px] font-light text-text tracking-[-0.02em] mb-2">
              Sello confirmado
            </h3>
            <p className="text-[13px] text-text-muted mb-2">
              <span className="font-semibold text-text">{taqueria.nombre}</span> sellado en tu pasaporte
            </p>
            <p className="text-[11px] text-text-muted/60 mb-6">
              Tu sello sera verificado por el equipo
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 text-[10px] font-bold tracking-[1px] uppercase bg-red text-white rounded-full hover:bg-red/90 transition-colors"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
