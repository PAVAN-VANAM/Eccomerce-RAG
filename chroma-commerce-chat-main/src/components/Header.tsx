
import { Moon, Sun, Menu } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode, sidebarOpen, toggleSidebar } = useStore();
  
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between py-2 px-4 border-b bg-background/80 backdrop-blur">
      <button
        onClick={toggleSidebar}
        className={cn(
          "p-2 rounded-md transition-colors hover:bg-secondary",
          sidebarOpen && "lg:hidden"
        )}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <Menu size={20} />
      </button>
      
      <div className="flex items-center gap-2">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md transition-colors hover:bg-secondary"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
          U
        </div>
      </div>
    </header>
  );
};
