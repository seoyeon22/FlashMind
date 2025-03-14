import { handleLogin } from "@/services/authService"

export default function LogIn() {
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
