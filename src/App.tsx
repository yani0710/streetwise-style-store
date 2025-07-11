import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Wishlist from "./pages/Wishlist";
import LearnMore from "./pages/LearnMore";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import SizeGuide from "./pages/SizeGuide";
import Returns from "./pages/Returns";
import Shipping from "./pages/Shipping";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/shipping" element={<Shipping />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
