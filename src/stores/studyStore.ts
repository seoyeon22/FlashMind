import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Card {
    id: string;
    question: string;
    answer: string;
}

interface StudyState {
    deckId: string | null;
    cards: Card[];
    studyCards: Card[];
    isFinished: boolean;
    setCards: (deckId: string, cards: Card[]) => void;
    markCorrect: () => void;
    markIncorrect: () => void;
    resetStudy: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export const useStudyStore = create<StudyState>()(
    persist(
        (set, get) => ({
            deckId: null,
            cards: [],
            studyCards: [],
            isFinished: false,
            setCards: (deckId, cards) => {
                // deckId가 다르면 상태 초기화
                if (get().deckId !== deckId) {
                    set({
                        deckId,
                        cards,
                        studyCards: shuffleArray(cards),
                        isFinished: false,
                    });
                }
            },
            markCorrect: () => {
                const [_, ...rest] = get().studyCards;
                set({
                    studyCards: rest,
                    isFinished: rest.length === 0,
                });
            },
            markIncorrect: () => {
                const [first, ...rest] = get().studyCards;
                set({
                    studyCards: [...rest, first],
                });
            },
            resetStudy: () => {
                set((state) => ({
                    studyCards: shuffleArray(state.cards),
                    isFinished: false,
                }));
            },
        }),
        {
            name: "study-storage",
        }
    )
);