import HeroSection from "../sections/HomePage/HeroSection.tsx";
import WhatIsSection from "../sections/HomePage/WhatIsSection.tsx";
import HowItWorksSection from "../sections/HomePage/HowItWorksSection.tsx";
import FeaturesSection from "../sections/HomePage/FeaturesSection.tsx";
import JoinNowSection from "../sections/HomePage/JoinNowSection.tsx";

export default function Home() {
    return(
        <div>
            <HeroSection/>
            <WhatIsSection/>
            <HowItWorksSection/>
            <FeaturesSection/>
            <JoinNowSection/>
        </div>
    )
}