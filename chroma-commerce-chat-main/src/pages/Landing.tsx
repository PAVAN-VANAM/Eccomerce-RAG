
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Moon, Sun, ArrowRight, MessageSquare, Clock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

export const Landing = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useStore();

  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Assistant",
      description: "Get personalized product recommendations and detailed information through natural conversations."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Shop with confidence knowing our AI assistant is always available to answer your questions."
    },
    {
      icon: ShieldCheck,
      title: "Intelligent Insights",
      description: "Make informed decisions with comprehensive product comparisons and expert recommendations."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Logo />

            <div className="flex items-center gap-6">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md hover:bg-secondary transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <nav className="hidden md:flex items-center gap-6">
                <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors">
                  Demo
                </a>
              </nav>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/signin")}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-gradient text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero section */}
        <section className="relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">Shop smarter</span> with AI assistance
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                ChromaCommerce combines the power of AI with personalized shopping recommendations
                to help you find exactly what you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-gradient text-white px-6 py-3 rounded-lg text-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Get started free
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate("/signin")}
                  className="bg-secondary text-foreground px-6 py-3 rounded-lg text-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  Live demo
                </button>
              </div>

              <div className="mt-16 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-purple to-brand-purple-light rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-card rounded-lg shadow-xl overflow-hidden border">
                  <div className="flex items-center gap-2 bg-muted p-4 border-b">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="ml-2 text-sm font-medium">ShopRAG Assistant</div>
                  </div>
                  <div className="p-4 bg-secondary/50">
                    <div className="flex gap-4 mb-4">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-sm font-medium">U</span>
                      </div>
                      <div className="flex-1">
                        <p className="bg-background p-3 rounded-lg inline-block">
                          I need a new laptop for video editing under $2000.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-md bg-brand-purple text-white flex items-center justify-center">
                        <MessageSquare size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="bg-card p-3 rounded-lg inline-block typing-animation">
                          I'd be happy to help you find a laptop for video editing under $2000...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section id="features" className="bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful AI Shopping Assistant</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our advanced AI understands your needs and helps you find the perfect products
                with detailed information and personalized recommendations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-card rounded-lg p-6 shadow-sm border transition-transform hover:-translate-y-1",
                    "animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-2">Ready to transform your shopping experience?</h2>
                <p className="text-white/80">
                  Join thousands of shoppers making smarter decisions with ChromaCommerce.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/signin")}
                  className="bg-white text-brand-purple px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-white/20 text-white border border-white/30 backdrop-blur px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
                >
                  Create account
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <Logo />
            <div className="flex gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 ShopRAG. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
