import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('daisy-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('daisy-wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    setItems(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: number) => items.some(item => item.id === productId);

  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
