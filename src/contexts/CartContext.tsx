
import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  colorway: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartCount: () => 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

      if (existingItemIndex > -1) {
        // If item exists, update quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item
        return [...currentItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(currentItems =>
        currentItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
        )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
      <CartContext.Provider value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
      }}>
        {children}
      </CartContext.Provider>
  );
};

export default CartContext;