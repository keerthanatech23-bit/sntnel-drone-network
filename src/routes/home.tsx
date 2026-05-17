import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import {
  Mic,
  Phone,
  Flame,
  Shield,
  Siren,
  ShieldCheck,
  HeartPulse,
  Car,
  MapPin,
} from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { BottomNav } from "@/components/BottomNav";

import logo from "@/assets/sntnel-logo.png";

export const Route = createFileRoute("/home")({
  component: HomeDash,
});

const quickActions = [
  {
    icon: Siren,
    label: "Police",
    color: "text-primary",
    bg: "bg-primary-soft",
    num: "100",
  },

  {
    icon: HeartPulse,
    label: "Ambulance",
    color: "text-destructive",
    bg: "bg-destructive-soft",
    num: "108",
  },

  {
    icon: Flame,
    label: "Fire",
    color: "text-warning-foreground",
    bg: "bg-[oklch(0.96_0.06_75)]",
    num: "101",
  },

  {
    icon: ShieldCheck,
    label: "Women",
    color: "text-primary-deep",
    bg: "bg-primary-soft",
    num: "1091",
  },

  {
    icon: Car,
    label: "Roadside",
    color: "text-primary",
    bg: "bg-primary-soft",
    num: "1073",
  },

  {
    icon: Phone,
    label: "Helpline",
    color: "text-primary-deep",
    bg: "bg-primary-soft",
    num: "112",
  },
];

function HomeDash() {

  const user = JSON.parse(
    localStorage.getItem("sntnel-user") || "{}"
  );

  return (
    <AppShell>

      <div className="gov-stripe h-1" />

      {/* Header */}
      <header className="flex items-center justify-between px-5 pb-3 pt-5">

        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="SNTNEL"
            className="h-10 w-10 rounded-xl object-cover ring-1 ring-border"
          />

          <div>

            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Welcome back
            </p>

            <h1 className="text-base font-bold">

              {user.fullName || "User"}

            </h1>

          </div>

        </div>

        <Link
          to="/profile"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary font-bold"
          aria-label="Profile"
        >

          {user.fullName?.charAt(0) || "U"}

        </Link>

      </header>

      {/* Status Card */}
      <div className="px-5">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary-deep to-primary p-4 text-primary-foreground shadow-elevated"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">

            <Shield className="h-5 w-5" />

          </div>

          <div className="flex-1">

            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/75">
              Status
            </p>

            <p className="text-sm font-bold">
              Protected • Chennai
            </p>

          </div>

          <span className="rounded-full bg-success px-2.5 py-1 text-[10px] font-bold uppercase">

            Safe

          </span>

        </motion.div>

      </div>

      {/* SOS */}
      <section className="px-5 pb-5 pt-7">

        <div className="flex flex-col items-center">

          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-destructive">
            Emergency
          </p>

          <div className="relative flex h-48 w-48 items-center justify-center">

            <div className="sos-pulse absolute h-44 w-44 rounded-full" />

            <motion.button
              whileTap={{ scale: 0.94 }}
              className="relative z-10 flex h-44 w-44 flex-col items-center justify-center rounded-full bg-gradient-to-br from-destructive to-[oklch(0.45_0.22_25)] text-destructive-foreground shadow-[0_20px_60px_-15px_oklch(0.58_0.22_25/0.6)] ring-8 ring-destructive/15"
            >

              <Siren
                className="h-10 w-10"
                strokeWidth={2.2}
              />

              <span className="mt-2 text-2xl font-black tracking-wider">
                SOS
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-90">
                Hold to alert
              </span>

            </motion.button>

          </div>

          <button className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-card transition-all hover:bg-accent">

            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">

              <Mic className="h-4 w-4" />

              <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />

            </span>

            Activate voice command

          </button>

          <p className="mt-2 text-[11px] text-muted-foreground">

            Say

            <span className="font-bold text-foreground">
              {" "}“MAA!”
            </span>

          </p>

        </div>

      </section>

      {/* Quick Actions */}
      <section className="px-5 pb-5">

        <div className="mb-3 flex items-center justify-between">

          <h2 className="text-sm font-bold">
            Quick actions
          </h2>

          <span className="text-[11px] font-medium text-muted-foreground">
            Tap to call
          </span>

        </div>

        <div className="grid grid-cols-3 gap-3">

          {quickActions.map(
            ({
              icon: Icon,
              label,
              color,
              bg,
              num,
            }) => (

              <motion.button
                whileTap={{ scale: 0.96 }}
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 shadow-card transition-colors hover:bg-accent"
              >

                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}
                >

                  <Icon
                    className={`h-5 w-5 ${color}`}
                  />

                </span>

                <span className="text-[12px] font-semibold">
                  {label}
                </span>

                <span className="text-[10px] font-bold tracking-wider text-muted-foreground">
                  {num}
                </span>

              </motion.button>

            )
          )}

        </div>

      </section>

      {/* Live Overview */}
      <section className="px-5 pb-6">

        <h2 className="mb-3 text-sm font-bold">
          Live overview
        </h2>

        <div className="grid grid-cols-2 gap-3">

          <Link
            to="/tracking"
            className="rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:border-primary/40"
          >

            <MapPin className="h-5 w-5 text-primary" />

            <p className="mt-3 text-xs font-bold">
              Live tracking
            </p>

            <p className="text-[11px] text-muted-foreground">
              Drone + ambulance routing
            </p>

          </Link>

          <Link
            to="/security"
            className="rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:border-primary/40"
          >

            <Shield className="h-5 w-5 text-primary" />

            <p className="mt-3 text-xs font-bold">
              Evidence capture
            </p>

            <p className="text-[11px] text-muted-foreground">
              Live recording and backup
            </p>

          </Link>

        </div>

      </section>

      <BottomNav />

    </AppShell>
  );
}