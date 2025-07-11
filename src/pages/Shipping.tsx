import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Shipping = () => {
  const [notifyEmail, setNotifyEmail] = useState("");
  const [isNotifyDialogOpen, setIsNotifyDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleNotifySubmit = async () => {
    if (!notifyEmail) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('email_notifications')
        .insert([{ email: notifyEmail, type: 'newsletter' }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter!",
      });
      
      setNotifyEmail("");
      setIsNotifyDialogOpen(false);
    } catch (error) {
      console.error('Error saving notification:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={0} onCartOpen={() => {}} />
      
      <main className="container py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Shipping Information</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Options</h2>
              <div className="grid gap-6">
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Standard Shipping</h3>
                  <p className="text-muted-foreground mb-2">5-7 business days</p>
                  <p className="font-semibold">FREE on orders over $100</p>
                  <p className="text-sm text-muted-foreground">$9.99 on orders under $100</p>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Express Shipping</h3>
                  <p className="text-muted-foreground mb-2">2-3 business days</p>
                  <p className="font-semibold">$19.99</p>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">Overnight Shipping</h3>
                  <p className="text-muted-foreground mb-2">Next business day</p>
                  <p className="font-semibold">$29.99</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We ship worldwide! International shipping rates are calculated at checkout 
                  based on destination and package weight.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Canada & Mexico</h3>
                    <p>7-14 business days</p>
                    <p>Starting at $15.99</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Europe & UK</h3>
                    <p>10-21 business days</p>
                    <p>Starting at $25.99</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Asia Pacific</h3>
                    <p>14-28 business days</p>
                    <p>Starting at $29.99</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Rest of World</h3>
                    <p>21-35 business days</p>
                    <p>Starting at $35.99</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  All orders are processed within 1-2 business days. Orders placed after 2 PM EST 
                  will be processed the next business day.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Monday - Friday: Orders processed same day if placed before 2 PM EST</li>
                  <li>Weekends: Orders processed on Monday</li>
                  <li>Holidays: Processing may be delayed during major holidays</li>
                  <li>Custom items: Additional 3-5 business days processing time</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Track Your Package</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Once your order ships, you'll receive a tracking number via email. 
                    You can track your package using:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>The tracking link in your shipping confirmation email</li>
                    <li>Your account dashboard (if you created an account)</li>
                    <li>Directly on the carrier's website</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Currently, we cannot ship to the following locations:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>PO Boxes (for express and overnight shipping)</li>
                  <li>Military APO/FPO addresses</li>
                  <li>Countries under international sanctions</li>
                  <li>Remote islands and territories (additional fees may apply)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Customs & Duties</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  For international orders, customers are responsible for any customs duties, 
                  taxes, or fees imposed by their destination country.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Customs charges vary by country and package value</li>
                  <li>Packages may be subject to inspection by customs</li>
                  <li>Delivery may be delayed if customs clearance is required</li>
                  <li>URBX cannot estimate or prepay customs charges</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Newsletter Section */}
          <section className="bg-gradient-primary rounded-2xl p-8 text-white text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="mb-6 opacity-90">
              Subscribe to our newsletter for the latest drops and exclusive offers.
            </p>
            <Dialog open={isNotifyDialogOpen} onOpenChange={setIsNotifyDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="electric" size="lg">
                  Subscribe to Newsletter
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Subscribe to Newsletter</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notify-email">Email Address</Label>
                    <Input
                      id="notify-email"
                      type="email"
                      placeholder="your@email.com"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleNotifySubmit()}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsNotifyDialogOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button variant="electric" onClick={handleNotifySubmit} className="flex-1">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </section>

          <div className="mt-8 text-center">
            <Link to="/" className="text-electric hover:underline">
              ← Back to Shop
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shipping;