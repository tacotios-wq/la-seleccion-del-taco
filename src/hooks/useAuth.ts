"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  avatar_url: string;
}

export interface StampRecord {
  taqueria_id: string;
  photo_url: string;
  created_at: string;
  verified: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stamps, setStamps] = useState<StampRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Load session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
        loadStamps(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
        loadStamps(session.user.id);
      } else {
        setProfile(null);
        setStamps([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadProfile(userId: string) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (data) setProfile(data as Profile);
  }

  async function loadStamps(userId: string) {
    const { data } = await supabase
      .from("stamps")
      .select("*")
      .eq("user_id", userId);
    if (data) setStamps(data as StampRecord[]);
  }

  const register = useCallback(
    async (data: { nombre: string; email: string; telefono: string; password: string }) => {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            nombre: data.nombre,
            telefono: data.telefono,
          },
        },
      });

      if (error) throw error;

      // Update telefono in profile (trigger creates profile automatically)
      if (authData.user) {
        await supabase
          .from("profiles")
          .update({ telefono: data.telefono })
          .eq("id", authData.user.id);
      }

      return authData.user;
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data.user;
    },
    []
  );

  const loginWithProvider = useCallback(async (provider: "google" | "apple") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });
    if (error) throw error;
  }, []);

  const addStamp = useCallback(
    async (taqueriaId: string, photoUrl: string) => {
      if (!user) return;
      if (stamps.some((s) => s.taqueria_id === taqueriaId)) return;

      const { error } = await supabase.from("stamps").insert({
        user_id: user.id,
        taqueria_id: taqueriaId,
        photo_url: photoUrl,
      });

      if (!error) {
        setStamps((prev) => [
          ...prev,
          { taqueria_id: taqueriaId, photo_url: photoUrl, created_at: new Date().toISOString(), verified: false },
        ]);
      }
    },
    [user, stamps]
  );

  const hasStamp = useCallback(
    (taqueriaId: string) => stamps.some((s) => s.taqueria_id === taqueriaId),
    [stamps]
  );

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setStamps([]);
  }, []);

  return {
    user,
    profile,
    stamps,
    loading,
    register,
    login,
    loginWithProvider,
    addStamp,
    hasStamp,
    logout,
  };
}
