import { useState } from "react";

interface Card {
  id: string;
  question: string;
  answer: string;
}

interface FlashCardProps {
  card: Card;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export default function FlashCard({ card, onCorrect, onIncorrect }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(!flipped);

  return (
    <div className="relative w-full h-full perspective cursor-pointer" onClick={handleFlip}>
      <div
        className={`w-full h-full rounded-lg shadow-md text-center transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 flex items-center justify-center backface-hidden bg-white text-[#1e2022] text-2xl rounded-lg font-handwrite p-4 overflow-auto">
          {card.question}
        </div>
        {/* 뒷면 */}
        <div className="absolute rotate-y-180 flex flex-col items-center inset-0 backface-hidden bg-[#1e2022] text-white rounded-lg p-4 gap-4 overflow-auto text-wrap">
          <p className="text-2xl font-handwrite h-full content-center text-center">{card.answer}</p>
        </div>
      </div>

      {flipped && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={(e) => {
              e.stopPropagation();
              onCorrect();
              setFlipped(false);
            }}
          >
            정답
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              onIncorrect();
              setFlipped(false);
            }}
          >
            오답
          </button>
        </div>
      )}
    </div>
  );
}
