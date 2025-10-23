import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clipboard, 
  CheckCircle2, 
  AlertCircle,
  XCircle 
} from "lucide-react";
import { filterBIP39Words, isValidBIP39Word } from "../mocks/bip39Words";

export default function RestoreWallet() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "restore";

  const [wordCount, setWordCount] = useState<12 | 24>(12);
  const [words, setWords] = useState<string[]>(Array(12).fill(""));
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [validationState, setValidationState] = useState<("valid" | "invalid" | null)[]>(
    Array(12).fill(null)
  );
  const [showValidation, setShowValidation] = useState(false);
  const [pasteSuccess, setPasteSuccess] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleWordCountChange = (count: 12 | 24) => {
    setWordCount(count);
    setWords(Array(count).fill(""));
    setValidationState(Array(count).fill(null));
    setShowValidation(false);
  };

  const handleInputChange = (index: number, value: string) => {
    const newWords = [...words];
    const cleanValue = value.toLowerCase().trim();
    newWords[index] = cleanValue;
    setWords(newWords);

    // Reset validation when user types
    if (showValidation) {
      const newValidation = [...validationState];
      newValidation[index] = null;
      setValidationState(newValidation);
      setShowValidation(false);
    }

    // Show suggestions
    if (cleanValue.length > 0) {
      const filtered = filterBIP39Words(cleanValue, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (word: string, index: number) => {
    const newWords = [...words];
    newWords[index] = word;
    setWords(newWords);
    setSuggestions([]);

    // Move to next input
    if (index < wordCount - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleInputFocus = (index: number) => {
    setActiveInput(index);
    if (words[index]) {
      const filtered = filterBIP39Words(words[index], 5);
      setSuggestions(filtered);
    }
  };

  const handleInputBlur = () => {
    // Delay to allow suggestion click
    setTimeout(() => {
      setActiveInput(null);
      setSuggestions([]);
    }, 200);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const pastedWords = text
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 0);

      if (pastedWords.length === 12 || pastedWords.length === 24) {
        setWordCount(pastedWords.length as 12 | 24);
        setWords(pastedWords);
        setValidationState(Array(pastedWords.length).fill(null));
        setShowValidation(false);
        setPasteSuccess(true);
        setTimeout(() => setPasteSuccess(false), 2000);
      } else {
        alert(`Please paste exactly 12 or 24 words. Found ${pastedWords.length} words.`);
      }
    } catch (err) {
      console.error("Failed to paste:", err);
      alert("Failed to paste from clipboard");
    }
  };

  const handleValidate = () => {
    const newValidation = words.map(word => {
      if (!word.trim()) return null;
      return isValidBIP39Word(word) ? "valid" : "invalid";
    });
    setValidationState(newValidation);
    setShowValidation(true);
  };

  const handleRestore = () => {
    // Check if all words are filled and valid
    const allFilled = words.every(word => word.trim().length > 0);
    const allValid = words.every(word => isValidBIP39Word(word));

    if (!allFilled) {
      alert("Please fill in all words");
      return;
    }

    if (!allValid) {
      handleValidate();
      return;
    }

    // Navigate to app lock setup
    navigate(`/wallet-setup/app-lock?mode=${mode}`);
  };

  const handleBack = () => {
    navigate("/welcome");
  };

  const allValid = words.every(word => word.trim().length > 0 && isValidBIP39Word(word));
  const hasInvalidWords = showValidation && validationState.some(state => state === "invalid");
  const filledCount = words.filter(word => word.trim().length > 0).length;

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
      <div className="flex-1 flex flex-col items-center max-w-2xl w-full mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clipboard className="w-8 h-8 text-blue-600" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Restore Your Wallet</h2>
          <p className="text-gray-500 text-sm">
            Enter your recovery phrase to restore your wallet
          </p>
        </motion.div>

        {/* Word Count Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6"
        >
          <button
            onClick={() => handleWordCountChange(12)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              wordCount === 12
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            12 Words
          </button>
          <button
            onClick={() => handleWordCountChange(24)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              wordCount === 24
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            24 Words
          </button>
        </motion.div>

        {/* Paste Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full mb-6"
        >
          <button
            onClick={handlePaste}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {pasteSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-green-600">Pasted Successfully!</span>
              </>
            ) : (
              <>
                <Clipboard className="w-5 h-5" />
                Paste from Clipboard
              </>
            )}
          </button>
        </motion.div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6"
        >
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 text-sm mb-1">
                Security Reminder
              </h3>
              <p className="text-yellow-800 text-xs leading-relaxed">
                Never share your recovery phrase with anyone. Make sure you're in a private
                space and no one can see your screen.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Word Input Grid */}
        <div className="w-full grid grid-cols-2 gap-3 mb-6">
          {words.map((word, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.02 }}
              className="relative"
            >
              {/* Number Badge */}
              <div className="absolute -top-2 -left-2 z-10 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                {index + 1}
              </div>

              <div className="relative">
                <input
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  value={word}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onFocus={() => handleInputFocus(index)}
                  onBlur={handleInputBlur}
                  placeholder="type word"
                  className={`w-full px-3 py-3 pr-10 rounded-lg font-mono text-base border-2 transition-all focus:outline-none ${
                    validationState[index] === "valid"
                      ? "border-green-500 bg-green-50 text-green-900"
                      : validationState[index] === "invalid"
                      ? "border-red-500 bg-red-50 text-red-900"
                      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                {/* Validation Icon */}
                {validationState[index] && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {validationState[index] === "valid" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                )}
              </div>

              {/* Autocomplete Suggestions */}
              <AnimatePresence>
                {activeInput === index && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute z-20 w-full mt-1 bg-white border-2 border-blue-300 rounded-lg shadow-xl overflow-hidden"
                  >
                    {suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onMouseDown={() => handleSuggestionClick(suggestion, index)}
                        className="w-full px-4 py-3 text-left text-base font-mono hover:bg-blue-50 active:bg-blue-100 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Validation Error */}
        {hasInvalidWords && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6"
          >
            <div className="flex gap-3">
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 text-sm mb-1">
                  Invalid Words Detected
                </h3>
                <p className="text-red-800 text-xs leading-relaxed">
                  Some words are not valid BIP-39 words. Please check and correct them.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full flex gap-3"
        >
          <button
            onClick={handleValidate}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all"
          >
            Validate Words
          </button>
          <button
            onClick={handleRestore}
            disabled={!allValid}
            className={`flex-2 font-semibold py-4 px-8 rounded-xl transition-all ${
              allValid
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Restore Wallet ({filledCount}/{wordCount})
          </button>
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <div className="text-center mt-8">
        <p className="text-xs text-gray-400">Wallet Restoration</p>
      </div>
    </div>
  );
}
