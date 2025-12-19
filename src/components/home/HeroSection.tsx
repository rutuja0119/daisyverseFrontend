import { Button } from "@/components/ui/button";
import { FloatingPetals } from "./FloatingPetals";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-jewelry.jpg";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 50;
    const y = (e.clientY - rect.top - rect.height / 2) / 50;
    setMousePosition({ x, y });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
      onMouseMove={handleMouseMove}
    >
      <FloatingPetals />
      
      {/* Background decorative elements with enhanced animations */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft"
          style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-daisy-blush/30 rounded-full blur-3xl animate-pulse-soft" 
          style={{ 
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)`
          }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] animate-rotate-slow opacity-20"
        >
          <div className="absolute inset-0 border border-primary/30 rounded-full" />
          <div className="absolute inset-8 border border-primary/20 rounded-full" />
          <div className="absolute inset-16 border border-primary/10 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className={`text-center lg:text-left space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              <Sparkles className="h-4 w-4 text-primary animate-wiggle" />
              <span className="font-body text-sm font-medium text-secondary-foreground">
                New Collection Available
              </span>
            </div>
            
            <h1 className={`font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-foreground transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Where Elegance{" "}
              <span className="text-shimmer">Blooms</span>
            </h1>
            
            <p className={`font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Discover handcrafted jewelry inspired by nature's most delicate beauty. 
              Each piece tells a story of softness, elegance, and timeless grace.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button variant="hero" size="xl" className="group hover-glow">
                Explore Collection
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl" className="hover-lift">
                Our Story
              </Button>
            </div>

            {/* Trust badges with staggered animation */}
            <div className={`flex items-center gap-8 justify-center lg:justify-start pt-4 transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {[
                { value: "15K+", label: "Happy Customers" },
                { value: "500+", label: "Unique Designs" },
                { value: "4.9★", label: "Rating" },
              ].map((stat, i) => (
                <div key={stat.label} className="relative group">
                  <div className={`text-center transition-all duration-500 delay-${(i + 1) * 100}`}>
                    <p className="font-display text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {stat.value}
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                  {i < 2 && <div className="absolute right-[-16px] top-0 w-px h-12 bg-border" />}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image with enhanced effects */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
            style={{ 
              transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)` 
            }}
          >
            <div className="relative">
              {/* Decorative frame with glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-daisy-blush/20 rounded-3xl blur-xl animate-pulse-soft" />
              <div className="absolute -inset-px bg-gradient-to-br from-primary/30 to-daisy-sage/30 rounded-3xl" />
              
              <div className="relative glass-panel rounded-3xl overflow-hidden card-3d">
                <div className="card-3d-inner">
                  <img
                    src={heroImage}
                    alt="Daisy Verse Signature Jewelry Collection"
                    className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-700 hover:scale-105"
                  />
                </div>
                
                {/* Shine effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 glass-panel rounded-2xl p-4 animate-float hover-glow">
                  <p className="font-display text-lg font-semibold text-foreground">Golden Daisy</p>
                  <p className="font-body text-sm text-muted-foreground">Signature Collection</p>
                </div>
              </div>
            </div>

            {/* Animated decorative dots */}
            <div className="absolute -top-8 -right-8 w-24 h-24 opacity-30 animate-rotate-slow" style={{ animationDuration: '30s' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {Array.from({ length: 25 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={(i % 5) * 20 + 10}
                    cy={Math.floor(i / 5) * 20 + 10}
                    r="3"
                    fill="hsl(var(--primary))"
                    className="animate-pulse-soft"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </svg>
            </div>

            {/* Additional floating elements */}
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-primary/20 animate-bounce-soft blur-md" />
            <div className="absolute top-1/4 -right-6 w-12 h-12 rounded-full bg-daisy-sage/40 animate-float blur-sm" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2 animate-bounce-soft">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center animate-fade-up" style={{ animationDelay: '1s' }}>
          Scroll to explore
        </p>
      </div>
    </section>
  );
}
