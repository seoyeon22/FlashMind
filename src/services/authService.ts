'use client'

import { supabase } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export const handleLogin = async (formData: FormData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if (error) {
        console.log(error)
        redirect('/auth/login')
    }
    
    useAuthStore.getState().login();

    redirect('/dashboard')
}

export const handleSignup = async (formData: FormData) => {
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  
    const { error } = await supabase.auth.signUp(data)
  
    if (error) {
      redirect('/auth/signup')
    }

    useAuthStore.getState().login();
    redirect('/dashboard')
  }