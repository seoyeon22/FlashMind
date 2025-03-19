import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
    userId: string | null;
    error: string | null;
    login: (id: string) => void
    logout: () => void
    setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            userId: null,
            error: null,
            login: (userId) => set({ userId, error: null }),
            logout: () => set({ userId: null }),
            setError: (error) => set({ error }),
        }),
        {
            name: 'auth-storage'
        }
    )
)