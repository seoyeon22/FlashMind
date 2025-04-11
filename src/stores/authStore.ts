import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
    id: string;
    auth_id: string;
    username: string;
    created_at?: string;
  }

  export interface AuthState {
    user: User | null;
    errorMessage: string | null;
    setUser: (user: User | null) => void;
    setErrorMessage: (error: string | null) => void;
  }
  
  export const useAuthStore = create<AuthState>()(
    persist(
      (set) => ({
        user: null,
        errorMessage: null,
        setUser: (user) => set({ user }),
        setErrorMessage: (errorMessage) => set({ errorMessage }),
      }),
      {
        name: 'auth-storage',
      }
    )
  );

