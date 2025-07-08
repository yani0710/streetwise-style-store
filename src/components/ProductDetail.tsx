import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { X, Star, Heart, ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  rating?: number;
  reviews?: number;
}

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
}

const ProductDetail = ({ product, onClose, onAddToCart }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const images = product.images || [product.image];
  const sizes = product.sizes || ["XS", "S", "M", "L", "XL"];
  const colors = product.colors || ["Black", "White"];

  const handleAddToCart = () => {
    if ((sizes.length > 0 && !selectedSize) || (colors.length > 0 && !selectedColor)) {
      alert("Please select size and color");
      return;
    }
    onAddToCart(product, selectedSize, selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-0">
            <div className="flex justify-end p-4">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 pt-0">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                  <img
                    src={images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          currentImageIndex === index ? "border-electric" : "border-border"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {product.category}
                  </Badge>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < product.rating! ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({product.reviews || 0} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-electric">${product.price}</p>
                </div>

                {product.description && (
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{product.description}</p>
                  </div>
                )}

                {/* Size Selection */}
                {sizes.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <Button
                          key={size}
                          variant={selectedSize === size ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedSize(size)}
                          className="min-w-[3rem]"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {colors.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <Button
                          key={color}
                          variant={selectedColor === color ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-4">
                  <Button
                    variant="cart"
                    size="lg"
                    className="w-full"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>

                {/* Product Details */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">Product Details</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Premium cotton blend fabric</li>
                    <li>• Machine washable</li>
                    <li>• Modern streetwear fit</li>
                    <li>• Imported</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;