import { useNavigate, useLocation } from 'react-router-dom'

export default function NavBar() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-10 py-5">

            {/* Logo */}
            <div
                onClick={() => window.location.href = 'http://localhost:5173'}
                className="text-white text-2xl font-bold cursor-pointer tracking-wide hover:text-orange-400 transition duration-300"
            >
                TravelUs
            </div>

            {/* Nav links */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/')}
                    className={`text-sm font-semibold transition duration-300 ${
                        location.pathname === '/' ? 'text-orange-400' : 'text-white hover:text-orange-400'
                    }`}
                >
                    Packages
                </button>
                <button
                    onClick={() => navigate('/admin')}
                    className={`text-sm font-semibold transition duration-300 ${
                        location.pathname === '/admin' ? 'text-orange-400' : 'text-white hover:text-orange-400'
                    }`}
                >
                    Admin
                </button>
                <button
                    onClick={() => window.location.href = 'http://localhost:5173'}
                    className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition duration-300"
                >
                    Home
                </button>
            </div>
        </nav>
    )
}
