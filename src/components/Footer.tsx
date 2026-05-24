import { Link } from "@tanstack/react-router";
import { Apple, Smartphone, Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-20 px-6 lg:px-12 bg-black/40 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
        <div className="col-span-2 space-y-6">
          <Link to="/" className="text-3xl font-bold tracking-tighter text-gradient inline-block">VELO.</Link>
          <p className="text-foreground/50 text-sm max-w-xs leading-relaxed">
            Pioneering the future of grocery through sustainable speed and premium curation. Delivered in 10 minutes.
          </p>
          <div className="flex gap-3">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="size-10 glass-card rounded-full grid place-items-center hover:text-primary hover:border-primary/50 transition-all">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-5 text-xs uppercase tracking-widest text-foreground/80">Shop</h4>
          <ul className="space-y-3 text-sm text-foreground/50">
            <li><Link to="/products" className="hover:text-primary">All Products</Link></li>
            <li><Link to="/products" className="hover:text-primary">Categories</Link></li>
            <li><Link to="/wishlist" className="hover:text-primary">Wishlist</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-5 text-xs uppercase tracking-widest text-foreground/80">Company</h4>
          <ul className="space-y-3 text-sm text-foreground/50">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><a href="#" className="hover:text-primary">Careers</a></li>
          </ul>
        </div>
        <div className="col-span-2 space-y-5">
          <h4 className="font-bold text-xs uppercase tracking-widest text-foreground/80">Subscribe to Freshness</h4>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email address" className="flex-1 bg-white/5 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary" />
            <button className="bg-primary text-primary-foreground px-6 rounded-xl font-bold text-sm hover:glow-primary transition-all">Join</button>
          </form>
          <div className="flex gap-3">
            <a href="#" className="flex-1 glass-card rounded-xl p-3 flex items-center gap-3 hover:border-primary/50 transition-all">
              <Apple className="size-6" />
              <div className="text-xs"><div className="opacity-50">Download on</div><div className="font-bold">App Store</div></div>
            </a>
            <a href="#" className="flex-1 glass-card rounded-xl p-3 flex items-center gap-3 hover:border-primary/50 transition-all">
              <Smartphone className="size-6" />
              <div className="text-xs"><div className="opacity-50">Get it on</div><div className="font-bold">Google Play</div></div>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-widest text-foreground/30 font-bold">
        <span>© 2026 Velo Markets Inc.</span>
        <div className="flex gap-6 flex-wrap">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">VISA · MC · AMEX · PAYPAL</a>
        </div>
      </div>
    </footer>
  );
}
