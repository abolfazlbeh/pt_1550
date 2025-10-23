import { useNavigate } from "react-router-dom";
import { Wallet, Plus, Download } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 py-12">
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        onClick={() => navigate("/")}
        aria-label="Back to home"
      >
        <span className="text-xl">←</span>
      </button>

      {/* Top Section */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
        {/* Wallet Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <Wallet className="w-14 h-14 sm:w-16 sm:h-16 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          Welcome to
          <br />
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            KhodPay
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-600 text-base sm:text-lg max-w-sm mb-2">
          Your keys. Your crypto.
        </p>
        
        <p className="text-center text-gray-500 text-sm max-w-sm">
          A secure non-custodial wallet for the self-custody era
        </p>
      </div>

      {/* Bottom Section - Action Buttons */}
      <div className="w-full max-w-md space-y-3">
        {/* Create Wallet Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          onClick={() => navigate("/wallet-setup/explainer?mode=create")}
        >
          <span>Create New Wallet</span>
        </button>

        {/* Restore Wallet Button */}
        <button
          className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl border-2 border-gray-300 transition-colors flex items-center justify-center gap-2"
          onClick={() => navigate("/wallet-setup/restore?mode=restore")}
        >
          <span>Restore Existing Wallet</span>
        </button>

      </div>
    </div>
  );
}
