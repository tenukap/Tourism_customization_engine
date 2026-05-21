import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import { getPackageById, getPackageSummary } from '../Services/packageService'

const CAT_COLORS = {
    adventure: 'bg-orange-100 text-orange-700',
    luxury:    'bg-purple-100 text-purple-700',
    beach:     'bg-sky-100 text-sky-700',
    cultural:  'bg-green-100 text-green-700',
    wildlife:  'bg-red-100 text-red-700',
    standard:  'bg-gray-100 text-gray-700',
}

export default function PackageDetailPage() {
    const { id }   = useParams()
    const navigate = useNavigate()
    const [pkg,     setPkg]     = useState(null)
    const [summary, setSummary] = useState('')
    const [loading, setLoading] = useState(true)
    const [error,   setError]   = useState('')

    useEffect(() => { fetchData() }, [id])

    const fetchData = async () => {
        setLoading(true); setError('')
        try {
            const [pkgData, sum] = await Promise.all([
                getPackageById(id),
                getPackageSummary(id)
            ])
            setPkg(pkgData)
            setSummary(sum)
        } catch { setError('Package not found or backend not running.') }
        finally { setLoading(false) }
    }

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
        </div>
    )

    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md">
                <div className="text-5xl mb-4">😕</div>
                <p className="text-red-500 mb-6">{error}</p>
                <button onClick={() => navigate('/')}
                        className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
                    ← Back to Packages
                </button>
            </div>
        </div>
    )

    const cat = (pkg.category || 'standard').toLowerCase()
    const colorClass = CAT_COLORS[cat] || CAT_COLORS.standard
    const imgSrc = pkg.imageUrl && pkg.imageUrl.trim() !== ''
        ? pkg.imageUrl
        : `https://source.unsplash.com/1400x500/?travel,${encodeURIComponent(pkg.destination || 'nature')}`

    return (
        <div>
            {/* Hero image with overlay — same structure as landing page hero */}
            <div className="relative h-screen max-h-[500px]">
                <img src={imgSrc} alt={pkg.name}
                     className="w-full h-full object-cover"
                     onError={e => e.target.src='https://via.placeholder.com/1400x500/f3f4f6/9ca3af?text=Tour+Package'} />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-end justify-end z-10 pb-10 px-10">

                </div>
                {/* Absolute nav */}
                <NavBar />
            </div>

            {/* Content */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Left */}
                        <div className="lg:col-span-2 flex flex-col gap-6">

                            {/* Title card */}
                            <div className="bg-white rounded-2xl shadow-sm p-8">
                                <span className={`${colorClass} text-xs font-bold px-3 py-1 rounded-full`}>
                                    {pkg.category}
                                </span>
                                <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-2">{pkg.name}</h1>
                                <p className="text-orange-500 font-semibold">📍 {pkg.destination}</p>
                            </div>

                            {/* About */}
                            <div className="bg-white rounded-2xl shadow-sm p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Package</h2>
                                <p className="text-gray-500 leading-relaxed">{pkg.description}</p>
                            </div>

                            {/* Info grid — same card style as leader's feature cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { icon: '🕐', label: 'Duration',    value: `${pkg.durationDays} Days` },
                                    { icon: '📂', label: 'Category',   value: pkg.category },
                                    { icon: '📍', label: 'Destination', value: pkg.destination },
                                    { icon: '🆔', label: 'Package ID',  value: `#${pkg.id}` },
                                ].map(item => (
                                    <div key={item.label} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition duration-300">
                                        <div className="text-3xl mb-2">{item.icon}</div>
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                                        <p className="text-gray-800 font-bold text-sm">{item.value}</p>
                                    </div>
                                ))}
                            </div>


                        </div>

                        {/* Right — Booking card */}
                        <aside>
                            <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-8">
                                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Starting from</p>
                                <p className="text-orange-500 font-bold text-4xl mb-1">
                                    $ {pkg.basePrice?.toLocaleString()}
                                </p>
                                <p className="text-gray-400 text-sm mb-6">per person</p>

                                <div className="space-y-3 mb-6 py-5 border-y border-gray-100">
                                    {[
                                        ['Duration',    `${pkg.durationDays} days`],
                                        ['Category',   pkg.category],
                                        ['Destination',pkg.destination],
                                    ].map(([k,v]) => (
                                        <div key={k} className="flex justify-between text-sm">
                                            <span className="text-gray-400">{k}</span>
                                            <span className="text-gray-800 font-medium">{v}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => window.location.href = 'http://localhost:5173/login'}
                                    className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300 mb-3"
                                >
                                    Book Now
                                </button>

                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold text-orange-400 mb-2">TravelUs</h3>
                    <p className="text-gray-400 text-sm">© 2025 TravelUs. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
