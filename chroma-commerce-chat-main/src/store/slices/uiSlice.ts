
import { StateCreator } from 'zustand';
import { AppState } from '../types';

export interface UISlice {
  darkMode: boolean;
  toggleDarkMode: () => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
}

export const createUISlice: StateCreator<
  AppState,
  [],
  [],
  UISlice
> = (set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  isTyping: false,
  setIsTyping: (isTyping) => set({ isTyping }),
});
