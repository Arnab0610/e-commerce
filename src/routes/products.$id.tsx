import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Star, Truck, Leaf, ShieldCheck, ArrowLeft, ChevronRight, Share2, Sparkles, Clock } from "lucide-react";
import { products } from "@/lib/products";
import { cart, useCart } from "@/store/cart";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — Velo` },
      { name: "description", content: `${loaderData.product.name} · ${loaderData.product.origin}. Delivered in 10 minutes.` },
      { property: "og:title", content: `${loaderData.product.name} — Velo` },
      { property: "og:description", content: `${loaderData.product.name} · ${loaderData.product.origin}. Delivered in 10 minutes.` },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  errorComponent: ({ error }) => (
    <div className="min-h-[60vh] grid place-items-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-foreground/60 mt-2">{error.message}</p>
        <Link to="/products" className="inline-block mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold">Back to shop</Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-[60vh] grid place-items-center px-6">
      <div className="text-center">
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">404</p>
        <h1 className="text-4xl font-bold">Product not found</h1>
        <p className="text-foreground/60 mt-3">It may have sold out or moved.</p>
        <Link to="/products" className="inline-block mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold">Browse catalog</Link>
      </div>
    </div>
  ),
  component: ProductDetail,
});

const tabs = ["Overview", "Nutrition", "Reviews"] as const;

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const router = useRouter();
  const { wishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const [activeImg, setActiveImg] = useState(0);
  const liked = wishlist.includes(product.id);
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const gallery = [product.image, product.image, product.image, product.image];
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <div className="pb-32 lg:pb-16">
      <div className="px-4 sm:px-6 lg:px-12 pt-6 lg:pt-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-foreground/50 mb-6 overflow-x-auto">
            <Link to="/" className="hover:text-primary whitespace-nowrap">Home</Link>
            <ChevronRight className="size-3" />
            <Link to="/products" className="hover:text-primary whitespace-nowrap">Shop</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground/40 whitespace-nowrap">{product.category}</span>
            <ChevronRight className="size-3" />
            <span className="text-foreground/80 truncate">{product.name}</span>
          </nav>

          <button onClick={() => router.history.back()} className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary mb-6 lg:hidden">
            <ArrowLeft className="size-4" /> Back
          </button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* GALLERY */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
              <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full -z-10" />
              <div className="relative glass-card rounded-[2rem] overflow-hidden aspect-square">
                <img
                  src={gallery[activeImg]}
                  alt={product.name}
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    −{discount}%
                  </span>
                )}
                <button className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 size-11 rounded-full glass-card grid place-items-center hover:bg-primary hover:text-primary-foreground transition">
                  <Share2 className="size-4" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`aspect-square rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImg === i ? "border-primary scale-95" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* INFO */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">{product.category}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <Sparkles className="size-2.5" /> In stock
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mt-2 leading-tight">{product.name}</h1>
                <p className="text-foreground/50 mt-2">{product.origin}</p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-4 ${i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "text-foreground/20"}`} />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-foreground/40 text-sm">· {product.reviews} reviews</span>
                <span className="text-foreground/30">·</span>
                <span className="inline-flex items-center gap-1 text-xs text-foreground/60"><Clock className="size-3 text-primary" /> Arrives in ~10 min</span>
              </div>

              <div className="flex items-end gap-4 flex-wrap">
                <span className="text-4xl sm:text-5xl font-bold text-gradient leading-none">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <>
                    <span className="text-lg sm:text-xl line-through text-foreground/30">${product.oldPrice.toFixed(2)}</span>
                    <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded-md">Save ${(product.oldPrice - product.price).toFixed(2)}</span>
                  </>
                )}
              </div>

              {/* Tabs */}
              <div className="pt-2">
                <div className="flex gap-1 glass-card rounded-full p-1 w-fit">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition ${
                        tab === t ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="mt-5 min-h-[110px] text-sm sm:text-base">
                  {tab === "Overview" && (
                    <p className="text-foreground/70 leading-relaxed">
                      Sourced from regenerative farms, handled with orchestral precision and chilled in our micro-hub for peak freshness. Arrives at your door in under 10 minutes — packaged in 100% recyclable materials.
                    </p>
                  )}
                  {tab === "Nutrition" && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { k: "Calories", v: "52" },
                        { k: "Protein", v: "0.7g" },
                        { k: "Carbs", v: "14g" },
                        { k: "Fiber", v: "2.4g" },
                      ].map((n) => (
                        <div key={n.k} className="glass-card rounded-xl p-3 text-center">
                          <p className="text-lg font-bold text-primary">{n.v}</p>
                          <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-0.5">{n.k}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {tab === "Reviews" && (
                    <div className="space-y-3">
                      {[
                        { n: "Sofia R.", t: "Tastes like it was picked an hour ago. Five stars." },
                        { n: "James K.", t: "Absurdly fresh. The packaging is gorgeous too." },
                      ].map((r) => (
                        <div key={r.n} className="glass-card rounded-2xl p-4">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-sm">{r.n}</span>
                            <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3 fill-yellow-500 text-yellow-500" />)}</div>
                          </div>
                          <p className="text-sm text-foreground/70">"{r.t}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop add-to-cart */}
              <div className="hidden lg:flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 glass-card rounded-full p-1.5">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-10 rounded-full hover:bg-primary hover:text-primary-foreground grid place-items-center transition"><Minus className="size-4" /></button>
                  <span className="w-8 text-center font-bold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="size-10 rounded-full hover:bg-primary hover:text-primary-foreground grid place-items-center transition"><Plus className="size-4" /></button>
                </div>
                <button onClick={() => cart.add(product, qty)} className="flex-1 bg-primary text-primary-foreground py-4 rounded-2xl font-bold hover:glow-primary transition-all">
                  Add to Bag — ${(product.price * qty).toFixed(2)}
                </button>
                <button onClick={() => cart.toggleWish(product.id)} className={`size-14 rounded-2xl grid place-items-center transition ${liked ? "bg-primary text-primary-foreground" : "glass-card hover:border-primary/40"}`}>
                  <Heart className={`size-5 ${liked ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                {[
                  { icon: Truck, label: "10-min delivery" },
                  { icon: Leaf, label: "100% organic" },
                  { icon: ShieldCheck, label: "Freshness guarantee" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="glass-card rounded-2xl p-3 sm:p-4 text-center">
                    <Icon className="size-4 sm:size-5 text-primary mx-auto mb-1.5 sm:mb-2" />
                    <p className="text-[11px] sm:text-xs text-foreground/70 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related */}
          <div className="mt-20 lg:mt-28">
            <div className="flex items-end justify-between mb-8 gap-4">
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Curated for you</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">You may also like</h2>
              </div>
              <Link to="/products" className="text-primary font-medium hover:underline text-sm whitespace-nowrap">View all →</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile add-to-cart */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 px-4 pb-4 pt-3 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-md border-t border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 glass-card rounded-full p-1">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-9 rounded-full grid place-items-center"><Minus className="size-4" /></button>
            <span className="w-6 text-center font-bold text-sm">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="size-9 rounded-full grid place-items-center"><Plus className="size-4" /></button>
          </div>
          <button onClick={() => cart.toggleWish(product.id)} className={`size-11 rounded-full grid place-items-center shrink-0 ${liked ? "bg-primary text-primary-foreground" : "glass-card"}`}>
            <Heart className={`size-4 ${liked ? "fill-current" : ""}`} />
          </button>
          <button onClick={() => cart.add(product, qty)} className="flex-1 bg-primary text-primary-foreground py-3 rounded-full font-bold text-sm">
            Add — ${(product.price * qty).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
