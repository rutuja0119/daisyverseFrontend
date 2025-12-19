import { Button } from "@/components/ui/button";
import { FloatingPetals } from "./FloatingPetals";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-jewelry.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <FloatingPetals />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-daisy-blush/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-body text-sm font-medium text-secondary-foreground">
                New Collection Available
              </span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-foreground">
              Where Elegance{" "}
              <span className="text-gradient-gold">Blooms</span>
            </h1>
            
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover handcrafted jewelry inspired by nature's most delicate beauty. 
              Each piece tells a story of softness, elegance, and timeless grace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="group">
                Explore Collection
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl">
                Our Story
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center">
                <p className="font-display text-2xl font-semibold text-foreground">15K+</p>
                <p className="font-body text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-display text-2xl font-semibold text-foreground">500+</p>
                <p className="font-body text-sm text-muted-foreground">Unique Designs</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-display text-2xl font-semibold text-foreground">4.9★</p>
                <p className="font-body text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-daisy-blush/20 rounded-3xl blur-xl" />
              <div className="absolute -inset-px bg-gradient-to-br from-primary/30 to-daisy-sage/30 rounded-3xl" />
              
              <div className="relative glass-panel rounded-3xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="Daisy Verse Signature Jewelry Collection"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 glass-panel rounded-2xl p-4 animate-float">
                  <p className="font-display text-lg font-semibold text-foreground">Golden Daisy</p>
                  <p className="font-body text-sm text-muted-foreground">Signature Collection</p>
                </div>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute -top-8 -right-8 w-24 h-24 opacity-30">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {Array.from({ length: 25 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={(i % 5) * 20 + 10}
                    cy={Math.floor(i / 5) * 20 + 10}
                    r="3"
                    fill="hsl(var(--primary))"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
