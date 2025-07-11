import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Returns = () => {
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
          <h1 className="text-4xl font-bold mb-8">Returns & Exchanges</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We want you to love your URBX purchase. If you're not completely satisfied, 
                  we offer easy returns within 30 days of delivery.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Items must be in original condition with tags attached</li>
                  <li>Items must be unworn and unwashed</li>
                  <li>Original packaging must be included</li>
                  <li>Proof of purchase required</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Return</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Step 1: Request Return</h3>
                  <p className="text-muted-foreground">
                    Contact our customer service team at returns@urbx.com with your order number 
                    and reason for return.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Step 2: Print Label</h3>
                  <p className="text-muted-foreground">
                    We'll email you a prepaid return shipping label within 24 hours.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Step 3: Pack & Ship</h3>
                  <p className="text-muted-foreground">
                    Pack your items securely in the original packaging and attach the return label.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Step 4: Get Refund</h3>
                  <p className="text-muted-foreground">
                    Refunds are processed within 5-7 business days after we receive your return.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Need a different size or color? We offer free exchanges within 30 days:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Follow the same return process above</li>
                  <li>Specify your exchange preference in the return request</li>
                  <li>We'll ship your new item as soon as we receive your return</li>
                  <li>Exchange shipping is free for size swaps</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
              <div className="text-muted-foreground">
                <p className="mb-4">The following items cannot be returned for hygiene reasons:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Underwear and socks (unless defective)</li>
                  <li>Fragrances that have been opened</li>
                  <li>Items damaged by normal wear</li>
                  <li>Items purchased with final sale discount codes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <div className="bg-muted p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">returns@urbx.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <p className="text-muted-foreground">1-800-URBX-123</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Chat</h3>
                    <p className="text-muted-foreground">Live chat available 9 AM - 6 PM EST</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Response Time</h3>
                    <p className="text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
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

export default Returns;