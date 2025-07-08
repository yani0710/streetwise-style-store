import { useState, useEffect } from "react";
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
  onAddToWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

const ProductDetail = ({ product, onClose, onAddToCart, onAddToWishlist, isInWishlist }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize("");
      setSelectedColor("");
      setCurrentImageIndex(0);
      setCurrentPrice(product.price);
    }
  }, [product]);

  // Handle dynamic image switching based on color selection
  useEffect(() => {
    if (product && selectedColor && product.images) {
      const colorToImageMap: Record<string, number> = {
        "Black": 0,
        "White": 1,
        "Gray": 1,
        "Silver": 0,
        "Gold": 0
      };
      
      const imageIndex = colorToImageMap[selectedColor] ?? 0;
      if (imageIndex < product.images.length) {
        setCurrentImageIndex(imageIndex);
      }
    }
  }, [selectedColor, product]);

  // Handle dynamic pricing for fragrances based on size
  useEffect(() => {
    if (product && selectedSize && product.category === "Fragrances") {
      const basePrice = product.price;
      if (selectedSize === "50ml") {
        setCurrentPrice(Math.round(basePrice * 0.65)); // 65% of base price for 50ml
      } else if (selectedSize === "100ml") {
        setCurrentPrice(basePrice); // Full price for 100ml
      }
    } else if (product) {
      setCurrentPrice(product.price);
    }
  }, [selectedSize, product]);

  if (!product) return null;

  const images = product.images || [product.image];
  const sizes = product.sizes || [];
  const colors = product.colors || [];

  const handleAddToCart = () => {
    if ((sizes.length > 0 && !selectedSize) || (colors.length > 0 && !selectedColor)) {
      alert("Please select size and color");
      return;
    }
    
    // Pass the product with current price and image
    const productToAdd = {
      ...product,
      price: currentPrice,
      image: images[currentImageIndex]
    };
    
    onAddToCart(productToAdd, selectedSize, selectedColor);
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
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-electric">${currentPrice}</p>
                    {product.category === "Fragrances" && selectedSize === "50ml" && (
                      <span className="text-base text-muted-foreground line-through">
                        ${product.price}
                      </span>
                    )}
                  </div>
                  {product.category === "Fragrances" && selectedSize === "50ml" && (
                    <p className="text-sm text-green-600 font-medium">
                      Save ${(product.price - currentPrice).toFixed(0)} with 50ml size!
                    </p>
                  )}
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
                    <h3 className="font-semibold mb-3">
                      {product.category === "Fragrances" ? "Volume" : "Size"}
                    </h3>
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
                    {selectedColor && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Selected: {selectedColor}
                      </p>
                    )}
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
                    Add to Cart - ${currentPrice}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={() => onAddToWishlist(product)}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>

                {/* Product Details */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">Product Details</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Premium materials</li>
                    <li>• Machine washable</li>
                    <li>• Modern streetwear design</li>
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