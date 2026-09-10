import { RouterProvider } from "react-router-dom"
import createFullRouter from "./routes/routeUtils"
import { AuthProvider } from "./features/auth/context/AuthContext"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    })
  }, [])

  return (
    <AuthProvider>
      <RouterProvider router={createFullRouter} />
    </AuthProvider>
  )
}
export default App
