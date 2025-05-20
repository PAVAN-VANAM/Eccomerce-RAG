
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
  products?: Product[];
}

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
}

export interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  user: User | null;
  setUser: (user: User | null) => void;
  
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  chats: Chat[];
  currentChatId: string | null;
  addChat: () => void;
  setCurrentChat: (chatId: string) => void;
  updateChatTitle: (chatId: string, title: string) => void;
  deleteChat: (chatId: string) => void;
  
  addUserMessage: (content: string) => void;
  addBotMessage: (content: string, products?: Product[]) => void;
  
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
}
