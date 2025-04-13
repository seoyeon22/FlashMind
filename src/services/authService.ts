import { createClient } from "@/app/utils/supabase/client";

const supabase = createClient();

export const authService = {
  getUserByAuthId: async (authId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", authId)
      .maybeSingle();

    if (error) {
      console.error("User lookup error:", error.message);
      return null;
    }
    return data;
  },

  createNewUser: async (authId: string) => {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          auth_id: authId,
          username: "username",
          created_at: new Date(),
        },
      ])
      .select("*");

    if (error || !data) {
      console.error("User creation error:", error?.message);
      return null;
    }

    return data[0];
  },

  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) return { user: null, error };

    const authId = data.user.id;
    const user = await authService.createNewUser(authId);
    if (!user) return { user: null, error: new Error("User creation failed") };

    return { user };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return { user: null, error };

    const authId = data.user.id;
    const user = await authService.getUserByAuthId(authId);
    if (!user) return { user: null, error: new Error("User not found in public.users") };

    return { user };
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error("Logout error:", error.message);
    } catch (e) {
      console.error("Logout error (uncaught):", e);
    }
  },
};
