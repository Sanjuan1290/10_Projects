import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const loginUser = async() => {
        const res = await fetch('http://localhost:3000/api/v1/user/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()

        if(!res.ok) {
            throw new Error(data.message || 'Login failed')
        }

        return data
    }

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            setEmail('')
            setPassword('')

            queryClient.invalidateQueries({ queryKey: ['token']})
            navigate('/')
        }
    })

  return (
    <div className={`flex flex-col gap-4 justify-center items-center min-h-[calc(100vh-200px)]`}>
        <h1 className="font-bold text-xl">Log in to your account</h1>

        <form onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate()

        }} className="flex flex-col gap-2">
           
            <input 
                type="email" 
                placeholder="Enter your email" 
                onChange={(e)=>{setEmail(e.target.value)}}
                value={email}
                className="px-2 py-1 w-[350px] rounded-[4px] border-2 border-gray-800"
            />
            <input 
                type="password" 
                placeholder="Enter your password" 
                onChange={(e)=>{setPassword(e.target.value)}}
                value={password}
                className="px-2 py-1 w-[350px] rounded-[4px] border-2 border-gray-800"
            />

            <button disabled={mutation.isPending} className="bg-black text-gray-50 font-bold py-3 rounded-md hover:bg-gray-500 hover:text-gray-900 duration-100">{mutation.isPending ? 'Logging In...' : 'Log in'}</button>

            {mutation.isError && (
                <p className="text-rose-600 font-semibold text-center">{(mutation.error as Error).message}</p>
            )}

            <p className="text-center">New here? <NavLink to={'/register'} className={'text-gray-700 hover:text-gray-500'}>Register</NavLink></p>
        </form>
    </div>
  )
}

export default Login