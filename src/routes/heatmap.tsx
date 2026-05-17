import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  MapContainer,
  TileLayer,
  Circle,
  Tooltip,
  Marker,
} from "react-leaflet";

import L from "leaflet";

import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/heatmap")({
  component: Heatmap,
});

const center: [number, number] = [13.0827, 80.2707];

const zoneTypes = [
  {
    key: "safe",
    label: "Safe",
    color: "#22c55e",
  },
  {
    key: "moderate",
    label: "Moderate",
    color: "#facc15",
  },
  {
    key: "high",
    label: "High risk",
    color: "#ef4444",
  },
  {
    key: "women",
    label: "Women safety",
    color: "#ec4899",
  },
  {
    key: "hotspot",
    label: "Hotspots",
    color: "#3b82f6",
  },
] as const;

const zones = [
  {
    type: "safe",
    position: [13.087, 80.22],
    radius: 800,
    label: "Anna Nagar",
  },

  {
    type: "safe",
    position: [13.05, 80.24],
    radius: 700,
    label: "Velachery",
  },

  {
    type: "moderate",
    position: [13.0418, 80.2337],
    radius: 1000,
    label: "T-Nagar",
  },

  {
    type: "moderate",
    position: [13.0674, 80.2376],
    radius: 850,
    label: "Royapettah",
  },

  {
    type: "high",
    position: [13.0487, 80.2824],
    radius: 1200,
    label: "Marina Beach",
  },

  {
    type: "women",
    position: [13.0827, 80.2707],
    radius: 700,
    label: "Women Safety Zone",
  },

  {
    type: "hotspot",
    position: [13.06, 80.255],
    radius: 350,
    label: "Incident Hotspot",
  },

  {
    type: "hotspot",
    position: [13.075, 80.285],
    radius: 300,
    label: "Emergency Cluster",
  },
];

const areas = [
  {
    name: "T-Nagar",
    level: "Moderate",
    color: "warning",
  },

  {
    name: "Anna Nagar",
    level: "Safe",
    color: "success",
  },

  {
    name: "Marina Beach",
    level: "High risk",
    color: "destructive",
  },

  {
    name: "Velachery",
    level: "Safe",
    color: "success",
  },

  {
    name: "Royapettah",
    level: "Moderate",
    color: "warning",
  },
];

const userIcon = L.divIcon({
  html: `
    <div style="
      width:18px;
      height:18px;
      background:#2563eb;
      border:3px solid white;
      border-radius:999px;
      box-shadow:0 0 12px rgba(0,0,0,0.3);
    "></div>
  `,
  className: "",
  iconSize: [18, 18],
});

function Heatmap() {

  const [active, setActive] = useState<string[]>(
    zoneTypes.map((z) => z.key)
  );

  const toggle = (k: string) =>
    setActive((arr) =>
      arr.includes(k)
        ? arr.filter((x) => x !== k)
        : [...arr, k]
    );

  const handleAreaClick = (
    name: string,
    level: string
  ) => {
    alert(`${name} currently marked as ${level} zone.`);
  };

  return (
    <AppShell>

      <TopBar
        title="Chennai safety heatmap"
        subtitle="Live • Updated 2 min ago"
        showBell
      />

      <div className="px-5 pt-3">

        {/* Filters */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">

          {zoneTypes.map((z) => {

            const on = active.includes(z.key);

            return (
              <button
                key={z.key}
                onClick={() => toggle(z.key)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all ${
                  on
                    ? "border-transparent bg-card text-foreground shadow-card"
                    : "border-border bg-transparent text-muted-foreground"
                }`}
              >

                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: z.color,
                  }}
                />

                {z.label}

              </button>
            );
          })}

        </div>

        {/* Real Heatmap */}
        <div className="relative mt-2 overflow-hidden rounded-2xl border border-border shadow-card">

          <div className="h-[400px] w-full">

            <MapContainer
              center={center}
              zoom={12}
              scrollWheelZoom={true}
              className="h-full w-full z-0"
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* User */}
              <Marker
                position={center}
                icon={userIcon}
              >

                <Tooltip permanent direction="top">
                  YOU
                </Tooltip>

              </Marker>

              {/* Zones */}
              {zones
                .filter((z) => active.includes(z.type))
                .map((z, i) => {

                  const config = zoneTypes.find(
                    (x) => x.key === z.type
                  );

                  return (
                    <motion.div key={i}>

                      <Circle
                        center={z.position as [number, number]}
                        radius={z.radius}
                        pathOptions={{
                          color: config?.color,
                          fillColor: config?.color,
                          fillOpacity:
                            z.type === "hotspot"
                              ? 0.35
                              : 0.22,
                          weight:
                            z.type === "hotspot"
                              ? 3
                              : 2,
                          dashArray:
                            z.type === "hotspot"
                              ? "6"
                              : undefined,
                        }}
                      >

                        <Tooltip direction="top">

                          <div className="text-xs font-semibold">

                            {z.label}

                          </div>

                        </Tooltip>

                      </Circle>

                    </motion.div>
                  );
                })}

            </MapContainer>

          </div>

          <div className="absolute left-3 top-3 rounded-full bg-card/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground shadow-card">

            Chennai • Tamil Nadu

          </div>

        </div>

        {/* Nearby Areas */}
        <section className="pb-6 pt-5">

          <h2 className="mb-3 text-sm font-bold">
            Nearby areas
          </h2>

          <div className="space-y-2.5">

            {areas.map((a) => (

              <button
                key={a.name}
                onClick={() =>
                  handleAreaClick(
                    a.name,
                    a.level
                  )
                }
                className="flex w-full items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-left shadow-card transition-all hover:bg-accent"
              >

                <div>

                  <p className="text-[13px] font-semibold">
                    {a.name}
                  </p>

                  <p className="text-[10.5px] text-muted-foreground">
                    Within 3 km
                  </p>

                </div>

                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    color: `var(--color-${a.color}-foreground)`,
                    background: `var(--color-${a.color})`,
                  }}
                >

                  {a.level}

                </span>

              </button>

            ))}

          </div>

        </section>

      </div>

      <BottomNav />

    </AppShell>
  );
}