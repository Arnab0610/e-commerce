import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Plus, Star } from "lucide-react";
import { cart, useCart } from "@/store/cart";
import type { Product } from "@/lib/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { wishlist } = useCart();
  const liked = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative glass-card p-4 rounded-3xl space-y-4 hover:border-primary/30 transition-all">
        <Link to="/products/$id" params={{ id: product.id }} className="block relative overflow-hidden rounded-2xl bg-white/5 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={600}
            height={600}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); cart.toggleWish(product.id); }}
            className={`absolute top-3 right-3 size-9 rounded-full grid place-items-center backdrop-blur-md transition-all ${
              liked ? "bg-primary text-primary-foreground scale-110" : "bg-black/40 text-white hover:bg-primary hover:text-primary-foreground"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`size-4 ${liked ? "fill-current" : ""}`} />
          </button>
        </Link>
        <div className="px-2">
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-semibold text-base leading-snug">{product.name}</h3>
            <div className="text-right shrink-0">
              <div className="text-primary font-bold">${product.price.toFixed(2)}</div>
              {product.oldPrice && <div className="text-[10px] text-foreground/30 line-through">${product.oldPrice.toFixed(2)}</div>}
            </div>
          </div>
          <p className="text-foreground/40 text-xs mt-1">{product.origin}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <Star className="size-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-[10px] text-foreground/30">({product.reviews})</span>
          </div>
        </div>
        <button
          onClick={() => cart.add(product)}
          className="w-full bg-white/5 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary py-3 rounded-xl font-semibold transition-all text-sm flex items-center justify-center gap-2"
        >
          <Plus className="size-4" /> Add to Bag
        </button>
      </div>
    </motion.div>
  );
}
