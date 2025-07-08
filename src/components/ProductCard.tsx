import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onProductClick }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-urban transition-all duration-300 transform hover:scale-105">
      <CardContent className="p-0">
        <div 
          className="aspect-square overflow-hidden rounded-t-lg cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 
            className="font-semibold text-lg mb-2 cursor-pointer hover:text-electric transition-colors"
            onClick={() => onProductClick(product)}
          >
            {product.name}
          </h3>
          <p className="text-muted-foreground mb-3">{product.category}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">${product.price}</span>
            <Button 
              variant="cart" 
              size="sm"
              onClick={() => onAddToCart(product)}
              className="transform transition-all duration-200"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;