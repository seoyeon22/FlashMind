"use client";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navigation(){
  const { userId, logout } = useAuthStore()
  const router = useRouter(); 
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      console.log("logged in :", userId);
    }
  }, [isMounted, userId]);

  if (!isMounted) return null;

  return (
    <nav className="bg-blue-500 text-white">
      <ul className="flex flex-column">
        <li className="mr-auto content-center">
          <button
          className="text-2xl p-1"
          onClick={() => router.push(userId ? "/dashboard" : "/")}>
            FlashMind
          </button>
        </li>
        <li className="m-1 p-1">
          {userId ? (
            <button 
            className="bg-blue-400 p-1 rounded-sm"
            onClick={() => {logout(); router.push("/");}}>Log out</button>
          ) : (
            <button 
            className="bg-blue-400 p-1 rounded-sm"
            onClick={() => router.push("/auth/login")}>Log in</button>
          )}
        </li>
        {!userId && (
          <li className="m-1 p-1">
            <button 
            className="bg-blue-400 p-1 rounded-sm"
            onClick={() => router.push("/auth/signup")}>Sign up</button>
          </li>
        )}
      </ul>
    </nav>
  );
}