import { Navigate, Outlet } from "react-router"

const PrivateRoute = () => {
    const token = localStorage.getItem("token")

    // Si no hay token, redirige al login
    if (!token) {
        return <Navigate to="/iniciar-sesion" replace />
    }

    // Si hay token, renderiza la ruta protegida
    return <Outlet />
}

export default PrivateRoute
