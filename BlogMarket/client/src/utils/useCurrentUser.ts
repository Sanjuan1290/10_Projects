import { useQuery } from "@tanstack/react-query"


const useCurrentUser = () => {

    const validateCookie = async () => {
        const res = await fetch('http://localhost:3000/api/v1/validateCookies', {
            credentials: 'include'
        })

        if(!res.ok) {
            return null
        }

        return res.json()
    }

    return useQuery({ 
        queryKey: ['token'], 
        queryFn: validateCookie, 
        retry: false
    })

}

export default useCurrentUser