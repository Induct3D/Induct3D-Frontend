import { useState } from "react";
import RecoverStep1 from "../sections/RecoverSections/RecoverStep1";
import RecoverStep2 from "../sections/RecoverSections/RecoverStep2.tsx";
import RecoverStep3 from "../sections/RecoverSections/RecoverStep3.tsx";

export default function RecoverPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                {step === 1 && (
                    <RecoverStep1
                        onNext={() => setStep(2)}
                        setEmail={setEmail}
                    />
                )}
                {step === 2 && (
                    <RecoverStep2
                        onNext={() => setStep(3)}
                        setCode={setCode}
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

