import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Register from "./pages/Register"


const App = () => {

  const router = createBrowserRouter(createRoutesFromElements(

    <Route path="/" element={<MainLayout />}>
      <Route index element={<LandingPage />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  ))

  return <RouterProvider router={router} />
}

export default App