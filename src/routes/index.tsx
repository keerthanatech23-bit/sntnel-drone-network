import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/sntnel-logo.png";

export const Route = createFileRoute("/")({
  component: Splash,
  head: () => ({
    meta: [
      { title: "SNTNEL — Your Safety, Our Mission" },
      { name: "description", content: "SNTNEL emergency safety app: SOS, live tracking, home security, and city safety heatmap." },
    ],
  }),
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/login" }), 2800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-dvh bg-muted">
      <div className="app-frame relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary-deep via-primary to-primary-deep text-primary-foreground">
        {/* Concentric rings */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute rounded-full border border-white/15"
              initial={{ width: 80, height: 80, opacity: 0 }}
              animate={{ width: 80 + i * 120, height: 80 + i * 120, opacity: [0, 0.6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="relative z-10 flex flex-col items-center gap-6 px-8 text-center"
        >
          <div className="rounded-3xl bg-white/10 p-4 shadow-elevated ring-1 ring-white/20 backdrop-blur-md">
            <img src={logo} alt="SNTNEL logo" className="h-32 w-32 rounded-2xl object-cover" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-4xl font-black tracking-[0.35em]">SNTNEL</h1>
            <div className="mx-auto mt-3 h-px w-24 bg-white/50" />
            <p className="mt-3 text-sm font-medium tracking-wide text-white/85">
              Your Safety, Our Mission
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 text-center text-[11px] uppercase tracking-[0.3em] text-white/60"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-white"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          <span>Securing your channel</span>
          <Link to="/login" className="text-white/80 underline-offset-4 hover:underline">Skip</Link>
        </motion.div>
      </div>
    </div>
  );
}
