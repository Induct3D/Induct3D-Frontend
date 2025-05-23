import { Outlet, useNavigate } from "react-router";
import Sidebar from "../sections/Sidebar.tsx";
import { useState } from "react";
import SelectTemplateModal from "../components/Modals/SelectTemplateModal.tsx";

export default function CreatorLayout() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleConfirmTemplate = (templateId: string | null) => {
        if (templateId) {
            setIsModalOpen(false);
            navigate(`/dashboard/crear?template=${templateId}`);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar onOpenModal={() => setIsModalOpen(true)} />

            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                <Outlet />
            </main>

            <SelectTemplateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmTemplate}
            />
        </div>
    );
}


