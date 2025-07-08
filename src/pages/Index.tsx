import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";

// Import product images
import tshirtBlack from "@/assets/tshirt-black.jpg";
import tshirtWhite from "@/assets/tshirt-white.jpg";
import sneakersWhite from "@/assets/sneakers-white.jpg";
import sneakersBlack from "@/assets/sneakers-black.jpg";
import shortsBlack from "@/assets/shorts-black.jpg";
import shortsGray from "@/assets/shorts-gray.jpg";
import jewelryChain from "@/assets/jewelry-chain.jpg";
import jewelryBracelet from "@/assets/jewelry-bracelet.jpg";
import socksBlack from "@/assets/socks-black.jpg";
import socksWhite from "@/assets/socks-white.jpg";
import fragranceBlack from "@/assets/fragrance-black.jpg";
import fragranceWhite from "@/assets/fragrance-white.jpg";

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

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { 
    id: 1, 
    name: "Urban Black Tee", 
    price: 89, 
    image: tshirtBlack, 
    category: "T-Shirts",
    description: "Premium cotton streetwear t-shirt with modern urban design. Perfect for everyday wear with exceptional comfort and style.",
    images: [tshirtBlack, tshirtWhite],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White"],
    rating: 4.5,
    reviews: 124
  },
  { 
    id: 2, 
    name: "Electric White Tee", 
    price: 89, 
    image: tshirtWhite, 
    category: "T-Shirts",
    description: "Clean white premium t-shirt with electric blue accents. Minimalist design meets streetwear culture.",
    images: [tshirtWhite, tshirtBlack],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black"],
    rating: 4.7,
    reviews: 89
  },
  { 
    id: 3, 
    name: "Electric Sneakers", 
    price: 249, 
    image: sneakersWhite, 
    category: "Sneakers",
    description: "High-performance streetwear sneakers with electric blue details. Comfortable, durable, and stylish.",
    images: [sneakersWhite, sneakersBlack],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black"],
    rating: 4.8,
    reviews: 256
  },
  { 
    id: 4, 
    name: "Shadow Black Sneakers", 
    price: 249, 
    image: sneakersBlack, 
    category: "Sneakers",
    description: "Sleek black high-top sneakers with premium materials. Perfect for the urban street style.",
    images: [sneakersBlack, sneakersWhite],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White"],
    rating: 4.6,
    reviews: 198
  },
  { 
    id: 5, 
    name: "Street Shorts", 
    price: 129, 
    image: shortsBlack, 
    category: "Shorts",
    description: "Comfortable premium streetwear shorts with modern cut. Perfect for summer urban adventures.",
    images: [shortsBlack, shortsGray],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray"],
    rating: 4.4,
    reviews: 167
  },
  { 
    id: 6, 
    name: "Urban Gray Shorts", 
    price: 129, 
    image: shortsGray, 
    category: "Shorts",
    description: "Versatile gray shorts with urban design elements. Comfort meets style in every detail.",
    images: [shortsGray, shortsBlack],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Gray", "Black"],
    rating: 4.3,
    reviews: 143
  },
  { 
    id: 7, 
    name: "Chain Link Necklace", 
    price: 199, 
    image: jewelryChain, 
    category: "Jewelry",
    description: "Premium silver chain necklace with modern streetwear aesthetic. Timeless design with contemporary edge.",
    images: [jewelryChain],
    sizes: ["One Size"],
    colors: ["Silver"],
    rating: 4.7,
    reviews: 78
  },
  { 
    id: 8, 
    name: "Gold Street Bracelet", 
    price: 149, 
    image: jewelryBracelet, 
    category: "Jewelry",
    description: "Bold gold bracelet perfect for streetwear styling. Makes a statement while maintaining elegance.",
    images: [jewelryBracelet],
    sizes: ["One Size"],
    colors: ["Gold"],
    rating: 4.5,
    reviews: 92
  },
  { 
    id: 9, 
    name: "Urban Black Socks", 
    price: 29, 
    image: socksBlack, 
    category: "Socks",
    description: "Premium cotton socks with electric blue logo accent. Comfort and style for everyday wear.",
    images: [socksBlack, socksWhite],
    sizes: ["S", "M", "L"],
    colors: ["Black", "White"],
    rating: 4.2,
    reviews: 234
  },
  { 
    id: 10, 
    name: "Electric White Socks", 
    price: 29, 
    image: socksWhite, 
    category: "Socks",
    description: "Clean white premium socks with black logo details. Perfect complement to any streetwear outfit.",
    images: [socksWhite, socksBlack],
    sizes: ["S", "M", "L"],
    colors: ["White", "Black"],
    rating: 4.1,
    reviews: 187
  },
  { 
    id: 11, 
    name: "URBX Signature Black", 
    price: 179, 
    image: fragranceBlack, 
    category: "Fragrances",
    description: "Bold and sophisticated fragrance with urban edge. Notes of bergamot, cedar, and musk create a distinctive scent.",
    images: [fragranceBlack],
    sizes: ["50ml", "100ml"],
    colors: ["Black"],
    rating: 4.6,
    reviews: 156
  },
  { 
    id: 12, 
    name: "URBX Signature White", 
    price: 179, 
    image: fragranceWhite, 
    category: "Fragrances",
    description: "Fresh and modern fragrance perfect for daily wear. Clean notes with hints of citrus and vanilla.",
    images: [fragranceWhite],
    sizes: ["50ml", "100ml"],
    colors: ["White"],
    rating: 4.4,
    reviews: 134
  },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    // For now, we'll show an alert. The user will need to set up Stripe for real payments.
    alert(`Checkout functionality requires payment integration. Total: $${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`);
  };

  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} onCartOpen={() => setIsCartOpen(true)} />
      <Hero />
      
      <main id="products" className="container py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Collection</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover premium streetwear that defines your urban lifestyle. 
            Each piece is crafted with attention to detail and modern aesthetics.
          </p>
        </div>

        {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
          <section key={category} id={category.toLowerCase()} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold">{category}</h3>
              <Button variant="outline">View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onProductClick={setSelectedProduct}
                />
              ))}
            </div>
          </section>
        ))}

        {/* Featured Section */}
        <section className="bg-gradient-primary rounded-2xl p-12 text-white text-center my-16">
          <h3 className="text-4xl font-bold mb-4">New Drop Alert</h3>
          <p className="text-xl mb-8 opacity-90">
            Be the first to get your hands on our latest streetwear collection. 
            Limited quantities, unlimited style.
          </p>
          <Button variant="electric" size="lg">
            Notify Me
          </Button>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4 bg-gradient-electric bg-clip-text text-transparent">
                URBX
              </h4>
              <p className="text-sm opacity-80">
                Premium streetwear for the modern urban lifestyle.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Shop</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#tshirts" className="hover:text-electric transition-colors">T-Shirts</a></li>
                <li><a href="#shorts" className="hover:text-electric transition-colors">Shorts</a></li>
                <li><a href="#sneakers" className="hover:text-electric transition-colors">Sneakers</a></li>
                <li><a href="#jewelry" className="hover:text-electric transition-colors">Jewelry</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:text-electric transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-electric transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-electric transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-electric transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:text-electric transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-electric transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-electric transition-colors">TikTok</a></li>
                <li><a href="#" className="hover:text-electric transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-60">
            © 2024 URBX. All rights reserved. Premium streetwear for the urban generation.
          </div>
        </div>
      </footer>

      <Cart
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default Index;