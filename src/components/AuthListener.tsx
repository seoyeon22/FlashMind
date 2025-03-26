"use client"; // 클라이언트 컴포넌트

import { useEffect } from "react";
import { supabase } from "@/utils/supabase/server";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";

export default function AuthListener() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
      } else if (session?.user) {
        const user = await authService.getUserByAuthId(session.user.id);
        setUser(user);
      }
    });

    return () => subscription.unsubscribe(); // ✅ 언마운트 시 해제
  }, []);

  return null; // UI에는 영향 없음
}