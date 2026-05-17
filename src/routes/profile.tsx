import { createFileRoute, Link } from "@tanstack/react-router";

import {
  ChevronRight,
  Bell,
  Shield,
  Heart,
  Settings,
  LifeBuoy,
  LogOut,
  Droplet,
  Calendar,
  Phone,
  MapPin,
} from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

const stats = [
  {
    label: "Guardians",
    value: "3",
  },

  {
    label: "Alerts",
    value: "12",
  },

  {
    label: "Trips logged",
    value: "84",
  },
];

const menu = [
  {
    icon: Shield,
    label: "Safety preferences",
    to: "/profile",
  },

  {
    icon: Heart,
    label: "Medical info & ID",
    to: "/profile-setup",
  },

  {
    icon: Bell,
    label: "Notifications",
    to: "/profile",
  },

  {
    icon: Settings,
    label: "App settings",
    to: "/profile",
  },

  {
    icon: LifeBuoy,
    label: "Help & support",
    to: "/profile",
  },
] as const;

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("sntnel-user") || "{}"
  );

  return (
    <AppShell>

      <TopBar
        title="My profile"
        back={false}
        showBell
      />

      {/* Profile Card */}
      <section className="px-5 pt-2">

        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary-deep to-primary p-5 text-primary-foreground shadow-elevated">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-black ring-2 ring-white/30">

              {user.fullName?.charAt(0) || "U"}

            </div>

            <div className="min-w-0 flex-1">

              <h2 className="truncate text-lg font-bold">

                {user.fullName || "User"}

              </h2>

              <p className="text-[12px] text-white/80">

                {user.address || "No address added"}

              </p>

              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">

                <Shield className="h-3 w-3" />

                Verified

              </div>

            </div>

          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 divide-x divide-white/15 rounded-2xl bg-white/10 py-3 text-center backdrop-blur">

            {stats.map((s) => (

              <div key={s.label}>

                <p className="text-lg font-black">
                  {s.value}
                </p>

                <p className="text-[10px] uppercase tracking-wider text-white/75">
                  {s.label}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Info Chips */}
      <section className="grid grid-cols-2 gap-3 px-5 pt-5">

        <InfoChip
          icon={Droplet}
          label="Blood"
          value={user.bloodGroup || "N/A"}
          color="text-destructive"
        />

        <InfoChip
          icon={Calendar}
          label="Age"
          value={user.age || "N/A"}
        />

        <InfoChip
          icon={Phone}
          label="Phone"
          value={user.phone || "N/A"}
        />

        <InfoChip
          icon={MapPin}
          label="Gender"
          value={user.gender || "N/A"}
        />

      </section>

      {/* Address */}
      <section className="px-5 pt-4">

        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">

          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">

            Residential Address

          </p>

          <p className="mt-2 text-sm font-medium text-foreground">

            {user.address || "No address provided"}

          </p>

        </div>

      </section>

      {/* Medical */}
      <section className="px-5 pt-4">

        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">

          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">

            Medical Information

          </p>

          <p className="mt-2 text-sm font-medium text-foreground">

            {user.medical || "No medical information added"}

          </p>

        </div>

      </section>

      {/* Identification */}
      <section className="px-5 pt-4">

        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">

          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">

            Identification Mark

          </p>

          <p className="mt-2 text-sm font-medium text-foreground">

            {user.identification || "Not provided"}

          </p>

        </div>

      </section>

      {/* Menu */}
      <section className="px-5 pb-6 pt-5">

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">

          {menu.map((m, i) => (

            <Link
              key={m.label}
              to={m.to}
              className={`flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-accent ${
                i !== menu.length - 1
                  ? "border-b border-border"
                  : ""
              }`}
            >

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">

                <m.icon className="h-4 w-4" />

              </span>

              <span className="flex-1 text-sm font-medium">

                {m.label}

              </span>

              <ChevronRight className="h-4 w-4 text-muted-foreground" />

            </Link>

          ))}

        </div>

        {/* Sign Out */}
        <Link
          to="/login"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive-soft py-3.5 text-sm font-semibold text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground"
        >

          <LogOut className="h-4 w-4" />

          Sign out

        </Link>

        <p className="mt-5 text-center text-[10.5px] text-muted-foreground">

          SNTNEL v1.0 · Your Safety, Our Mission

        </p>

      </section>

      <BottomNav />

    </AppShell>
  );
}

function InfoChip({
  icon: Icon,
  label,
  value,
  color = "text-primary",
}: {
  icon: any;
  label: string;
  value: string;
  color?: string;
}) {

  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-card">

      <Icon className={`h-4 w-4 ${color}`} />

      <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">

        {label}

      </p>

      <p className="text-sm font-bold">

        {value}

      </p>

    </div>
  );
}