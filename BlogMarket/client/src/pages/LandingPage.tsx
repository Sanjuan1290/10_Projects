import { useBlogStore } from "../stores/useBLogStore"

const LandingPage = () => {

  return (
    <main className="mt-20">

      <div className="flex gap-2 px-2">
        <img 
          src="/blogs/blog1.png" 
          alt="" 
          className="w-[300px] object-contain"
        />

        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-xl">10 Helpful Everyday Examples of Artificial Intelligence</h3>

          <div className="flex justify-between text-gray-600 text-sm">
            <p>@snehasish</p>
            <p>Sun Aug 06 2023 19:02:06</p>
          </div>

          <p className="line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident expedita totam id, corporis ad labore ipsum officia reprehenderit sit blanditiis amet, alias, reiciendis dolor temporibus ipsam aperiam saepe. Culpa, eaque.</p>

        </div>
      </div>

    </main>
  )
}

export default LandingPage 