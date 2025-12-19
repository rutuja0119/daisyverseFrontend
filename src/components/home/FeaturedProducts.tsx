import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="space-y-4">
            <p className="font-body text-sm font-medium text-primary uppercase tracking-widest">
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
          <Button variant="outline" className="self-start md:self-auto group">
            View All Products
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
