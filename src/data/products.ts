import productEarrings from "@/assets/product-earrings.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productNecklace from "@/assets/product-necklace.jpg";
import productRing from "@/assets/product-ring.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  collection: string;
  description: string;
  details: string[];
  materials: string[];
  careInstructions: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Petal Drop Earrings",
    price: 189,
    images: [productEarrings, productNecklace, productBracelet, productRing],
    category: "Earrings",
    collection: "Garden Dreams",
    description: "Delicate petal-shaped earrings that capture the essence of a daisy in full bloom. Each piece is handcrafted with meticulous attention to detail, featuring a subtle gold finish that catches the light beautifully.",
    details: [
      "Handcrafted 18k gold-plated sterling silver",
      "Lightweight and comfortable for all-day wear",
      "Dimensions: 2.5cm drop length",
      "Push-back closure for secure fit"
    ],
    materials: ["18k Gold-Plated Sterling Silver", "Hypoallergenic"],
    careInstructions: [
      "Store in the provided jewelry box",
      "Avoid contact with perfumes and lotions",
      "Clean gently with a soft cloth",
      "Remove before swimming or bathing"
    ],
    isNew: true,
    rating: 4.9,
    reviews: 124,
    inStock: true,
    colors: ["Gold", "Rose Gold", "Silver"]
  },
  {
    id: 2,
    name: "Daisy Chain Bracelet",
    price: 245,
    originalPrice: 295,
    images: [productBracelet, productEarrings, productRing, productNecklace],
    category: "Bracelets",
    collection: "Timeless Elegance",
    description: "A stunning bracelet featuring interconnected daisy motifs, symbolizing unity and natural beauty. This piece seamlessly blends classic elegance with contemporary design.",
    details: [
      "Solid 14k gold construction",
      "Adjustable chain length: 16-19cm",
      "Lobster clasp closure",
      "Each daisy measures 8mm in diameter"
    ],
    materials: ["14k Solid Gold", "Premium Quality"],
    careInstructions: [
      "Store separately to prevent scratching",
      "Polish regularly with jewelry cloth",
      "Avoid harsh chemicals",
      "Professional cleaning recommended annually"
    ],
    isBestseller: true,
    rating: 4.8,
    reviews: 256,
    inStock: true,
    sizes: ["Small (16cm)", "Medium (17.5cm)", "Large (19cm)"]
  },
  {
    id: 3,
    name: "Sunrise Pendant Necklace",
    price: 320,
    images: [productNecklace, productRing, productEarrings, productBracelet],
    category: "Necklaces",
    collection: "Garden Dreams",
    description: "Inspired by the first light of dawn, this pendant captures the warmth and hope of a new day. The radiant design features delicate rays emanating from a central gemstone.",
    details: [
      "18k gold vermeil chain",
      "Natural citrine center stone",
      "Chain length: 45cm with 5cm extender",
      "Pendant diameter: 1.8cm"
    ],
    materials: ["18k Gold Vermeil", "Natural Citrine", "Sterling Silver Base"],
    careInstructions: [
      "Store flat to prevent tangling",
      "Keep away from humidity",
      "Clean with lukewarm water",
      "Avoid sleeping with jewelry on"
    ],
    isNew: true,
    isBestseller: true,
    rating: 5.0,
    reviews: 89,
    inStock: true,
    colors: ["Gold/Citrine", "Rose Gold/Rose Quartz", "Silver/Moonstone"]
  },
  {
    id: 4,
    name: "Eternal Bloom Ring",
    price: 275,
    images: [productRing, productNecklace, productBracelet, productEarrings],
    category: "Rings",
    collection: "Bridal Blossoms",
    description: "A romantic ring featuring an eternally blooming daisy, perfect for celebrating love and commitment. The intricate details make this piece a true work of art.",
    details: [
      "Solid 18k white gold",
      "Pavé-set diamonds (0.15ct total)",
      "Available in sizes 5-9",
      "Band width: 2mm"
    ],
    materials: ["18k White Gold", "Natural Diamonds", "VS Clarity"],
    careInstructions: [
      "Remove during physical activities",
      "Clean with mild soap solution",
      "Store in ring box when not worn",
      "Check prongs periodically"
    ],
    rating: 4.7,
    reviews: 178,
    inStock: true,
    sizes: ["5", "6", "7", "8", "9"]
  },
  {
    id: 5,
    name: "Whisper Hoops",
    price: 165,
    images: [productEarrings, productBracelet, productNecklace, productRing],
    category: "Earrings",
    collection: "Everyday Luxe",
    description: "Minimalist hoops with a delicate twisted texture, perfect for everyday elegance. These versatile earrings transition seamlessly from day to night.",
    details: [
      "14k gold-filled construction",
      "Hoop diameter: 2cm",
      "Lightweight design (2g each)",
      "Hinged closure"
    ],
    materials: ["14k Gold-Filled", "Nickel-Free"],
    careInstructions: [
      "Wipe clean after each wear",
      "Store in anti-tarnish pouch",
      "Avoid exposure to chlorine",
      "Keep dry when not in use"
    ],
    isBestseller: true,
    rating: 4.9,
    reviews: 342,
    inStock: true,
    colors: ["Gold", "Silver"]
  },
  {
    id: 6,
    name: "Garden Gate Cuff",
    price: 385,
    images: [productBracelet, productRing, productEarrings, productNecklace],
    category: "Bracelets",
    collection: "Garden Dreams",
    description: "An architectural cuff bracelet inspired by ornate garden gates, featuring intricate floral scrollwork. A statement piece that commands attention.",
    details: [
      "Solid brass with gold plating",
      "Width: 3cm at widest point",
      "Adjustable fit",
      "Signed and numbered limited edition"
    ],
    materials: ["Gold-Plated Brass", "Lead-Free", "Artisan Crafted"],
    careInstructions: [
      "Avoid bending repeatedly",
      "Store on bracelet cushion",
      "Polish with brass cloth",
      "Keep in original packaging"
    ],
    isNew: true,
    rating: 4.6,
    reviews: 67,
    inStock: true
  },
  {
    id: 7,
    name: "Moonlit Pearl Strand",
    price: 520,
    originalPrice: 650,
    images: [productNecklace, productEarrings, productRing, productBracelet],
    category: "Necklaces",
    collection: "Timeless Elegance",
    description: "A classic strand of lustrous freshwater pearls, reimagined with a modern clasp design featuring our signature daisy motif. Timeless beauty for generations.",
    details: [
      "AAA grade freshwater pearls",
      "Pearl size: 7-8mm",
      "Strand length: 45cm",
      "18k gold signature clasp"
    ],
    materials: ["Freshwater Pearls", "18k Gold Clasp", "Silk Thread"],
    careInstructions: [
      "Last on, first off rule",
      "Wipe with soft cloth after wearing",
      "Store flat, away from other jewelry",
      "Restring every 2-3 years"
    ],
    rating: 4.8,
    reviews: 156,
    inStock: true
  },
  {
    id: 8,
    name: "Infinity Vine Ring",
    price: 195,
    images: [productRing, productBracelet, productNecklace, productEarrings],
    category: "Rings",
    collection: "Everyday Luxe",
    description: "A delicate ring featuring intertwining vines that symbolize endless growth and connection. Perfect for stacking or wearing alone.",
    details: [
      "Sterling silver with rhodium plating",
      "Band width: 1.5mm",
      "Available in sizes 4-10",
      "Stackable design"
    ],
    materials: ["Rhodium-Plated Sterling Silver", "Tarnish-Resistant"],
    careInstructions: [
      "Ideal for everyday wear",
      "Clean with silver polish",
      "Store in soft pouch",
      "Avoid harsh detergents"
    ],
    rating: 4.7,
    reviews: 289,
    inStock: true,
    sizes: ["4", "5", "6", "7", "8", "9", "10"]
  }
];

export const categories = ["All", "Earrings", "Bracelets", "Necklaces", "Rings"];
export const collections = ["All", "Garden Dreams", "Timeless Elegance", "Bridal Blossoms", "Everyday Luxe"];
export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" }
];
