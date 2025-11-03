// infrastructure/routes/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router";

type UserRole = "ADMIN" | "CREATOR";

export default function PrivateRoute({ roles }: { roles?: UserRole[] }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") as UserRole | null;

    // No autenticado → login
    if (!token) return <Navigate to="/iniciar-sesion" replace />;

    // Si no se especifican roles, basta con estar autenticado
    if (!roles || roles.length === 0) return <Outlet />;

    // Con roles: validar acceso
    if (!role || !roles.includes(role)) return <Navigate to="/403" replace />;

    return <Outlet />;
}
