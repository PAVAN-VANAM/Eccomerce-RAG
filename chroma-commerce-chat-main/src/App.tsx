import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Dashboard } from './components/Dashboard';

import Landing from "./pages/Landing";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Chat from "./pages/Chat";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from './pages/AuthContext';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

// Type for the PrivateRoute props
type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};


const App = () => {
  const { darkMode } = useStore();

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Router>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/chat" element={

                  <Chat />
                } />
                <Route path="/dashboard" element={
                  <Dashboard />
                } />
                <Route path="/index" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
