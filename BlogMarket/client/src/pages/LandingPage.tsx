import { useQuery } from "@tanstack/react-query"
import { useBlogStore } from "../stores/useBLogStore"
import { NavLink } from "react-router-dom"
import type { Blog } from "../types"

const LandingPage = () => {

  const { searchInput } = useBlogStore()

  const fetchBlogs = async () => {
    const res = await fetch('http://localhost:3000/api/v1/blogs')

    return res.json()
  }

  const { data: blogs, isLoading, error } = useQuery<Blog[]>({ queryKey: ['blogs'], queryFn: fetchBlogs })

  const filteredBlogs = blogs?.filter(blog => (blog.title.toLowerCase().includes(searchInput.toLowerCase())))
  

  return (
    <main className="flex flex-col gap-2 px-2 mt-20 mb-2">

      {
        isLoading && <p>Loading Blogs...</p>
      }
      {
        error && <p>Something went wrong.</p>
      }

      {
        filteredBlogs && filteredBlogs.map(blog => (
          <div key={blog.id} className="flex gap-2">
            <img 
              src={blog.image}
              alt={blog.title} 
              className="w-[300px] object-contain"
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
        ))
      }


    </main>
  )
}

export default LandingPage 