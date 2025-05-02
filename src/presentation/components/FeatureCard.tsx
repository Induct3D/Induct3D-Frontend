import {FeatureItem} from "../../infrastructure/constants/features.ts";

interface FeatureCardProps {
    feature: FeatureItem;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
    const { title, description, icon: Icon } = feature;

    return (
        <div className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#A71C20] text-white rounded-full flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#A71C20] mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
};

export default FeatureCard;
