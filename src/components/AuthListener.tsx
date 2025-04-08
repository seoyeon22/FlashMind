"use client"; // 클라이언트 컴포넌트

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { createClient } from "@/app/utils/supabase/client";

export default function AuthListener() {
  const supabase = createClient();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth Event:", event);
      if (event === "SIGNED_OUT") {
        setUser(null);
      } else if (session?.user) {
        const user = await authService.getUserByAuthId(session.user.id);
        setUser(user);
      }
    });

    return () => subscription.unsubscribe(); // 언마운트 시 해제
  }, []);

  return null; // UI에는 영향 없음
}