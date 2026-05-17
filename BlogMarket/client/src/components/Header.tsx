import { IoIosSearch } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useBlogStore } from '../stores/useBLogStore'

const Header = () => {

    const { searchInput, setSearchInput } = useBlogStore()

    console.log(searchInput);

    return (
        <header className="fixed top-0 left-0 right-0 flex justify-between py-4 px-[20px] bg-[rgba(0,0,0,0.42)]">
            <h3 className="font-bold text-xl">Blog Market</h3>

            <div className="flex items-center gap-1"> 
                <label htmlFor="searchPost"><IoIosSearch className="h-6 w-6 cursor-pointer"/></label>
                <input type="text" 
                    name="searchPost" 
                    id="searchPost" 
                    placeholder="Search a post" 
                    onChange={(e)=>{setSearchInput(e.target.value)}}
                    value={searchInput}
                    className="outline-none px-2"
                />
            </div>
 
            <div className="flex gap-2 ">
                <NavLink to={'/login'} className={'hover:text-gray-500'}>Login</NavLink>
                <NavLink to={'/register'} className={'hover:text-gray-500'}>Register</NavLink>
            </div>
        </header>
    )
}

export default Header