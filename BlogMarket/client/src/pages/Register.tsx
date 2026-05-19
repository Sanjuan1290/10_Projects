import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const registerUser = async() => {
        const res = await fetch('http://localhost:3000/api/v1/user/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })

       
        return res.json()
    }

    const mutation = useMutation({ 
        mutationFn: registerUser,
        onSuccess: () => {
            setUsername('')
            setEmail('')
            setPassword('')

            queryClient.invalidateQueries({ queryKey: ['token']})
            navigate('/')
        }
    })



  return (
    <div className={`flex flex-col gap-4 justify-center items-center min-h-[calc(100vh-200px)]`}>
        <h1 className="font-bold text-xl">Create an account</h1>

        <form onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate()
        }} className="flex flex-col gap-2">
            <input 
                type="text" 
                placeholder="Enter you username" 
                onChange={(e)=>{setUsername(e.target.value)}}
                value={username}
                className="px-2 py-1 w-[350px] rounded-[4px] border-2 border-gray-800"
            />
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

            <button disabled={mutation.isPending} className="bg-black text-gray-50 font-bold py-3 rounded-md hover:bg-gray-500 hover:text-gray-900 duration-100">{mutation.isPending ? 'Loading...' : 'Register'}</button>

            {mutation.isError && (
                <p>{(mutation.error as Error).message}</p>
            )}

            <p className="text-center">Already have an account? <NavLink to={'/login'} className={'text-gray-700 hover:text-gray-500'}>Login</NavLink></p>
        </form>
    </div>
  )
}

export default Register