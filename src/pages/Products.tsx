import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGridCard } from "@/components/products/ProductGridCard";
import { FloatingPetals } from "@/components/home/FloatingPetals";
import { products } from "@/data/products";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCollection, setSelectedCollection] = useState("All");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Collection filter
    if (selectedCollection !== "All") {
      filtered = filtered.filter((p) => p.collection === selectedCollection);
    }

    // Price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sorting
    switch (selectedSort) {
      case "newest":
        filtered = filtered.filter((p) => p.isNew).concat(filtered.filter((p) => !p.isNew));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - bestsellers first
        filtered = filtered
          .filter((p) => p.isBestseller)
          .concat(filtered.filter((p) => !p.isBestseller));
    }

    return filtered;
  }, [selectedCategory, selectedCollection, selectedSort, priceRange]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingPetals />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-petal opacity-50" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-body text-sm font-medium rounded-full mb-6">
              Our Collection
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-6">
              Discover Your <span className="text-gradient-gold">Perfect Piece</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
              Each piece tells a story of elegance, crafted with love and inspired by the 
              timeless beauty of nature's most delicate blooms.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filters */}
          <ProductFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCollection={selectedCollection}
            setSelectedCollection={setSelectedCollection}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          {/* Results Count */}
          <div className="my-8 flex items-center justify-between">
            <p className="font-body text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredProducts.length}</span> products
            </p>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductGridCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <span className="font-display text-4xl text-muted-foreground">✿</span>
              </div>
              <h3 className="font-display text-2xl font-medium text-foreground mb-2">
                No products found
              </h3>
              <p className="font-body text-muted-foreground">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
