"use client";

import { createDeck } from "@/services/deckService";
import { useAuthStore } from "@/stores/authStore";
import { useDeckStore } from "@/stores/deckStore";
import { useState } from "react";

interface Deck {
  id: string;
  name: string;
}

export default function CreateDeckForm({ onCreate }: { onCreate: (deck: Deck) => void }) {
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
      const newDeck = await createDeck(user, deckName);
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
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d rounded-xl shadow-md ${hovered ? "rotate-y-180" : ""}`}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 bg-surface rounded-xl backface-hidden flex items-center justify-center text-primary text-2xl font-medium">
          +
        </div>

        {/* 뒷면 */}
        <form
          onSubmit={handleCreateDeck}
          className="absolute inset-0 bg-surface rounded-xl rotate-y-180 backface-hidden flex flex-col items-center justify-center gap-2 px-4"
        >
          <input
            className="w-full px-3 py-1 rounded-md text-sm text-primary placeholder:text-[#999] bg-background"
            name="deckName"
            type="text"
            placeholder="덱 이름 입력"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-secondary text-white px-3 py-1 rounded-md hover:bg-[#3f4d58] w-full"
          >
            생성하기
          </button>
        </form>
      </div>
    </div>
  );
}
