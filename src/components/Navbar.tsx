
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Cart from '@/components/Cart';
import SearchButton from '@/components/SearchDialog';

const navLinks = [
  { name: 'Men', href: '/men' },
  { name: 'Women', href: '/women' },
  { name: 'Categories', href: '/categories' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Brands', href: '/brands' },
  { name: 'Sale', href: '/sale' },
  { name: 'News', href: '/news' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <header
          className={cn(
              "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out",
              isScrolled ? "bg-white/90 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
          )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link
                to="/"
                className={cn(
                    "text-xl font-bold tracking-tight transition-colors duration-300",
                    isScrolled ? "accent-yellow-400" : "accent-yellow-400"
                )}
            >
              TempoRun
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                        "text-sm font-medium transition-all ease-in-out duration-300",
                        isScrolled ? "accent-yellow-400/80 hover:accent-yellow-400" : "accent-yellow-400/80 hover:accent-yellow-400",
                        "relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full",
                        location.pathname === link.href ? "after:w-full" : ""
                    )}
                >
                  {link.name}
                </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <SearchButton />

            {/* Cart Component */}
            <Cart />

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden accent-yellow-400/80">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <div className="flex flex-col space-y-6 py-6">
                  {navLinks.map((link) => (
                      <Link
                          key={link.name}
                          to={link.href}
                          className={cn(
                              "text-lg font-medium accent-yellow-400/80 hover:accent-yellow-400k transition-colors",
                              location.pathname === link.href ? "accent-yellow-400 font-semibold" : ""
                          )}
                      >
                        {link.name}
                      </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
  );
};

export default Navbar;