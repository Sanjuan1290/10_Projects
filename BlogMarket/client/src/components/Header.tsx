import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useBlogStore } from '../stores/useBLogStore'
import useCurrentUser from "../utils/useCurrentUser";

const Header = () => {

    const { searchInput, setSearchInput } = useBlogStore()
    const { data, isLoading } = useCurrentUser()
 
    console.log(data);

    return (
        <header className="fixed top-0 left-0 right-0 flex justify-between py-4 px-[20px] bg-white border border-b-gray-100">
            <NavLink to={'/'} className="font-bold text-xl">Blog Market</NavLink>

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

            {
                isLoading ? <p>Loading...</p> 
                : 
                data?.isLoggedIn ? <NavLink 
                to={'/writeBlog'}
                className={'flex gap-1 items-center hover:text-gray-600'}
                >
                    <p>Write</p> 
                    <GiHamburgerMenu className="w-4 h-4"/>
                </NavLink>
                :
                <div className="flex gap-2 ">
                    <NavLink to={'/login'} className={'hover:text-gray-500'}>Login</NavLink>
                    <NavLink to={'/register'} className={'hover:text-gray-500'}>Register</NavLink>
                </div>
            }

        </header>
    )
}

export default Header