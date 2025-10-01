import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Back Button */}
      <Button
        isIconOnly
        variant="light"
        className="absolute top-4 left-4"
        onPress={() => navigate("/")}
        aria-label="Back to home"
        size="lg"
      >
        <span className="text-xl">←</span>
      </Button>

      {/* Wallet Icon */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-8">
        <svg 
          className="w-12 h-12 sm:w-14 sm:h-14 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
          />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3">
        Welcome to<br />KhodPay
      </h1>
      
      {/* Subtitle */}
      <p className="text-center text-default-500 text-base sm:text-lg max-w-sm">
        Your secure non-custodial crypto wallet
      </p>
    </div>
  );
}
