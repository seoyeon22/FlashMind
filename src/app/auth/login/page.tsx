"use client";

import { authService } from "@/services/authService"
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogIn() {
  const router = useRouter();
  const { errorMessage, setErrorMessage } = useAuthStore();

  useEffect(() => {
    setErrorMessage(null);
  }, []);

  const handleLogin = async (formData: FormData) => {
    setErrorMessage(null);
    
    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const { error } = await authService.signIn(email, password);
      console.log("here");
      if(error) {
        setErrorMessage(error.message);
      }
    } catch (e) {
      throw new Error("로그인 오류");
    }
    router.push("/dashboard");
  };

    return (
      <div className="flex justify-center items-center h-screen">
        <form className="bg-white p-6 rounded-lg shadow-md w-96 flex flex-col gap-4">
          {/* 이메일 */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium mb-1">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500 w-full"
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-medium mb-1">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500 w-full"
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {/* 로그인 버튼 */}
          <button
            formAction={handleLogin}
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors w-full"
          >
            Log in
          </button>
        </form>
      </div>
    );
}
