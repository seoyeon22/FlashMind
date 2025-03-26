import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { getDecks } from "@/services/deckService";

interface DeckState {
    decks: any[];
    setDecks: (decks: any[]) => void;
    loadDecks: () => void;
}

export const useDeckStore = create<DeckState>((set) => ({
    decks: [],
    setDecks: (decks) => set({ decks }),
    loadDecks: async () => {
        const { user } = useAuthStore.getState();
        if(user) {
            const decks = await getDecks(user);
            set({ decks });
        }
    },
}));