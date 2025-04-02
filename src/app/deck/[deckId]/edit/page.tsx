"use client";

import { useAuthStore } from "@/stores/authStore";
import CreateCardForm from "@/components/CreateCardForm";
import EditCardForm from "@/components/EditCardForm";
import { use, useEffect, useState } from "react";
import { getCards } from "@/services/cardService";
import { getDeck, updateDeckName } from "@/services/deckService";

interface Card {
    id: string;
    question: string;
    answer: string;
}

export default function ClientDeckEdit({ params }: { params: Promise<{ deckId: string }> }) {
    const { user } = useAuthStore(); // Zustand에서 userId 가져오기
    const [deckName, setDeckName] = useState("");
    const [cards, setCards] = useState<any[]>([]);

     // 덱 이름 업데이트
     const handleDeckNameUpdate = async () => {
        if (!user) return;
        try {
            await updateDeckName(deckId, user, deckName);
        } catch (error) {
            console.error("Error updating deck name:", error);
        }
    };

    // 새 카드 추가 함수
    const handleCreateCard = (newCard: Card) => {
        setCards((prevCards) => [...prevCards, newCard]); // 기존 카드 목록에 추가
    };
    const { deckId } = use(params);

    // 카드 업데이트 (상태 업데이트)
    const handleUpdate = (updatedCard: Card) => {
        setCards((prevCards) =>
            prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
        );
    };

    // 카드 삭제 (상태에서 제거)
    const handleDelete = (cardId: string) => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    };

    
    useEffect(() => {
        if (!user) return;
        
        const fetchDeckData = async () => {
            try {
                const deck = await getDeck(deckId);
                setDeckName(deck.name); // 덱 이름 설정
                const fetchedCards = await getCards(deckId, user);
                setCards(fetchedCards);
            } catch (error) {
                console.error("Error fetching deck:", error);
            }
        };

        fetchDeckData();
    }, [deckId, user]);

    if (!user) return <p>Loading user...</p>;

    return (
        <div className="p-4">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    className="rounded-md p-1 text-xl font-semibold flex-1"
                />
                <button
                    onClick={handleDeckNameUpdate}
                    className="border px-2 py-1 rounded-md"
                >
                Save
                </button>
            </div>
            <ul>
                <CreateCardForm deckId={deckId} userId={user} onCreate={handleCreateCard} />
                {cards.map((card) => (
                    <li key={card.id} className="mt-3">
                        <EditCardForm card={card} userId={user} onUpdate={handleUpdate} onDelete={handleDelete}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}