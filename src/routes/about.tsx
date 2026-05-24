import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Truck, Users, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Velo" },
      { name: "description", content: "Velo is reimagining grocery from soil to door — in 10 minutes." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const stats = [
    { v: "10 min", l: "Avg. delivery" },
    { v: "200k+", l: "Happy bags" },
    { v: "48", l: "Micro-hubs" },
    { v: "100%", l: "Organic verified" },
  ];
  const values = [
    { icon: Leaf, t: "Soil-first", d: "Every product is traceable to a regenerative farm." },
    { icon: Zap, t: "Instant", d: "Built for the 10-minute economy without compromise." },
    { icon: Truck, t: "Carbon-honest", d: "Electric fleet, route-optimized by Velo AI." },
    { icon: Users, t: "Human", d: "Real couriers, real chefs, real curation — never just an algorithm." },
  ];

  return (
    <div className="px-6 lg:px-12 py-12 lg:py-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Our story</p>
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">
          Groceries should feel like a <span className="text-gradient">gift,</span> not a chore.
        </h1>
        <p className="text-foreground/60 mt-6 text-lg max-w-2xl leading-relaxed">
          We started Velo because the way the world buys food was overdue for an upgrade. Now, premium organic produce arrives at your door in the time it takes to brew a cup of coffee.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16">
          {stats.map((s) => (
            <div key={s.l} className="glass-card rounded-3xl p-6">
              <div className="text-3xl lg:text-4xl font-bold text-primary">{s.v}</div>
              <div className="text-xs text-foreground/50 mt-2 uppercase tracking-widest">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">What we stand for.</h2>
          <div className="grid sm:grid-cols-2 gap-5 mt-8">
            {values.map(({ icon: Icon, t, d }) => (
              <div key={t} className="glass-card rounded-3xl p-7 hover:border-primary/40 transition">
                <div className="size-12 rounded-2xl bg-primary/15 text-primary grid place-items-center mb-4">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-xl font-bold">{t}</h3>
                <p className="text-foreground/55 mt-2 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
