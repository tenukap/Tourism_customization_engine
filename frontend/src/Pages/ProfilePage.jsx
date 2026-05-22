import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { updateProfile, updatePassword, deleteAccount } from '../Services/authService'

export default function ProfilePage() {

    const { profile, token, logout } = useAuth()
    const navigate = useNavigate()

    // Profile form state
    const [name, setName]           = useState(profile?.name || '')
    const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || '')

    // Password form state
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // UI state
    const [profileMsg, setProfileMsg]   = useState('')
    const [passwordMsg, setPasswordMsg] = useState('')
    const [profileError, setProfileError]   = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loading, setLoading]         = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    // Handle profile update
    const handleProfileUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        setProfileMsg('')
        setProfileError('')
        try {
            await updateProfile(token, name, avatarUrl)
            setProfileMsg('Profile updated successfully!')
        } catch(err) {
            setProfileError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Handle password change
    const handlePasswordChange = async (e) => {
        e.preventDefault()
        setLoading(true)
        setPasswordMsg('')
        setPasswordError('')

        if(newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match')
            setLoading(false)
            return
        }

        try {
            await updatePassword(token, oldPassword, newPassword)
            setPasswordMsg('Password changed successfully!')
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch(err) {
            setPasswordError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Handle account deletion
    const handleDeleteAccount = async () => {
        setLoading(true)
        try {
            await deleteAccount(token)
            logout()
            navigate('/')
        } catch(err) {
            setProfileError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-orange-400 flex items-center justify-center text-white text-3xl font-bold mb-3">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            profile?.name?.charAt(0).toUpperCase() || '?'
                        )}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">{profile?.name}</h1>
                    <p className="text-gray-500">{profile?.email}</p>
                </div>

                {/* Profile Section */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit Profile</h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Avatar URL</label>
                            <input
                                type="text"
                                value={avatarUrl}
                                onChange={e => setAvatarUrl(e.target.value)}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        {profileMsg   && <p className="text-green-500 text-sm">{profileMsg}</p>}
                        {profileError && <p className="text-red-500 text-sm">{profileError}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition duration-300"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>

                {/* Password Section */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h2>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Current Password</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        {passwordMsg   && <p className="text-green-500 text-sm">{passwordMsg}</p>}
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition duration-300"
                        >
                            {loading ? 'Saving...' : 'Change Password'}
                        </button>
                    </form>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 p-6">
                    <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
                    <p className="text-sm text-gray-500 mb-4">Deleting your account is permanent and cannot be undone.</p>
                    {!showDeleteConfirm ? (
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Delete Account
                        </button>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-sm text-red-500 font-medium">Are you sure? This cannot be undone.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={loading}
                                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    {loading ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}