
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={cn("font-bold", sizeClasses[size], className)}>
      <span className="text-gradient">Shop</span>
      <span>RAG</span>
    </div>
  );
};
