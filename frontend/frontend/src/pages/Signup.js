import {useState} from 'react'
import {useSignup} from "../hooks/useSignup"
const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username,setUsername] = useState('')
    const {signup, error,isLoading} = useSignup()

    const handleSumbit = async (e) => {
        e.preventDefault()

        await signup(email,username, password)
    }

    return (
        <form className="signup" onSubmit={handleSumbit}>
            <h3>Sign Up</h3>
            <label>Email:</label>
            <input
                type = "email"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
               />
            <label>Username:</label>
            <input
                type = "username"
                onChange={(e)=> setUsername(e.target.value)}
                value={username}
               />

        <label>Password:</label>
        <input
            type = "password"
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            />
            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
            </form>
    )
}
export default Signup;