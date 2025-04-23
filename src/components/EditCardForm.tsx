"use client";

import { useState } from "react";
import { updateCard, deleteCard } from "@/services/cardService";

interface Card {
    id: string;
    question: string;
    answer: string;
}

interface EditCardFormProps {
    card: Card;
    userId: string;
    onUpdate: (updatedCard: Card) => void;
    onDelete: (cardId: string) => void;
}

export default function EditCardForm({ card, userId, onUpdate, onDelete }: EditCardFormProps) {
    const [question, setQuestion] = useState(card.question);
    const [answer, setAnswer] = useState(card.answer);

    // 카드 수정
    const handleUpdateCard = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!question.trim() || !answer.trim()) {
            console.error("Both question and answer are required.");
            return;
        }

        if (question === card.question && answer === card.answer) {
            console.log("No changes detected.");
            return;
        }

        try {
            await updateCard(card.id, userId, question, answer);
            onUpdate({ ...card, question, answer }); // 수정된 카드 데이터 전달
        } catch (error) {
            console.error("Error updating card:", error);
        }
    };

    // 카드 삭제
    const handleDeleteCard = async () => {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        try {
            await deleteCard(card.id, userId);
            onDelete(card.id); // 삭제된 카드 ID 전달
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    return (
        <div className="bg-surface dark:bg-dark-surface text-primary dark:text-dark-primary p-2 shadow-md rounded-lg">
            <form onSubmit={handleUpdateCard}>
                <div className="flex items-center space-x-2 font-handwrite text-xl">
                    <label className="text-muted">Q.</label>
                    <input
                        className="w-full p-1 rounded-md"
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
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
                        required
                    />
                </div>
                <div className="flex justify-end space-x-2 mt-3">
                    <button type="submit" className="px-3 py-1 text-white bg-accent dark:bg-dark-accent hover:brightness-110 rounded-md">
                        Save
                    </button>
                    <button 
                        type="button" 
                        onClick={handleDeleteCard} 
                        className="px-3 py-1 text-white bg-muted dark:bg-dark-muted hover:brightness-110 rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
}
