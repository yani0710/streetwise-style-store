import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";

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
          <a href="#tshirts" className="text-sm font-medium hover:text-electric transition-colors">
            T-Shirts
          </a>
          <a href="#shorts" className="text-sm font-medium hover:text-electric transition-colors">
            Shorts
          </a>
          <a href="#sneakers" className="text-sm font-medium hover:text-electric transition-colors">
            Sneakers
          </a>
          <a href="#socks" className="text-sm font-medium hover:text-electric transition-colors">
            Socks
          </a>
          <a href="#jewelry" className="text-sm font-medium hover:text-electric transition-colors">
            Jewelry
          </a>
          <a href="#fragrances" className="text-sm font-medium hover:text-electric transition-colors">
            Fragrances
          </a>
        </nav>

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
    </header>
  );
};

export default Header;