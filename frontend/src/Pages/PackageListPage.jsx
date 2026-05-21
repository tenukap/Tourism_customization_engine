import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import { getAllPackages, getFilteredPackages } from '../Services/packageService'

const CATEGORIES = ['', 'Adventure', 'Luxury', 'Beach', 'Cultural', 'Wildlife']

const CAT_COLORS = {
    adventure: 'bg-orange-100 text-orange-700',
    luxury:    'bg-purple-100 text-purple-700',
    beach:     'bg-sky-100 text-sky-700',
    cultural:  'bg-green-100 text-green-700',
    wildlife:  'bg-red-100 text-red-700',
    standard:  'bg-gray-100 text-gray-700',
}

const STATS = [
    { value: '50+',  label: 'Destinations' },
    { value: '200+', label: 'Packages' },
    { value: '10K+', label: 'Travellers' },
    { value: '8+',   label: 'Years' },
]

export default function PackageListPage() {
    const navigate = useNavigate()
    const [packages,    setPackages]    = useState([])
    const [loading,     setLoading]     = useState(true)
    const [error,       setError]       = useState('')
    const [destination, setDestination] = useState('')
    const [category,    setCategory]    = useState('')
    const [minPrice,    setMinPrice]    = useState('')
    const [maxPrice,    setMaxPrice]    = useState('')

    useEffect(() => { fetchAll() }, [])

    const fetchAll = async () => {
        setLoading(true); setError('')
        try {
            const data = await getAllPackages()
            setPackages(data)
        } catch {
            setError('Cannot connect to backend. Make sure Spring Boot is running on port 8081.')
        } finally { setLoading(false) }
    }

    const handleFilter = async (e) => {
        e.preventDefault()
        setLoading(true); setError('')
        try {
            const params = {}
            if (destination) params.destination = destination
            if (category)    params.category    = category
            if (minPrice)    params.minPrice    = minPrice
            if (maxPrice)    params.maxPrice    = maxPrice
            const data = await getFilteredPackages(params)
            setPackages(data)
        } catch { setError('Filter failed.') }
        finally { setLoading(false) }
    }

    const handleReset = () => {
        setDestination(''); setCategory(''); setMinPrice(''); setMaxPrice('')
        fetchAll()
    }

    return (
        <div>
            <NavBar />

            {/* Hero */}
            <div className="relative h-screen">
                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600"
                    className="w-full h-full object-cover"
                    alt="hero"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10 px-6">
                    <h1 className="text-5xl font-bold text-white mb-4 text-center">
                        Explore Tour Packages
                    </h1>
                    <p className="text-xl text-white mb-8 text-center">
                        Handpicked destinations tailored to your travel style
                    </p>

                    {/* Stats */}
                    <div className="flex gap-10 mb-10">
                        {STATS.map(s => (
                            <div key={s.label} className="text-center">
                                <p className="text-orange-400 text-3xl font-bold">{s.value}</p>
                                <p className="text-white text-sm">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                        className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition duration-300"
                    >
                        Browse Packages
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            <section id="packages" className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">

                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Your Package</h2>
                        <p className="text-gray-500 text-lg">Filter by destination, category, or price range</p>
                    </div>

                    {/* Filter card */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">
                        <form onSubmit={handleFilter}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                                    <input type="text"
                                           placeholder="e.g. Ella, Bali..."
                                           value={destination}
                                           onChange={e => setDestination(e.target.value)}
                                           className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select value={category} onChange={e => setCategory(e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition">
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c || 'All Categories'}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Price ($)</label>
                                    <input type="number" placeholder="0"
                                           value={minPrice} onChange={e => setMinPrice(e.target.value)}
                                           className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Price ($)</label>
                                    <input type="number" placeholder="Any"
                                           value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
                                           className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button type="submit"
                                        className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300">
                                    Search
                                </button>
                                <button type="button" onClick={handleReset}
                                        className="bg-white text-gray-600 border border-gray-200 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition duration-300">
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm">
                            ⚠ {error}
                        </div>
                    )}

                    {/* Results count */}
                    <p className="text-gray-500 text-sm mb-6">
                        {loading ? 'Loading...' : `${packages.length} package${packages.length !== 1 ? 's' : ''} found`}
                    </p>

                    {/* Package Cards Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
                        </div>
                    ) : packages.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No packages found</h3>
                            <p className="text-gray-500 mb-6">Try adjusting your filters</p>
                            <button onClick={handleReset}
                                    className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
                                View All
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {packages.map(pkg => (
                                <PackageCard key={pkg.id} pkg={pkg} onClick={() => navigate(`/packages/${pkg.id}`)} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <h3 className="text-2xl font-bold text-orange-400 mb-3">TravelUs</h3>
                        <p className="text-gray-400 text-sm">Your journey, your way. Personalised travel experiences tailored to your preferences.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="hover:text-orange-400 cursor-pointer" onClick={() => window.location.href='http://localhost:5173'}>Home</li>
                            <li className="hover:text-orange-400 cursor-pointer" onClick={() => navigate('/')}>Packages</li>
                            <li className="hover:text-orange-400 cursor-pointer" onClick={() => navigate('/admin')}>Admin Panel</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>📧 support@travelus.com</li>
                            <li>📞 +94 76 944 5205</li>
                            <li>📍 Colombo, Sri Lanka</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
                    © 2025 TravelUs — Package Management Module. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

// Package card
function PackageCard({ pkg, onClick }) {
    const cat = (pkg.category || 'standard').toLowerCase()
    const colorClass = CAT_COLORS[cat] || CAT_COLORS.standard
    const imgSrc = pkg.imageUrl && pkg.imageUrl.trim() !== ''
        ? pkg.imageUrl
        : `https://source.unsplash.com/600x400/?travel,${encodeURIComponent(pkg.destination || 'nature')}`

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden cursor-pointer group"
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img src={imgSrc} alt={pkg.name}
                     className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                     onError={e => { e.target.src = 'https://via.placeholder.com/600x400/f3f4f6/9ca3af?text=Tour+Package' }}
                />
                <span className={`absolute top-3 left-3 ${colorClass} text-xs font-bold px-3 py-1 rounded-full`}>
                    {pkg.category}
                </span>
                <span className="absolute top-3 right-3 bg-white/90 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                    🕐 {pkg.durationDays} days
                </span>
            </div>

            {/* Body */}
            <div className="p-6">
                <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-1">📍 {pkg.destination}</p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{pkg.description}</p>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400">Starting from</p>
                        <p className="text-orange-500 font-bold text-lg">$ {pkg.basePrice?.toLocaleString()}</p>
                    </div>
                    <button className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition duration-300">
                        View
                    </button>
                </div>
            </div>
        </div>
    )
}
