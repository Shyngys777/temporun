
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-24">
        <div className="text-center px-4 motion-safe-animate fade-in">
          <p className="text-sm font-medium text-black/60 mb-2">404</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Page Not Found</h1>
          <p className="text-lg text-black/70 max-w-md mx-auto mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <Button asChild>
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
