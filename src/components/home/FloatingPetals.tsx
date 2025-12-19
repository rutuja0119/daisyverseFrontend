import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  animationDelay: number;
  animationDuration: number;
  size: number;
  opacity: number;
}

export function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const newPetals: Petal[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 8,
      animationDuration: 10 + Math.random() * 8,
      size: 12 + Math.random() * 20,
      opacity: 0.3 + Math.random() * 0.4,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.animationDelay}s`,
            animationDuration: `${petal.animationDuration}s`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            className="animate-petal-sway"
            style={{
              opacity: petal.opacity,
              animationDelay: `${petal.animationDelay * 0.5}s`,
            }}
          >
            <ellipse
              cx="12"
              cy="8"
              rx="4"
              ry="8"
              fill="hsl(43 90% 55% / 0.6)"
              transform="rotate(15 12 12)"
            />
            <ellipse
              cx="12"
              cy="8"
              rx="3"
              ry="6"
              fill="hsl(45 100% 98%)"
              transform="rotate(15 12 12)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
