import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  
  const flows = [
    {
      key: "welcome",
      title: "Welcome Flow",
      description: "Onboarding experience for new users",
      path: "/welcome",
    },
    {
      key: "coming-soon",
      title: "Coming Soon",
      description: "More flows will be added here",
      path: "#",
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen p-6 sm:p-8 pt-12">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            💰
          </div>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              KhodPay Prototype
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Select a flow to explore different user journeys and experiences
            </p>
          </div>
        </div>

        <div className="h-12" />

        {/* Flow Menu Items */}
        <div className="flex flex-col gap-3">
          {flows.map((flow) => (
            <button
              key={flow.key}
              onClick={() => !flow.disabled && navigate(flow.path)}
              disabled={flow.disabled}
              className={`w-full p-0 ${flow.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`w-full border rounded-2xl shadow-sm ${
                  flow.disabled 
                    ? "border-gray-200 bg-gray-50 opacity-60" 
                    : "border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                }`}
              >
                <div className="py-4 px-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 text-left">
                      <h3 className={`text-base font-semibold ${
                        flow.disabled ? "text-gray-400" : "text-gray-900"
                      }`}>
                        {flow.title}
                      </h3>
                      <p className={`text-sm ${
                        flow.disabled ? "text-gray-300" : "text-gray-500"
                      }`}>
                        {flow.description}
                      </p>
                    </div>
                    <div className={`text-2xl ${
                      flow.disabled ? "text-gray-300" : "text-blue-600"
                    }`}>
                      {flow.disabled ? "•" : "→"}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="h-16" />

        {/* Footer */}
        <div className="border-t border-gray-200" />
        <div className="h-8" />
        <div className="flex justify-center">
          <p className="text-xs text-gray-400">
            This is a prototype environment • All data is simulated
          </p>
        </div>
      </div>
    </div>
  );
}
