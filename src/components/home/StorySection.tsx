import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import productRing from "@/assets/product-ring.jpg";
import { useState } from "react";

export function StorySection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      {/* Background animated elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection animation="slide-right" className="relative order-2 lg:order-1">
            <div 
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Decorative elements with enhanced animations */}
              <div className={cn(
                "absolute -top-8 -left-8 w-32 h-32 bg-daisy-sage/50 rounded-full blur-2xl transition-all duration-700",
                isHovered && "scale-125 bg-daisy-sage/70"
              )} />
              <div className={cn(
                "absolute -bottom-8 -right-8 w-48 h-48 bg-primary/20 rounded-full blur-3xl transition-all duration-700",
                isHovered && "scale-110 bg-primary/30"
              )} />
              
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] hover-lift">
                <img
                  src={productRing}
                  alt="Handcrafted daisy ring"
                  className={cn(
                    "w-full h-full object-cover transition-all duration-700",
                    isHovered && "scale-110"
                  )}
                />
                
                {/* Gradient overlay that animates on hover */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent transition-opacity duration-500",
                  isHovered ? "opacity-100" : "opacity-0"
                )} />
                
                {/* Play button overlay with enhanced animation */}
                <button className="absolute inset-0 flex items-center justify-center group/play">
                  <div className={cn(
                    "w-20 h-20 rounded-full glass-panel flex items-center justify-center transition-all duration-500",
                    isHovered ? "scale-110 animate-glow-pulse" : "scale-100"
                  )}>
                    <Play 
                      className={cn(
                        "h-8 w-8 text-primary ml-1 transition-transform duration-300",
                        isHovered && "scale-110"
                      )} 
                      fill="currentColor" 
                    />
                  </div>
                  {/* Ripple effect */}
                  <div className={cn(
                    "absolute w-24 h-24 rounded-full border-2 border-primary/30 transition-all duration-1000",
                    isHovered && "w-40 h-40 opacity-0"
                  )} />
                </button>
              </div>

              {/* Floating stat card with enhanced animation */}
              <div className="absolute -bottom-6 -right-6 lg:right-12 glass-panel rounded-2xl p-6 animate-float hover-glow">
                <p className="font-display text-3xl font-semibold text-primary animate-pulse-soft">10+</p>
                <p className="font-body text-sm text-muted-foreground">Years of Craftsmanship</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <AnimatedSection animation="slide-left" delay={0}>
              <p className="font-body text-sm font-medium text-primary uppercase tracking-widest animate-shimmer">
                Our Story
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-left" delay={100}>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
                Crafted with Love, <br />
                <span className="text-shimmer">Inspired by Nature</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="slide-left" delay={200}>
              <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
                <p>
                  Every piece at Daisy Verse begins as a whisper of inspiration—a petal 
                  caught in morning light, the gentle curve of a bloom, the way nature 
                  creates beauty in its most delicate forms.
                </p>
                <p>
                  Our artisans transform these moments into wearable poetry. Using 
                  ethically sourced materials and time-honored techniques, we create 
                  jewelry that doesn't just adorn—it tells your story.
                </p>
              </div>
            </AnimatedSection>

            {/* Values with staggered animations */}
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="grid grid-cols-3 gap-6 pt-4">
                {[
                  { label: "Ethically Sourced", icon: "🌿" },
                  { label: "Handcrafted", icon: "✨" },
                  { label: "Timeless Design", icon: "💫" },
                ].map((value, index) => (
                  <div 
                    key={value.label} 
                    className="text-center group cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-2xl block transition-transform duration-300 group-hover:scale-125 group-hover:animate-wiggle">
                      {value.icon}
                    </span>
                    <p className="font-body text-sm text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
                      {value.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-left" delay={400}>
              <Button variant="elegant" size="lg" className="hover-glow hover-lift">
                Learn More About Us
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
