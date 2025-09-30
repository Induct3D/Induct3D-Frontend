import { Navigate, Outlet, useLocation } from "react-router";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Si ya está autenticado, mándalo al dashboard y reemplaza el historial
  if (token) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  // Si NO hay token, permite ver la página pública
  return <Outlet />;
};

export default PublicRoute;
