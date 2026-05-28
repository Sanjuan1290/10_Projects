import { Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const MainLayout = () => {
  const location = useLocation()
  console.log(location.pathname);

  return (
    <>
        <Header />
        <Outlet />
        {
          location.pathname !== '/blog/write' && 
          !location.pathname.startsWith('/blog/update') && 
          <Footer />
        }
        
    </>
  )
}

export default MainLayout