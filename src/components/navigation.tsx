"use client";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navigation(){
  const { isLoggedIn, logout } = useAuthStore()
  const router = useRouter(); 
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      console.log("logged in :", isLoggedIn);
    }
  }, [isMounted, isLoggedIn]);

  if (!isMounted) return null;

  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => router.push(isLoggedIn ? "/dashboard" : "/")}>
            FlashMind
          </button>
        </li>
        <li>
          {isLoggedIn ? (
            <button onClick={() => {logout(); router.push("/");}}>Log out</button>
          ) : (
            <button onClick={() => router.push("/auth/login")}>Log in</button>
          )}
        </li>
        {!isLoggedIn && (
          <li>
            <button onClick={() => router.push("/auth/signup")}>Sign up</button>
          </li>
        )}
      </ul>
    </nav>
  );
}