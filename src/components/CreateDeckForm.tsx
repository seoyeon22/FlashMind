"use client";

import { createDeck } from "@/services/deckService";
import { useAuthStore } from "@/stores/authStore";
import { useDeckStore } from "@/stores/deckStore";
import { useState } from "react";

interface Deck {
  id: string;
  name: string;
}

export default function CreateDeckForm({
  onCreate,
}: {
  onCreate: (deck: Deck) => void;
}) {
  const { user } = useAuthStore();
  const { addDeck } = useDeckStore();
  const [deckName, setDeckName] = useState("");
  const [hovered, setHovered] = useState(false);

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const deckName = formData.get("deckName") as string;

    if (!deckName || !user) return;

    try {
      const newDeck = await createDeck(user.id, deckName);
      addDeck(newDeck);
      setDeckName("");
      onCreate(newDeck);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <div
      className="perspective w-full h-48"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d rounded-xl shadow-md ${
          hovered ? "rotate-y-180" : ""
        }`}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 bg-surface dark:bg-dark-surface text-primary dark:text-dark-primary rounded-xl backface-hidden flex items-center justify-center text-2xl font-medium">
          +
        </div>

        {/* 뒷면 */}
        <form
          onSubmit={handleCreateDeck}
          className="absolute inset-0 bg-surface dark:bg-dark-surface rounded-xl rotate-y-180 backface-hidden flex flex-col items-center justify-center gap-2 px-4"
        >
          <input
            className="w-full px-3 py-1 rounded-md text-sm text-primary dark:text-dark-primary placeholder:text-muted dark:placeholder:text-dark-muted bg-background dark:bg-dark-background border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
            name="deckName"
            type="text"
            placeholder="덱 이름 입력"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-accent text-white px-3 py-1 rounded-md hover:bg-accent-hover transition w-full"
          >
            생성하기
          </button>
        </form>
      </div>
    </div>
  );
}
