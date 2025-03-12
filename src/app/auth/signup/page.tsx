import { handleSignup } from "@/services/authService"

export default function SignUp(){
    return (
        <div>
            <form>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required />
                <button formAction={handleSignup}>Sing up</button>
            </form>
        </div>
    )
}