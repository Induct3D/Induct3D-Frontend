import { createBrowserRouter } from "react-router"
import Layout from "../../presentation/layout/Layout.tsx"
import Home from "../../presentation/pages/Home.tsx"
import Tours from "../../presentation/pages/Tours.tsx"
import Login from "../../presentation/pages/Login.tsx"
import Error404 from "../../presentation/pages/Error404.tsx"
import Register from "../../presentation/pages/Register.tsx"
import RecoverPassword from "../../presentation/pages/RecoverPassword.tsx"
import CreatorLayout from "../../presentation/layout/CreatorLayout.tsx"
import Dashboard from "../../presentation/pages/Creator/Dashboard.tsx"
import PrivateRoute from "../../infrastructure/routes/PrivateRoute.tsx"
import PublicRoute from "../../infrastructure/routes/PublicRoute.tsx"
import CreateTour from "../../presentation/pages/Creator/CreateTour.tsx";
import ViewTour from "../../presentation/pages/ViewTour.tsx"
import EditTour from "../../presentation/pages/Creator/EditTour.tsx"
import Terms from "../../presentation/pages/Terms.tsx";
import Consent from "../../presentation/pages/Consent.tsx";
import Privacy from "../../presentation/pages/Privacy.tsx";
import Error403 from "../../presentation/pages/Error403.tsx";
import AdminLayout from "../../presentation/layout/AdminLayout.tsx";
import AdminDashboard from "../../presentation/pages/Admin/Dashboard.tsx";
import ManageTours from "../../presentation/pages/Admin/ManageTours.tsx";
import ProfilePage from "../../presentation/pages/Creator/ProfilePage.tsx";

export const router = createBrowserRouter([
    // Públicas
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "recorridos", element: <Tours /> },
            { path: "terms", element: <Terms /> },
            { path: "privacy", element: <Privacy /> },
            { path: "consent", element: <Consent /> },
        ],

    },
    { path: "recorrido/:id", element: <ViewTour /> },


    // Auth públicas (solo si NO hay token)
    {
        element: <PublicRoute />,
        children: [
            { path: "iniciar-sesion", element: <Login /> },
            { path: "registrarse", element: <Register /> },
            { path: "recuperar-contrasena", element: <RecoverPassword /> },
        ],
    },

    // Protegidas CREATOR (mantiene tu /dashboard)
    {
        element: <PrivateRoute roles={["CREATOR"]} />,
        children: [
            {
                path: "/dashboard",
                element: <CreatorLayout />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: "crear", element: <CreateTour /> },
                    { path: "perfil", element: <ProfilePage /> },
                    { path: "editar/:id", element: <EditTour /> },
                ],
            },
        ],
    },

    // Protegidas ADMIN (nuevo /admin)
    {
        element: <PrivateRoute roles={["ADMIN"]} />,
        children: [
            {
                path: "/admin",
                element: <AdminLayout />,
                children: [
                    { index: true, element: <AdminDashboard /> },
                    { path: "recorridos", element: <ManageTours /> },
                    // { path: "recorridos/estados", element: <AdminToursByStatus /> }, // lo dejamos para luego
                ],
            },
        ],
    },

    // Errores
    { path: "/403", element: <Error403 /> },
    { path: "/*", element: <Error404 /> },
]);

