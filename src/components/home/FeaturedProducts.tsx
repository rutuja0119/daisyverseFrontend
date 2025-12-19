import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import productEarrings from "@/assets/product-earrings.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productRing from "@/assets/product-ring.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

const products = [
  {
    id: 1,
    name: "Golden Daisy Studs",
    price: 128,
    image: productEarrings,
    category: "Earrings",
    isNew: true,
  },
  {
    id: 2,
    name: "Petal Chain Bracelet",
    price: 156,
    image: productBracelet,
    category: "Bracelets",
    isBestseller: true,
  },
  {
    id: 3,
    name: "Bloom Ring",
    price: 189,
    image: productRing,
    category: "Rings",
    isNew: true,
  },
  {
    id: 4,
    name: "Daisy Drop Necklace",
    price: 245,
    image: productNecklace,
    category: "Necklaces",
    isBestseller: true,
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-daisy-blush/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <AnimatedSection animation="slide-right">
            <div className="space-y-4">
              <p className="font-body text-sm font-medium text-primary uppercase tracking-widest animate-shimmer">
                Featured Collection
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
                Our Bestsellers
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-xl">
                Discover the pieces our community loves most. Each design is crafted 
                with intention and inspired by the gentle beauty of nature.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-left" delay={200}>
            <Button variant="outline" className="self-start md:self-auto group hover-lift">
              View All Products
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </AnimatedSection>
        </div>

        {/* Product Grid with staggered animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <AnimatedSection
              key={product.id}
              animation="scale"
              delay={index * 100}
            >
              <div className="hover-lift">
                <ProductCard {...product} />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Decorative line */}
        <AnimatedSection animation="fade-up" delay={500}>
          <div className="mt-16 flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
