import { createContext, useContext, useState, useEffect } from 'react'
import {decodeToken, getProfile} from '../Services/authService'

const AuthContext = createContext()

export function AuthProvider ({ children }) {

    const [loading, setLoading] = useState(true)
    const [user, setUser]     = useState(null)// set user value
    const [token, setToken]   = useState(null) // set token value
    const [profile , setProfile ] = useState(null)

    //logout function
    function logout () {
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
        setProfile(null)
    }

    //login function
    async function login(JWTToken) {
        localStorage.setItem('token', JWTToken)

        const decodedToken = decodeToken(JWTToken)
        setUser(decodedToken)
        setToken(JWTToken)

        //profile function
        try{
            const profileData = await getProfile(JWTToken)
            setProfile(profileData)

        }
        catch(error){
            console.error("could not fetch profile", error)
        }
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

               getProfile(savedtoken)
                   .then(profileData => setProfile(profileData))
                   .catch(err => console.error("Could not fetch profile", err))

           }
           catch(err){
               console.error("invalid token")
               localStorage.removeItem('token')
           }

        setLoading(false)


    },[])

    return (
        <AuthContext.Provider value={{user, token,profile, role:user?.role, login,logout, loading}}>
            {children}
            </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)

