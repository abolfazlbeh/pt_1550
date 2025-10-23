import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FileCheck, 
  Lock, 
  MonitorOff, 
  ShieldCheck, 
  AlertCircle 
} from "lucide-react";

interface ChecklistItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
}

export default function PostRevealChecklist() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "create";

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: "written",
      icon: <FileCheck className="w-6 h-6" strokeWidth={2.5} />,
      title: "Written on Paper",
      description:
        "I have written down all 12 words in the correct order on physical paper.",
      checked: false,
    },
    {
      id: "stored",
      icon: <Lock className="w-6 h-6" strokeWidth={2.5} />,
      title: "Stored Safely",
      description:
        "I have stored my recovery phrase in a secure location where only I can access it.",
      checked: false,
    },
    {
      id: "no-digital",
      icon: <MonitorOff className="w-6 h-6" strokeWidth={2.5} />,
      title: "No Digital Copies",
      description:
        "I have not taken screenshots, photos, or saved it digitally anywhere.",
      checked: false,
    },
    {
      id: "verified",
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />,
      title: "Double-Checked",
      description:
        "I have verified that I wrote down each word correctly and can read my handwriting.",
      checked: false,
    },
  ]);

  const allChecked = checklistItems.every((item) => item.checked);

  const handleToggleItem = (id: string) => {
    setChecklistItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleContinue = () => {
    navigate(`/wallet-setup/confirmation?mode=${mode}`);
  };

  const handleBack = () => {
    navigate(`/wallet-setup/reveal-seed?mode=${mode}`);
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
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-blue-600" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Backup Verification</h2>
          <p className="text-gray-500 text-sm">
            Confirm you've followed these security best practices
          </p>
        </motion.div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6"
        >
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 text-sm mb-1">
                Critical: Do Not Skip These Steps
              </h3>
              <p className="text-red-800 text-xs leading-relaxed">
                If you lose your recovery phrase, your wallet and all funds will
                be permanently lost. Take these security measures seriously.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Checklist Items */}
        <div className="w-full space-y-4 mb-6">
          {checklistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <label
                className={`flex items-start gap-4 cursor-pointer p-5 rounded-xl border-2 transition-all ${
                  item.checked
                    ? "bg-green-50 border-green-300 hover:border-green-400"
                    : "bg-gray-50 border-gray-200 hover:border-blue-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggleItem(item.id)}
                  className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        item.checked
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <h3
                      className={`font-semibold text-base ${
                        item.checked ? "text-green-900" : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      item.checked ? "text-green-800" : "text-gray-600"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </label>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full"
        >
          <button
            disabled={!allChecked}
            onClick={handleContinue}
            className={`w-full font-semibold py-4 px-6 rounded-xl transition-all ${
              allChecked
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {allChecked
              ? "Continue to Verification"
              : `Check All Items to Continue (${
                  checklistItems.filter((i) => i.checked).length
                }/${checklistItems.length})`}
          </button>
        </motion.div>

        {/* Additional Security Tip */}
        {allChecked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4"
          >
            <div className="flex gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 text-sm mb-1">
                  Great Job!
                </h3>
                <p className="text-blue-800 text-xs leading-relaxed">
                  You're taking the right steps to secure your wallet. Next,
                  we'll verify that you've correctly saved your recovery phrase.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="text-center mt-8">
        <p className="text-xs text-gray-400">Step 4 of 8 • Wallet Creation</p>
      </div>
    </div>
  );
}
