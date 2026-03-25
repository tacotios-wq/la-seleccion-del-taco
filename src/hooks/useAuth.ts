"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "lsdt_user";

export interface User {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  provider: "email" | "google" | "apple";
  createdAt: string;
  stamps: StampRecord[];
}

export interface StampRecord {
  taqueriaId: string;
  photoUrl: string;
  date: string;
  verified: boolean;
}

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const save = (u: User) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const register = useCallback(
    (data: { nombre: string; email: string; telefono: string; password: string }) => {
      const newUser: User = {
        id: generateId(),
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        provider: "email",
        createdAt: new Date().toISOString(),
        stamps: [],
      };
      save(newUser);
      return newUser;
    },
    []
  );

  const loginWithProvider = useCallback((provider: "google" | "apple") => {
    // Simulado — Supabase lo reemplaza después
    const newUser: User = {
      id: generateId(),
      nombre: provider === "google" ? "Usuario Google" : "Usuario Apple",
      email: `${provider}@demo.com`,
      telefono: "",
      provider,
      createdAt: new Date().toISOString(),
      stamps: [],
    };
    save(newUser);
    return newUser;
  }, []);

  const addStamp = useCallback(
    (taqueriaId: string, photoUrl: string) => {
      if (!user) return;
      if (user.stamps.some((s) => s.taqueriaId === taqueriaId)) return;
      const updated = {
        ...user,
        stamps: [
          ...user.stamps,
          { taqueriaId, photoUrl, date: new Date().toISOString(), verified: false },
        ],
      };
      save(updated);
    },
    [user]
  );

  const hasStamp = useCallback(
    (taqueriaId: string) => user?.stamps.some((s) => s.taqueriaId === taqueriaId) ?? false,
    [user]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { user, loading, register, loginWithProvider, addStamp, hasStamp, logout };
}
