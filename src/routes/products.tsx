import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop All — Velo Groceries" },
      { name: "description", content: "Browse premium organic groceries — fruits, vegetables, dairy, bakery & more. Delivered in 10 minutes." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const filtered = products.filter((p) =>
    (cat === "All" || p.category === cat) &&
    p.name.toLowerCase().includes(q.toLowerCase())
  );

  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <div className="px-6 lg:px-12 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Catalog</p>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter">Shop the Harvest</h1>
          <p className="text-foreground/50 mt-3 max-w-xl">All {products.length}+ premium items, curated daily.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/40" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full glass-card rounded-full py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`whitespace-nowrap px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                cat === c ? "bg-primary text-primary-foreground" : "glass-card hover:border-primary/40"
              }`}>
                {c}
              </button>
            ))}
          </div>
          <button className="glass-card rounded-full px-5 py-3 text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
            <SlidersHorizontal className="size-4" /> Filters
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-3xl">
            <h3 className="text-xl font-bold">Nothing matches yet.</h3>
            <p className="text-foreground/50 mt-2">Try a different category or search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.slice(0, 4).map((c) => (
            <div key={c.name} className="glass-card rounded-2xl p-5 hover:border-primary/40 transition">
              <p className="text-xs text-foreground/40">Category</p>
              <p className="font-bold mt-1">{c.name}</p>
              <p className="text-xs text-primary mt-2">{c.count} items</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
