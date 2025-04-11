import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { getDecks } from "@/services/deckService";


interface Deck {
    id: string;
    name: string;
}

interface DeckState {
    decks: Deck[];
    addDeck: (deck: Deck) => void;
    loadDecks: () => void;
}

export const useDeckStore = create<DeckState>((set) => ({
    decks: [],
    addDeck: (deck) => set((state) => ({ decks: [...state.decks, deck]})),
    loadDecks: async () => {
        const { user } = useAuthStore.getState();
        if(user) {
            const decks = await getDecks(user.id);
            set({ decks });
        }
    },
}));