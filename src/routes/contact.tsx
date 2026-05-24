import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Velo" }, { name: "description", content: "Talk to the Velo team. We reply in minutes." }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="px-6 lg:px-12 py-12 lg:py-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Say hi</p>
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95]">We reply in <span className="text-gradient">minutes.</span></h1>
          <p className="text-foreground/55 mt-5 max-w-md leading-relaxed">Questions about an order, a partnership, or just want to chat groceries? We're here.</p>

          <div className="mt-10 space-y-3">
            {[
              { icon: MessageCircle, t: "Live chat", d: "Tap the AI bubble · 24/7" },
              { icon: Mail, t: "hello@velo.market", d: "Avg response: 8 min" },
              { icon: Phone, t: "+1 (415) 555-0123", d: "Mon–Sun · 7am – 11pm" },
              { icon: MapPin, t: "Hub 01 — San Francisco", d: "Plus 47 cities globally" },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="glass-card rounded-2xl p-4 flex items-center gap-4 hover:border-primary/40 transition">
                <div className="size-11 rounded-xl bg-primary/15 text-primary grid place-items-center"><Icon className="size-5" /></div>
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="text-xs text-foreground/50">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className="glass-card rounded-3xl p-7 lg:p-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-foreground/50">Name</label>
              <input className="mt-2 w-full bg-white/5 border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" placeholder="Your name" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-foreground/50">Email</label>
              <input type="email" className="mt-2 w-full bg-white/5 border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-foreground/50">Topic</label>
            <select className="mt-2 w-full bg-white/5 border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary">
              <option>Order support</option>
              <option>Partnership</option>
              <option>Press</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest font-bold text-foreground/50">Message</label>
            <textarea rows={6} className="mt-2 w-full bg-white/5 border border-border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary resize-none" placeholder="Tell us a bit more…" />
          </div>
          <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold hover:glow-primary transition-all">
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
