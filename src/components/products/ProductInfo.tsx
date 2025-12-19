import { useState } from "react";
import { Heart, ShoppingBag, Share2, Star, Check, Truck, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Collection */}
      <div className="flex items-center gap-2 font-body text-sm text-muted-foreground">
        <span>Home</span>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="text-primary">{product.collection}</span>
      </div>

      {/* Title & Price */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            {product.name}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={() => {
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
              className={cn(
                "h-6 w-6 transition-colors",
                isLiked && "fill-primary text-primary"
              )}
            />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating)
                    ? "fill-primary text-primary"
                    : "text-muted"
                )}
              />
            ))}
          </div>
          <span className="font-body text-sm text-muted-foreground">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="font-body text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="px-2 py-1 bg-accent text-accent-foreground font-body text-xs font-semibold rounded-full">
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="font-body text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-3">
          <label className="font-body text-sm font-medium text-foreground">
            Color: <span className="text-muted-foreground">{selectedColor}</span>
          </label>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "px-4 py-2 rounded-full font-body text-sm border-2 transition-all duration-300",
                  selectedColor === color
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-3">
          <label className="font-body text-sm font-medium text-foreground">
            Size: <span className="text-muted-foreground">{selectedSize}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "min-w-[60px] px-4 py-2 rounded-xl font-body text-sm border-2 transition-all duration-300",
                  selectedSize === size
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="flex items-center gap-4 pt-2">
        <div className="flex items-center border-2 border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 font-body text-lg hover:bg-muted transition-colors"
          >
            −
          </button>
          <span className="px-4 py-3 font-body text-base font-medium min-w-[60px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-3 font-body text-lg hover:bg-muted transition-colors"
          >
            +
          </button>
        </div>

        <Button 
          variant="hero" 
          size="lg" 
          className="flex-1 gap-2"
          onClick={() => {
            addToCart(product, quantity, selectedColor || undefined, selectedSize || undefined);
            toast.success('Added to cart');
          }}
        >
          <ShoppingBag className="h-5 w-5" />
          Add to Cart
        </Button>

        <Button variant="outline" size="icon" className="h-14 w-14">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {product.inStock ? (
          <>
            <Check className="h-4 w-4 text-daisy-sage-deep" />
            <span className="font-body text-sm text-daisy-sage-deep">
              In Stock — Ready to ship
            </span>
          </>
        ) : (
          <span className="font-body text-sm text-destructive">
            Currently out of stock
          </span>
        )}
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="p-3 rounded-full bg-muted">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <span className="font-body text-xs text-muted-foreground">
            Free Shipping
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="p-3 rounded-full bg-muted">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <span className="font-body text-xs text-muted-foreground">
            2 Year Warranty
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="p-3 rounded-full bg-muted">
            <RefreshCw className="h-5 w-5 text-primary" />
          </div>
          <span className="font-body text-xs text-muted-foreground">
            30-Day Returns
          </span>
        </div>
      </div>
    </div>
  );
}
