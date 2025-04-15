"use client";

import { useAuthStore } from "@/stores/authStore";
import { getCards } from "@/services/cardService";
import { useEffect, useState } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";

interface Card {
  id: string;
  question: string;
  answer: string;
}

// 배열을 랜덤으로 섞는 함수
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function StudyPage({ params }: { params: Promise<{ deckId: string }> }) {
  const { user } = useAuthStore();
  const { deckId } = use(params);
  const router = useRouter();

  const [cards, setCards] = useState<Card[]>([]);
  const [studyCards, setStudyCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchCards = async () => {
      try {
        const fetchedCards = await getCards(deckId, user.id);
        setCards(fetchedCards);
        setStudyCards(shuffleArray(fetchedCards)); // ✅ 섞어서 저장
        setFlipped(false);
        setIsFinished(false);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [deckId, user]);

  const handleFlip = () => setFlipped(!flipped);

  const handleCorrect = () => {
    const updated = [...studyCards.slice(1)];
    setStudyCards(updated);
    setFlipped(false);

    if (updated.length === 0) setIsFinished(true);
  };

  const handleIncorrect = () => {
    const currentCard = studyCards[0];
    const updated = [...studyCards.slice(1), currentCard]; // 뒤에 추가
    setStudyCards(updated);
    setFlipped(false);
  };

  const handleRestart = () => {
    setStudyCards(shuffleArray(cards)); // 다시 섞어서 저장
    setFlipped(false);
    setIsFinished(false);
  };

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
        <div
          className="relative w-full h-full perspective cursor-pointer"
          onClick={handleFlip}
        >
          <div
            className={`w-full h-full rounded-lg shadow-md text-center transition-transform duration-500 transform-style-preserve-3d ${
              flipped ? "rotate-y-180" : ""
            }`}
          >
            {/* 앞면 */}
            <div className="absolute inset-0 flex items-center justify-center backface-hidden bg-white text-[#1e2022] text-2xl rounded-lg font-handwrite p-4 overflow-auto">
              {studyCards[0]?.question}
            </div>
            {/* 뒷면 */}
            <div className="absolute rotate-y-180 flex flex-col items-center inset-0 backface-hidden bg-[#1e2022] text-white rounded-lg p-4 gap-4 overflow-auto text-wrap">
              <p className="text-2xl font-handwrite h-full content-center text-center">{studyCards[0]?.answer}</p>
            </div>
          </div>
          {flipped && (
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCorrect();
                }}
              >
                정답
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncorrect();
                }}
              >
                오답
              </button>
            </div>
          )}
        </div>
      ) : (
        // 완료 화면
        <div className="text-center mt-20 space-y-4">
          <h2 className="text-2xl font-bold text-[#1e2022]">학습 완료!</h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRestart}
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
