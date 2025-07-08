import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";

// Import product images
import tshirtBlack from "@/assets/tshirt-black.jpg";
import sneakersWhite from "@/assets/sneakers-white.jpg";
import shortsBlack from "@/assets/shorts-black.jpg";
import jewelryChain from "@/assets/jewelry-chain.jpg";
import socksBlack from "@/assets/socks-black.jpg";
import fragranceBlack from "@/assets/fragrance-black.jpg";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: "Urban Black Tee", price: 89, image: tshirtBlack, category: "T-Shirts" },
  { id: 2, name: "Electric Sneakers", price: 249, image: sneakersWhite, category: "Sneakers" },
  { id: 3, name: "Street Shorts", price: 129, image: shortsBlack, category: "Shorts" },
  { id: 4, name: "Chain Link Necklace", price: 199, image: jewelryChain, category: "Jewelry" },
  { id: 5, name: "Urban Socks", price: 29, image: socksBlack, category: "Socks" },
  { id: 6, name: "URBX Signature", price: 179, image: fragranceBlack, category: "Fragrances" },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
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
      />
    </div>
  );
};

export default Index;