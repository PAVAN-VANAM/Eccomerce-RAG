
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppState } from './types';
import { createUISlice } from './slices/uiSlice';
import { createUserSlice } from './slices/userSlice';
import { createChatSlice } from './slices/chatSlice';

export const useStore = create<AppState>()(
  persist(
    (set, get, api) => ({
      ...createUISlice(set, get, api),
      ...createUserSlice(set, get, api),
      ...createChatSlice(set, get, api),
    }),
    {
      name: "chroma-commerce-chat-store",
    }
  )
);
