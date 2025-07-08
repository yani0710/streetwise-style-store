import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";

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

interface WishlistProps {
  wishlistItems?: Product[];
  onRemoveFromWishlist?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const Wishlist = ({ wishlistItems = [], onRemoveFromWishlist, onAddToCart }: WishlistProps) => {
  const [localWishlist, setLocalWishlist] = useState<Product[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage if no props provided
    if (wishlistItems.length === 0) {
      const saved = localStorage.getItem('wishlist');
      if (saved) {
        setLocalWishlist(JSON.parse(saved));
      }
    } else {
      setLocalWishlist(wishlistItems);
    }
  }, [wishlistItems]);

  const handleRemoveFromWishlist = (product: Product) => {
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist(product);
    } else {
      const updated = localWishlist.filter(item => item.id !== product.id);
      setLocalWishlist(updated);
      localStorage.setItem('wishlist', JSON.stringify(updated));
    }
  };

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    // Could also show a toast notification here
  };

  const displayWishlist = wishlistItems.length > 0 ? wishlistItems : localWishlist;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">
              {displayWishlist.length} {displayWishlist.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
        </div>

        {displayWishlist.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Start adding items you love to your wishlist and come back to shop them later.
              </p>
              <Link to="/">
                <Button variant="electric">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayWishlist.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onProductClick={() => {}} // Disable click for now
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                  onClick={() => handleRemoveFromWishlist(product)}
                >
                  <Heart className="h-4 w-4 fill-current text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {displayWishlist.length > 0 && (
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-primary text-white">
              <CardContent>
                <h3 className="text-2xl font-bold mb-4">Ready to shop your favorites?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Add all your wishlist items to cart with one click
                </p>
                <Button 
                  variant="electric" 
                  size="lg"
                  onClick={() => {
                    displayWishlist.forEach(product => handleAddToCart(product));
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add All to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;