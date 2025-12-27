import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { AlertCircle, ArrowLeft, Edit, Trash2, Eye, Package, DollarSign, Calendar, Tag, Globe, Shield, Truck, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { apiClient } from '@/lib/api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
  features: {
    returnPolicy: string;
    shipping: string;
    material: string;
    careInstructions: string;
  };
  specifications: {
    dimensions: {
      length: string;
      width: string;
      height: string;
      weight: string;
    };
    materials: string[];
    origin: string;
    warranty: string;
  };
  tags: string[];
}

export function ViewProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/admin/products/${id}`);
      if (response.success && response.data) {
        setProduct(response.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch product details",
          variant: "destructive"
        });
        navigate('/admin/products');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch product details",
        variant: "destructive"
      });
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`/admin/products/${id}`);
      if (response.success) {
        toast({
          title: "Success",
          description: "Product deleted successfully"
        });
        navigate('/admin/products');
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to delete product",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!product) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Product not found</h3>
          <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/admin/products')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/products')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">Product Details</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/admin/products/${product._id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Product Images */}
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>Gallery of product images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {product.images && product.images.length > 0 ? (
                <>
                  <div className="aspect-square max-w-md mx-auto">
                    <img
                      src={product.images[currentImageIndex]}
                      alt={`${product.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="flex gap-2 justify-center">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-16 h-16 rounded border-2 overflow-hidden ${
                            currentImageIndex === index ? 'border-primary' : 'border-gray-200'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-square max-w-md mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential product details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Product Name</Label>
                <p className="text-lg font-medium">{product.name}</p>
              </div>
              <div>
                <Label>Description</Label>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{product.description}</p>
              </div>
              <div>
                <Label>SKU</Label>
                <p className="font-mono text-sm">{product.sku}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Badge variant="outline" className="capitalize">{product.category}</Badge>
                </div>
                <div>
                  <Label>Availability</Label>
                  <Badge className={getAvailabilityColor(product.availability)}>
                    {product.availability.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
              {product.size && (
                <div>
                  <Label>Size</Label>
                  <p className="text-sm">{product.size}</p>
                </div>
              )}
              {product.color && (
                <div>
                  <Label>Color</Label>
                  <p className="text-sm">{product.color}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Stock</CardTitle>
              <CardDescription>Product pricing and inventory details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Price</Label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">${product.price}</span>
                  {product.pricing.originalPrice && product.pricing.discountPercentage > 0 && (
                    <>
                      <span className="text-lg text-gray-500 line-through">${product.pricing.originalPrice}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {product.pricing.discountPercentage}% OFF
                      </Badge>
                    </>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Stock Quantity</Label>
                  <p className="text-lg font-medium">{product.stock}</p>
                </div>
                <div>
                  <Label>Quantity</Label>
                  <p className="text-lg font-medium">{product.quantity}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(product.isActive, product.featured)}>
                    {product.featured ? 'FEATURED' : product.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </Badge>
                  {product.featured && <Badge variant="secondary">Featured</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>Product features and care information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.features.material && (
                <div>
                  <Label className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Material
                  </Label>
                  <p className="text-sm">{product.features.material}</p>
                </div>
              )}
              {product.features.careInstructions && (
                <div>
                  <Label>Care Instructions</Label>
                  <p className="text-sm">{product.features.careInstructions}</p>
                </div>
              )}
              {product.features.returnPolicy && (
                <div>
                  <Label className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Return Policy
                  </Label>
                  <p className="text-sm">{product.features.returnPolicy}</p>
                </div>
              )}
              {product.features.shipping && (
                <div>
                  <Label className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Shipping
                  </Label>
                  <p className="text-sm">{product.features.shipping}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>Technical specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Origin
                </Label>
                <p className="text-sm">{product.specifications.origin || 'Not specified'}</p>
              </div>
              {product.specifications.warranty && (
                <div>
                  <Label className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Warranty
                  </Label>
                  <p className="text-sm">{product.specifications.warranty}</p>
                </div>
              )}
              {product.specifications.materials.length > 0 && (
                <div>
                  <Label>Materials</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.specifications.materials.map((material, index) => (
                      <Badge key={index} variant="secondary">{material}</Badge>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <Label>Dimensions</Label>
                <div className="grid grid-cols-2 gap-2 mt-1 text-sm">
                  {product.specifications.dimensions.length && (
                    <div>Length: {product.specifications.dimensions.length}</div>
                  )}
                  {product.specifications.dimensions.width && (
                    <div>Width: {product.specifications.dimensions.width}</div>
                  )}
                  {product.specifications.dimensions.height && (
                    <div>Height: {product.specifications.dimensions.height}</div>
                  )}
                  {product.specifications.dimensions.weight && (
                    <div>Weight: {product.specifications.dimensions.weight}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tags & Metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Tags & Metadata</CardTitle>
            <CardDescription>Product tags and system information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Tags</Label>
                {product.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">No tags assigned</p>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Created
                  </Label>
                  <p className="text-sm">{formatDate(product.createdAt)}</p>
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Last Updated
                  </Label>
                  <p className="text-sm">{formatDate(product.updatedAt)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete "{product.name}" and remove it from your catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}