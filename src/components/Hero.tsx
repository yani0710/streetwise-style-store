import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${heroBg})` }}
    >
      <div className="container text-center text-white">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
          URBX
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
          Premium streetwear for the modern urban lifestyle. Elevate your style with our cutting-edge designs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="electric" 
            size="lg"
            onClick={scrollToProducts}
            className="text-lg px-8 py-4"
          >
            Shop Collection
          </Button>
          <Link to="/learn-more">
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;