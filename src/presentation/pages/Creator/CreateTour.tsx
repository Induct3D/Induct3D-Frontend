import ModelViewerCanvas from "../../sections/Creator/ModelViewerCanvas.tsx";
import CustomizationSidebar from "../../sections/Creator/CustomizationSidebar.tsx";

export default function CreateTour() {
    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-gray-100">
                <ModelViewerCanvas />
            </div>
            <CustomizationSidebar />
        </div>
    );
}

