import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { MOCK_SEED_PHRASES, getRandomWordPositions } from "../mocks/mockSeedPhrases";
import { BIP39_WORDS } from "../mocks/bip39Words";

interface WordQuestion {
  position: number;
  correctWord: string;
  options: string[];
  selectedWord: string | null;
  isCorrect: boolean | null;
}

// Generate 4 random word options including the correct answer
const generateWordOptions = (correctWord: string, allWords: string[]): string[] => {
  const options = [correctWord];
  const availableWords = allWords.filter(w => w !== correctWord);
  
  while (options.length < 4) {
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    if (!options.includes(randomWord)) {
      options.push(randomWord);
    }
  }
  
  // Shuffle options
  return options.sort(() => Math.random() - 0.5);
};

export default function SeedConfirmation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "create";

  const [seedPhrase] = useState<string[]>(MOCK_SEED_PHRASES[0]);
  const [questions] = useState<WordQuestion[]>(() => {
    const positions = getRandomWordPositions(3);
    return positions.map(position => ({
      position,
      correctWord: seedPhrase[position - 1],
      options: generateWordOptions(seedPhrase[position - 1], BIP39_WORDS),
      selectedWord: null,
      isCorrect: null,
    }));
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<WordQuestion[]>(questions);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = answers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === answers.length - 1;
  const allAnswered = answers.every(q => q.isCorrect === true);

  const handleSelectWord = (word: string) => {
    if (showFeedback) return; // Prevent changing after feedback shown

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      ...currentQuestion,
      selectedWord: word,
      isCorrect: word === currentQuestion.correctWord,
    };
    setAnswers(newAnswers);
    setShowFeedback(true);

    // Auto-advance after showing feedback
    setTimeout(() => {
      if (word === currentQuestion.correctWord) {
        if (!isLastQuestion) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setShowFeedback(false);
        }
      } else {
        // Allow retry on same question
        setShowFeedback(false);
        newAnswers[currentQuestionIndex].selectedWord = null;
        newAnswers[currentQuestionIndex].isCorrect = null;
        setAnswers(newAnswers);
      }
    }, 1500);
  };

  const handleContinue = () => {
    navigate(`/wallet-setup/app-lock?mode=${mode}`);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0 && !showFeedback) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate(`/wallet-setup/post-reveal-checklist?mode=${mode}`);
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
        {!allAnswered ? (
          <>
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-blue-600" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Verify Your Recovery Phrase</h2>
              <p className="text-gray-500 text-sm">
                Select the correct word to confirm your backup
              </p>
            </motion.div>

            {/* Progress Indicators */}
            <div className="flex items-center gap-2 mb-8">
              {answers.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentQuestionIndex
                      ? "w-8 bg-blue-600"
                      : index < currentQuestionIndex
                      ? "w-2 bg-green-500"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Info Banner */}
                <div className="w-full bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-blue-800 text-sm leading-relaxed">
                        <span className="font-semibold">Question {currentQuestionIndex + 1} of {answers.length}:</span> Select word #{currentQuestion.position} from your recovery phrase
                      </p>
                    </div>
                  </div>
                </div>

                {/* Word Options */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {currentQuestion.options.map((word, index) => {
                    const isSelected = currentQuestion.selectedWord === word;
                    const isCorrect = isSelected && currentQuestion.isCorrect === true;
                    const isIncorrect = isSelected && currentQuestion.isCorrect === false;

                    return (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          ...(isIncorrect ? {
                            x: [0, -10, 10, -10, 10, 0],
                            transition: { duration: 0.5 }
                          } : {})
                        }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleSelectWord(word)}
                        disabled={showFeedback}
                        className={`p-5 rounded-xl font-mono text-base font-medium border-2 transition-all ${
                          isCorrect
                            ? "bg-green-50 border-green-500 text-green-900"
                            : isIncorrect
                            ? "bg-red-50 border-red-500 text-red-900"
                            : "bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-900"
                        } ${
                          showFeedback ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        {word}
                        {isCorrect && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-2 inline-block"
                          >
                            <CheckCircle2 className="w-5 h-5 inline text-green-600" />
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Feedback Message */}
                <AnimatePresence>
                  {showFeedback && currentQuestion.isCorrect === false && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full bg-red-50 border-2 border-red-300 rounded-xl p-4"
                    >
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-red-900 text-sm mb-1">
                            Incorrect Word
                          </h3>
                          <p className="text-red-800 text-xs leading-relaxed">
                            That's not the right word. Check your backup and try again.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* Success State */
          <motion.div
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
              Perfect! All Words Verified
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              You've successfully confirmed your recovery phrase backup
            </p>

            <div className="w-full bg-green-50 border-2 border-green-300 rounded-xl p-5 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-green-900 text-sm mb-1">
                    Backup Verified
                  </h3>
                  <p className="text-green-800 text-xs leading-relaxed">
                    You can now recover your wallet using your 12-word recovery phrase.
                    Keep it safe and never share it with anyone.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full font-semibold py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all"
            >
              Continue to App Lock Setup
            </button>
          </motion.div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="text-center mt-8">
        <p className="text-xs text-gray-400">Step 5 of 8 • Wallet Creation</p>
      </div>
    </div>
  );
}
