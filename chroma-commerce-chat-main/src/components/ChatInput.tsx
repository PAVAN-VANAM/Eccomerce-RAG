import { useState, FormEvent, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useStore } from "@/store/useStore";

export const ChatInput: React.FC = () => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addUserMessage, addBotMessage, setIsTyping } = useStore();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    addUserMessage(input);
    setInput("");

    // Simulate bot typing
    setIsTyping(true);

    try {
      // Make API call to backend
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      // Transform products into the format expected by ProductCarousel
      const transformedProducts = data.products?.map((product: any) => {
        // Handle both response formats (item with payload and direct item)
        const item = product.item;
        const productData = item.payload || item;
        
        return {
          id: productData.id || item._id,
          name: productData.name || item.name,
          price: productData.price || item.price,
          description: item.description || item.full_description || '',
          image: item.images?.[0] || item.imageUrl,
        };
      }) || [];

      // Add bot response with transformed products
      addBotMessage(data.response || "Sorry, I couldn't process your request.", transformedProducts);
    } catch (error) {
      console.error('Error calling API:', error);
      addBotMessage("Sorry, there was an error processing your request.", []);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t bg-background sticky bottom-0 py-4"
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative flex items-end bg-muted rounded-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-50">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about products..."
            className="flex-1 max-h-36 py-3 pl-4 pr-10 bg-transparent resize-none outline-none text-foreground"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-3 bottom-3 p-1 rounded-md bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          ShopRAG may produce inaccurate information about products.
          Double-check product details before making a purchase.
        </p>
      </div>
    </form>
  );
};
