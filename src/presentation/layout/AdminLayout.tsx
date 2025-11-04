import { Outlet } from "react-router";
import AdminSidebar from "../sections/AdminSidebar";

export default function AdminLayout() {
    return (
        <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                <Outlet />
            </main>
        </div>
    );
}
