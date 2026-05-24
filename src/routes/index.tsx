import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, BadgePercent, Clock, Leaf, Sparkles, Star, Truck, Zap } from "lucide-react";
import heroImg from "@/assets/hero-grocery.jpg";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velo — Premium Groceries in 10 Minutes" },
      { name: "description", content: "Premium organic groceries delivered in 10 minutes. Cinematic shopping with an AI concierge." },
      { property: "og:title", content: "Velo — Premium Groceries in 10 Minutes" },
    ],
  }),
  component: Home,
});

function Countdown() {
  const [t, setT] = useState({ h: 2, m: 14, s: 33 });
  useEffect(() => {
    const id = setInterval(() => {
      setT((p) => {
        let { h, m, s } = p;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) h = 0;
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex gap-2 font-mono">
      {[
        { v: t.h, l: "HRS" },
        { v: t.m, l: "MIN" },
        { v: t.s, l: "SEC" },
      ].map((x) => (
        <div key={x.l} className="glass-card rounded-xl px-3 py-2 min-w-[58px] text-center">
          <div className="text-2xl font-bold text-primary tabular-nums">{pad(x.v)}</div>
          <div className="text-[9px] text-foreground/40 tracking-widest">{x.l}</div>
        </div>
      ))}
    </div>
  );
}

const testimonials = [
  { name: "Aanya Mehra", role: "Chef", text: "The freshness is unmatched. Velo replaced three of my regular suppliers in a week.", rating: 5 },
  { name: "Marcus Lee", role: "Designer", text: "Genuinely the prettiest shopping app I've ever used. And the avocados are actually ripe.", rating: 5 },
  { name: "Priya Singh", role: "Founder", text: "Ten minute delivery isn't a gimmick — it's a lifestyle upgrade.", rating: 5 },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-12 lg:pt-20 pb-24 lg:pb-32 px-6 lg:px-12 overflow-hidden">
        <div className="absolute top-10 -right-20 w-[500px] h-[500px] bg-primary/15 blur-[140px] rounded-full -z-10" />
        <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-sky-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 glass-card border-primary/30 px-4 py-1.5 rounded-full">
              <span className="size-2 bg-primary rounded-full animate-pulse" />
              <span className="text-[11px] font-bold text-primary uppercase tracking-widest">Order in 10 Minutes</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tighter">
              Groceries at the speed of <span className="text-gradient italic">light.</span>
            </h1>
            <p className="text-lg text-foreground/55 max-w-lg leading-relaxed">
              Premium organic selections delivered from our micro-hub to your door. Cinematic shopping, smart AI concierge.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/products" className="group bg-primary text-primary-foreground px-7 py-4 rounded-2xl font-bold transition-all hover:scale-105 glow-primary inline-flex items-center gap-2">
                Shop Now <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/products" className="glass-card px-7 py-4 rounded-2xl font-bold hover:bg-white/10 hover:border-primary/40 transition-all">
                Explore Deals
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm">
              {[
                { icon: Truck, label: "10-min delivery" },
                { icon: Leaf, label: "100% organic" },
                { icon: BadgePercent, label: "Daily deals" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-foreground/60">
                  <Icon className="size-4 text-primary" /> {label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative">
            <div className="relative z-10 animate-float">
              <img
                src={heroImg}
                alt="Floating bowl of fresh hydroponic greens and exotic fruits"
                width={1024}
                height={1024}
                className="w-full aspect-square rounded-[3rem] object-cover shadow-2xl border border-border"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-4 sm:-left-10 glass-card p-4 rounded-2xl z-20 shadow-2xl animate-float"
              style={{ animationDelay: "-1s" }}
            >
              <div className="flex items-center gap-3">
                <div className="size-11 bg-primary/15 rounded-full grid place-items-center text-primary">
                  <Star className="size-5 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] text-foreground/40 uppercase tracking-wide font-bold">Freshness</p>
                  <p className="text-lg font-bold">9.8 <span className="text-foreground/30 text-xs">/ 10</span></p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
              className="absolute top-6 -right-2 sm:-right-6 glass-card p-3 rounded-2xl z-20 shadow-2xl animate-float-slow"
            >
              <div className="flex items-center gap-2.5">
                <div className="size-9 bg-primary rounded-full grid place-items-center text-primary-foreground">
                  <Zap className="size-4" />
                </div>
                <div>
                  <p className="text-[10px] text-foreground/40 uppercase tracking-wide font-bold">Arriving in</p>
                  <p className="text-sm font-bold">7 min 12s</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-6 lg:px-12 bg-surface/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 gap-4">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Browse</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Curated Aisles</h2>
            </div>
            <Link to="/products" className="text-primary font-medium hover:underline underline-offset-4 text-sm whitespace-nowrap">View all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-5">
            {categories.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to="/products" className="group block">
                  <div className="glass-card aspect-[4/5] rounded-3xl p-5 flex flex-col justify-end overflow-hidden relative transition-all duration-500 group-hover:border-primary/50 group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_60px_-20px_hsl(var(--primary)/0.4)]">
                    {/* gradient lighting */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                    <div className={`absolute -bottom-10 -right-10 size-44 bg-gradient-to-tr ${c.color} blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none`} />

                    {/* floating product image — contained inside card */}
                    <div className="absolute inset-x-0 top-2 h-[62%] flex items-center justify-center pointer-events-none z-10">
                      {/* soft ground shadow */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[45%] h-3 bg-black/60 blur-xl rounded-full opacity-60 group-hover:opacity-90 group-hover:w-[55%] transition-all duration-500" />
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        width={384}
                        height={384}
                        className="relative max-h-full max-w-[85%] object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.55)] animate-float group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
                        style={{ animationDelay: `${i * -0.4}s` }}
                      />
                    </div>

                    <div className="relative z-10 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] text-foreground/40 font-bold tracking-widest">0{i + 1}</p>
                        <h3 className="text-xl font-bold mt-1">{c.name}</h3>
                        <span className="text-xs text-foreground/50">{c.count} items</span>
                      </div>
                      <div className="size-9 rounded-full glass-card grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-[-45deg] transition-all duration-300">
                        <ArrowRight className="size-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 gap-4">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Trending</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Weekly Drops</h2>
            </div>
            <Link to="/products" className="text-primary font-medium hover:underline underline-offset-4 text-sm whitespace-nowrap">All products →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* DEALS */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-5">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2 glass-card rounded-3xl p-8 lg:p-10 relative overflow-hidden border-primary/20">
            <div className="absolute -top-20 -right-20 size-72 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5">
                <Zap className="size-3" /> Flash Sale
              </div>
              <h3 className="text-3xl lg:text-5xl font-bold tracking-tight max-w-md">Up to 40% off seasonal fruits.</h3>
              <p className="text-foreground/50 mt-3 max-w-md">Hand-picked at dawn. Discounted until midnight. Free delivery on orders above $30.</p>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <Countdown />
                <Link to="/products" className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-primary hover:text-primary-foreground transition">Shop Sale</Link>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -bottom-20 -left-20 size-64 bg-sky-500/15 blur-3xl rounded-full" />
            <div className="relative">
              <div className="size-12 rounded-2xl bg-sky-500/15 text-sky-300 grid place-items-center mb-4">
                <Clock className="size-5" />
              </div>
              <h3 className="text-2xl font-bold">Free Delivery Weekend</h3>
              <p className="text-foreground/50 mt-2 text-sm">No minimum. Saturday & Sunday only.</p>
            </div>
            <Link to="/products" className="relative inline-flex items-center gap-2 text-sky-300 font-bold text-sm mt-6">
              Claim offer <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MORE PRODUCTS */}
      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Just in</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Hand-picked Today</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto glass-card rounded-[2.5rem] p-8 lg:p-16 relative overflow-hidden border-primary/20">
          <div className="absolute -top-20 -left-20 size-96 bg-primary/15 blur-3xl rounded-full" />
          <div className="grid md:grid-cols-2 gap-12 items-center relative">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5 text-primary">
                <Sparkles className="size-3" /> Powered by Velo AI
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tighter">
                Your personal grocery <span className="text-gradient">concierge</span>.
              </h2>
              <p className="text-foreground/55 mt-5 leading-relaxed max-w-md">
                Plan meals, find substitutes, track your courier in real time, or just say "I want something fresh tonight." Velo AI handles it.
              </p>
              <div className="mt-8 flex gap-4">
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold glow-primary">Try Velo AI</button>
                <button className="glass-card px-6 py-3 rounded-full font-bold">Watch demo</button>
              </div>
            </div>
            <div className="glass-card rounded-3xl p-5 space-y-3 border-primary/20">
              <div className="flex gap-3"><div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm max-w-[80%]">What's a good Sunday breakfast under $15?</div></div>
              <div className="flex gap-3 justify-end"><div className="bg-primary/15 border border-primary/30 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[85%]">Sourdough + A2 milk + 6 ruby strawberries. <b className="text-primary">$13.40</b>. Add to bag?</div></div>
              <div className="flex gap-1.5 px-4 pt-1">
                <span className="size-2 bg-primary/60 rounded-full animate-bounce" />
                <span className="size-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
                <span className="size-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Loved by 200k+</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Reviews from real bags.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-7 rounded-3xl hover:border-primary/30 transition">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="size-4 fill-primary text-primary" />)}
                </div>
                <p className="text-foreground/80 leading-relaxed">"{t.text}"</p>
                <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-primary to-emerald-700 grid place-items-center font-bold">{t.name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-foreground/40">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
