import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { Category } from "../types"
import uploadToCloudinary from "../utils/uploadToCloudinary"

const UpdateBlog = () => {
    const [inputTitle, setInputTitle] = useState('')
    const [currentImage, setCurrentImage] = useState('')
    const [inputImage, setInputImage] = useState<File | null>(null)
    const [inputCategory, setInputCategory] = useState('')
    const [inputCategories, setInputCategories] = useState<String[]>([])
    const [inputDescription, setInputDescription] = useState('')
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { id: blogId } = useParams()

    const fetchBlog = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/blogs/${blogId}`)
        
        return res.json()
    }
    const { data , isLoading, error} = useQuery({ queryKey:[`blog`, blogId], queryFn: fetchBlog })

    useEffect(() => {
        if(data){
            setInputTitle(data.blog.title || '')
            setInputDescription(data.blog.description || '')

            setInputCategories(
                data.categories.map((c: Category) => c.category)
            )
            setCurrentImage(data.blog.image)
        
        }
    }, [data])

    const updateBlogMutation = useMutation({
        mutationFn: async () => {
            let imageUrl = ''

            if(inputImage){
                imageUrl = await uploadToCloudinary(inputImage)
            }

            const res = await fetch(`http://localhost:3000/api/v1/blogs/update/${blogId}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    title: inputTitle,
                    image: imageUrl,
                    categories: inputCategories,
                    description: inputDescription
                 })
            })

            const data = await res.json()

            if(!res.ok){
                throw new Error(data.message || "Failed to update blog")
            }

            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['blog', blogId]
            })
            navigate('/profile')
        }
    })

    if(isLoading) return <p>Blog Loading...</p> 
    if(error) return <p>Something went wrong</p>


    return (
        <div className="mt-20 flex flex-col gap-2 px-5 relative h-[600px]">
            <h1 className="font-bold text-lg">Update a post</h1>

            <input 
                type="text" 
                placeholder="Enter Title" 
                onChange={(e) => {setInputTitle(e.target.value)}}
                value={inputTitle}
                className="outline-none border border-black py-1 px-2"/>

            <input 
                type="file" 
                onChange={(e)=> {
                    if(e.target.files){
                        setInputImage(e.target.files[0])
                    }
                }}
                className="cursor-pointer w-[250px] bg-gray-200" />

            {
                inputImage ? <img src={URL.createObjectURL(inputImage)} alt="Blog Image" className="w-40 h-40 border border-gray-700 object-contain"/>
                :
                <img src={currentImage} alt="Blog Image" className="w-40 h-40 border border-gray-700 object-contain"/>
            }

            <div>
                <input 
                    type="text" 
                    placeholder="Enter your category"
                    onChange={(e) => { setInputCategory(e.target.value)}}
                    value={inputCategory} 
                    className="outline-none border border-black py-1 px-2" />
                <button 
                    className="bg-black text-gray-50 hover:bg-gray-700 duration-200 px-3 py-1 border border-black"
                    onClick={() => {
                        if(!inputCategory.trim()) return

                        setInputCategories(prev => [...prev, inputCategory])

                        setInputCategory('')
                    }}
                    >Add</button>
            </div>
            <div className="flex gap-2">
                {
                    inputCategories && inputCategories.map((category, index) => (
                        <button 
                        key={index} 
                        onClick={() => {
                            setInputCategories(prev => prev.filter(c => c !== category && c))
                        }}
                        className="flex gap-1 items-center bg-gray-700 text-gray-50 px-2 py-1"
                        >{category} <RxCross2 className="hover:w-5 h-5"/></button>
                    ))
                }
            </div>

            <textarea 
                name="" 
                id="" 
                onChange={(e) => {setInputDescription(e.target.value)}}
                value={inputDescription} 
                placeholder="Enter description" 
                className="outline-none border border-black py-1 px-2"></textarea>

            <button 
            onClick={() => { updateBlogMutation.mutate() }}
            className="bg-black text-gray-50 w-fit px-4 py-1 hover:bg-gray-700 absolute bottom-0 left-1/2 -translate-x-1/2 duration-200">{updateBlogMutation.isPending ? 'Updating...' : 'Update'}</button>
        </div>
    )
}

export default UpdateBlog