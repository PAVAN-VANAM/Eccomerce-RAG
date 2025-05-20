
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { useAuth } from './AuthContext';

export const Chat = () => {
  const { sidebarOpen } = useStore();
  const { user } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          sidebarOpen ? "lg:ml-72" : "ml-0"
        )}
      >
        <Header />
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chat;
