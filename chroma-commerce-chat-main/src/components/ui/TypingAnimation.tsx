
import { useState, useEffect, useRef } from "react";

interface TypingAnimationProps {
  text: string;
  typingSpeed?: number;
  onComplete?: () => void;
  className?: string;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  typingSpeed = 30,
  onComplete,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      intervalRef.current = window.setInterval(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);
    } else {
      setIsComplete(true);
      if (onComplete) onComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, text, typingSpeed, onComplete]);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="typing-cursor">|</span>}
    </span>
  );
};
