import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Apple, Eye, EyeOff, Mail, Lock } from "lucide-react";
import heroImg from "@/assets/hero-grocery.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Velo" }] }),
  component: AuthPage,
});

function AuthPage() {
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="hidden lg:block relative overflow-hidden">
        <img src={heroImg} alt="Fresh produce" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/60 to-background" />
        <div className="absolute bottom-12 left-12 right-12 z-10">
          <h2 className="text-4xl font-bold tracking-tight">Welcome back to <span className="text-gradient">Velo.</span></h2>
          <p className="text-foreground/60 mt-3 max-w-md">Premium organic groceries, delivered in 10 minutes. Right where you left off.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-7">
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tighter text-gradient">VELO.</Link>
            <h1 className="text-3xl font-bold tracking-tight mt-6">Log in</h1>
            <p className="text-foreground/50 mt-2 text-sm">Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link></p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/40 group-focus-within:text-primary transition" />
              <input type="email" placeholder="Email address" className="w-full glass-card rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50" />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/40 group-focus-within:text-primary transition" />
              <input type={show ? "text" : "password"} placeholder="Password" className="w-full glass-card rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-primary/50" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-primary">
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <div className="flex justify-between text-xs">
              <label className="flex items-center gap-2 text-foreground/60"><input type="checkbox" className="accent-primary" /> Remember me</label>
              <a href="#" className="text-primary hover:underline">Forgot password?</a>
            </div>
            <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold hover:glow-primary transition-all">Log in</button>
          </form>

          <div className="flex items-center gap-3 text-xs text-foreground/40">
            <div className="flex-1 h-px bg-border" /> OR CONTINUE WITH <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="glass-card rounded-2xl py-3 font-semibold text-sm flex items-center justify-center gap-2 hover:border-primary/40 transition">
              <Apple className="size-4" /> Apple
            </button>
            <button className="glass-card rounded-2xl py-3 font-semibold text-sm flex items-center justify-center gap-2 hover:border-primary/40 transition">
              <span className="size-4 rounded-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500" /> Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
