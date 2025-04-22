"use client";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function Navigation() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const go = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md left-0 right-0">
      <div className="flex items-center justify-between p-2">
        <img
          src="/logo.png"
          alt="FlashMind Logo"
          className="h-8 cursor-pointer"
          onClick={() => router.push(user ? "/dashboard" : "/")}
        />

        {/* 데스크탑 버튼 */}
        {isMounted && (
          <div className="hidden md:flex space-x-3">
            {user ? (
              <button
                className="bg-secondary text-white px-4 py-1 rounded"
                onClick={() => {
                  authService.signOut();
                  router.push("/");
                }}
              >
                Log out
              </button>
            ) : (
              <>
                <button
                  className="bg-secondary text-white px-4 py-1 rounded"
                  onClick={() => router.push("/auth/login")}
                >
                  Log in
                </button>
                <button
                  className="border border-secondary text-secondary px-4 py-1 rounded"
                  onClick={() => router.push("/auth/signup")}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        )}
        {/* 햄버거 버튼 - 모바일에서만, 오른쪽 상단 고정 */}
        <div
          className={`menu-trigger ${menuOpen ? "active" : ""} z-50 md:hidden`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* 슬라이드 메뉴 - 모바일에서만 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4 mt-15">
          {user ? (
            <button
              className="bg-[#52616a] text-white px-4 py-2 rounded-xl"
              onClick={() => {
                authService.signOut();
                go("/");
              }}
            >
              Log out
            </button>
          ) : (
            <>
              <button
                className="bg-[#52616a] text-white px-4 py-2 rounded-xl"
                onClick={() => go("/auth/login")}
              >
                Log in
              </button>
              <button
                className="border border-[#52616a] text-[#52616a] px-4 py-2 rounded-xl"
                onClick={() => go("/auth/signup")}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
