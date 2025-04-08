"use client";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function Navigation(){
  const { user } = useAuthStore()
  const router = useRouter(); 
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      console.log("logged in :", user);
    }
  }, [isMounted, user]);

  if (!isMounted) return null;

  return (
    <nav className="bg-white text-white shadow-md">
      <ul className="flex flex-column">
        <li className="mr-auto content-center">
          <img
          src="/logo.png"
          alt="FlashMind Logo"
          className="h-10 p-1 pl-2"
          onClick={() => router.push(user ? "/dashboard" : "/")}
          />
        </li>
        <li className="m-1 p-1">
          {user ? (
            <button 
            className="bg-secondary p-1 rounded-sm"
            onClick={() => {authService.signOut(); router.push("/");}}>Log out</button>
          ) : (
            <button 
            className="bg-secondary p-1 rounded-sm"
            onClick={() => router.push("/auth/login")}>Log in</button>
          )}
        </li>
        {!user && (
          <li className="m-1 p-1">
            <button 
            className="bg-secondary p-1 rounded-sm"
            onClick={() => router.push("/auth/signup")}>Sign up</button>
          </li>
        )}
      </ul>
    </nav>
  );
}