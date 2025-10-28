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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "recorridos", element: <Tours /> },
            { path: "terms", element: <Terms/> },
            { path: "privacy", element: <Privacy/> },
            { path: "consent", element: <Consent/> },
        ]
    },

    // Rutas protegidas
    {
        path: "/dashboard",
        element: <PrivateRoute />,
        children: [
            {
                path: "",
                element: <CreatorLayout />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: "crear", element: <CreateTour /> },
                    { path: "editar/:id", element: <EditTour /> }
                ]
            }
        ]
    },

    // Públicas (SOLO accesibles si NO hay token)
  {
    element: <PublicRoute />,
    children: [
      { path: "iniciar-sesion", element: <Login /> },
      { path: "registrarse", element: <Register /> },
      { path: "recuperar-contrasena", element: <RecoverPassword /> },
    ],
  },

    { path: "/recorrido/:id", element: <ViewTour /> },

    { path: "/*", element: <Error404 /> }
])
