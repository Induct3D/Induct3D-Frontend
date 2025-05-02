import {createBrowserRouter} from "react-router";
import Layout from "../../presentation/layout/Layout.tsx";
import Home from "../../presentation/pages/Home.tsx";
import Tours from "../../presentation/pages/Tours.tsx";
import Login from "../../presentation/pages/Login.tsx";
import Error404 from "../../presentation/pages/Error404.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {index: true, element: <Home/>},
            // {path: "recorridos", element: <Tours/>}
        ]
    },
    // {path: "iniciar-sesion", element: <Login/>},
    {path: "/*", element: <Error404/>}
])