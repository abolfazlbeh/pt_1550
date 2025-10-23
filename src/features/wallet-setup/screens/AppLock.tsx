import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Fingerprint, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AppLock() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "create";

  const [step, setStep] = useState<"create" | "confirm">("create");
  const [createPin, setCreatePin] = useState<string>("");
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  const createPinRefs = useRef<(HTMLInputElement | null)[]>([]);
  const confirmPinRefs = useRef<(HTMLInputElement | null)[]>([]);

  const PIN_LENGTH = 6;
  const currentPin = step === "create" ? createPin : confirmPin;
  const currentRefs = step === "create" ? createPinRefs : confirmPinRefs;

  useEffect(() => {
    // Focus first input on mount or step change
    if (currentRefs.current[0]) {
      currentRefs.current[0].focus();
    }
  }, [step]);

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newPin = currentPin.split("");
    newPin[index] = value.slice(-1); // Take only the last digit
    const updatedPin = newPin.join("");

    if (step === "create") {
      setCreatePin(updatedPin);
    } else {
      setConfirmPin(updatedPin);
    }

    // Auto-focus next input
    if (value && index < PIN_LENGTH - 1) {
      currentRefs.current[index + 1]?.focus();
    }

    // Auto-submit when PIN is complete
    if (updatedPin.length === PIN_LENGTH) {
      if (step === "create") {
        // Move to confirm step
        setTimeout(() => {
          setStep("confirm");
          setError("");
        }, 300);
      } else {
        // Validate PIN match
        setTimeout(() => {
          handleValidatePin(updatedPin);
        }, 300);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newPin = currentPin.split("");
      
      if (currentPin[index]) {
        // Clear current digit
        newPin[index] = "";
      } else if (index > 0) {
        // Move to previous digit and clear it
        newPin[index - 1] = "";
        currentRefs.current[index - 1]?.focus();
      }

      const updatedPin = newPin.join("");
      if (step === "create") {
        setCreatePin(updatedPin);
      } else {
        setConfirmPin(updatedPin);
      }
    }
  };

  const handleValidatePin = (pin: string) => {
    if (pin === createPin) {
      setError("");
      setShowSuccess(true);
      // Navigate to success screen after showing success state
      setTimeout(() => {
        navigate(`/wallet-setup/success?mode=${mode}`);
      }, 1500);
    } else {
      setError("PINs don't match. Please try again.");
      setConfirmPin("");
      // Shake animation will be triggered by error state
      setTimeout(() => {
        setError("");
        if (confirmPinRefs.current[0]) {
          confirmPinRefs.current[0].focus();
        }
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step === "confirm") {
      setStep("create");
      setConfirmPin("");
      setError("");
    } else {
      navigate(`/wallet-setup/confirmation?mode=${mode}`);
    }
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
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {/* Title */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-600" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {step === "create" ? "Create Your PIN" : "Confirm Your PIN"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {step === "create"
                    ? "Set a 6-digit PIN to secure your wallet"
                    : "Enter your PIN again to confirm"}
                </p>
              </div>

              {/* PIN Input Grid */}
              <div className="flex justify-center gap-3 mb-6">
                {Array.from({ length: PIN_LENGTH }).map((_, index) => (
                  <motion.input
                    key={`${step}-${index}`}
                    ref={(el) => {
                      if (step === "create") {
                        createPinRefs.current[index] = el;
                      } else {
                        confirmPinRefs.current[index] = el;
                      }
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={currentPin[index] || ""}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      ...(error && step === "confirm"
                        ? {
                            x: [0, -10, 10, -10, 10, 0],
                            transition: { duration: 0.5 },
                          }
                        : {}),
                    }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all focus:outline-none ${
                      error && step === "confirm"
                        ? "border-red-500 bg-red-50 text-red-900"
                        : currentPin[index]
                        ? "border-blue-500 bg-blue-50 text-blue-900"
                        : "border-gray-300 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                    }`}
                    autoComplete="off"
                  />
                ))}
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6"
                  >
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-red-900 text-sm mb-1">
                          PIN Mismatch
                        </h3>
                        <p className="text-red-800 text-xs leading-relaxed">
                          {error}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Biometric Option - Disabled (Coming Soon) */}
              {step === "create" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full mt-8"
                >
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 opacity-60">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Fingerprint className="w-6 h-6 text-gray-400" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-500 text-base">
                              Biometric Login
                            </h3>
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                              Coming Soon
                            </span>
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed">
                            Face ID and Touch ID will be available in a future update
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Progress Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mt-6"
              >
                <p className="text-xs text-gray-400">
                  {step === "create"
                    ? `${currentPin.length}/${PIN_LENGTH} digits entered`
                    : `Step 2 of 2 • Confirming PIN`}
                </p>
              </motion.div>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-12 h-12 text-green-600" strokeWidth={2.5} />
              </motion.div>
              
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                PIN Created Successfully!
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Your wallet is now protected with a secure PIN
              </p>

              <div className="w-full bg-green-50 border-2 border-green-300 rounded-xl p-5">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-green-900 text-sm mb-1">
                      Security Enabled
                    </h3>
                    <p className="text-green-800 text-xs leading-relaxed">
                      Your wallet is now protected with your 6-digit PIN. You'll need to enter it each time you access your wallet.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="text-center mt-8">
        <p className="text-xs text-gray-400">Step 6 of 8 • Wallet Creation</p>
      </div>
    </div>
  );
}
