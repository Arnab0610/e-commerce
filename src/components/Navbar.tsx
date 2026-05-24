import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cart, useCart } from "@/store/cart";

export function Navbar() {
  const { items, wishlist } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cartCount = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/products", label: "Groceries" },
    { to: "/products", label: "Specials" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass-card border-b border-border" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-gradient">
            VELO.
          </Link>
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-foreground/60">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="hover:text-primary transition-colors"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/40" />
          <input
            type="text"
            placeholder="Search organic avocados, milk, snacks..."
            className="w-full bg-white/5 border border-border rounded-full py-2.5 pl-11 pr-14 text-sm focus:outline-none focus:border-primary/50 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-foreground/30 border border-border rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/wishlist" className="relative p-2 hover:text-primary transition-colors hidden sm:block">
            <Heart className="size-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-4 bg-primary text-primary-foreground rounded-full text-[10px] font-bold grid place-items-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => cart.openCart(true)}
            className="relative p-2 hover:text-primary transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-4 bg-primary text-primary-foreground rounded-full text-[10px] font-bold grid place-items-center">
                {cartCount}
              </span>
            )}
          </button>
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <User className="size-4" /> Login
          </Link>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden glass-card border-t border-border px-6 py-6 space-y-4">
          {navLinks.map((l) => (
            <Link key={l.label} to={l.to} className="block text-foreground/70 hover:text-primary" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/login" className="block text-primary font-semibold" onClick={() => setOpen(false)}>
            Login / Signup
          </Link>
        </div>
      )}
    </header>
  );
}
