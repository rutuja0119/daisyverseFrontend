import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

interface ProductGridCardProps {
  product: Product;
}

export function ProductGridCard({ product }: ProductGridCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const imageIndex = Math.floor((x / width) * Math.min(product.images.length, 4));
    setCurrentImage(Math.min(imageIndex, product.images.length - 1));
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImage(0);
      }}
    >
      {/* Image Container */}
      <Link to={`/products/${product.id}`}>
        <div
          className="relative overflow-hidden rounded-2xl bg-muted aspect-[3/4]"
          onMouseMove={handleMouseMove}
        >
          {/* Main Image with Crossfade */}
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} view ${index + 1}`}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-all duration-500",
                currentImage === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
              )}
            />
          ))}

          {/* Gradient Overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Image Indicators */}
          {isHovered && product.images.length > 1 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.slice(0, 4).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    currentImage === index
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/50"
                  )}
                />
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-primary text-primary-foreground font-body text-xs font-semibold rounded-full shadow-soft">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="px-3 py-1 bg-daisy-sage-deep text-daisy-cream font-body text-xs font-semibold rounded-full shadow-soft">
                Bestseller
              </span>
            )}
            {product.originalPrice && (
              <span className="px-3 py-1 bg-accent text-accent-foreground font-body text-xs font-semibold rounded-full shadow-soft">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="glass"
            size="icon"
            className={cn(
              "absolute top-4 right-4 transition-all duration-300 backdrop-blur-lg",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            )}
            onClick={(e) => {
              e.preventDefault();
              if (isLiked) {
                removeFromWishlist(product.id);
                toast.success('Removed from wishlist');
              } else {
                addToWishlist(product);
                toast.success('Added to wishlist');
              }
            }}
          >
            <Heart
              className={cn("h-4 w-4 transition-colors", isLiked && "fill-primary text-primary")}
            />
          </Button>

          {/* Action Buttons */}
          <div
            className={cn(
              "absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Button
              variant="glass"
              className="flex-1 text-sm backdrop-blur-lg"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
                toast.success('Added to cart');
              }}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="glass"
              size="icon"
              className="backdrop-blur-lg"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <Link to={`/products/${product.id}`} className="block mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
            {product.category}
          </p>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="font-body text-xs text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
        <h3 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="font-body text-base font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </p>
          {product.originalPrice && (
            <p className="font-body text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
