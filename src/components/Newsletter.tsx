
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface NewsletterProps {
  className?: string;
}

const Newsletter = ({ className }: NewsletterProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
      <section className={cn("py-20 bg-black text-white", className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto motion-safe-animate fade-in">
            <h2 className="text-3xl font-display font-bold mb-6">Join The Movement</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter for exclusive offers, early access to new releases, and expert running advice.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 placeholder:text-white/50 text-white"
                  required
              />
              <Button type="submit" className="bg-white text-black hover:bg-white/90">
                Subscribe
              </Button>
            </form>

            <p className="text-white/60 text-xs mt-4">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </section>
  );
};

export default Newsletter;