
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { name: 'Men', href: '/men' },
      { name: 'Women', href: '/women' },
      { name: 'New Arrivals', href: '/new-arrivals' },
      { name: 'Sale', href: '/sale' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Shipping & Returns', href: '/shipping' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

const Footer = () => {
  return (
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 space-y-6">
              <h3 className="text-xl font-bold tracking-tight">TempoRun</h3>
              <p className="text-sm text-black/70 max-w-xs">
                The premium destination for running enthusiasts seeking performance footwear from the world's leading brands.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="hidden md:block md:col-span-1" />

            {footerLinks.map((group) => (
                <div key={group.title} className="md:col-span-2 space-y-4">
                  <h4 className="text-sm font-semibold">{group.title}</h4>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                        <li key={link.name}>
                          <Link
                              to={link.href}
                              className="text-sm text-black/70 hover:text-black transition-colors"
                          >
                            {link.name}
                          </Link>
                        </li>
                    ))}
                  </ul>
                </div>
            ))}

            <div className="md:col-span-3 space-y-4">
              <h4 className="text-sm font-semibold">Subscribe to our newsletter</h4>
              <p className="text-sm text-black/70">
                Get the latest updates on new products and upcoming sales.
              </p>
              <div className="flex space-x-2">
                <Input
                    placeholder="Your email"
                    className="bg-secondary/50 border-secondary"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-black/60">
              © {new Date().getFullYear()} TempoRun. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="/terms" className="text-xs text-black/60 hover:text-black transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-xs text-black/60 hover:text-black transition-colors">
                Privacy
              </Link>
              <Link to="/cookies" className="text-xs text-black/60 hover:text-black transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;