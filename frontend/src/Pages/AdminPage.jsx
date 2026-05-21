import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import {
    getAllPackages, createPackage, updatePackage, deletePackage
} from '../Services/packageService'

const EMPTY = {
    name:'', description:'', destination:'', category:'',
    basePrice:'', durationDays:'', imageUrl:'', createdBy: 1
}
const CATEGORIES = ['Adventure','Luxury','Beach','Cultural','Wildlife','Standard']

const CAT_COLORS = {
    adventure: 'bg-orange-100 text-orange-700',
    luxury:    'bg-purple-100 text-purple-700',
    beach:     'bg-sky-100 text-sky-700',
    cultural:  'bg-green-100 text-green-700',
    wildlife:  'bg-red-100 text-red-700',
    standard:  'bg-gray-100 text-gray-700',
}

export default function AdminPage() {
    const navigate = useNavigate()
    const [packages, setPackages] = useState([])
    const [form,     setForm]     = useState(EMPTY)
    const [editId,   setEditId]   = useState(null)
    const [loading,  setLoading]  = useState(true)
    const [saving,   setSaving]   = useState(false)
    const [success,  setSuccess]  = useState('')
    const [errMsg,   setErrMsg]   = useState('')

    useEffect(() => { fetchAll() }, [])

    const fetchAll = async () => {
        setLoading(true)
        try { setPackages(await getAllPackages()) }
        catch { setErrMsg('Cannot connect to backend on port 8081.') }
        finally { setLoading(false) }
    }

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async e => {
        e.preventDefault()
        setSaving(true); setSuccess(''); setErrMsg('')
        const data = { ...form, basePrice: parseFloat(form.basePrice), durationDays: parseInt(form.durationDays, 10), createdBy: 1 }
        try {
            if (editId) {
                await updatePackage(editId, data)
                setSuccess(`"${form.name}" updated successfully!`)
            } else {
                await createPackage(data)
                setSuccess(`"${form.name}" created successfully!`)
            }
            resetForm(); fetchAll()
        } catch { setErrMsg('Failed to save. Check all required fields.') }
        finally { setSaving(false) }
    }

    const handleEdit = pkg => {
        setForm({
            name: pkg.name||'', description: pkg.description||'', destination: pkg.destination||'',
            category: pkg.category||'', basePrice: pkg.basePrice||'', durationDays: pkg.durationDays||'',
            imageUrl: pkg.imageUrl||'', createdBy: 1
        })
        setEditId(pkg.id)
        setSuccess(''); setErrMsg('')
        document.getElementById('admin-form')?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleDelete = async id => {
        if (!window.confirm('Delete this package?')) return
        try { await deletePackage(id); setSuccess('Package deleted.'); fetchAll() }
        catch { setErrMsg('Delete failed.') }
    }

    const resetForm = () => { setForm(EMPTY); setEditId(null) }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="relative bg-gray-900 py-24 px-10">
                <NavBar />
                <div className="max-w-6xl mx-auto text-center mt-6">
                    <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
                    <p className="text-gray-400">Manage all tour packages — Create · Edit · Delete</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                    {/* ── FORM ── */}
                    <section id="admin-form" className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {editId ? `Edit #${editId}` : 'New Package'}
                                </h2>
                                {editId && (
                                    <button onClick={resetForm}
                                            className="text-sm text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded-full transition">
                                        ✕ Cancel
                                    </button>
                                )}
                            </div>

                            {success && <div className="bg-green-50 border border-green-200 text-green-600 rounded-xl p-3 mb-4 text-sm">✅ {success}</div>}
                            {errMsg  && <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3 mb-4 text-sm">❌ {errMsg}</div>}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Package Name *</label>
                                    <input type="text" name="name" required placeholder="Ella Highlands Trek"
                                           value={form.name} onChange={handleChange}
                                           className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
                                        <input type="text" name="destination" required placeholder="Ella"
                                               value={form.destination} onChange={handleChange}
                                               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                        <select name="category" required value={form.category} onChange={handleChange}
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition">
                                            <option value="">Select...</option>
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                                        <input type="number" name="basePrice" required min="0" step="0.01" placeholder="45000"
                                               value={form.basePrice} onChange={handleChange}
                                               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Days *</label>
                                        <input type="number" name="durationDays" required min="1" placeholder="5"
                                               value={form.durationDays} onChange={handleChange}
                                               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input type="url" name="imageUrl" placeholder="https://..."
                                           value={form.imageUrl} onChange={handleChange}
                                           className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                    <textarea name="description" required rows={4} placeholder="Describe the package..."
                                              value={form.description} onChange={handleChange}
                                              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none" />
                                </div>
                                <button type="submit" disabled={saving}
                                        className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300 disabled:opacity-50">
                                    {saving ? 'Saving...' : editId ? '💾 Update Package' : '➕ Create Package'}
                                </button>
                            </form>
                        </div>
                    </section>

                    {/*PACKAGE LIST*/}
                    <section className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                All Packages
                                <span className="ml-2 bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-0.5 rounded-full">
                                    {packages.length}
                                </span>
                            </h2>
                            <button onClick={fetchAll}
                                    className="text-sm text-gray-500 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition">
                                ↻ Refresh
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
                            </div>
                        ) : packages.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                                <div className="text-5xl mb-4">📦</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">No packages yet</h3>
                                <p className="text-gray-500">Use the form to add your first package.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {packages.map(pkg => (
                                    <AdminCard key={pkg.id} pkg={pkg}
                                               onEdit={handleEdit}
                                               onDelete={handleDelete}
                                               onView={() => navigate(`/packages/${pkg.id}`)}
                                               colorClass={CAT_COLORS[(pkg.category||'standard').toLowerCase()] || CAT_COLORS.standard}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-10 mt-10">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold text-orange-400 mb-2">TravelUs</h3>
                    <p className="text-gray-400 text-sm">© 2025 TravelUs — Package Management Module</p>
                </div>
            </footer>
        </div>
    )
}

function AdminCard({ pkg, onEdit, onDelete, onView, colorClass }) {
    const imgSrc = pkg.imageUrl && pkg.imageUrl.trim() !== ''
        ? pkg.imageUrl
        : `https://source.unsplash.com/200x150/?travel,${encodeURIComponent(pkg.destination||'nature')}`

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 p-5 flex gap-5 items-center">
            <img src={imgSrc} alt={pkg.name}
                 className="w-24 h-20 object-cover rounded-xl flex-shrink-0"
                 onError={e => { e.target.src='https://via.placeholder.com/200x150/f3f4f6/9ca3af?text=Pkg' }} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className={`${colorClass} text-xs font-bold px-2.5 py-0.5 rounded-full`}>{pkg.category}</span>
                    <span className="text-gray-400 text-xs">#{pkg.id}</span>
                </div>
                <h3 className="text-gray-800 font-bold truncate">{pkg.name}</h3>
                <p className="text-orange-500 text-xs font-semibold">📍 {pkg.destination}</p>
                <div className="flex gap-4 mt-1">
                    <span className="text-gray-500 text-xs">🕐 {pkg.durationDays} days</span>
                    <span className="text-orange-500 text-xs font-bold">$ {pkg.basePrice?.toLocaleString()}</span>
                </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
                <button onClick={onView}
                        className="text-xs bg-gray-100 text-gray-600 px-4 py-2 rounded-full hover:bg-gray-200 transition">
                    View
                </button>
                <button onClick={() => onEdit(pkg)}
                        className="text-xs bg-orange-50 text-orange-500 border border-orange-200 px-4 py-2 rounded-full hover:bg-orange-100 transition">
                    ✏ Edit
                </button>
                <button onClick={() => onDelete(pkg.id)}
                        className="text-xs bg-red-50 text-red-500 border border-red-200 px-4 py-2 rounded-full hover:bg-red-100 transition">
                    🗑
                </button>
            </div>
        </div>
    )
}
