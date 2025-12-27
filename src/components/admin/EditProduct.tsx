import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, ArrowLeft, Upload, X, Plus, Minus, Save, RotateCcw } from 'lucide-react';
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

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  color: string;
  quantity: number;
  stock: number;
  images: File[];
  existingImages: string[];
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
  pricing: {
    originalPrice?: number;
    discountPercentage: number;
    currency: string;
  };
  availability: string;
  tags: string[];
  sku: string;
  isActive: boolean;
  featured: boolean;
}

const categories = ['necklace', 'earrings', 'bracelet', 'ring', 'other'];
const availabilityOptions = ['in_stock', 'out_of_stock', 'preorder', 'coming_soon'];
const currencies = ['USD', 'EUR', 'GBP', 'INR'];

export function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    size: '',
    color: '',
    quantity: 1,
    stock: 0,
    images: [],
    existingImages: [],
    features: {
      returnPolicy: '30 days return policy',
      shipping: 'Free shipping on orders over $100',
      material: '',
      careInstructions: ''
    },
    specifications: {
      dimensions: {
        length: '',
        width: '',
        height: '',
        weight: ''
      },
      materials: [],
      origin: '',
      warranty: ''
    },
    pricing: {
      originalPrice: undefined,
      discountPercentage: 0,
      currency: 'USD'
    },
    availability: 'in_stock',
    tags: [],
    sku: '',
    isActive: true,
    featured: false
  });

  const [tagInput, setTagInput] = useState('');
  const [materialInput, setMaterialInput] = useState('');
  const [originalData, setOriginalData] = useState<ProductFormData | null>(null);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/admin/products/${id}`);
      if (response.success && response.data) {
        const product = response.data;
        const productData: ProductFormData = {
          name: product.name || '',
          description: product.description || '',
          price: product.price || 0,
          category: product.category || '',
          size: product.size || '',
          color: product.color || '',
          quantity: product.quantity || 1,
          stock: product.stock || 0,
          images: [],
          existingImages: product.images || [],
          features: {
            returnPolicy: product.features?.returnPolicy || '30 days return policy',
            shipping: product.features?.shipping || 'Free shipping on orders over $100',
            material: product.features?.material || '',
            careInstructions: product.features?.careInstructions || ''
          },
          specifications: {
            dimensions: {
              length: product.specifications?.dimensions?.length || '',
              width: product.specifications?.dimensions?.width || '',
              height: product.specifications?.dimensions?.height || '',
              weight: product.specifications?.dimensions?.weight || ''
            },
            materials: product.specifications?.materials || [],
            origin: product.specifications?.origin || '',
            warranty: product.specifications?.warranty || ''
          },
          pricing: {
            originalPrice: product.pricing?.originalPrice || undefined,
            discountPercentage: product.pricing?.discountPercentage || 0,
            currency: product.pricing?.currency || 'USD'
          },
          availability: product.availability || 'in_stock',
          tags: product.tags || [],
          sku: product.sku || '',
          isActive: product.isActive || true,
          featured: product.featured || false
        };
        setFormData(productData);
        setOriginalData(productData);
        setImagePreviews(product.images || []);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof ProductFormData],
        [field]: value
      }
    }));
  };

  const handleSpecificationDimensionsChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        dimensions: {
          ...prev.specifications.dimensions,
          [field]: value
        }
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length + formData.existingImages.length > 10) {
      toast({
        title: "Error",
        description: "Maximum 10 images allowed",
        variant: "destructive"
      });
      return;
    }

    const newImages = [...formData.images, ...files];
    setFormData(prev => ({ ...prev, images: newImages }));

    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number, isExisting: boolean = false) => {
    if (isExisting) {
      const newExistingImages = formData.existingImages.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, existingImages: newExistingImages }));
      setImagePreviews(prev => prev.filter((_, i) => i !== index));
    } else {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, images: newImages }));
      setImagePreviews(prev => prev.filter((_, i) => i !== index + formData.existingImages.length));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addMaterial = () => {
    if (materialInput.trim() && !formData.specifications.materials.includes(materialInput.trim())) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          materials: [...prev.specifications.materials, materialInput.trim()]
        }
      }));
      setMaterialInput('');
    }
  };

  const removeMaterial = (materialToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        materials: prev.specifications.materials.filter(material => material !== materialToRemove)
      }
    }));
  };

  const hasChanges = () => {
    if (!originalData) return false;
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.price || !formData.category) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      if (formData.existingImages.length === 0 && formData.images.length === 0) {
        toast({
          title: "Validation Error", 
          description: "Please upload at least one product image",
          variant: "destructive"
        });
        return;
      }

      const formDataToSend = new FormData();
      
      // Clean up the data to avoid undefined values
      const cleanData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        size: formData.size || '',
        color: formData.color || '',
        quantity: formData.quantity,
        stock: formData.stock,
        features: {
          returnPolicy: formData.features.returnPolicy || '30 days return policy',
          shipping: formData.features.shipping || 'Free shipping on orders over $100',
          material: formData.features.material || '',
          careInstructions: formData.features.careInstructions || ''
        },
        specifications: {
          dimensions: {
            length: formData.specifications.dimensions.length || '',
            width: formData.specifications.dimensions.width || '',
            height: formData.specifications.dimensions.height || '',
            weight: formData.specifications.dimensions.weight || ''
          },
          materials: formData.specifications.materials || [],
          origin: formData.specifications.origin || '',
          warranty: formData.specifications.warranty || ''
        },
        pricing: {
          originalPrice: formData.pricing.originalPrice || 0,
          discountPercentage: formData.pricing.discountPercentage || 0,
          currency: formData.pricing.currency || 'USD'
        },
        availability: formData.availability || 'in_stock',
        tags: formData.tags || [],
        sku: formData.sku || '',
        isActive: formData.isActive,
        featured: formData.featured,
        keepExistingImages: formData.existingImages.length > 0,
        existingImages: formData.existingImages
      };

      // Append product data
      formDataToSend.append('productData', JSON.stringify(cleanData));

      // Append image files
      formData.images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await apiClient.put(`/admin/products/${id}`, formDataToSend);

      if (response.success) {
        toast({
          title: "Success",
          description: "Product updated successfully!"
        });
        navigate('/admin/products');
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update product",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (hasChanges()) {
      setDiscardDialogOpen(true);
    } else {
      navigate('/admin/products');
    }
  };

  const handleDiscardChanges = () => {
    if (originalData) {
      setFormData(originalData);
      setImagePreviews(originalData.existingImages);
    }
    setDiscardDialogOpen(false);
  };

  const handleGoBack = () => {
    setDiscardDialogOpen(false);
    navigate('/admin/products');
  };

  if (isLoading && !originalData) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-6 max-w-6xl">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <CardTitle>Edit Product</CardTitle>
                  <CardDescription>Update product details and information</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                {hasChanges() && (
                  <Button variant="outline" onClick={handleDiscardChanges}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Discard Changes
                  </Button>
                )}
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size">Size</Label>
                      <Input
                        id="size"
                        value={formData.size}
                        onChange={(e) => handleInputChange('size', e.target.value)}
                        placeholder="e.g., Small, Medium, Large"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <Input
                        id="color"
                        value={formData.color}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                        placeholder="e.g., Gold, Silver, Rose Gold"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                        min="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                        min="0"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU</Label>
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => handleInputChange('sku', e.target.value)}
                        placeholder="Leave empty to auto-generate"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availabilityOptions.map(option => (
                            <SelectItem key={option} value={option}>
                              {option.replace('_', ' ').charAt(0).toUpperCase() + option.replace('_', ' ').slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="isActive">Status</Label>
                      <Select value={formData.isActive ? 'active' : 'inactive'} onValueChange={(value) => handleInputChange('isActive', value === 'active')}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="featured">Featured</Label>
                      <Select value={formData.featured ? 'featured' : 'normal'} onValueChange={(value) => handleInputChange('featured', value === 'featured')}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="featured">Featured</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Enter detailed product description"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                          {tag} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="material">Material</Label>
                      <Input
                        id="material"
                        value={formData.features.material}
                        onChange={(e) => handleNestedChange('features', 'material', e.target.value)}
                        placeholder="e.g., 18K Gold, Sterling Silver"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="origin">Origin</Label>
                      <Input
                        id="origin"
                        value={formData.specifications.origin}
                        onChange={(e) => handleNestedChange('specifications', 'origin', e.target.value)}
                        placeholder="Country of origin"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="warranty">Warranty</Label>
                      <Input
                        id="warranty"
                        value={formData.specifications.warranty}
                        onChange={(e) => handleNestedChange('specifications', 'warranty', e.target.value)}
                        placeholder="e.g., 1 year warranty"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="returnPolicy">Return Policy</Label>
                      <Input
                        id="returnPolicy"
                        value={formData.features.returnPolicy}
                        onChange={(e) => handleNestedChange('features', 'returnPolicy', e.target.value)}
                        placeholder="Return policy details"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="length">Length</Label>
                      <Input
                        id="length"
                        value={formData.specifications.dimensions.length}
                        onChange={(e) => handleSpecificationDimensionsChange('length', e.target.value)}
                        placeholder="e.g., 45cm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        value={formData.specifications.dimensions.width}
                        onChange={(e) => handleSpecificationDimensionsChange('width', e.target.value)}
                        placeholder="e.g., 2mm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        value={formData.specifications.dimensions.height}
                        onChange={(e) => handleSpecificationDimensionsChange('height', e.target.value)}
                        placeholder="e.g., 5mm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        value={formData.specifications.dimensions.weight}
                        onChange={(e) => handleSpecificationDimensionsChange('weight', e.target.value)}
                        placeholder="e.g., 15g"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Materials</Label>
                    <div className="flex gap-2">
                      <Input
                        value={materialInput}
                        onChange={(e) => setMaterialInput(e.target.value)}
                        placeholder="Add a material"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                      />
                      <Button type="button" onClick={addMaterial} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.specifications.materials.map(material => (
                        <Badge key={material} variant="secondary" className="cursor-pointer" onClick={() => removeMaterial(material)}>
                          {material} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="careInstructions">Care Instructions</Label>
                    <Textarea
                      id="careInstructions"
                      value={formData.features.careInstructions}
                      onChange={(e) => handleNestedChange('features', 'careInstructions', e.target.value)}
                      placeholder="Care instructions for the product"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shipping">Shipping Information</Label>
                    <Textarea
                      id="shipping"
                      value={formData.features.shipping}
                      onChange={(e) => handleNestedChange('features', 'shipping', e.target.value)}
                      placeholder="Shipping details"
                      rows={2}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                        placeholder="Enter product price"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">Original Price (for discount)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={formData.pricing.originalPrice || ''}
                        onChange={(e) => handleNestedChange('pricing', 'originalPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                        placeholder="Original price before discount"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="discountPercentage">Discount Percentage</Label>
                      <Input
                        id="discountPercentage"
                        type="number"
                        step="1"
                        min="0"
                        max="100"
                        value={formData.pricing.discountPercentage}
                        onChange={(e) => handleNestedChange('pricing', 'discountPercentage', parseInt(e.target.value) || 0)}
                        placeholder="Discount percentage"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={formData.pricing.currency} onValueChange={(value) => handleNestedChange('pricing', 'currency', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map(currency => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.pricing.originalPrice && formData.pricing.discountPercentage > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 font-medium">Discount Applied</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        Original Price: ${formData.pricing.originalPrice} → Sale Price: ${formData.price} 
                        ({formData.pricing.discountPercentage}% off)
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="images" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="images">Product Images</Label>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload up to 10 images. You currently have {formData.existingImages.length + formData.images.length} images.
                    </p>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {imagePreviews.map((preview, index) => {
                        const isExisting = index < formData.existingImages.length;
                        const displayIndex = isExisting ? index : index - formData.existingImages.length;
                        return (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Product image ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(displayIndex, isExisting)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </form>
          </CardContent>
        </Card>

        {/* Discard Changes Dialog */}
        <AlertDialog open={discardDialogOpen} onOpenChange={setDiscardDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard changes?</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Stay</AlertDialogCancel>
              <AlertDialogAction onClick={handleGoBack} variant="destructive">
                Discard Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}