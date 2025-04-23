"use client";

import { useRouter } from "next/navigation";
import { deleteDeck } from "@/services/deckService"; // 덱 삭제 API 호출
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";

interface Deck {
  id: string;
  name: string;
}

export default function DeckCard({ deck, onDelete }: { deck: Deck, onDelete: (deckId: string) => void }) {
    const router = useRouter();
    const { user } = useAuthStore();
    const [hovered, setHovered] = useState(false);


    // 덱 삭제 핸들러
    const handleDeleteDeck = async () => {
        if(!user) return;

        if (!confirm("정말 삭제하시겠습니까?")) return;

        try {
            await deleteDeck(deck.id, user.id);
            onDelete(deck.id); // 부모 컴포넌트에서 상태 업데이트
        } catch (error) {
            console.error("Error deleting deck:", error);
        }
    };

    return  (
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
          <div className="absolute inset-0 bg-surface dark:bg-dark-surface text-primary dark:text-dark-primary rounded-xl backface-hidden flex items-center justify-center text-3xl font-bold font-handwrite">
            {deck.name}
          </div>
  
          {/* 뒷면 */}
          <div className="absolute inset-0 bg-surface dark:bg-dark-surface rounded-xl rotate-y-180 backface-hidden flex flex-col items-center justify-center gap-2">
            <button
              onClick={() => router.push(`/deck/${deck.id}/study`)}
              className="px-4 py-1 rounded bg-green text-white hover:brightness-110 transition"
            >
              학습
            </button>
            <button
              onClick={() => router.push(`/deck/${deck.id}/edit`)}
              className="px-4 py-1 rounded bg-accent text-white hover:brightness-110 transition dark:bg-dark-accent dark:text-dark-primary dark:hover:bg-dark-accent"
            >
              편집
            </button>
            <button
              onClick={handleDeleteDeck}
              className="px-4 py-1 rounded bg-secondary text-white hover:brightness-110 transition"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    );
}
