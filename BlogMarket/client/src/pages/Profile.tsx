import { useQuery } from "@tanstack/react-query"
import type { Blog } from "../types"
import { NavLink } from "react-router-dom"
import useCurrentUser from "../utils/useCurrentUser"

const Profile = () => {
    const currentUser = useCurrentUser().data?.user

    const fetchBlogs = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/blogs/user/${currentUser.id}`, {
            credentials: 'include'
        })

        return res.json()
    }

    const { data: blogs, isLoading, error } = useQuery<Blog[]>({ queryKey: ['blogs'], queryFn: fetchBlogs })

    

    return (
        <div className="flex justify-between mt-20 px-4 mb-10">
            <div>

                {
                    isLoading && <p>Loading Blogs...</p>
                }
                {
                    error && <p>Something went wrong.</p>
                }
                {
                    blogs && blogs.map(blog => (
                        <>
                            <h1 className="font-bold text-lg">Your posts:</h1>
        
                            <div key={blog.id} className="flex gap-2">
                                <img 
                                src={blog.image}
                                alt={blog.title} 
                                className="w-[300px] h-[200px] object-fill"
                                />
        
                                <div className="flex flex-col gap-1 flex-1">
                                <h3 className="font-bold text-xl">{blog.title}</h3>
        
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <p>@{blog.author}</p>
                                    <p>{blog.createdAt}</p>
                                </div>
        
                                <p className="line-clamp-3">{blog.description} lorem <NavLink to={`blog/${blog.id}`} className={'hover:text-gray-500'}>Read more</NavLink></p>
        
                                </div>
                            </div>
                        </>
                    ))
                }
                
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="font-bold text-lg">Profile</h1>
                <p className="text-gray-700 ml-5">snehasish</p>
                <p className="text-gray-700 ml-5">snehasish@gmail.com</p>

                <div className="flex gap-2">
                    <button className="bg-black text-gray-50 px-4 py-2 hover:bg-gray-700 duration-200">Update</button>
                    <button className="bg-black text-gray-50 px-4 py-2 hover:bg-gray-700 duration-200">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Profile