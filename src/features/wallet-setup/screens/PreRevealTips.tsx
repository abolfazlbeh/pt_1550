import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PenLine, Camera, Eye, ShieldAlert } from "lucide-react";

interface SecurityTip {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  type: "info" | "warning";
}

const securityTips: SecurityTip[] = [
  {
    id: 1,
    icon: <PenLine className="w-6 h-6" strokeWidth={2.5} />,
    title: "Get Pen and Paper Ready",
    description:
      "You'll need to write down 12 words. Have physical paper and a pen ready now.",
    type: "info",
  },
  {
    id: 2,
    icon: <Camera className="w-6 h-6" strokeWidth={2.5} />,
    title: "Never Take Screenshots",
    description:
      "Screenshots can be stolen from cloud backups, leaked, or accessed by malware. Always write on paper.",
    type: "warning",
  },
  {
    id: 3,
    icon: <Eye className="w-6 h-6" strokeWidth={2.5} />,
    title: "Find a Private Space",
    description:
      "Make sure no one can see your screen or look over your shoulder while viewing your recovery phrase.",
    type: "info",
  },
  {
    id: 4,
    icon: <ShieldAlert className="w-6 h-6" strokeWidth={2.5} />,
    title: "Never Share With Anyone",
    description:
      "Anyone with these words can steal your funds. Not even support staff will ever ask for them.",
    type: "warning",
  },
];

export default function PreRevealTips() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const [currentStep, setCurrentStep] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  const isLastStep = currentStep === securityTips.length;
  const currentTip = securityTips[currentStep];
  
  const handleNext = () => {
    if (currentStep < securityTips.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    navigate(`/wallet-setup/reveal-seed?mode=${mode}`);
  };

  const handleBack = () => {
    navigate(`/wallet-setup/explainer?mode=${mode}`);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          onClick={handleBack}
          aria-label="Back"
        >
          <span className="text-xl">←</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center max-w-md w-full mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">Before You See Your Recovery Phrase</h2>
          <p className="text-gray-500 text-sm">
            Follow these security tips to keep your wallet safe
          </p>
        </motion.div>

        {/* Step Indicators */}
        <div className="flex items-center gap-2 mb-8">
          {securityTips.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "w-8 bg-blue-600"
                  : index < currentStep
                  ? "w-2 bg-blue-400"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Wizard Content */}
        {!isLastStep ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full mb-8"
          >
            {/* Current Tip Card */}
            <div
              className={`p-8 rounded-2xl border-2 ${
                currentTip.type === "warning"
                  ? "bg-red-50 border-red-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto ${
                  currentTip.type === "warning"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {currentTip.icon}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3
                  className={`text-xl font-bold mb-3 ${
                    currentTip.type === "warning" ? "text-red-900" : "text-blue-900"
                  }`}
                >
                  {currentTip.title}
                </h3>
                <p
                  className={`text-base leading-relaxed ${
                    currentTip.type === "warning" ? "text-red-800" : "text-blue-800"
                  }`}
                >
                  {currentTip.description}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="flex-1 font-semibold py-4 px-6 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  Previous
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 font-semibold py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all"
              >
                {currentStep === securityTips.length - 1 ? "Continue" : "Next"}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* All tips completed - show final confirmation */}
            <div className="space-y-6">

              {/* Critical Warning Banner */}
              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-5">
                <div className="flex gap-3">
                  <ShieldAlert className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-900 text-base mb-2">
                      This is Your Responsibility
                    </h3>
                    <p className="text-yellow-800 text-sm leading-relaxed">
                      If you lose your recovery phrase, no one can help you recover your wallet. 
                      Not us, not anyone. Take this seriously.
                    </p>
                  </div>
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer p-5 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
                <input
                  type="checkbox"
                  checked={isReady}
                  onChange={(e) => setIsReady(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  I have pen and paper ready, I'm in a private space, and I understand 
                  the security risks
                </span>
              </label>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrevious}
                  className="flex-1 font-semibold py-4 px-6 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  disabled={!isReady}
                  onClick={handleContinue}
                  className={`flex-1 font-semibold py-4 px-6 rounded-xl transition-all ${
                    isReady
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  I'm Ready to Continue
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="text-center mt-8">
        <p className="text-xs text-gray-400">
          Step 2 of 8 • Wallet Creation
        </p>
      </div>
    </div>
  );
}
