"use client";

import { useState } from "react";
import { createCard } from "@/services/cardService"; // 카드 생성 서비스 호출 함수

interface Card {
    id: string;
    question: string;
    answer: string;
}

interface CreateCardFormProps {
    deckId: string;
    userId: string;
    onCreate: (card: Card) => void;
}

export default function CreateCardForm({ deckId, userId, onCreate }: CreateCardFormProps) {
    // 입력값 상태
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    // 카드 생성 처리
    const handleCreateCard = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!question.trim() || !answer.trim()) {
            console.error("Both question and answer are required.");
            return;
        }

        try {
            const newCard = await createCard(deckId, userId, question.trim(), answer.trim());
            const cardData = Array.isArray(newCard) ? newCard[0] : newCard;
            setQuestion("");
            setAnswer("");
            onCreate(cardData); // 새 카드 데이터를 부모 컴포넌트로 전달
        } catch (error) {
            console.error("Error creating card:", error);
        }
    };

    return (
        <div className="bg-surface dark:bg-dark-surface text-primary dark:text-dark-primary p-2 border border-dashed shadow-md rounded-md">
            <form onSubmit={handleCreateCard}>
                <div className="flex items-center space-x-2 font-handwrite text-xl">
                    <label className="text-muted">Q.</label>
                    <input
                        className="w-full p-1 rounded-md"
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter question"
                        required
                    />
                </div>
                <div className="flex items-center space-x-2 mt-2 font-handwrite text-xl">
                    <label className="text-muted">A.</label>
                    <input
                        className="w-full p-1 rounded-md"
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter answer"
                        required
                    />
                </div>
                <div className="flex justify-end mt-3">
                    <button 
                        type="submit" 
                        className="px-3 py-1 bg-green dark:bg-dark-green text-white rounded-md"
                    >
                        Create Card
                    </button>
                </div>
            </form>
        </div>
    );
}
