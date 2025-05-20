
import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Loader2 } from "lucide-react";

export const ChatInterface: React.FC = () => {
  const { chats, currentChatId, isTyping } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find(chat => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  // Scroll to bottom when messages change or a new message is being typed
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      <div className="flex-1 overflow-y-auto">
        {messages.length > 0 ? (
          <>
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1 && message.role === "assistant"}
              />
            ))}
            {isTyping && (
              <div className="py-6 px-4 md:px-8 flex items-start gap-4 max-w-4xl mx-auto bg-secondary/50">
                <div className="w-8 h-8 rounded-md bg-brand-purple text-white flex items-center justify-center flex-shrink-0">
                  <Loader2 size={16} className="animate-spin" />
                </div>
                <div className="h-6 flex items-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md px-4">
              <h2 className="text-2xl font-semibold mb-2 text-gradient">
                Shop<span className="text-foreground">`RAG</span> Assistant
              </h2>
              <p className="text-muted-foreground mb-4">
                Ask me anything about our products. I can help you find the perfect items,
                compare options, and provide detailed information.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="bg-secondary p-3 rounded-lg">
                  "Show me wireless headphones under $100"
                </div>
                <div className="bg-secondary p-3 rounded-lg">
                  "What's the best gaming laptop for 2024?"
                </div>
                <div className="bg-secondary p-3 rounded-lg">
                  "Compare the latest phone models"
                </div>
                <div className="bg-secondary p-3 rounded-lg">
                  "Recommend a gift for a tech enthusiast"
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput />
    </div>
  );
};
