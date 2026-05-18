import { useState } from "react"
import { NavLink } from "react-router-dom"

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3000/api/v1/user/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })

        setUsername('')
        setEmail('')
        setPassword('')
        return res.json()
    }



  return (
    <div className={`flex flex-col gap-4 justify-center items-center min-h-[calc(100vh-200px)]`}>
        <h1 className="font-bold text-xl">Create an account</h1>

        <form onSubmit={registerUser} className="flex flex-col gap-2">
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

            <button className="bg-black text-gray-50 font-bold py-3 rounded-md hover:bg-gray-500 hover:text-gray-900 duration-100">Register</button>
            <p className="text-center">Already have an account? <NavLink to={'/login'} className={'text-gray-700 hover:text-gray-500'}>Login</NavLink></p>
        </form>
    </div>
  )
}

export default Register