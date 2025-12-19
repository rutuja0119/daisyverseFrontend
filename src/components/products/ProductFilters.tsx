import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { categories, collections, sortOptions } from "@/data/products";

interface ProductFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedCollection: string;
  setSelectedCollection: (collection: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

export function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  selectedCollection,
  setSelectedCollection,
  selectedSort,
  setSelectedSort,
  priceRange,
  setPriceRange,
}: ProductFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedCollection !== "All" ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000;

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedCollection("All");
    setPriceRange([0, 1000]);
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                Active
              </span>
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
              <X className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
            className="gap-2"
          >
            Sort by: {sortOptions.find((s) => s.value === selectedSort)?.label}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                openDropdown === "sort" && "rotate-180"
              )}
            />
          </Button>
          {openDropdown === "sort" && (
            <div className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-xl p-2 z-10 animate-scale-in">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedSort(option.value);
                    setOpenDropdown(null);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-lg font-body text-sm transition-colors",
                    selectedSort === option.value
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expanded Filters Panel */}
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden transition-all duration-500 ease-out",
          isFiltersOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {/* Category Filter */}
        <div className="glass-panel rounded-2xl p-6">
          <h4 className="font-display text-lg font-medium mb-4">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full font-body text-sm transition-all duration-300",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Filter */}
        <div className="glass-panel rounded-2xl p-6">
          <h4 className="font-display text-lg font-medium mb-4">Collection</h4>
          <div className="flex flex-wrap gap-2">
            {collections.map((collection) => (
              <button
                key={collection}
                onClick={() => setSelectedCollection(collection)}
                className={cn(
                  "px-4 py-2 rounded-full font-body text-sm transition-all duration-300",
                  selectedCollection === collection
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                )}
              >
                {collection}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="glass-panel rounded-2xl p-6">
          <h4 className="font-display text-lg font-medium mb-4">Price Range</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="font-body text-xs text-muted-foreground mb-1 block">
                  Min
                </label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-full px-4 py-2 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="$0"
                />
              </div>
              <span className="text-muted-foreground mt-6">—</span>
              <div className="flex-1">
                <label className="font-body text-xs text-muted-foreground mb-1 block">
                  Max
                </label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full px-4 py-2 rounded-xl border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="$1000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory !== "All" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full font-body text-sm">
              {selectedCategory}
              <button onClick={() => setSelectedCategory("All")}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedCollection !== "All" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full font-body text-sm">
              {selectedCollection}
              <button onClick={() => setSelectedCollection("All")}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {(priceRange[0] > 0 || priceRange[1] < 1000) && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full font-body text-sm">
              ${priceRange[0]} - ${priceRange[1]}
              <button onClick={() => setPriceRange([0, 1000])}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
