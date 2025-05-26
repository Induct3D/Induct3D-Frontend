import ModelViewerCanvas from "../../sections/Creator/ModelViewerCanvas.tsx";
import CustomizationSidebar from "../../sections/Creator/CustomizationSidebar.tsx";
import {templateMock} from "../../../infrastructure/constants/templateMock.ts";


export default function CreateTour() {
    const { glbUrl, predefinedSteps, UserStart } = templateMock;

    return (
        <div className="flex h-full">
            <div className="flex-1 bg-gray-100">
                <ModelViewerCanvas
                    glbUrl={glbUrl}
                    predefinedSteps={predefinedSteps}
                    userStart={UserStart}
                />
            </div>
            <CustomizationSidebar
                glbUrl={glbUrl}
                predefinedSteps={predefinedSteps}
            />
        </div>
    );
}


