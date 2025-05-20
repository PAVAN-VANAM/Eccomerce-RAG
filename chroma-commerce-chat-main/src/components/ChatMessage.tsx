
import { useState } from "react";
import { TypingAnimation } from "./ui/TypingAnimation";
import { ProductCarousel } from "./ProductCarousel";
import { cn } from "@/lib/utils";
import { MessageSquare, ThumbsDown, ThumbsUp, Share } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useToast } from "@/hooks/use-toast";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: string;
    products?: {
      id: string;
      name: string;
      price: number;
      description: string;
      image: string;
    }[];
  };
  isLatest?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isLatest = false 
}) => {
  const { toast } = useToast();
  const [animationComplete, setAnimationComplete] = useState(!isLatest);
  const isBot = message.role === "assistant";
  const hasProducts = isBot && message.products && message.products.length > 0;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: "Copied to clipboard",
      description: "The message has been copied to your clipboard",
    });
  };

  return (
    <div 
      className={cn(
        "py-6 px-4 md:px-8 flex flex-col gap-4",
        isBot ? "bg-secondary/50" : "bg-background"
      )}
    >
      <div className="flex items-start gap-4 max-w-4xl mx-auto w-full">
        <div 
          className={cn(
            "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0",
            isBot 
              ? "bg-brand-purple text-white" 
              : "bg-gray-300 text-gray-700"
          )}
        >
          {isBot ? (
            <MessageSquare size={16} />
          ) : (
            <span className="font-semibold text-sm">U</span>
          )}
        </div>
        
        <div className="flex-1">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {isBot && isLatest && !animationComplete ? (
              <TypingAnimation 
                text={message.content} 
                typingSpeed={20} 
                onComplete={() => setAnimationComplete(true)}
              />
            ) : (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
          </div>
          
          {hasProducts && animationComplete && (
            <div className="mt-4 animate-fade-in">
              <div className="mb-2 text-sm text-muted-foreground">
                {message.products?.length} relevant products found
              </div>
              <ProductCarousel products={message.products || []} />
            </div>
          )}
          
          {isBot && (
            <div className="flex items-center gap-2 mt-4 text-muted-foreground">
              <button 
                className="p-1 hover:bg-secondary rounded-md transition-colors"
                aria-label="Thumbs up"
              >
                <ThumbsUp size={16} />
              </button>
              <button 
                className="p-1 hover:bg-secondary rounded-md transition-colors"
                aria-label="Thumbs down"
              >
                <ThumbsDown size={16} />
              </button>
              <button 
                className="p-1 hover:bg-secondary rounded-md transition-colors"
                aria-label="Copy to clipboard"
                onClick={handleCopy}
              >
                <Share size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
