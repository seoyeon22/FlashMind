import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/utils/supabase/server";

export const authService = {
  //  public.users 테이블에서 auth_id를 기반으로 users.id 가져오기
  getUserByAuthId: async (authId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("auth_id", authId)
      .single();

    if (error) {
      console.error("User lookup error:", error.message);
      return null;
    }

    return data.id; // public.users의 id 반환
  },

  createNewUser: async (authId: string) => {
    const { data, error } = await supabase.from("users").insert([
      { auth_id: authId, username: "username", created_at: new Date() }
    ]).select();
    console.log(data, error);

    if(!data){
      return null;
    }    
    return data[0].id;
  },

  // 회원가입 (auth.users에 추가 → public.users에 자동 추가됨)
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Signup error:", error);
      return { userId: null, error };
    }

    const authId = data.user?.id;
    if (!authId) return { error: new Error("Failed to get auth user ID") };

    // public.users 테이블에서 user ID 가져오기
    const userId = await authService.createNewUser(authId);
    return { userId };
  },

  // 로그인
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      return { error };
    }

    const authId = data.user?.id;
    if (!authId) return { error: new Error("Failed to get auth user ID") };

    // public.users 테이블에서 user ID 가져오기
    const userId = await authService.getUserByAuthId(authId);
    if (!userId) return { error: new Error("User not found in public.users") };

    return { userId };
  },

  // 로그아웃
  signOut: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
    }
  },

  listenAuthChanges: () => {
    const { setUser } = useAuthStore.getState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
            if (event === "SIGNED_OUT") {
                setUser(null);
            } else if (session?.user) {
                const user = await authService.getUserByAuthId(session.user.id);
                setUser(user);
            }
        }
    );

    return () => subscription.unsubscribe(); // 구독 해제 함수 반환
  },
};