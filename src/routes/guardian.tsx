import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, UserPlus, Heart, Phone, Mail, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";

export const Route = createFileRoute("/guardian")({ component: Guardian });

type G = { id: number; name: string; relation: string; phone: string; email: string };

function Guardian() {
  const navigate = useNavigate();
  const [guardians, setGuardians] = useState<G[]>([
    { id: 1, name: "", relation: "", phone: "", email: "" },
  ]);

  const update = (id: number, k: keyof G, v: string) =>
    setGuardians((arr) => arr.map((g) => (g.id === id ? { ...g, [k]: v } : g)));

  return (
    <AppShell>
      <TopBar title="Guardian details" subtitle="Step 2 of 2" />
      <div className="px-5 pt-2">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div initial={{ width: "50%" }} animate={{ width: "100%" }} transition={{ duration: 0.6 }} className="h-full bg-primary" />
        </div>
      </div>

      <div className="px-5 pt-5 pb-8">
        <div className="rounded-2xl bg-primary-soft p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">Trusted contacts</h2>
              <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">
                Guardians get instant SOS alerts, live location, and a call when you trigger an emergency.
              </p>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {guardians.map((g, idx) => (
            <motion.div
              key={g.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-card"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  Guardian {idx + 1}
                </span>
                {guardians.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setGuardians((arr) => arr.filter((x) => x.id !== g.id))}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-destructive hover:bg-destructive-soft"
                    aria-label="Remove guardian"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Full name"
                    value={g.name}
                    onChange={(e) => update(g.id, "name", e.target.value)}
                    className="rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                  <input
                    placeholder="Relation"
                    value={g.relation}
                    onChange={(e) => update(g.id, "relation", e.target.value)}
                    className="rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    placeholder="Phone number"
                    value={g.phone}
                    onChange={(e) => update(g.id, "phone", e.target.value)}
                    className="w-full rounded-xl border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    placeholder="Email (optional)"
                    value={g.email}
                    onChange={(e) => update(g.id, "email", e.target.value)}
                    className="w-full rounded-xl border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          type="button"
          onClick={() =>
            setGuardians((arr) => [...arr, { id: Date.now(), name: "", relation: "", phone: "", email: "" }])
          }
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/50 bg-primary-soft/40 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          <Plus className="h-4 w-4" /> Add another guardian
        </button>

        <button
          onClick={() => navigate({ to: "/home" })}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-elevated transition-all hover:bg-primary-deep"
        >
          <UserPlus className="h-4 w-4" /> Complete setup
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </AppShell>
  );
}
