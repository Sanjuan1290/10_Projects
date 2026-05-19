import { Navigate } from "react-router-dom"
import useCurrentUser from "../utils/useCurrentUser"

type Props = {
    children: React.ReactNode
}

const UserProtectedRoute = ({ children } : Props) => {
    
    const { data, isLoading, error } = useCurrentUser()

    if(isLoading) return <p>Loading...</p>

    if(error) return <p>Something went wrong</p>

    if(data?.isLoggedIn) return <Navigate to={'/'} replace/>
    
  return children
}

export default UserProtectedRoute