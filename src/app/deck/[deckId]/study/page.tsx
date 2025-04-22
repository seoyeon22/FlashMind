"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { getCards } from "@/services/cardService";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useStudyStore } from "@/stores/studyStore";
import FlashCard from "@/components/FlashCard";

export default function StudyPage({ params }: { params: Promise<{ deckId: string }> }) {
  const { user } = useAuthStore();
  const { deckId } = use(params);
  const router = useRouter();

  const {
    cards,
    studyCards,
    isFinished,
    setCards,
    markCorrect,
    markIncorrect,
    resetStudy
  } = useStudyStore();

  useEffect(() => {
    if (!user) return;

    const fetchCards = async () => {
      try {
        const fetchedCards = await getCards(deckId, user.id);
        setCards(deckId, fetchedCards); // Zustand 상태로 설정
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [deckId, user, setCards]);

  const totalCards = cards.length;
  const completed = totalCards - studyCards.length;
  const progress = totalCards > 0 ? (completed / totalCards) * 100 : 0;

  if (!user) return null;
  if (cards.length === 0) return <p className="text-center mt-10">카드가 없습니다.</p>;

  return (
    <div className="p-4 max-w-xl h-[24rem] mx-auto">
      {/* 진행률 바 */}
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-[#52616a] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 학습 카드 */}
      {!isFinished ? (
        <FlashCard
          card={studyCards[0]}
          onCorrect={markCorrect}
          onIncorrect={markIncorrect}
        />
      ) : (
        // 완료 화면
        <div className="text-center mt-20 space-y-4">
          <h2 className="text-2xl font-bold text-[#1e2022]">학습 완료!</h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={resetStudy}
              className="bg-secondary text-white px-4 py-2 rounded hover:bg-[#3f4d58]"
            >
              다시 학습하기
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-muted text-white px-4 py-2 rounded hover:bg-hover"
            >
              대시보드로 이동
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
