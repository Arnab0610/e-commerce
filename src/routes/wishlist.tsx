import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/store/cart";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Velo" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useCart();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="px-6 lg:px-12 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-10">Your Wishlist <span className="text-foreground/30 text-2xl">({items.length})</span></h1>
        {items.length === 0 ? (
          <div className="text-center glass-card rounded-[2rem] p-12 max-w-2xl mx-auto">
            <div className="size-24 rounded-full bg-primary/10 grid place-items-center mx-auto mb-6">
              <Heart className="size-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">No favorites yet</h2>
            <p className="text-foreground/50 mt-2">Tap the heart on any product to save it for later.</p>
            <Link to="/products" className="inline-block mt-8 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold">Browse products</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
