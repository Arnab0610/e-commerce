import { AnimatePresence, motion } from "framer-motion";
import { Mic, Send, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

const suggestions = [
  "What's fresh today?",
  "Plan a healthy dinner",
  "Track my order",
  "Find vegan snacks",
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (!open) return;
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 1400);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, type: "spring" }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[150] size-14 sm:size-16 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-2xl glow-primary hover:scale-110 transition-transform"
        aria-label="Open AI assistant"
      >
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
        {open ? <X className="size-6" /> : <Sparkles className="size-6 relative" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="fixed bottom-28 right-6 z-[150] w-[calc(100vw-3rem)] sm:w-96 glass-card rounded-3xl p-5 border-primary/30"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="relative size-10 rounded-full bg-primary/15 grid place-items-center">
                <Sparkles className="size-5 text-primary" />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-primary border-2 border-card" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Velo AI</h4>
                <p className="text-[11px] text-foreground/50">Smart grocery concierge · online</p>
              </div>
            </div>
            <div className="py-4 space-y-3 max-h-64 overflow-y-auto">
              <div className="flex gap-2">
                <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm max-w-[80%]">
                  Hey! I noticed you love berries. Want me to build a smoothie box for tomorrow?
                </div>
              </div>
              {typing ? (
                <div className="flex gap-1.5 px-4">
                  <span className="size-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="size-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
                  <span className="size-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm max-w-[85%]">
                    Order <b>#VL-2837</b> is on its way — arriving in <b className="text-primary">4 min</b>. Your rider Aman is 0.8 km away.
                  </div>
                </motion.div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((s) => (
                <button key={s} className="text-[11px] glass-card rounded-full px-3 py-1.5 hover:border-primary/40 hover:text-primary transition">
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-border rounded-full pl-4 pr-1.5 py-1.5">
              <input placeholder="Ask Velo anything…" className="flex-1 bg-transparent outline-none text-sm" />
              <button className="size-8 rounded-full hover:bg-white/10 grid place-items-center" aria-label="Voice"><Mic className="size-4" /></button>
              <button className="size-8 rounded-full bg-primary text-primary-foreground grid place-items-center"><Send className="size-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
