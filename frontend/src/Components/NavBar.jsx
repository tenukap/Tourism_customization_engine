import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { useState } from "react";

export default function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-10 py-5">

            {/* Logo */}
            <div
                onClick={() => navigate("/about")}
                className="text-white text-2xl font-bold cursor-pointer tracking-wide hover:text-orange-400 transition duration-300"
            >
                TravelUs
            </div>

        {/* Nav Links */}
<div className="flex items-center gap-4">
    <button
        onClick={() => navigate('/packages')}
        className="text-sm font-semibold transition duration-300 text-white hover:text-orange-400"
    >
        Packages
    </button>

    {/* Auth */}
    <div className="relative">
        {user ? (
            <div>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center hover:bg-orange-600 transition duration-300"
                >
                    {user.sub.charAt(0).toUpperCase()}
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg py-2 z-30">
                        <button
                            onClick={() => navigate('/profile')}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                        >
                            Profile
                        </button>
                        <button
                            onClick={() => { logout(); navigate('/'); }}
                            className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        ) : (
            <button
                onClick={() => navigate('/login')}
                className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition duration-300"
            >
                Sign In
            </button>
        )}
    </div>
</div>
        </nav>
    )
}