import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, AlertTriangle, Copy, Check } from "lucide-react";
import { MOCK_SEED_PHRASES } from "../mocks/mockSeedPhrases";

export default function RevealSeed() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "create";

  const [seedPhrase] = useState<string[]>(MOCK_SEED_PHRASES[0]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [hasWrittenDown, setHasWrittenDown] = useState(false);
  const [copied, setCopied] = useState(false);

  const holdTimerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const HOLD_DURATION = 3000; // 3 seconds

  const startHold = () => {
    if (isRevealed) return;

    setIsHolding(true);
    startTimeRef.current = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setHoldProgress(progress);

      if (progress < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setIsRevealed(true);
        setIsHolding(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const stopHold = () => {
    if (!isRevealed) {
      setIsHolding(false);
      setHoldProgress(0);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
      }
    };
  }, []);

  const handleCopySeed = async () => {
    try {
      await navigator.clipboard.writeText(seedPhrase.join(" "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleContinue = () => {
    navigate(`/wallet-setup/write-tips?mode=${mode}`);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          onClick={() => navigate(`/wallet-setup/explainer?mode=${mode}`)}
          aria-label="Back"
        >
          <span className="text-xl">←</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center max-w-md w-full mx-auto">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Your Recovery Phrase
        </h2>
        <p className="text-gray-500 text-center mb-8 text-sm">
          {isRevealed
            ? "Write these words down in order and keep them safe"
            : "Hold the button below to reveal your secret recovery phrase"}
        </p>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-6"
        >
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 text-sm mb-1">
                Never share your recovery phrase
              </h3>
              <p className="text-yellow-800 text-xs leading-relaxed">
                Anyone with these words can access your wallet and steal your
                funds. Keep them private and secure.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hold to Reveal Button or Seed Grid */}
        <div className="w-full mb-6">
          {!isRevealed ? (
            <motion.div className="flex flex-col items-center">
              <button
                onMouseDown={startHold}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
                onTouchStart={startHold}
                onTouchEnd={stopHold}
                className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg flex items-center justify-center active:scale-95 transition-transform"
              >
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="58"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 58}
                    strokeDashoffset={
                      2 * Math.PI * 58 - (holdProgress / 100) * 2 * Math.PI * 58
                    }
                    style={{ transition: isHolding ? "none" : "all 0.2s" }}
                  />
                </svg>

                {/* Icon */}
                <Eye className="w-12 h-12 text-white relative z-10" />
              </button>

              <p className="text-sm text-gray-500 mt-4 text-center">
                {isHolding
                  ? "Keep holding..."
                  : "Hold to reveal recovery phrase"}
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Seed Words Grid */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 mb-4">
                  <div className="grid grid-cols-3 gap-3">
                    {seedPhrase.map((word, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white border border-gray-300 rounded-lg p-3 flex items-center gap-3"
                      >
                        <span className="text-xs font-medium text-gray-400 w-5">
                          {index + 1}.
                        </span>
                        <span className="font-mono font-medium text-gray-900">
                          {word}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopySeed}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy to Clipboard
                    </>
                  )}
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Confirmation Checkbox */}
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full mb-6"
          >
            <label className="flex items-start gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <input
                type="checkbox"
                checked={hasWrittenDown}
                onChange={(e) => setHasWrittenDown(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                I have written down my recovery phrase on paper and stored it in
                a safe place
              </span>
            </label>
          </motion.div>
        )}

        {/* Continue Button */}
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full"
          >
            <button
              disabled={!hasWrittenDown}
              onClick={handleContinue}
              className={`w-full font-semibold py-4 px-6 rounded-xl transition-all ${
                hasWrittenDown
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </motion.div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="text-center mt-8">
        <p className="text-xs text-gray-400">
          Step 2 of 7 • Wallet Creation
        </p>
      </div>
    </div>
  );
}
