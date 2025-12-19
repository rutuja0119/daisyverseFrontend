import { useState } from "react";
import { cn } from "@/lib/utils";
import { Product } from "@/data/products";

interface ProductTabsProps {
  product: Product;
}

const tabs = ["Details", "Materials", "Care", "Reviews"];

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("Details");

  return (
    <div className="space-y-6">
      {/* Tab Headers */}
      <div className="flex gap-1 p-1 bg-muted rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-3 px-4 rounded-xl font-body text-sm font-medium transition-all duration-300",
              activeTab === tab
                ? "bg-background text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === "Details" && (
          <div className="animate-fade-up space-y-4">
            <h4 className="font-display text-lg font-medium">Product Details</h4>
            <ul className="space-y-3">
              {product.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="font-body text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "Materials" && (
          <div className="animate-fade-up space-y-4">
            <h4 className="font-display text-lg font-medium">Materials & Quality</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.materials.map((material, index) => (
                <div
                  key={index}
                  className="glass-panel rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-display text-lg text-primary">✦</span>
                  </div>
                  <span className="font-body text-foreground">{material}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Care" && (
          <div className="animate-fade-up space-y-4">
            <h4 className="font-display text-lg font-medium">Care Instructions</h4>
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              {product.careInstructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-body text-xs text-primary font-semibold">
                    {index + 1}
                  </span>
                  <span className="font-body text-muted-foreground">
                    {instruction}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="animate-fade-up space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-lg font-medium">
                Customer Reviews ({product.reviews})
              </h4>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "text-lg",
                        i < Math.floor(product.rating) ? "text-primary" : "text-muted"
                      )}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="font-body text-sm text-muted-foreground">
                  {product.rating} out of 5
                </span>
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-4">
              {[
                {
                  name: "Emma S.",
                  rating: 5,
                  date: "2 weeks ago",
                  comment: "Absolutely stunning piece! The quality exceeded my expectations. I receive compliments every time I wear it.",
                },
                {
                  name: "Sophia L.",
                  rating: 5,
                  date: "1 month ago",
                  comment: "Beautiful craftsmanship and arrived in gorgeous packaging. Perfect for gifting!",
                },
                {
                  name: "Olivia M.",
                  rating: 4,
                  date: "1 month ago",
                  comment: "Lovely design, very comfortable to wear. Slightly smaller than expected but still gorgeous.",
                },
              ].map((review, index) => (
                <div key={index} className="glass-panel rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-display text-sm text-primary font-semibold">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-body text-sm font-medium text-foreground">
                          {review.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={cn(
                                  "text-xs",
                                  i < review.rating ? "text-primary" : "text-muted"
                                )}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="font-body text-xs text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
