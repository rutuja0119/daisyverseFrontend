import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "slide-left" | "slide-right" | "scale" | "blur";
  delay?: number;
}

export function AnimatedSection({ 
  children, 
  className, 
  animation = "fade-up",
  delay = 0 
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  const animationClasses = {
    "fade-up": "scroll-animate",
    "slide-left": "scroll-animate-left",
    "slide-right": "scroll-animate-right",
    "scale": "scroll-animate-scale",
    "blur": "scroll-animate",
  };

  return (
    <div
      ref={ref}
      className={cn(
        animationClasses[animation],
        isInView && "in-view",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
