import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, User, Bot, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! Welcome to Sultan Digital Zone. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate Bot Response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return "Hi there! How can I assist you with our digital services?";
    } else if (lowerInput.includes("service") || lowerInput.includes("what you do")) {
      return "We provide 100+ services including Job Alerts, Identity Cards (Aadhar/PAN), Banking, and Govt Schemes. Which one are you interested in?";
    } else if (lowerInput.includes("contact") || lowerInput.includes("phone")) {
      return "You can call us at +91 7277565445 or visit our shop in the Main Market.";
    } else if (lowerInput.includes("pan") || lowerInput.includes("aadhar")) {
      return "We handle all Aadhar and PAN related services. Please bring your original documents to our shop for processing.";
    } else {
      return "That's interesting! For more detailed information, please contact Md Shahjad directly or visit our shop.";
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-sky-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-sky-500/30 hover:bg-sky-600 transition-all md:bottom-6 md:right-24"
      >
        <MessageSquare size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white">
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Sultan AI Assistant</h4>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-slate-500 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "p-4 rounded-2xl text-sm leading-relaxed",
                      msg.sender === "user"
                        ? "bg-orange-500 text-white rounded-tr-none shadow-lg shadow-orange-500/20"
                        : "bg-slate-800 text-slate-300 rounded-tl-none"
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-600 mt-1 uppercase tracking-widest font-bold">
                    {msg.sender === "user" ? "You" : "Sultan Bot"} •{" "}
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-sky-500 transition-all"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/20"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
