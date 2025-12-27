import { useState } from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  featured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export function ProductCard({
  _id,
  name,
  price,
  images,
  category,
  featured,
  isNew,
  isBestseller,
}: ProductCardProps) {
  console.log('ProductCard received:', { _id, name, price, images, category, featured, isNew, isBestseller });
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl bg-muted aspect-square">
        <img
          src={images && images.length > 0 ? images[0] : '/placeholder-product.jpg'}
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
        />

        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-primary text-primary-foreground font-body text-xs font-semibold rounded-full">
              New
            </span>
          )}
          {isBestseller && (
            <span className="px-3 py-1 bg-daisy-sage-deep text-daisy-cream font-body text-xs font-semibold rounded-full">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="glass"
          size="icon"
          className={cn(
            "absolute top-4 right-4 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={cn("h-4 w-4", isLiked && "fill-primary text-primary")}
          />
        </Button>

        {/* Action Buttons */}
        <div
          className={cn(
            "absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Button variant="glass" className="flex-1 text-sm">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button variant="glass" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
          {category}
        </p>
        <h3 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="font-body text-base font-semibold text-foreground">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
