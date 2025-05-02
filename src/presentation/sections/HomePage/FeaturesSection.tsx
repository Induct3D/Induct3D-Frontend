import {FEATURES} from "../../../infrastructure/constants/features.ts";
import FeatureCard from "../../components/FeatureCard.tsx";


const FeaturesSection = () => {
    return (
        <section className="w-full bg-white py-20 px-6 md:px-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                ¿Qué hace especial a <span className="text-[#A71C20]">Induct3D</span>?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {FEATURES.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} />
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
