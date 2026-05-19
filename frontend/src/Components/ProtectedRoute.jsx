import {Navigate} from 'react-router-dom'
import {useAuth} from "../Context/AuthContext.jsx";

 function ProtectedRoute({children , requiredRole}) {

    const {user,loading} = useAuth()

    if (loading) {
        return null
    }

    if (!user) {
        return<Navigate to='/login' replace />

    }
    if (requiredRole && user.role !== requiredRole )
        return <Navigate to ='/' replace />

    return children
}
export default ProtectedRoute