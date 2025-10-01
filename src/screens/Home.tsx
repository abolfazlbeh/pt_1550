import { Avatar, Spacer, Card, CardBody, Button, Divider } from "@heroui/react";
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
          <Avatar
            icon={<span className="text-3xl">💰</span>}
            size="lg"
            color="secondary"
          />
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              KhodPay Prototype
            </h1>
            <p className="text-default-500 text-sm sm:text-base">
              Select a flow to explore different user journeys and experiences
            </p>
          </div>
        </div>

        <Spacer y={6} />

        {/* Flow Menu Items */}
        <div className="flex flex-col gap-3">
          {flows.map((flow) => (
            <Button
              key={flow.key}
              onPress={() => navigate(flow.path)}
              isDisabled={flow.disabled}
              className="w-full p-0 h-auto min-h-0 bg-transparent data-[hover=true]:bg-transparent"
              disableRipple
              disableAnimation
            >
              <Card
                shadow="sm"
                radius="lg"
                className={`w-full border ${
                  flow.disabled 
                    ? "border-default-100 bg-default-50 opacity-60" 
                    : "border-default-100"
                }`}
              >
                <CardBody className="py-4 px-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 text-left">
                      <h3 className={`text-base font-semibold ${
                        flow.disabled ? "text-default-400" : ""
                      }`}>
                        {flow.title}
                      </h3>
                      <p className={`text-sm ${
                        flow.disabled ? "text-default-300" : "text-default-500"
                      }`}>
                        {flow.description}
                      </p>
                    </div>
                    <div className={`text-2xl ${
                      flow.disabled ? "text-default-300" : "text-primary"
                    }`}>
                      {flow.disabled ? "•" : "→"}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Button>
          ))}
        </div>

        <Spacer y={8} />

        {/* Footer */}
        <Divider />
        <Spacer y={4} />
        <div className="flex justify-center">
          <p className="text-xs text-default-400">
            This is a prototype environment • All data is simulated
          </p>
        </div>
      </div>
    </div>
  );
}
