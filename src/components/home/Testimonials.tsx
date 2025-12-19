import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-petal">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <p className="font-body text-sm font-medium text-primary uppercase tracking-widest">
            Love Letters
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            What Our Garden Says
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <Quote className="h-16 w-16 text-primary/20" />
            </div>

            {/* Cards */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="glass-panel rounded-3xl p-8 md:p-12 text-center space-y-6">
                      {/* Rating */}
                      <div className="flex justify-center gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 text-primary fill-primary"
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <p className="font-body text-lg md:text-xl text-foreground leading-relaxed italic">
                        "{testimonial.content}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
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

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === activeIndex
                        ? "w-8 bg-primary"
                        : "bg-primary/30 hover:bg-primary/50"
                    )}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
