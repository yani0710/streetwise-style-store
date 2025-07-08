import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Truck, Award, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const LearnMore = () => {
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
            <h1 className="text-4xl font-bold">About URBX</h1>
            <p className="text-muted-foreground text-lg">
              Discover the story behind premium urban streetwear
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-electric bg-clip-text text-transparent">
                  Our Story
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Founded in 2020, URBX emerged from the streets of urban culture with a mission to redefine 
                  streetwear fashion. We believe that clothing should be more than just fabric – it should be 
                  a statement, an expression of individuality, and a reflection of the urban spirit.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Our team consists of passionate designers, street culture enthusiasts, and quality craftsmen 
                  who work tirelessly to bring you premium streetwear that stands out from the crowd. Every piece 
                  is designed with attention to detail and made with the finest materials.
                </p>
                <p className="text-lg text-muted-foreground">
                  From our signature electric blue accents to our minimalist urban designs, URBX represents 
                  the perfect fusion of street culture and modern fashion.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-primary text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg opacity-90 mb-4">
                  To create premium streetwear that empowers individuals to express their unique style 
                  while maintaining the highest standards of quality and sustainability.
                </p>
                <p className="text-lg opacity-90">
                  We're committed to pushing the boundaries of urban fashion and creating pieces that 
                  resonate with the modern urban lifestyle.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Quality Promise</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  Every URBX piece undergoes rigorous quality testing. We use only premium materials 
                  and work with ethical manufacturers who share our commitment to excellence.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our products are designed to last, combining durability with style for the ultimate 
                  streetwear experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-electric" />
              <CardTitle>50k+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Happy Customers</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Truck className="h-12 w-12 mx-auto text-electric" />
              <CardTitle>Free Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">On orders over $100</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="h-12 w-12 mx-auto text-electric" />
              <CardTitle>Premium Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Certified materials</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 mx-auto text-electric" />
              <CardTitle>Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Safe & secure checkout</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-primary text-white text-center">
          <CardContent className="p-12">
            <h3 className="text-3xl font-bold mb-4">Join the URBX Community</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Connect with fellow streetwear enthusiasts, get exclusive access to new drops, 
              and be part of the urban culture revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="electric" size="lg">
                Follow on Instagram
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Join Newsletter
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Shop?</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Explore our collection and find your perfect streetwear pieces.
          </p>
          <Link to="/">
            <Button variant="electric" size="lg">
              Browse Collection
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;