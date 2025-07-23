
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Men from "./pages/Men";
import Women from "./pages/Women";
import NewArrivals from "./pages/NewArrivals";
import Brands from "./pages/Brands";
import BrandPage from "./pages/BrandPage";
import CategoryPage from "./pages/CategoryPage";
import Sale from "./pages/Sale";
import News from "./pages/News";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
import ChatBot from "./components/ChatBot";
import SEO from "./components/SEO";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Shipping from "./pages/Shipping";
import FAQ from "./pages/FAQ";
import SizeGuide from "./pages/SizeGuide";
import Blog from "./pages/Blog";
import { ShoeFinder } from "./components/ShoeFinder/ShoeFinder";

// Initialize React Query client with optimal settings for production
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch on window focus in production
      retry: 1, // Only retry failed queries once
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    },
  },
});

// Wrapper component that applies the transition to each route
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
      <PageTransition>
        <SEO />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:brandName" element={<BrandPage />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/news" element={<News />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Footer Pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/blog" element={<Blog />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
  );
};

const App = () => (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <Sonner position="top-right" closeButton={true} />
            <BrowserRouter>
              <div className="relative">
                <AnimatedRoutes />
                <ShoeFinder />
                <ChatBot />
              </div>
            </BrowserRouter>
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
);

export default App;