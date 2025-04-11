import { authService } from "@/services/authService";
import { redirect } from "next/navigation";

async function handleSignUp(formData: FormData) {
  "use server"; // 서버 액션 활성화

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  try {
      const { error } = await authService.signUp(email, password);

      if (error) {
          console.error("Sign-up error:", error);
          return;
      }

      redirect("/dashboard"); // 서버에서 직접 리다이렉트
  } catch (error) {
      console.error("signup error:", error);
  }
}

export default function SignUp(){
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

          {/* 회원가입 버튼 */}
          <button
            formAction={handleSignUp}
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors w-full"
          >
            Sign up
          </button>
        </form>
      </div>
    );
}