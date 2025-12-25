import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Package,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Image as ImageIcon,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { apiClient } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

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

interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  categoryStats: Array<{ _id: string; count: number }>;
  availabilityStats: Array<{ _id: string; count: number }>;
}

export function ProductManagement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Add debounce for search
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSearchChange = (value: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      setSearchTerm(value);
      setCurrentPage(1);
    }, 300);
    
    setSearchTimeout(timeout);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  
  const categories = ['necklace', 'earrings', 'bracelet', 'ring', 'other'];
  const availabilityOptions = ['in_stock', 'out_of_stock', 'preorder', 'coming_soon'];
  const statusOptions = ['active', 'inactive', 'featured'];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('search', searchTerm);
      if (categoryFilter && categoryFilter !== 'all') params.append('category', categoryFilter);
      if (availabilityFilter && availabilityFilter !== 'all') params.append('availability', availabilityFilter);
      if (statusFilter === 'featured') params.append('featured', 'true');
      if (statusFilter === 'active') params.append('isActive', 'true');
      if (statusFilter === 'inactive') params.append('isActive', 'false');
      
      params.append('page', currentPage.toString());
      params.append('limit', '20');
      
      const response = await apiClient.get(`/admin/products?${params}`);
      const data = response.data as { products: Product[]; totalPages: number; total: number };
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setTotalProducts(data.total);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await apiClient.get('/admin/stats');
      const data = response.data as { stats: ProductStats };
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, [searchTerm, categoryFilter, availabilityFilter, statusFilter, currentPage]);

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await apiClient.delete(`/admin/products/${productId}`);
      toast({
        title: "Success",
        description: "Product deleted successfully"
      });
      fetchProducts();
      fetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    }
  };

  const handleBulkAction = async (action: 'activate' | 'deactivate' | 'delete') => {
    if (selectedProducts.length === 0) {
      toast({
        title: "No products selected",
        description: "Please select products to perform bulk action",
        variant: "destructive"
      });
      return;
    }

    if (action === 'delete' && !confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) return;

    setLoadingAction(action);
    
    try {
      if (action === 'delete') {
        await Promise.all(selectedProducts.map(id => apiClient.delete(`/admin/products/${id}`)));
      } else {
        await apiClient.patch('/admin/products/bulk-status', {
          productIds: selectedProducts,
          status: action
        });
      }
      
      toast({
        title: "Success",
        description: `Bulk action completed successfully`
      });
      setSelectedProducts([]);
      fetchProducts();
      fetchStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform bulk action",
        variant: "destructive"
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p._id));
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
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

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setAvailabilityFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const exportProducts = async () => {
    try {
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('search', searchTerm);
      if (categoryFilter && categoryFilter !== 'all') params.append('category', categoryFilter);
      if (availabilityFilter && availabilityFilter !== 'all') params.append('availability', availabilityFilter);
      if (statusFilter === 'featured') params.append('featured', 'true');
      if (statusFilter === 'active') params.append('isActive', 'true');
      if (statusFilter === 'inactive') params.append('isActive', 'false');
      
      const response = await apiClient.get(`/admin/products/export?${params}`);
      
      // Create and download CSV
      const csvContent = response.data as string;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `products_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "Products exported successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export products",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Product Management</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportProducts}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => navigate('/admin/products/add')}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProducts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.lowStockProducts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.outOfStockProducts}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter and search products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search products..."
                  defaultValue={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All availability</SelectItem>
                  {availabilityOptions.map(option => (
                    <SelectItem key={option} value={option}>
                      {option.replace('_', ' ').charAt(0).toUpperCase() + option.replace('_', ' ').slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
            
            {selectedProducts.length > 0 && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleBulkAction('activate')}
                  disabled={loadingAction === 'activate'}
                >
                  {loadingAction === 'activate' ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  ) : (
                    'Activate Selected'
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleBulkAction('deactivate')}
                  disabled={loadingAction === 'deactivate'}
                >
                  {loadingAction === 'deactivate' ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  ) : (
                    'Deactivate Selected'
                  )}
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleBulkAction('delete')}
                  disabled={loadingAction === 'delete'}
                >
                  {loadingAction === 'delete' ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  ) : (
                    'Delete Selected'
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({totalProducts})</CardTitle>
          <CardDescription>Click on a product to edit or manage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedProducts.length === products.length && products.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product._id)}
                        onCheckedChange={() => handleSelectProduct(product._id)}
                      />
                    </TableCell>
                    <TableCell>
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-sm text-gray-600">{product.sku}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">${product.price}</span>
                        {product.pricing.originalPrice && product.pricing.discountPercentage > 0 && (
                          <span className="text-xs text-green-600">
                            {product.pricing.discountPercentage}% off
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className={product.stock < 5 ? 'text-orange-600 font-medium' : 'font-medium'}>
                          {product.stock}
                        </span>
                        {product.stock === 0 && (
                          <AlertCircle className="ml-1 h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(product.isActive, product.featured)}>
                        {product.featured ? 'Featured' : product.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getAvailabilityColor(product.availability)}>
                        {product.availability.replace('_', ' ').charAt(0).toUpperCase() + product.availability.replace('_', ' ').slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setQuickViewProduct(product)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or add a new product.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, totalProducts)} of {totalProducts} products
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, currentPage - 2) + i;
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick View Modal */}
      <Dialog open={!!quickViewProduct} onOpenChange={() => setQuickViewProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{quickViewProduct?.name}</DialogTitle>
            <DialogDescription>Product details and information</DialogDescription>
          </DialogHeader>
          
          {quickViewProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {quickViewProduct.images && quickViewProduct.images.length > 0 ? (
                  <img
                    src={quickViewProduct.images[0]}
                    alt={quickViewProduct.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Description</h4>
                  <p className="text-sm text-gray-600">{quickViewProduct.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">SKU</h4>
                    <p className="text-sm">{quickViewProduct.sku}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Category</h4>
                    <p className="text-sm capitalize">{quickViewProduct.category}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Price</h4>
                    <p className="text-sm">${quickViewProduct.price}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Stock</h4>
                    <p className="text-sm">{quickViewProduct.stock}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Badge className={getStatusColor(quickViewProduct.isActive, quickViewProduct.featured)}>
                    {quickViewProduct.featured ? 'Featured' : quickViewProduct.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge className={getAvailabilityColor(quickViewProduct.availability)}>
                    {quickViewProduct.availability.replace('_', ' ').charAt(0).toUpperCase() + quickViewProduct.availability.replace('_', ' ').slice(1)}
                  </Badge>
                </div>
                
                {quickViewProduct.size && (
                  <div>
                    <h4 className="font-semibold">Size</h4>
                    <p className="text-sm">{quickViewProduct.size}</p>
                  </div>
                )}
                
                {quickViewProduct.color && (
                  <div>
                    <h4 className="font-semibold">Color</h4>
                    <p className="text-sm">{quickViewProduct.color}</p>
                  </div>
                )}
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    size="sm" 
                    onClick={() => {
                      setQuickViewProduct(null);
                      navigate(`/admin/products/${quickViewProduct._id}/edit`);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setQuickViewProduct(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  </AdminLayout>
  );
}