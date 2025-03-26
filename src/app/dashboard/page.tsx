"use client";

import DeckCard from "@/components/deckCard";
import { useDeckStore } from "@/stores/deckStore"
import { useEffect } from "react";

export default function DashBoard(){
    
    const { decks, loadDecks } = useDeckStore();

    useEffect(() => {
        loadDecks();
    },[decks]);

    return(
        <div>
            dashboard
            <div className="grid grid-cols-3 gap-4">
                {decks.map((deck) => (
                    <DeckCard key={deck.id} deck={deck} />
                ))}
            </div>
        </div>
    );
}