import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
    user: string | null;
    errorMessage: string | null;
    setUser: (user:  string | null) => void;
    setErrorMessage: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            errorMessage: null,
            setUser: (user) => set ({ user }),
            setErrorMessage: (errorMessage) => set({ errorMessage }),
        }),
        {
            name: 'auth-storage',
        }
    )
);

