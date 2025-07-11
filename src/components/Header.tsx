import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  cartItemCount: number;
  onCartOpen: () => void;
}

const Header = ({ cartItemCount, onCartOpen }: HeaderProps) => {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-electric bg-clip-text text-transparent">
            URBX
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => document.getElementById('t-shirts')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium hover:text-electric transition-colors"
          >
            T-Shirts
          </button>
          <button 
            onClick={() => document.getElementById('shorts')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium hover:text-electric transition-colors"
          >
            Shorts
          </button>
          <button 
            onClick={() => document.getElementById('sneakers')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium hover:text-electric transition-colors"
          >
            Sneakers
          </button>
          <button 
            onClick={() => document.getElementById('socks')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium hover:text-electric transition-colors"
          >
            Socks
          </button>
          <button 
            onClick={() => document.getElementById('jewelry')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium hover:text-electric transition-colors"
          >
            Jewelry
          </button>
          <button 
            onClick={() => document.getElementById('fragrances')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium hover:text-electric transition-colors"
          >
            Fragrances
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/wishlist">
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onCartOpen}
            className="relative"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-electric text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;