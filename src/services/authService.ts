import { createClient } from "@/app/utils/supabase/client";

const supabase = createClient();

export const authService = {
  // public.users 테이블에서 auth_id를 기반으로 유저 전체 객체 가져오기
  getUserByAuthId: async (authId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*") // 필요한 필드만 골라도 됨
      .eq("auth_id", authId)
      .single();

    if (error) {
      console.error("User lookup error:", error.message);
      return null;
    }

    return data; // 유저 전체 객체
  },

  // 새로운 유저 생성 (회원가입 시 자동 호출)
  createNewUser: async (authId: string) => {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          auth_id: authId,
          username: "username", // TODO: 사용자 입력으로 수정 가능
          created_at: new Date(),
        },
      ])
      .select("*");

    if (error || !data) {
      console.error("User creation error:", error?.message);
      return null;
    }

    return data[0]; // 유저 전체 객체
  },

  // 회원가입 (auth.users + public.users 등록)
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return { user: null, error };
    }

    const authId = data.user?.id;
    if (!authId) return { user: null, error: new Error("Failed to get auth user ID") };

    const user = await authService.createNewUser(authId);
    if (!user) return { user: null, error: new Error("Failed to create user") };

    return { user };
  },

  // 로그인 (auth.users + public.users에서 유저 조회)
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return { user: null, error };

    const authId = data.user?.id;
    if (!authId) return { user: null, error: new Error("Failed to get auth user ID") };

    const user = await authService.getUserByAuthId(authId);
    if (!user) return { user: null, error: new Error("User not found in public.users") };

    return { user };
  },

  // 로그아웃
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    }
  },
};
