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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDecks = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const fetchedDecks = await getDecks(user.id);
        setDecks(fetchedDecks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDecks();
  }, [user]);

  const handleCreateDeck = (newDeck: Deck) => {
    setDecks((prevDecks) => [...prevDecks, newDeck]);
  };

  const handleDeleteDeck = (deckId: string) => {
    setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center mt-10">로딩 중...</div>;
    }
  
    if (decks.length === 0) {
      return <p className="text-gray-500">No decks available.</p>;
    }
  
    return decks.map((deck) => (
      <DeckCard key={deck.id} deck={deck} onDelete={handleDeleteDeck} />
    ));
  };
  

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <CreateDeckForm onCreate={handleCreateDeck} />
      {renderContent()}
    </div>
  );
}
