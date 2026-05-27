import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserProtectedRoute from "./auth/UserProtectedRoute"
import Blog from "./pages/Blog"
import WriteBlog from "./pages/WriteBlog"


const App = () => {

  const router = createBrowserRouter(createRoutesFromElements(

    <Route path="/" element={<MainLayout />}>
      <Route index element={<LandingPage />} />
      
      <Route path="/login" element={
        <UserProtectedRoute>
            <Login />
        </UserProtectedRoute>
      } />

      <Route path="/register" element={
        <UserProtectedRoute>
          <Register />
        </UserProtectedRoute>
        } />

        <Route path="/blog/:id" element={<Blog />}/>
        <Route path="/blog/write" element={<WriteBlog />}/>
    </Route>
  ))

  return <RouterProvider router={router} />
}

export default App