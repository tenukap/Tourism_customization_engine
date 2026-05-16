import { createContext, useContext, useState, useEffect } from 'react'
import { decodeToken } from '../Services/authService'

const AuthContext = createContext()

export function AuthProvider ({ children }) {

    const [loading, setLoading] = useState(true)
    const [user, setUser]     = useState(null)// set user value
    const [token, setToken]   = useState(null) // set token value

    //logout function
    function logout () {
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
    }

    //login function
    function login(JWTToken) {
        localStorage.setItem('token', JWTToken)

        const decodedToken = decodeToken(JWTToken)
        setUser(decodedToken)
        setToken(JWTToken)
    }

    useEffect(() => {

        const savedtoken = localStorage.getItem('token')
        if (!savedtoken) {
            setLoading(false)
            return
        }
           try{
               const decodedToken = decodeToken(savedtoken)
               const isExpired = decodedToken.exp *1000 < Date.now()
               if(isExpired){
                   logout()
                   setLoading(false)
                   return
               }
               setToken(savedtoken)
               setUser(decodedToken)
           }
           catch(err){
               console.error("invalid token")
               localStorage.removeItem('token')
           }

        setLoading(false)


    },[])

    return (
        <AuthContext.Provider value={{user, token,login,logout, loading}}>
            {children}
            </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)

