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
