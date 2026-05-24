import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { cart, useCart } from "@/store/cart";

export function CartDrawer() {
  const { items, cartOpen } = useCart();
  const subtotal = items.reduce((s, i) => s + i.qty * i.product.price, 0);
  const delivery = subtotal > 0 && subtotal < 30 ? 2.99 : 0;
  const total = subtotal + delivery;

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => cart.openCart(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-card border-l border-border z-[201] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-lg font-bold">Your Bag</h3>
                <p className="text-xs text-foreground/50">{items.length} items · 10 min delivery</p>
              </div>
              <button onClick={() => cart.openCart(false)} className="size-9 rounded-full glass-card grid place-items-center hover:text-primary">
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="size-20 rounded-full bg-primary/10 grid place-items-center mb-5">
                    <ShoppingBag className="size-9 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg">Your bag is empty</h4>
                  <p className="text-sm text-foreground/50 mt-1 max-w-xs">Discover premium organic groceries delivered to your door.</p>
                  <button onClick={() => cart.openCart(false)} className="mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:glow-primary transition-all">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(({ product, qty }) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40, height: 0 }}
                      className="flex gap-4 glass-card rounded-2xl p-3"
                    >
                      <img src={product.image} alt={product.name} loading="lazy" className="size-20 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <h4 className="font-semibold text-sm truncate">{product.name}</h4>
                            <p className="text-xs text-foreground/40 mt-0.5">{product.origin}</p>
                          </div>
                          <button onClick={() => cart.remove(product.id)} className="text-foreground/40 hover:text-destructive shrink-0">
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 glass-card rounded-full px-1 py-1">
                            <button onClick={() => cart.setQty(product.id, qty - 1)} className="size-6 rounded-full hover:bg-primary hover:text-primary-foreground grid place-items-center transition">
                              <Minus className="size-3" />
                            </button>
                            <span className="text-xs font-bold w-5 text-center">{qty}</span>
                            <button onClick={() => cart.setQty(product.id, qty + 1)} className="size-6 rounded-full hover:bg-primary hover:text-primary-foreground grid place-items-center transition">
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="font-bold text-primary">${(product.price * qty).toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/40" />
                  <input placeholder="Promo code" className="w-full bg-white/5 border border-border rounded-xl py-2.5 pl-10 pr-20 text-sm focus:outline-none focus:border-primary" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-primary px-3 py-1.5">APPLY</button>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-foreground/60"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-foreground/60"><span>Delivery</span><span>{delivery === 0 ? <span className="text-primary">FREE</span> : `$${delivery.toFixed(2)}`}</span></div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
                <Link
                  to="/cart"
                  onClick={() => cart.openCart(false)}
                  className="block text-center w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold hover:glow-primary transition-all"
                >
                  Checkout · ${total.toFixed(2)}
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
