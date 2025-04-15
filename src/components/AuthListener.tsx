"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { createClient } from "@/app/utils/supabase/client";

export default function AuthListener() {
  const supabase = createClient();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const user = await authService.getUserByAuthId(session.user.id);
        if (user) {
          setUser(user);
        }
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // console.log("Auth Event:", event);

        if (event === 'SIGNED_IN' && session?.user) {
          // SIGNED_IN 이벤트 후, 잠시 기다렸다가 다시 세션에서 유저 정보 불러오기
          setTimeout(async () => {
            const user = await authService.getUserByAuthId(session.user.id);
            if (user) {
              // console.log("User after SIGNED_IN:", user);
              setUser(user);  // 유저 정보 설정
            } else {
              // console.log("No user found after SIGNED_IN event");
            }
          }, 500);  // 500ms 대기 후 세션 처리
        }

        if (event === 'SIGNED_OUT') {
          setUser(null);  // 로그아웃 처리
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return null;  // UI에는 영향을 미치지 않음
}
