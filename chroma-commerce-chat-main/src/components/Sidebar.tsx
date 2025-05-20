
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { Logo } from "./Logo";
import { 
  Search, 
  PlusCircle, 
  MessageSquare, 
  Pencil, 
  Trash2, 
  ChevronLeft, 
  LogOut, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export const Sidebar: React.FC = () => {
  const { toast } = useToast();
  const { 
    sidebarOpen, 
    toggleSidebar, 
    chats,
    addChat, 
    currentChatId,
    setCurrentChat,
    updateChatTitle,
    deleteChat,
  } = useStore();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  
  const filteredChats = searchQuery 
    ? chats.filter(chat => 
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chats;
    
  const handleCreateChat = () => {
    addChat();
  };
  
  const handleEditTitle = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditTitle(currentTitle);
  };
  
  const handleSaveTitle = (chatId: string) => {
    if (editTitle.trim()) {
      updateChatTitle(chatId, editTitle);
      setEditingChatId(null);
    } else {
      toast({
        title: "Invalid title",
        description: "Please enter a valid chat title",
        variant: "destructive",
      });
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent, chatId: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveTitle(chatId);
    } else if (e.key === "Escape") {
      setEditingChatId(null);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && editingChatId) {
        setEditingChatId(null);
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [editingChatId]);

  return (
    <div 
      className={cn(
        "flex flex-col bg-sidebar h-full w-72 fixed left-0 top-0 bottom-0 z-30 transition-transform border-r",
        !sidebarOpen && "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <Logo size="sm" />
        <button 
          onClick={toggleSidebar}
          className="p-1 hover:bg-sidebar-accent rounded-md transition-colors"
          aria-label="Close sidebar"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      
      <button
        onClick={handleCreateChat}
        className="flex items-center gap-2 mx-4 mb-4 p-2 border rounded-lg text-sm hover:bg-sidebar-accent transition-colors"
      >
        <PlusCircle size={16} />
        <span>New Chat</span>
      </button>
      
      <div className="px-4 mb-2">
        <div className="relative">
          <Search 
            size={16} 
            className="absolute left-2 top-2.5 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-8 pr-2 text-sm bg-sidebar-accent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-2">
        <div className="space-y-1 py-2">
          {filteredChats.length > 0 ? (
            filteredChats.map(chat => (
              <div 
                key={chat.id}
                className={cn(
                  "flex items-center group p-2 rounded-md text-sm cursor-pointer",
                  chat.id === currentChatId 
                    ? "bg-sidebar-accent" 
                    : "hover:bg-sidebar-accent/50"
                )}
                onClick={() => chat.id !== currentChatId && setCurrentChat(chat.id)}
              >
                <MessageSquare 
                  size={16} 
                  className="mr-2 flex-shrink-0 text-muted-foreground" 
                />
                
                {editingChatId === chat.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, chat.id)}
                    onBlur={() => handleSaveTitle(chat.id)}
                    autoFocus
                    className="flex-1 bg-transparent focus:outline-none mr-1"
                  />
                ) : (
                  <span className="flex-1 truncate">{chat.title}</span>
                )}
                
                {chat.id === currentChatId && editingChatId !== chat.id && (
                  <div className="flex gap-0.5">
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleEditTitle(chat.id, chat.title);
                      }}
                      className="p-1 opacity-0 group-hover:opacity-100 hover:bg-sidebar-accent rounded transition-opacity"
                      aria-label="Edit chat title"
                    >
                      <Pencil size={14} />
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        deleteChat(chat.id);
                      }}
                      className="p-1 opacity-0 group-hover:opacity-100 hover:bg-sidebar-accent rounded transition-opacity text-destructive"
                      aria-label="Delete chat"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No chats found
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
              U
            </div>
            <div className="text-sm">User</div>
          </div>
          <div className="flex gap-1">
            <button 
              className="p-1.5 hover:bg-sidebar-accent rounded-md transition-colors"
              aria-label="Settings"
            >
              <Settings size={16} />
            </button>
            <button 
              className="p-1.5 hover:bg-sidebar-accent rounded-md transition-colors"
              aria-label="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
