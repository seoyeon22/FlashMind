'use client'

import { supabase } from "@/utils/supabase/server"

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  return data.user.id;
}

export const signup = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  
  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("user data is missing")
  }

  return data.user.id;
}