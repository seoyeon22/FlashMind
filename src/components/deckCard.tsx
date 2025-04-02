"use client";

import { useRouter } from "next/navigation";
import { deleteDeck } from "@/services/deckService"; // 덱 삭제 API 호출
import { useAuthStore } from "@/stores/authStore";

export default function DeckCard({ deck, onDelete }: { deck: any, onDelete: (deckId: string) => void }) {
    const router = useRouter();
    const { user } = useAuthStore();

    // 덱 삭제 핸들러
    const handleDeleteDeck = async () => {
        if(!user) return;

        if (!confirm("정말 삭제하시겠습니까?")) return;

        try {
            await deleteDeck(deck.id, user);
            onDelete(deck.id); // 부모 컴포넌트에서 상태 업데이트
        } catch (error) {
            console.error("Error deleting deck:", error);
        }
    };

    return (
        <div className="p-4 rounded-md shadow-md">
            <h3>{deck.name}</h3>
            <button className="border p-1 rounded-md"
                onClick={() => router.push(`/deck/${deck.id}/study`)}>Study</button>
            <button className="border p-1 rounded-md" 
                onClick={() => router.push(`/deck/${deck.id}/edit`)}>Edit</button>
            <button className="border p-1 rounded-md text-red-500 ml-2"
                onClick={handleDeleteDeck}>Delete</button>
        </div>
    );
}
