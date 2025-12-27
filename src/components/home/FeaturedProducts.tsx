import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { apiClient } from "@/lib/api";
import { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/products?limit=8');
      
      if (response.success && response.data) {
        console.log('API Response:', response.data);
        console.log('Total products:', response.data.products.length);
        console.log('Featured products:', response.data.products.filter((p: Product) => p.featured).length);
        
        // Filter to show only featured products or limit to 4 products
        const featuredProducts = response.data.products.filter((p: Product) => p.featured).slice(0, 4);
        const displayProducts = featuredProducts.length > 0 ? featuredProducts : response.data.products.slice(0, 4);
        
        console.log('Display products:', displayProducts.length);
        console.log('Display products details:', displayProducts);
        
        setProducts(displayProducts);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchProducts} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {/* Product Grid with staggered animations */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => {
              console.log('Mapping product:', product);
              return (
                <AnimatedSection
                  key={product._id}
                  animation="scale"
                  delay={index * 100}
                >
                  <div className="hover-lift">
                    <ProductCard {...product} />
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        )}

        {/* No Products State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        )}

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
