import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Upload, X, Plus, Minus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { apiClient } from '@/lib/api';

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
  existingImages?: string[];
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

const categories = [
  'necklace',
  'earrings', 
  'bracelet',
  'ring',
  'other'
];

const availabilityOptions = [
  'in_stock',
  'out_of_stock',
  'preorder',
  'coming_soon'
];

const currencies = ['USD', 'EUR', 'GBP', 'INR'];

export function AddProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
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
    if (files.length + formData.images.length > 10) {
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

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);
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

  const generateSKU = () => {
    const categoryCode = formData.category.toUpperCase().slice(0, 3);
    const timestamp = Date.now().toString().slice(-6);
    const randomCode = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${categoryCode}-${timestamp}-${randomCode}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate SKU if not provided
      if (!formData.sku) {
        formData.sku = generateSKU();
      }

      // Validate required fields
      if (!formData.name || !formData.description || !formData.price || !formData.category) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      if (formData.images.length === 0) {
        toast({
          title: "Validation Error", 
          description: "Please upload at least one product image",
          variant: "destructive"
        });
        return;
      }

      const formDataToSend = new FormData();
      
      // Append product data
      formDataToSend.append('productData', JSON.stringify({
        ...formData,
        images: undefined // Remove images from JSON data
      }));

      // Append image files
      formData.images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await apiClient.post('/admin/products', formDataToSend, true);

      if (response.success) {
        toast({
          title: "Success",
          description: "Product created successfully!"
        });
        navigate('/admin/products');
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to create product",
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

  const fillSampleData = () => {
    setFormData({
      name: 'Elegant Gold Plated Necklace',
      description: 'A stunning gold-plated necklace featuring intricate floral patterns. Perfect for special occasions and everyday elegance. Made with high-quality materials and expert craftsmanship.',
      price: 149.99,
      category: 'necklace',
      size: 'medium',
      color: 'gold',
      quantity: 15,
      stock: 15,
      images: [],
      features: {
        returnPolicy: '30-day return policy with original packaging',
        shipping: 'Free shipping on orders over $100. Express delivery available.',
        material: '18K gold plated brass with anti-tarnish coating',
        careInstructions: 'Avoid contact with water, perfumes, and harsh chemicals. Store in a dry place.'
      },
      specifications: {
        dimensions: {
          length: '45cm',
          width: '2cm',
          height: '0.5cm',
          weight: '25g'
        },
        materials: ['Gold plated brass', 'Anti-tarnish coating', 'Lobster clasp'],
        origin: 'India',
        warranty: '1-year warranty against manufacturing defects'
      },
      pricing: {
        originalPrice: 199.99,
        discountPercentage: 25,
        currency: 'USD'
      },
      availability: 'in_stock',
      tags: ['gold', 'necklace', 'elegant', 'gift', 'jewelry'],
      sku: ''
    });
    
    toast({
      title: "Sample Data Filled",
      description: "Form filled with sample product data. You can now upload images and submit.",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>Fill in all the details for your new product</CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={fillSampleData}
              className="ml-4"
            >
              Fill Sample Data
            </Button>
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
                    placeholder="How to care for this product"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipping">Shipping Information</Label>
                  <Input
                    id="shipping"
                    value={formData.features.shipping}
                    onChange={(e) => handleNestedChange('features', 'shipping', e.target.value)}
                    placeholder="Shipping details"
                  />
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                      min="0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={formData.pricing.originalPrice || ''}
                      onChange={(e) => handleNestedChange('pricing', 'originalPrice', parseFloat(e.target.value) || undefined)}
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountPercentage">Discount %</Label>
                    <Input
                      id="discountPercentage"
                      type="number"
                      value={formData.pricing.discountPercentage}
                      onChange={(e) => handleNestedChange('pricing', 'discountPercentage', parseInt(e.target.value) || 0)}
                      min="0"
                      max="100"
                    />
                  </div>
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

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="isActive">Active Product</Label>
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Images *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Click to upload images</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
                    </Label>
                  </div>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/products')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating Product...' : 'Create Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}