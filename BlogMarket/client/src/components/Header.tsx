import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useBlogStore } from '../stores/useBLogStore'
import useCurrentUser from "../utils/useCurrentUser";
import { useState } from "react";

const Header = () => {

    const { searchInput, setSearchInput } = useBlogStore()
    const { data, isLoading } = useCurrentUser()
    const [showMenu, setShowMenu] = useState(false)
 
    console.log(data);

    return (
        <header className="fixed z-50 top-0 left-0 right-0 flex justify-between py-4 px-[20px] bg-white border border-b-gray-100">
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
                data?.isLoggedIn ? <div 
                onClick={()=>{setShowMenu(prev => !prev)}}
                className={'flex gap-1 items-center hover:text-gray-600 cursor-pointer relative '}
                >
                    <p>Write</p> 
                    <GiHamburgerMenu className="w-4 h-4" />

                    {
                        showMenu && <div className=" absolute w-[120px] top-10 -left-16 bg-black text-gray-50 flex flex-col px-4 py-2 gap-3 justify-center items-start">
                            <NavLink to={'/profile'} className={'hover:text-gray-600 duration-200'}>Profile</NavLink>
                            <NavLink to={'/blog/write'} className={'hover:text-gray-600 duration-200'}>Write</NavLink>
                            <NavLink to={'/myblogs'} className={'hover:text-gray-600 duration-200'}>My blogs</NavLink>
                            <button className={'hover:text-gray-600 duration-200'}>Logout</button>
                        </div>
                    }
                </div>
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