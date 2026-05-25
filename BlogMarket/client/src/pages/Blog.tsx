import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import type { Category, Comment, Blog as BlogType} from '../types'



const Blog = () => {
    const { id } = useParams()
    const fetchBlog = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/blogs/${id}`)

        return res.json()
    }

    const { data , isLoading, error } = useQuery({ queryKey:[`blog${id}`], queryFn: fetchBlog })

    if(isLoading) return <p>Blog Loading...</p> 
    if(error) return <p>Something went wrong</p>

    const blog = data?.blog as BlogType
    const categories = data?.categories as Category[]
    const comments = data?.comments as Comment[]

    console.log(categories);
    console.log(comments);

    return (
        <div className="flex flex-col gap-4 mt-20  px-4">
            
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">{blog.title}</h1>
                <div className="flex">
                    <FaEdit className="w-5 h-5 hover:text-gray-700 cursor-pointer"/>
                    <MdDelete className="w-5 h-5 hover:text-gray-700 cursor-pointer"/>
                </div>
            </div>

            <div className="flex justify-between text-gray-700">
                <p>@{blog.author}</p>
                <div className="flex gap-1">
                    <p>{ new Date(blog.createdAt).toDateString()} </p>
                    <p>{ new Date(blog.createdAt).toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false
                    })}</p>
                </div>
            </div>

            <img src={blog.image} alt="" className="w-full object-contain"/>

            <p className="text-sm text-justify">{blog.description}</p>

            <div className="flex gap-2 font-semibold items-center">
                <p>Categories:</p>
                {
                    categories.map((c, i) => (
                        <div key={i} className="bg-gray-300  px-3 py-1 rounded-lg">
                            <p>{c.category}</p>
                        </div>
                    ))
                }

            </div>

            <p className="font-semibold mt-4">Comments:</p>

            <div className="flex flex-col gap-2">
                {
                    comments.map(comment => (
                        <div key={comment.id} className="flex flex-col text-gray-700 gap-2 bg-gray-300 rounded-lg px-4 py-2 text-sm">
                            <div className="flex justify-between">
                                <p>@{comment.userName}</p>
                                <div className="flex gap-1">
                                    <p>{new Date(comment.createdAt).toDateString()}</p>
                                    <p>{new Date(comment.createdAt).toLocaleString("en-US", {hour: '2-digit', minute: '2-digit', second: '2-digit'})}</p>
                                </div>
                            </div>
                            <p className="ml-8">I am very hopeful about this!</p>
                        </div>
                    ))
                }
            </div>
            
            <div className="flex justify-between text-sm mb-10">
                <input type="text"  placeholder="Write a comment" className="flex-1 px-4 outline-none"/>
                <button className="bg-black text-gray-200 px-8 py-2 hover:bg-gray-800 duration-300">Add Comment</button>
            </div>
        </div>
    )
}

export default Blog