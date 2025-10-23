import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Shield, 
  Key, 
  FileCheck, 
  ArrowRight 
} from "lucide-react";

interface SetupSummaryItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  completed: boolean;
}

export default function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  
  const [showContent, setShowContent] = useState(false);

  // Animation sequence: show checkmark first, then content
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const setupSummary: SetupSummaryItem[] = [
    {
      icon: <Key className="w-5 h-5" strokeWidth={2.5} />,
      title: "Recovery Phrase Secured",
      description: mode === "create" 
        ? "Your 12-word recovery phrase has been created and backed up"
        : "Your wallet has been restored from your recovery phrase",
      completed: true,
    },
    {
      icon: <FileCheck className="w-5 h-5" strokeWidth={2.5} />,
      title: "Backup Verified",
      description: "You confirmed your recovery phrase and stored it safely offline",
      completed: mode === "create",
    },
    {
      icon: <Shield className="w-5 h-5" strokeWidth={2.5} />,
      title: "PIN Protection Enabled",
      description: "Your wallet is secured with a 6-digit PIN code",
      completed: true,
    },
  ];

  const handleGoToWallet = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col p-6 py-12 bg-gradient-to-b from-blue-50 to-white">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full mx-auto">
        
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            duration: 0.8 
          }}
          className="relative mb-8"
        >
          {/* Pulse circles */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatDelay: 0.5
            }}
            className="absolute inset-0 rounded-full bg-green-400"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatDelay: 0.5,
              delay: 0.3
            }}
            className="absolute inset-0 rounded-full bg-green-400"
          />
          
          {/* Main checkmark circle */}
          <div className="relative w-28 h-28 bg-green-500 rounded-full flex items-center justify-center shadow-xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Wallet Ready! 🎉
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            {mode === "create" 
              ? "Your wallet has been created and secured successfully"
              : "Your wallet has been restored and is ready to use"}
          </p>
        </motion.div>

        {/* Security Setup Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full mb-8"
        >
          <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">
            Security Setup Complete
          </h3>
          
          <div className="space-y-3">
            {setupSummary.map((item, index) => (
              item.completed && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  className="bg-white border-2 border-green-200 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-green-600">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {item.title}
                        </h4>
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </motion.div>

        {/* Important Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="w-full bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-8"
        >
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 text-sm mb-1">
                Keep Your Recovery Phrase Safe
              </h3>
              <p className="text-blue-800 text-xs leading-relaxed">
                Never share your recovery phrase with anyone. Store it in a secure 
                location. You'll need it to recover your wallet if you lose access.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Go to Wallet Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          onClick={handleGoToWallet}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
        >
          Go to Wallet
          <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Confetti-like decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ delay: 0.5 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: -20, 
              x: Math.random() * window.innerWidth,
              rotate: Math.random() * 360,
              scale: 0
            }}
            animate={{ 
              y: window.innerHeight + 20,
              rotate: Math.random() * 720,
              scale: [0, 1, 1, 0.5]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 1,
              ease: "linear"
            }}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-green-400' : 'bg-yellow-400'
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
}
