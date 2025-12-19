import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ImageGallery } from "@/components/products/ImageGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductTabs } from "@/components/products/ProductTabs";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { FloatingPetals } from "@/components/home/FloatingPetals";
import { products } from "@/data/products";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingPetals />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="animate-fade-up">
              <ImageGallery images={product.images} productName={product.name} />
            </div>

            {/* Product Info */}
            <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <ProductTabs product={product} />
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <RelatedProducts currentProduct={product} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
