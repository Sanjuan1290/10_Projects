import { Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const MainLayout = () => {
  const location = useLocation()

  return (
    <>
        <Header />
        <Outlet />
        {
          location.pathname !== '/blog/write' && <Footer />
        }
        
    </>
  )
}

export default MainLayout