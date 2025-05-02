import Header from "../sections/header.tsx";
import {Outlet} from "react-router";
import Footer from "../sections/Footer.tsx";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen ">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}