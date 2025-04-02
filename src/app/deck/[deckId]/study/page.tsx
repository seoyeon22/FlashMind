export default function StudyPage({ params }: { params: { deckId: string } }) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Study Mode for Deck {params.deckId}</h1>
        <p>여기에 플래시카드 학습 기능을 추가할 수 있습니다.</p>
      </div>
    );
  }