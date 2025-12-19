import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import productRing from "@/assets/product-ring.jpg";

export function StorySection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-daisy-sage/50 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
              
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <img
                  src={productRing}
                  alt="Handcrafted daisy ring"
                  className="w-full h-full object-cover"
                />
                
                {/* Play button overlay */}
                <button className="absolute inset-0 flex items-center justify-center group">
                  <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play className="h-8 w-8 text-primary ml-1" fill="currentColor" />
                  </div>
                </button>
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-6 lg:right-12 glass-panel rounded-2xl p-6 animate-float">
                <p className="font-display text-3xl font-semibold text-primary">10+</p>
                <p className="font-body text-sm text-muted-foreground">Years of Craftsmanship</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <p className="font-body text-sm font-medium text-primary uppercase tracking-widest">
              Our Story
            </p>
            
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
              Crafted with Love, <br />
              <span className="text-gradient-gold">Inspired by Nature</span>
            </h2>

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

            {/* Values */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { label: "Ethically Sourced", icon: "🌿" },
                { label: "Handcrafted", icon: "✨" },
                { label: "Timeless Design", icon: "💫" },
              ].map((value) => (
                <div key={value.label} className="text-center">
                  <span className="text-2xl">{value.icon}</span>
                  <p className="font-body text-sm text-muted-foreground mt-2">
                    {value.label}
                  </p>
                </div>
              ))}
            </div>

            <Button variant="elegant" size="lg">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
