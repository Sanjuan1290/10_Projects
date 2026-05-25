import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



const Blog = () => {
  return (
    <div className="flex flex-col gap-4 mt-20  px-4">
        
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold">JavaScript vs. TypeScript: What's the difference?</h1>
            <div className="flex">
                <FaEdit className="w-5 h-5 hover:text-gray-700 cursor-pointer"/>
                <MdDelete className="w-5 h-5 hover:text-gray-700 cursor-pointer"/>
            </div>
        </div>

        <div className="flex justify-between text-gray-700">
            <p>@snehasish</p>
            <p>Sun Aug 06 2023 18:03:49</p>
        </div>

        <img src="/blogs/blog1.png" alt="" className="w-full object-contain"/>

        <p className="text-sm text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora nobis voluptas, repellendus porro esse quaerat quibusdam corporis praesentium architecto soluta dolorum possimus quis suscipit ex. Atque delectus veniam rerum earum!</p>

        <div className="flex gap-2 font-semibold items-center">
            <p>Categories:</p>

            <div className="bg-gray-300  px-3 py-1 rounded-lg">
                <p>javascript</p>
            </div>
            <div className="bg-gray-300  px-3 py-1 rounded-lg">
                <p>typescript</p>
            </div>
            <div className="bg-gray-300  px-3 py-1 rounded-lg">
                <p>dev</p>
            </div>
        </div>

        <p className="font-semibold mt-4">Comments:</p>
        <div className="flex flex-col text-gray-700 gap-2 bg-gray-300 rounded-lg px-4 py-2 text-sm">
            <div className="flex justify-between">
                <p>@John</p>
                <p>Sun Aug 08 2023 18:10:45</p>
            </div>
            <p className="ml-8">I am very hopeful about this!</p>
        </div>
        <div className="flex flex-col text-gray-700 gap-2 bg-gray-300 rounded-lg px-4 py-2 text-sm">
            <div className="flex justify-between">
                <p>@John</p>
                <p>Sun Aug 08 2023 18:10:45</p>
            </div>
            <p className="ml-8">I am very hopeful about this!</p>
        </div>
        <div className="flex flex-col text-gray-700 gap-2 bg-gray-300 rounded-lg px-4 py-2 text-sm">
            <div className="flex justify-between">
                <p>@John</p>
                <p>Sun Aug 08 2023 18:10:45</p>
            </div>
            <p className="ml-8">I am very hopeful about this!</p>
        </div>

        <div className="flex justify-between text-sm mb-10">
            <input type="text"  placeholder="Write a comment" className="flex-1 px-4 outline-none"/>
            <button className="bg-black text-gray-200 px-8 py-2 hover:bg-gray-800 duration-300">Add Comment</button>
        </div>
    </div>
  )
}

export default Blog