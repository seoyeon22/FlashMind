"use client";

import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { Moon, Sun } from "lucide-react";

// 다크 모드 토글 버튼 컴포넌트
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = localStorage.theme === "dark";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.theme = next ? "dark" : "light";
  };

  return (
    <button
      onClick={toggle}
      className="p-2 mr-2 flex justify-center rounded-md hover:bg-hover dark:hover:bg-dark-hover transition"
    >
      {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

// 로그인/회원가입/로그아웃 버튼 컴포넌트
function AuthButtons({ direction = "row" }: { direction?: "row" | "col" }) {
  const { user } = useAuthStore();
  const router = useRouter();

  const buttonClass = "p-2 rounded-xl border border-secondary text-secondary hover:bg-secondary hover:text-white";
  const containerClass = direction === "col" ? "flex flex-col space-y-2" : "flex space-x-2";

  const go = (path: string) => {
    router.push(path);
  };

  return (
    <div className={containerClass}>
      {user ? (
        <button
          onClick={() => {
            authService.signOut();
            go("/");
          }}
          className={buttonClass}
        >
          Log out
        </button>
      ) : (
        <>
          <button
            onClick={() => go("/auth/login")}
            className={buttonClass}
            >
            Log in
          </button>
          <button
            onClick={() => go("/auth/signup")}
            className={buttonClass}
            >
            Sign up
          </button>
        </>
      )}
    </div>
  );
}

// 내비게이션 컴포넌트
export default function Navigation() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="bg-surface text-primary dark:bg-dark-surface dark:text-dark-primary shadow-md">
      <div className="flex items-center justify-between p-2">
        <img
          src="/logo.png"
          alt="FlashMind Logo"
          className="h-8 cursor-pointer"
          onClick={() => router.push(user ? "/dashboard" : "/")}
        />

        {isMounted && (
          <div className="hidden md:flex items-center space-x-3">
            <DarkModeToggle />
            <AuthButtons />
          </div>
        )}

        {/* 햄버거 버튼 */}
        <div
          className={`menu-trigger ${menuOpen ? "active" : ""} z-50 md:hidden`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bg-primary dark:bg-dark-primary"></span>
          <span className="bg-primary dark:bg-dark-primary"></span>
          <span className="bg-primary dark:bg-dark-primary"></span>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <div
        className={`fixed top-0 right-0 h-full w-48 bg-surface text-primary dark:bg-dark-surface dark:text-dark-primary shadow-md z-40 transform transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col p-6 space-y-4 mt-15">
          <DarkModeToggle />
          <AuthButtons direction="col" />
        </div>
      </div>
    </nav>
  );
}
