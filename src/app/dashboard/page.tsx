"use client";
import { useState, useEffect } from "react";
import { getDecks } from "@/services/deckService";
import DeckCard from "@/components/deckCard";
import { useAuthStore } from "@/stores/authStore";
import CreateDeckForm from "@/components/CreateDeckForm";

interface Deck {
    id: string;
    name: string;
}

export default function DeckList() {
    const { user } = useAuthStore();
    const [decks, setDecks] = useState<Deck[]>([]);

    // 덱 목록 가져오기
    useEffect(() => {
        const loadDecks = async () => {
            if (!user) { // 유저 정보 없으면 실행 안 함
                return;
            } 

            try {
                const fetchedDecks = await getDecks(user);
                setDecks(fetchedDecks);
            } catch (error) {
                console.error("Error fetching decks:", error);
            }
        };

        loadDecks();
    }, [user]); // user가 바뀔 때마다 다시 fetch

    const handleCreateDeck = (newDeck: Deck) => {
        setDecks((prevDecks) => [...prevDecks, newDeck]);
    };

    const handleDeleteDeck = (deckId: string) => {
        setDecks((prevDecks) => prevDecks.filter(deck => deck.id !== deckId));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CreateDeckForm onCreate={handleCreateDeck}/>
            {decks.length > 0 ? (
                decks.map((deck) => (
                    <DeckCard key={deck.id} deck={deck} onDelete={handleDeleteDeck} />
                ))
            ) : (
                <p className="text-gray-500">No decks available.</p>
            )}
        </div>
    );
}
