import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "./AnimatedSection";

const testimonials = [
  {
    id: 1,
    name: "Emma Richardson",
    role: "Fashion Blogger",
    content:
      "The Golden Daisy necklace is absolutely stunning. The craftsmanship is impeccable, and it's become my everyday piece. I've received so many compliments!",
    rating: 5,
    avatar: "ER",
  },
  {
    id: 2,
    name: "Sophie Chen",
    role: "Interior Designer",
    content:
      "I've been collecting Daisy Verse pieces for years. Each one feels like a tiny work of art. The attention to detail is what keeps me coming back.",
    rating: 5,
    avatar: "SC",
  },
  {
    id: 3,
    name: "Isabella Moore",
    role: "Art Director",
    content:
      "Finally found jewelry that matches my aesthetic perfectly. Delicate, elegant, and timeless. The Petal bracelet is my absolute favorite.",
    rating: 5,
    avatar: "IM",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-petal relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full border border-primary/20 animate-float" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full border border-primary/10 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-primary/5 animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="text-center space-y-4 mb-16">
          <p className="font-body text-sm font-medium text-primary uppercase tracking-widest">
            Love Letters
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            What Our Garden Says
          </h2>
        </AnimatedSection>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="scale" delay={200}>
            <div className="relative">
              {/* Quote icon with animation */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <Quote className="h-16 w-16 text-primary/20 animate-bounce-soft" />
              </div>

              {/* Cards */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-all duration-700 ease-out"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={testimonial.id}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className={cn(
                        "glass-panel rounded-3xl p-8 md:p-12 text-center space-y-6 transition-all duration-500",
                        index === activeIndex && "hover-glow"
                      )}>
                        {/* Rating with staggered animation */}
                        <div className="flex justify-center gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-5 w-5 text-primary fill-primary transition-all duration-300",
                                index === activeIndex && "animate-wiggle"
                              )}
                              style={{ animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                        </div>

                        {/* Content */}
                        <p className="font-body text-lg md:text-xl text-foreground leading-relaxed italic">
                          "{testimonial.content}"
                        </p>

                        {/* Author with hover effect */}
                        <div className="flex items-center justify-center gap-4 group">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/30">
                            <span className="font-display text-sm font-semibold text-primary">
                              {testimonial.avatar}
                            </span>
                          </div>
                          <div className="text-left">
                            <p className="font-display text-base font-semibold text-foreground">
                              {testimonial.name}
                            </p>
                            <p className="font-body text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation with enhanced animations */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prev}
                  className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setActiveIndex(index);
                      }}
                      className={cn(
                        "h-2 rounded-full transition-all duration-500",
                        index === activeIndex
                          ? "w-8 bg-primary animate-pulse"
                          : "w-2 bg-primary/30 hover:bg-primary/50 hover:scale-125"
                      )}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={next}
                  className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
