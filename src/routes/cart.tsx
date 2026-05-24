import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cart, useCart } from "@/store/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — Velo" }, { name: "description", content: "Review your bag and check out." }] }),
  component: CartPage,
});

function CartPage() {
  const { items } = useCart();
  const subtotal = items.reduce((s, i) => s + i.qty * i.product.price, 0);
  const delivery = subtotal > 0 && subtotal < 30 ? 2.99 : 0;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className="px-6 lg:px-12 py-20">
        <div className="max-w-2xl mx-auto text-center glass-card rounded-[2rem] p-12">
          <div className="size-24 rounded-full bg-primary/10 grid place-items-center mx-auto mb-6">
            <ShoppingBag className="size-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Your bag is empty</h1>
          <p className="text-foreground/50 mt-3 max-w-md mx-auto">Looks like you haven't added anything yet. Let's fix that.</p>
          <Link to="/products" className="inline-block mt-8 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-bold hover:glow-primary transition-all">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-12 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-10">Your Bag <span className="text-foreground/30 text-2xl">({items.length})</span></h1>
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {items.map(({ product, qty }) => (
                <motion.div
                  key={product.id} layout
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 40 }}
                  className="glass-card rounded-3xl p-4 flex gap-4 sm:gap-6"
                >
                  <img src={product.image} alt={product.name} loading="lazy" className="size-24 sm:size-32 rounded-2xl object-cover" />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <Link to="/products/$id" params={{ id: product.id }} className="font-bold hover:text-primary">{product.name}</Link>
                        <p className="text-xs text-foreground/50 mt-1">{product.origin}</p>
                      </div>
                      <button onClick={() => cart.remove(product.id)} className="text-foreground/40 hover:text-destructive shrink-0">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-2 glass-card rounded-full p-1">
                        <button onClick={() => cart.setQty(product.id, qty - 1)} className="size-7 rounded-full hover:bg-primary hover:text-primary-foreground grid place-items-center"><Minus className="size-3" /></button>
                        <span className="w-6 text-center text-sm font-bold">{qty}</span>
                        <button onClick={() => cart.setQty(product.id, qty + 1)} className="size-7 rounded-full hover:bg-primary hover:text-primary-foreground grid place-items-center"><Plus className="size-3" /></button>
                      </div>
                      <span className="font-bold text-lg text-primary">${(product.price * qty).toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <aside className="glass-card rounded-3xl p-6 lg:p-7 h-fit lg:sticky lg:top-24 space-y-5">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/40" />
              <input placeholder="Promo code" className="w-full bg-white/5 border border-border rounded-xl py-3 pl-10 pr-20 text-sm focus:outline-none focus:border-primary" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-primary px-3 py-1.5">APPLY</button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-foreground/60"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-foreground/60"><span>Delivery</span><span>{delivery === 0 ? <span className="text-primary">FREE</span> : `$${delivery.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-bold text-xl pt-3 border-t border-border mt-3"><span>Total</span><span className="text-primary">${total.toFixed(2)}</span></div>
            </div>
            <div className="glass-card rounded-2xl p-3 text-xs text-foreground/60 flex items-center gap-3 border-primary/20">
              <div className="size-2 rounded-full bg-primary animate-pulse" />
              Arriving in <b className="text-foreground">10 minutes</b> via Velo Express
            </div>
            <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold hover:glow-primary transition-all">
              Secure Checkout
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
