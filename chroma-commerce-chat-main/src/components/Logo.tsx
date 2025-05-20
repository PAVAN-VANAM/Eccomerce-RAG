
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
    <a href="https://ecommerce-frontend-topaz-ten.vercel.app/">
      <div className={cn("font-bold", sizeClasses[size], className)}>
        <span className="text-gradient">Pavan</span>
        <span>Shop - AI</span>
      </div>
    </a>
  );
};
