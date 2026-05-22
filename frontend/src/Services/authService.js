const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

//Login
export async function Login( email, password ) {
    const res = await fetch(`${BASE_URL}/api/Auth/login`, {
        method: 'POST',
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({email,password}),
    })
    if (!res.ok) {
        const ErrorMsg = await res.text()
        throw new Error(ErrorMsg)

    }
    return res.json()
}

//Register
export async function registerUser(name, email, password) {
  const res = await fetch(`${BASE_URL}/api/Auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( {name, email, password} ),
  })

  if (!res.ok) {
    const errorMsg = await res.text()
    throw new Error(errorMsg)
  }

  return res.text() // "user added sucessfully"
}

// Get Profile
export async function getProfile(token) {
    const res = await fetch(`${BASE_URL}/api/user/profile`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    if (!res.ok) {
        const errorMsg = await res.text()
        throw new Error(errorMsg)
    }
    return res.json()
}

// Update Profile (name + avatar)
export async function updateProfile(token, name, avatarUrl) {
    const res = await fetch(`${BASE_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, avatarUrl })
    })
    if (!res.ok) {
        const errorMsg = await res.text()
        throw new Error(errorMsg)
    }
    return res.text()
}

// Update Password
export async function updatePassword(token, oldPassword, newPassword) {
    const res = await fetch(`${BASE_URL}/api/user/password`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
    })
    if (!res.ok) {
        const errorMsg = await res.text()
        throw new Error(errorMsg)
    }
    return res.text()
}

// Delete Account
export async function deleteAccount(token) {
    const res = await fetch(`${BASE_URL}/api/user/account`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    if (!res.ok) {
        const errorMsg = await res.text()
        throw new Error(errorMsg)
    }
    return res.text()
}

export function decodeToken(token) {
  try {
    const payload = token.split('.')[1]
    const decoded = atob(payload)
    return JSON.parse(decoded)
  }
  catch {
    return null
  }
}
