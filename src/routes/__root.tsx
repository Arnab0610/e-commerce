import { Outlet, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AIAssistant } from "@/components/AIAssistant";
import { Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-[140px] leading-none font-bold text-gradient">404</h1>
        <h2 className="mt-2 text-2xl font-bold">This aisle doesn't exist.</h2>
        <p className="mt-3 text-sm text-foreground/50">Our courier looked everywhere — no luck. Let's get you home.</p>
        <Link to="/" className="inline-flex mt-8 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:glow-primary transition-all">
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-foreground/60">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold">
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Velo — Premium Groceries in 10 Minutes" },
      { name: "description", content: "Velo delivers premium organic groceries from micro-hub to your door in 10 minutes. Cinematic shopping, smart AI concierge." },
      { name: "theme-color", content: "#0a0a0a" },
      { property: "og:title", content: "Velo — Premium Groceries in 10 Minutes" },
      { property: "og:description", content: "Premium organic groceries delivered instantly." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CartDrawer />
        <AIAssistant />
      </div>
    </QueryClientProvider>
  );
}
