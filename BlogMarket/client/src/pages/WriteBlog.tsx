import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import useCurrentUser from "../utils/useCurrentUser"
import uploadToCloudinary from "../utils/uploadToCloudinary"
import { Navigate } from "react-router-dom"

const WriteBlog = () => {

    const [inputTitle, setInputTitle] = useState('')
    const [inputImage, setInputImage] = useState<File | null>(null)
    const [inputCategory, setInputCategory] = useState('')
    const [inputCategories, setInputCategories] = useState<string[]>([])
    const [inputDescription, setInputDescription] = useState('')

    const currentUser = useCurrentUser().data?.user

    if(!currentUser){
        return <Navigate to={'/'}/>
    }

    const addBlogPostMutation = useMutation({
        mutationFn: async() => {
            let imageUrl = ''

            if(inputImage){
                imageUrl = await uploadToCloudinary(inputImage)
            }

            const res = await fetch('http://localhost:3000/api/v1/blogs/add',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    userId: currentUser.id,
                    title: inputTitle, 
                    image: imageUrl, 
                    author: currentUser.username,
                    categories: inputCategories, 
                    description: inputDescription 
                })
            })

            const data = await res.json()

            if(!res.ok) {
                throw new Error(data.message || 'Failed to create Blog')
            }

            return data
        },
        onSuccess: () => {
            setInputTitle('')
            setInputImage(null)
            setInputCategories([])
            setInputCategory('')
            setInputDescription('')
        }
    })

  return (
    <form onSubmit={(e) => {
            e.preventDefault()
            addBlogPostMutation.mutate()
        }} className="mt-20 px-4 flex flex-col gap-2 relative h-[400px]">
        <h1 className="font-bold text-xl">Create a post</h1>

        <input 
        type="text" 
        placeholder="Enter post title" 
        onChange={(e)=>{ setInputTitle(e.target.value)}}
        value={inputTitle}
        required
        className="border border-black px-2 py-1"/>

        <input 
        type="file" 
        required
        onChange={(e)=>{
            if(e.target.files){
                setInputImage(e.target.files[0])
            }
        }}
        className="border w-60 cursor-pointer hover:border-black"/>

        {
            inputImage && <img src={URL.createObjectURL(inputImage)} alt="Blog Image" className="w-40 h-40 border border-gray-700 object-contain"/>
        }

        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <input 
                type="text" 
                placeholder="Enter post category"
                onChange={(e)=>{ setInputCategory(e.target.value)}} 
                value={inputCategory}
                className="border border-black py-1 px-2 "/>

                <button 
                type="button" 
                onClick={()=>{
                    if(!inputCategory.trim()) return
                    setInputCategories(prev => [...prev, inputCategory])
                    setInputCategory('')
                }}
                className="bg-black py-1 px-3 text-gray-50 w-fit cursor-pointer hover:bg-gray-700 transition-colors duration-200 ease-in-out">Add</button>
            </div>

            <div className="flex gap-2">
                {
                    inputCategories && inputCategories.map((category, index) => (
                        <p key={index} className="bg-gray-700 text-gray-50 px-2 py-1">{category}</p>
                    ))
                }
            </div>
        </div>

        <textarea  
            placeholder="Enter post description"  
            spellCheck={true} 
            required
            onChange={(e) => {setInputDescription(e.target.value)}}
            value={inputDescription}
            className="resize-y  border border-black px-2 py-1">
        </textarea>

        <button 
        type="submit" 
        className="w-fit bg-black px-10 py-1 hover:bg-gray-700 duration-200 text-gray-50 text-center absolute -bottom-40 left-1/2 -translate-x-1/2">{addBlogPostMutation.isPending ? 'Loading...' : 'CREATE'}</button>
    </form>
  )
}

export default WriteBlog