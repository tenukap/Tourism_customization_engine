import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { Login, registerUser } from '../Services/authService'

export default function LoginPage() {

    const { login } = useAuth()
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(true) // toggle between login and register

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            if (isLogin) {
                // Login flow
                const data = await Login(email, password)
                login(data.token)
                if(data.role == "ADMIN"){
                    navigate('/admin/packages')
                }
                else {
                    navigate('/packages')
                }
            } else {
                // Register flow
                const msg = await registerUser(name, email, password)
                setSuccess('Account created! You can now sign in.')
                setIsLogin(true) // switch back to login tab
                setName('')
                setEmail('')
                setPassword('')
            }
        } catch(err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleTabSwitch = (toLogin) => {
        setIsLogin(toLogin)
        setError('')
        setSuccess('')
        setName('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-10">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        {isLogin ? 'Sign in to continue planning your journey' : 'Join us and start your journey'}
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
                    <button
                        onClick={() => handleTabSwitch(true)}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition duration-300 ${
                            isLogin ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-400'
                        }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => handleTabSwitch(false)}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition duration-300 ${
                            !isLogin ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-400'
                        }`}
                    >
                        Register
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name field — register only */}
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                        />
                    </div>

                    {/* Error & Success messages */}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300 disabled:opacity-50"
                    >
                        {loading ? (isLogin ? 'Signing in...' : 'Creating account...') : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>

                </form>

            </div>
        </div>
    )
}