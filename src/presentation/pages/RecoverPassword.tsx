import { useState } from "react";
import RecoverStep1 from "../sections/RecoverSections/RecoverStep1";
import RecoverStep2 from "../sections/RecoverSections/RecoverStep2";
import RecoverStep3 from "../sections/RecoverSections/RecoverStep3";

export default function RecoverPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    const Stepper = () => (
        <div className="mb-6 flex items-center justify-center gap-2 text-xs text-gray-600">
            {[1,2,3].map(s => (
                <div key={s} className={`h-1 w-16 rounded ${s<=step ? "bg-[#A71C20]" : "bg-gray-200"}`} />
            ))}
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <Stepper />
                {step === 1 && <RecoverStep1 onNext={() => setStep(2)} setEmail={setEmail} />}
                {step === 2 && (
                    <RecoverStep2
                        onNext={() => setStep(3)}
                        setCode={setCode}
                        email={email}
                    />
                )}
                {step === 3 && (
                    <RecoverStep3
                        email={email}
                        code={code}
                    />
                )}
            </div>
        </div>
    );
}
