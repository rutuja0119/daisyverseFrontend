import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg bg-background/95 backdrop-blur-xl border-l border-border/50 flex flex-col">
        <SheetHeader className="border-b border-border/30 pb-4">
          <SheetTitle className="font-display text-2xl text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            Your Cart
            <span className="ml-auto text-sm font-sans text-muted-foreground">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/50" />
            </div>
            <h3 className="font-display text-xl text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Discover our beautiful collection</p>
            <Button onClick={closeCart} asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="group flex gap-4 p-3 rounded-2xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted/30 flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.selectedColor && <span>{item.selectedColor}</span>}
                      {item.selectedSize && <span> • {item.selectedSize}</span>}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <span className="font-display text-primary">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border/30 pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-sage-600">Free</span>
                </div>
                <div className="flex justify-between text-lg font-display pt-2 border-t border-border/30">
                  <span>Total</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full h-12 text-base group" onClick={closeCart}>
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <button
                onClick={closeCart}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
