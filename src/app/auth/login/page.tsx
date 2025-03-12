import { handleLogin } from "@/services/authService"

export default function LogIn(){
    return (
        <div>
            <form>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required />
                <button formAction={handleLogin}>Log in</button>
            </form>
        </div>
        
    )
}