
import { StateCreator } from 'zustand';
import { AppState, Chat, Product } from '../types';
import { mockChatHistory } from '../mockData';

export interface ChatSlice {
  chats: Chat[];
  currentChatId: string | null;
  addChat: () => void;
  setCurrentChat: (chatId: string) => void;
  updateChatTitle: (chatId: string, title: string) => void;
  deleteChat: (chatId: string) => void;
  addUserMessage: (content: string) => void;
  addBotMessage: (content: string, products?: Product[]) => void;
}

export const createChatSlice: StateCreator<
  AppState,
  [],
  [],
  ChatSlice
> = (set) => ({
  chats: mockChatHistory,
  currentChatId: mockChatHistory.length > 0 ? mockChatHistory[0].id : null,
  
  addChat: () => 
    set((state) => {
      const newChat: Chat = {
        id: Math.random().toString(36).substring(2, 9),
        title: "New Chat",
        createdAt: new Date().toISOString(),
        messages: [],
      };
      
      return {
        chats: [newChat, ...state.chats],
        currentChatId: newChat.id,
      };
    }),
  
  setCurrentChat: (chatId) => set({ currentChatId: chatId }),
  
  updateChatTitle: (chatId, title) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, title } : chat
      ),
    })),
    
  deleteChat: (chatId) =>
    set((state) => {
      const newChats = state.chats.filter((chat) => chat.id !== chatId);
      return {
        chats: newChats,
        currentChatId:
          state.currentChatId === chatId
            ? newChats.length > 0
              ? newChats[0].id
              : null
            : state.currentChatId,
      };
    }),
    
  addUserMessage: (content) =>
    set((state) => {
      if (!state.currentChatId) {
        const newChat: Chat = {
          id: Math.random().toString(36).substring(2, 9),
          title: content.substring(0, 20) + (content.length > 20 ? "..." : ""),
          createdAt: new Date().toISOString(),
          messages: [
            {
              id: Math.random().toString(36).substring(2, 9),
              content,
              role: "user",
              timestamp: new Date().toISOString(),
            },
          ],
        };
        
        return {
          chats: [newChat, ...state.chats],
          currentChatId: newChat.id,
        };
      }
      
      return {
        chats: state.chats.map((chat) =>
          chat.id === state.currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: Math.random().toString(36).substring(2, 9),
                    content,
                    role: "user",
                    timestamp: new Date().toISOString(),
                  },
                ],
              }
            : chat
        ),
      };
    }),
    
  addBotMessage: (content, products = []) =>
    set((state) => {
      if (!state.currentChatId) return state;
      
      return {
        chats: state.chats.map((chat) =>
          chat.id === state.currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: Math.random().toString(36).substring(2, 9),
                    content,
                    role: "assistant",
                    timestamp: new Date().toISOString(),
                    products,
                  },
                ],
              }
            : chat
        ),
      };
    }),
});
