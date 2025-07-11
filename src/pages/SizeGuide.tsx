import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const SizeGuide = () => {
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
          <h1 className="text-4xl font-bold mb-8">Size Guide</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">T-Shirts</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left">Size</th>
                      <th className="border border-border p-3 text-left">Chest (inches)</th>
                      <th className="border border-border p-3 text-left">Length (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-border p-3">XS</td><td className="border border-border p-3">32-34</td><td className="border border-border p-3">26</td></tr>
                    <tr><td className="border border-border p-3">S</td><td className="border border-border p-3">34-36</td><td className="border border-border p-3">27</td></tr>
                    <tr><td className="border border-border p-3">M</td><td className="border border-border p-3">38-40</td><td className="border border-border p-3">28</td></tr>
                    <tr><td className="border border-border p-3">L</td><td className="border border-border p-3">42-44</td><td className="border border-border p-3">29</td></tr>
                    <tr><td className="border border-border p-3">XL</td><td className="border border-border p-3">46-48</td><td className="border border-border p-3">30</td></tr>
                    <tr><td className="border border-border p-3">XXL</td><td className="border border-border p-3">50-52</td><td className="border border-border p-3">31</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Shorts</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left">Size</th>
                      <th className="border border-border p-3 text-left">Waist (inches)</th>
                      <th className="border border-border p-3 text-left">Inseam (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-border p-3">S</td><td className="border border-border p-3">28-30</td><td className="border border-border p-3">7</td></tr>
                    <tr><td className="border border-border p-3">M</td><td className="border border-border p-3">32-34</td><td className="border border-border p-3">8</td></tr>
                    <tr><td className="border border-border p-3">L</td><td className="border border-border p-3">36-38</td><td className="border border-border p-3">9</td></tr>
                    <tr><td className="border border-border p-3">XL</td><td className="border border-border p-3">40-42</td><td className="border border-border p-3">9</td></tr>
                    <tr><td className="border border-border p-3">XXL</td><td className="border border-border p-3">44-46</td><td className="border border-border p-3">10</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Sneakers</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left">US Size</th>
                      <th className="border border-border p-3 text-left">EU Size</th>
                      <th className="border border-border p-3 text-left">UK Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-border p-3">7</td><td className="border border-border p-3">40</td><td className="border border-border p-3">6</td></tr>
                    <tr><td className="border border-border p-3">8</td><td className="border border-border p-3">41</td><td className="border border-border p-3">7</td></tr>
                    <tr><td className="border border-border p-3">9</td><td className="border border-border p-3">42</td><td className="border border-border p-3">8</td></tr>
                    <tr><td className="border border-border p-3">10</td><td className="border border-border p-3">43</td><td className="border border-border p-3">9</td></tr>
                    <tr><td className="border border-border p-3">11</td><td className="border border-border p-3">44</td><td className="border border-border p-3">10</td></tr>
                    <tr><td className="border border-border p-3">12</td><td className="border border-border p-3">45</td><td className="border border-border p-3">11</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Measure</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Chest Measurement</h3>
                  <p className="text-muted-foreground">Measure around the fullest part of your chest, keeping the tape horizontal.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Waist Measurement</h3>
                  <p className="text-muted-foreground">Measure around your natural waistline, keeping the tape comfortably loose.</p>
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

export default SizeGuide;