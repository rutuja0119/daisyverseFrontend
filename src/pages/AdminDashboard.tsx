import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import productEarrings from "@/assets/product-earrings.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productRing from "@/assets/product-ring.jpg";

const stats = [
  {
    name: "Total Revenue",
    value: "$45,231",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    name: "Active Customers",
    value: "5,678",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "bg-daisy-sage text-daisy-sage-deep",
  },
  {
    name: "Products",
    value: "342",
    change: "-2.1%",
    trend: "down",
    icon: Package,
    color: "bg-daisy-blush text-accent-foreground",
  },
];

const recentOrders = [
  {
    id: "#DV-1234",
    customer: "Emma Richardson",
    product: "Golden Daisy Studs",
    amount: "$128.00",
    status: "Delivered",
    image: productEarrings,
  },
  {
    id: "#DV-1233",
    customer: "Sophie Chen",
    product: "Petal Chain Bracelet",
    amount: "$156.00",
    status: "Shipped",
    image: productBracelet,
  },
  {
    id: "#DV-1232",
    customer: "Isabella Moore",
    product: "Bloom Ring",
    amount: "$189.00",
    status: "Processing",
    image: productRing,
  },
];

const topProducts = [
  { name: "Golden Daisy Studs", sales: 234, revenue: "$29,952", image: productEarrings },
  { name: "Petal Chain Bracelet", sales: 189, revenue: "$29,484", image: productBracelet },
  { name: "Bloom Ring", sales: 156, revenue: "$29,484", image: productRing },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Dashboard
          </h1>
          <p className="font-body text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Download Report</Button>
          <Button variant="default">
            <Package className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-card rounded-2xl p-6 border border-border shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  stat.trend === "up" ? "text-daisy-sage-deep" : "text-destructive"
                )}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="font-display text-2xl font-semibold text-foreground">
              {stat.value}
            </p>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {stat.name}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-card">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Recent Orders
            </h2>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
              >
                <img
                  src={order.image}
                  alt={order.product}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-foreground truncate">
                    {order.product}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {order.customer} • {order.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-body text-sm font-semibold text-foreground">
                    {order.amount}
                  </p>
                  <span
                    className={cn(
                      "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                      order.status === "Delivered" &&
                        "bg-daisy-sage text-daisy-sage-deep",
                      order.status === "Shipped" &&
                        "bg-primary/10 text-primary",
                      order.status === "Processing" &&
                        "bg-daisy-blush text-accent-foreground"
                    )}
                  >
                    {order.status}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card rounded-2xl border border-border shadow-card">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Top Products
            </h2>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <span className="font-display text-lg font-semibold text-muted-foreground w-6">
                  {index + 1}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-foreground truncate">
                    {product.name}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {product.sales} sales
                  </p>
                </div>
                <p className="font-body text-sm font-semibold text-foreground">
                  {product.revenue}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
