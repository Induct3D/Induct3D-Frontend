import { Outlet } from "react-router";
import Sidebar from "../sections/Sidebar.tsx";

export default function CreatorLayout() {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar fijo */}
            <Sidebar />

            {/* Contenido scrollable */}
            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                <Outlet />
            </main>
        </div>
    );
}

