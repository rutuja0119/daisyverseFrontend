import { products, Product } from "@/data/products";
import { ProductGridCard } from "./ProductGridCard";

interface RelatedProductsProps {
  currentProduct: Product;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category ||
          p.collection === currentProduct.collection)
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            You May Also Love
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Discover more treasures from our collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductGridCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
