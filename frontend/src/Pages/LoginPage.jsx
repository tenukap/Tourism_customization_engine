import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { Login } from '../Services/authService'

export default function LoginPage() {

    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error ,setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async e => {
        e.preventDefault()

        setLoading(true)

        try{
            const data = await Login(email, password)
            login(data.token)
            navigate('/packages')


        }catch(err){
            setError(err.message)
        }
        finally{
            setLoading(false)
        }

    }
    return (
        <div style={{ maxWidth: "400px", margin: "100px auto" }}>
            <h2>Login (Demo Mode)</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p style={{ color: "red" }}>{error}</p>
            </form>
        </div>
    )
}
