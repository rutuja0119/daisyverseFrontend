import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import productEarrings from "@/assets/product-earrings.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

const collections = [
  {
    id: 1,
    name: "Golden Hour",
    description: "Warm, luminous pieces for sunset moments",
    image: productEarrings,
    itemCount: 24,
    size: "large",
  },
  {
    id: 2,
    name: "Garden Party",
    description: "Delicate florals for every occasion",
    image: productBracelet,
    itemCount: 18,
    size: "medium",
  },
  {
    id: 3,
    name: "Everyday Elegance",
    description: "Timeless pieces for daily wear",
    image: productNecklace,
    itemCount: 32,
    size: "medium",
  },
];

export function CollectionsShowcase() {
  return (
    <section className="py-24 bg-daisy-cream relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 border border-primary/10 rounded-full animate-rotate-slow" style={{ animationDuration: '40s' }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 border border-primary/10 rounded-full animate-rotate-slow" style={{ animationDuration: '50s', animationDirection: 'reverse' }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="text-center space-y-4 mb-16">
          <p className="font-body text-sm font-medium text-primary uppercase tracking-widest">
            Curated For You
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            Shop by Collection
          </h2>
          <div className="flex justify-center mt-4">
            <div className="h-1 w-16 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full" />
          </div>
        </AnimatedSection>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large Collection Card */}
          <AnimatedSection animation="slide-right" delay={100}>
            <Link
              to="/collections/golden-hour"
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] lg:row-span-2 hover-lift block gradient-border"
            >
              <img
                src={collections[0].image}
                alt={collections[0].name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-[-100%] group-hover:translate-x-[100%]" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-end justify-between">
                  <div className="space-y-2 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                    <p className="font-body text-sm text-daisy-cream/80">
                      {collections[0].itemCount} Pieces
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl font-semibold text-daisy-cream">
                      {collections[0].name}
                    </h3>
                    <p className="font-body text-daisy-cream/80 max-w-xs">
                      {collections[0].description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-primary/90 animate-glow-pulse">
                    <ArrowUpRight className="h-5 w-5 text-primary-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedSection>

          {/* Medium Collection Cards */}
          {collections.slice(1).map((collection, index) => (
            <AnimatedSection 
              key={collection.id} 
              animation="slide-left" 
              delay={200 + index * 100}
            >
              <Link
                to={`/collections/${collection.name.toLowerCase().replace(" ", "-")}`}
                className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover-lift block"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-[-100%] group-hover:translate-x-[100%]" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div className="space-y-1 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                      <p className="font-body text-sm text-daisy-cream/80">
                        {collection.itemCount} Pieces
                      </p>
                      <h3 className="font-display text-2xl font-semibold text-daisy-cream">
                        {collection.name}
                      </h3>
                      <p className="font-body text-sm text-daisy-cream/70">
                        {collection.description}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                      <ArrowUpRight className="h-4 w-4 text-primary-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
