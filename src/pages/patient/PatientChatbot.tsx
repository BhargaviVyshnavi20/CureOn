import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  Settings,
  Send,
  HeartPulse,
  User,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/patient/appointments", icon: Calendar },
  { name: "Medical Records", href: "/patient/records", icon: FileText },
  { name: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
  { name: "Health Assistant", href: "/patient/chatbot", icon: HeartPulse },
  { name: "Settings", href: "/patient/settings", icon: Settings },
];

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const PatientChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your healthcare assistant. I can help you with:\n\n• Disease-related queries\n• General health guidance\n• Understanding prescriptions or reports\n\nHow can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        default: "Thank you for your question. While I can provide general health information, please consult with your doctor for personalized medical advice. Is there anything specific I can help you understand about your health?",
        headache: "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or eye strain. For relief, try resting in a dark room, staying hydrated, and taking over-the-counter pain relievers if appropriate. If headaches persist or are severe, please consult your doctor.",
        prescription: "I can help you understand your prescriptions! To get information about a specific medication, please share the name of the medicine, and I'll provide details about its usage, dosage guidelines, and potential side effects.",
        appointment: "To book an appointment, please visit the Appointments section in your dashboard. You can choose your preferred doctor, date, and time slot. Would you like me to guide you through the process?",
      };

      let response = botResponses.default;
      const lowerInput = inputValue.toLowerCase();
      
      if (lowerInput.includes("headache") || lowerInput.includes("pain")) {
        response = botResponses.headache;
      } else if (lowerInput.includes("prescription") || lowerInput.includes("medicine") || lowerInput.includes("medication")) {
        response = botResponses.prescription;
      } else if (lowerInput.includes("appointment") || lowerInput.includes("book")) {
        response = botResponses.appointment;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "What are common cold symptoms?",
    "How to manage stress?",
    "Explain my prescription",
    "Book an appointment",
  ];

  return (
    <DashboardLayout
      navItems={navItems}
      userType="patient"
      userName="Alex Thompson"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            Health Assistant
          </h1>
          <p className="text-muted-foreground mt-1">
            Get answers to your health-related questions
          </p>
        </div>

        {/* Chat Container */}
        <div className="dashboard-card flex flex-col h-[600px]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "bot"
                      ? "bg-primary/10"
                      : "bg-accent/10"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <HeartPulse className="w-5 h-5 text-primary" />
                  ) : (
                    <User className="w-5 h-5 text-accent" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.sender === "bot"
                      ? "bg-secondary text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "bot"
                        ? "text-muted-foreground"
                        : "text-primary-foreground/70"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputValue(action);
                    }}
                    className="text-xs"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your health question..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This is an AI assistant. For medical emergencies, please contact your doctor or call emergency services.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientChatbot;
