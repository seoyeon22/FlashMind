"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();


  return (
    <main className="text-gray-800">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl font-bold">FlashMind</h1>
        <p className="text-lg mt-4">기억을 도와주는 스마트한 플래시카드 학습 도우미</p>
        <button
          onClick={() => router.push("/auth/signup")}
          className="mt-6 bg-white text-primary px-6 py-2 rounded hover:bg-gray-100 transition"
        >
          지금 시작하기
        </button>
      </section>

      {/* Features */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">무엇을 할 수 있나요?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">직관적인 덱 관리</h3>
            <p>덱을 생성하고, 이름을 수정하고, 쉽게 삭제할 수 있어요.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">학습 모드</h3>
            <p>카드를 넘기며 정답/오답을 스스로 판단해 반복 학습을 돕습니다.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">모바일 대응</h3>
            <p>언제 어디서든 학습할 수 있도록 반응형 UI를 제공합니다.</p>
          </div>
        </div>
      </section>
    </main>
  );
};