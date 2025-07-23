
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-black/80 hover:text-black relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
              {cartCount}
            </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Your Cart ({cartCount})</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-6 mt-6">
            {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
                  <Button onClick={() => setIsOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
            ) : (
                <>
                  <div className="flex-1 overflow-auto">
                    {items.map((item) => (
                        <div key={item.id} className="py-4 border-b">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                              <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <p className="text-sm text-gray-500">{item.brand}</p>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-gray-500">{item.colorway}</p>
                                  {item.size && <p className="text-sm">Size: {item.size}</p>}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="h-8 w-8"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center border rounded-md">
                                  <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-none"
                                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                                  <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 rounded-none"
                                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-base font-medium">Subtotal</span>
                      <span className="text-base font-semibold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full" onClick={handleCheckout}>
                      Checkout
                    </Button>
                  </div>
                </>
            )}
          </div>
        </SheetContent>
      </Sheet>
  );
};

export default Cart;