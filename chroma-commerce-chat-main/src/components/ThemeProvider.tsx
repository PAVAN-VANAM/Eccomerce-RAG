
import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "@/store/useStore";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: string;
  setTheme: (theme: string) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>("light");
  const { darkMode } = useStore();

  useEffect(() => {
    const rootElement = window.document.documentElement;
    rootElement.classList.remove("light", "dark");
    rootElement.classList.add(darkMode ? "dark" : "light");
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};
