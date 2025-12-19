import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import productEarrings from "@/assets/product-earrings.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

const collections = [
  {
    id: 1,
    name: "Golden Hour",
    description: "Warm, luminous pieces for sunset moments",
    image: productEarrings,
    itemCount: 24,
    size: "large",
  },
  {
    id: 2,
    name: "Garden Party",
    description: "Delicate florals for every occasion",
    image: productBracelet,
    itemCount: 18,
    size: "medium",
  },
  {
    id: 3,
    name: "Everyday Elegance",
    description: "Timeless pieces for daily wear",
    image: productNecklace,
    itemCount: 32,
    size: "medium",
  },
];

export function CollectionsShowcase() {
  return (
    <section className="py-24 bg-daisy-cream">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <p className="font-body text-sm font-medium text-primary uppercase tracking-widest">
            Curated For You
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            Shop by Collection
          </h2>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large Collection Card */}
          <Link
            to="/collections/golden-hour"
            className="group relative overflow-hidden rounded-3xl aspect-[4/5] lg:row-span-2 hover-lift"
          >
            <img
              src={collections[0].image}
              alt={collections[0].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-end justify-between">
                <div className="space-y-2">
                  <p className="font-body text-sm text-daisy-cream/80">
                    {collections[0].itemCount} Pieces
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl font-semibold text-daisy-cream">
                    {collections[0].name}
                  </h3>
                  <p className="font-body text-daisy-cream/80 max-w-xs">
                    {collections[0].description}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-12">
                  <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
            </div>
          </Link>

          {/* Medium Collection Cards */}
          {collections.slice(1).map((collection) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.name.toLowerCase().replace(" ", "-")}`}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] hover-lift"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                    <p className="font-body text-sm text-daisy-cream/80">
                      {collection.itemCount} Pieces
                    </p>
                    <h3 className="font-display text-2xl font-semibold text-daisy-cream">
                      {collection.name}
                    </h3>
                    <p className="font-body text-sm text-daisy-cream/70">
                      {collection.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-12">
                    <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
