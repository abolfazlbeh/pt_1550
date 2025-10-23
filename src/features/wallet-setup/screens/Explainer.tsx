import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Key, Lock } from "lucide-react";

interface ExplainerCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const explainerCards: ExplainerCard[] = [
  {
    id: 1,
    icon: <Key className="w-12 h-12" strokeWidth={2} />,
    title: "Your Keys, Your Control",
    description:
      "You are the sole owner of your wallet. No one else can access your funds without your recovery phrase.",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 2,
    icon: <Shield className="w-12 h-12" strokeWidth={2} />,
    title: "Secure by Design",
    description:
      "Your recovery phrase is encrypted and stored only on your device. We never have access to your funds.",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 3,
    icon: <Lock className="w-12 h-12" strokeWidth={2} />,
    title: "Backup is Essential",
    description:
      "Write down your recovery phrase on paper. If you lose it, your funds are gone forever. No one can recover them for you.",
    color: "from-indigo-500 to-indigo-600",
  },
];

export default function Explainer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const [currentCard, setCurrentCard] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const nextCard = () => {
    if (currentCard < explainerCards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const previousCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleContinue = () => {
    navigate(`/wallet-setup/pre-reveal-tips?mode=${mode}`);
  };

  const handleSkip = () => {
    navigate(`/wallet-setup/pre-reveal-tips?mode=${mode}`);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextCard();
    }
    if (isRightSwipe) {
      previousCard();
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          onClick={() => navigate("/welcome")}
          aria-label="Back"
        >
          <span className="text-xl">←</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center max-w-md w-full mx-auto pt-24">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Before We Begin
        </h2>
        <p className="text-gray-500 text-center mb-12 text-sm">
          A few important things to know about your wallet
        </p>

        {/* Card Carousel */}
        <div 
          className="relative w-full h-72 mb-8"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            {explainerCards.map(
              (card, index) =>
                index === currentCard && (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-full h-full bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200 flex flex-col">
                      {/* Icon */}
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-6 mx-auto text-white shadow-lg flex-shrink-0`}
                      >
                        {card.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-center mb-4 flex-shrink-0">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-center leading-relaxed flex-grow">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex gap-2 mb-8">
          {explainerCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCard(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentCard
                  ? "w-8 bg-blue-600"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Button - Only on last card */}
        {currentCard === explainerCards.length - 1 && (
          <div className="w-full">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
              onClick={handleContinue}
            >
              I Understand
            </button>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="text-center mt-8">
        <p className="text-xs text-gray-400">
          Step 1 of 7 • Wallet Creation
        </p>
      </div>
    </div>
  );
}
