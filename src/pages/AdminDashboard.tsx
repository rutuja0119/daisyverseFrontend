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
  Plus,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/api";
import { useEffect, useState } from "react";
import productEarrings from "@/assets/product-earrings.jpg";
import productBracelet from "@/assets/product-bracelet.jpg";
import productRing from "@/assets/product-ring.jpg";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  availability: string;
  isActive: boolean;
  featured: boolean;
  size?: string;
  color?: string;
  quantity: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
  pricing: {
    originalPrice?: number;
    discountPercentage: number;
  };
}

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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [categoryStats, setCategoryStats] = useState<Array<{_id: string, count: number}>>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/admin/products?limit=5&sortBy=createdAt&sortOrder=desc');
      setRecentProducts(response.data.products);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch recent products",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryStats = async () => {
    try {
      const response = await apiClient.get('/admin/stats');
      setCategoryStats(response.data.categoryStats || []);
    } catch (error) {
      console.error('Failed to fetch category stats:', error);
    }
  };

  useEffect(() => {
    fetchRecentProducts();
    fetchCategoryStats();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await apiClient.delete(`/admin/products/${productId}`);
      toast({
        title: "Success",
        description: "Product deleted successfully"
      });
      fetchRecentProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'preorder': return 'bg-yellow-100 text-yellow-800';
      case 'coming_soon': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (isActive: boolean, featured: boolean) => {
    if (featured) return 'bg-purple-100 text-purple-800';
    if (isActive) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

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
          <Button variant="outline" onClick={() => navigate('/admin/products')}>
            <Package className="h-4 w-4 mr-2" />
            All Products
          </Button>
          <Button variant="default" onClick={() => navigate('/admin/products/add')}>
            <Plus className="h-4 w-4 mr-2" />
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
        {/* Recent Products */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-card">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Recent Products
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/products')}>
              View All Products
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : recentProducts.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                No products found
              </div>
            ) : (
              recentProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                >
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      SKU: {product.sku} • {product.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-sm font-semibold text-foreground">
                      ${product.price}
                    </p>
                    <div className="flex gap-1 mt-1">
                      <span
                        className={cn(
                          "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                          getStatusColor(product.isActive, product.featured)
                        )}
                      >
                        {product.featured ? 'Featured' : product.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span
                        className={cn(
                          "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                          getAvailabilityColor(product.availability)
                        )}
                      >
                        {product.availability.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => navigate(`/admin/products/${product._id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Category Statistics */}
        <div className="bg-card rounded-2xl border border-border shadow-card">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Category Stats
            </h2>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 space-y-4">
            {categoryStats.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No category data available
              </div>
            ) : (
              categoryStats.map((category, index) => (
                <div
                  key={category._id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/products?category=${category._id}`)}
                >
                  <span className="font-display text-lg font-semibold text-muted-foreground w-6">
                    {index + 1}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-foreground capitalize">
                      {category._id}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {category.count} products
                    </p>
                  </div>
                  <Badge variant="secondary" className="font-medium">
                    {category.count}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
