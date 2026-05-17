import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import {
  Navigation,
  Plane,
  Ambulance,
  Building2,
  Hospital,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  Tooltip,
} from "react-leaflet";

import L from "leaflet";

import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/tracking")({
  component: Tracking,
});

const youPos: [number, number] = [13.0827, 80.2707];

const dronePos: [number, number] = [13.0845, 80.2655];

const ambulancePos: [number, number] = [13.078, 80.278];

const policePos: [number, number] = [13.0418, 80.2337];

const hospitalPos: [number, number] = [13.0878, 80.2785];

const ambulanceRoute: [number, number][] = [
  ambulancePos,
  [13.0802, 80.275],
  youPos,
];

const droneRoute: [number, number][] = [
  dronePos,
  youPos,
];

const etas = [
  {
    icon: Ambulance,
    label: "Ambulance",
    eta: "4 min",
    dist: "1.8 km",
    color: "destructive",
  },

  {
    icon: Plane,
    label: "Drone unit",
    eta: "1 min",
    dist: "0.6 km",
    color: "primary",
  },

  {
    icon: Building2,
    label: "Police (T-Nagar)",
    eta: "6 min",
    dist: "2.4 km",
    color: "primary-deep",
  },

  {
    icon: Hospital,
    label: "Apollo Hospital",
    eta: "8 min",
    dist: "3.2 km",
    color: "primary-deep",
  },
];

const createIcon = (color: string) =>
  L.divIcon({
    html: `
      <div style="
        width:18px;
        height:18px;
        background:${color};
        border:3px solid white;
        border-radius:999px;
        box-shadow:0 0 12px rgba(0,0,0,0.35);
      "></div>
    `,
    className: "",
    iconSize: [18, 18],
  });

const youIcon = createIcon("#ef4444");

const droneIcon = createIcon("#3b82f6");

const ambulanceIcon = createIcon("#f97316");

const policeIcon = createIcon("#6366f1");

const hospitalIcon = createIcon("#10b981");

function Tracking() {

  const handleShareLocation = () => {

    alert(
      "Live location shared successfully.\n\nEmergency responders notified."
    );

  };

  return (
    <AppShell>

      <TopBar
        title="Live tracking"
        subtitle="Updated just now • Chennai"
        showBell
      />

      {/* Status */}
      <div className="mx-5 mt-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-3 shadow-card">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-destructive">
              Emergency Active
            </p>

            <p className="mt-1 text-[11px] text-muted-foreground">
              Drone dispatched • Authorities notified
            </p>

          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-success">

            <span className="h-2 w-2 animate-pulse rounded-full bg-success" />

            LIVE

          </div>

        </div>

      </div>

      {/* Map */}
      <div className="mx-5 mt-3 overflow-hidden rounded-2xl border border-border shadow-card">

        <div className="h-[360px] w-full">

          <MapContainer
            center={youPos}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full z-0"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* You */}
            <Marker
              position={youPos}
              icon={youIcon}
            >

              <Tooltip permanent direction="top">
                YOU
              </Tooltip>

              <Popup>
                Your Location
              </Popup>

            </Marker>

            {/* Drone */}
            <Marker
              position={dronePos}
              icon={droneIcon}
            >

              <Tooltip permanent direction="top">
                DRONE-7
              </Tooltip>

              <Popup>
                Drone Unit
              </Popup>

            </Marker>

            {/* Ambulance */}
            <Marker
              position={ambulancePos}
              icon={ambulanceIcon}
            >

              <Tooltip permanent direction="top">
                AMB-12
              </Tooltip>

              <Popup>
                Ambulance Unit
              </Popup>

            </Marker>

            {/* Police */}
            <Marker
              position={policePos}
              icon={policeIcon}
            >

              <Tooltip permanent direction="top">
                POLICE
              </Tooltip>

              <Popup>
                Police Station
              </Popup>

            </Marker>

            {/* Hospital */}
            <Marker
              position={hospitalPos}
              icon={hospitalIcon}
            >

              <Tooltip permanent direction="top">
                HOSPITAL
              </Tooltip>

              <Popup>
                Apollo Hospital
              </Popup>

            </Marker>

            {/* Ambulance Route */}
            <Polyline
              positions={ambulanceRoute}
              pathOptions={{
                color: "#2563eb",
                weight: 5,
              }}
            />

            {/* Drone Route */}
            <Polyline
              positions={droneRoute}
              pathOptions={{
                color: "#22c55e",
                dashArray: "8",
                weight: 4,
              }}
            />

            {/* Emergency Radius */}
            <Circle
              center={youPos}
              radius={300}
              pathOptions={{
                color: "#ef4444",
                fillColor: "#ef4444",
                fillOpacity: 0.15,
              }}
            />

          </MapContainer>

        </div>

      </div>

      {/* Response Units */}
      <section className="px-5 pt-5 pb-6">

        <div className="mb-3 flex items-center justify-between">

          <h2 className="text-sm font-bold">
            Response units
          </h2>

          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-success">

            <span className="h-2 w-2 rounded-full bg-success" />

            Live

          </span>

        </div>

        <div className="space-y-2.5">

          {etas.map(({ icon: Icon, label, eta, dist, color }) => (

            <motion.div
              key={label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-card"
            >

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-${color}/10 text-${color}`}
                style={{
                  background: `color-mix(in oklab, var(--color-${color}) 12%, var(--color-card))`,
                  color: `var(--color-${color})`,
                }}
              >

                <Icon className="h-5 w-5" />

              </div>

              <div className="flex-1">

                <p className="text-sm font-semibold">
                  {label}
                </p>

                <p className="text-[11px] text-muted-foreground">
                  {dist} away • en route
                </p>

              </div>

              <div className="text-right">

                <p className="text-base font-black text-foreground">
                  {eta}
                </p>

                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  ETA
                </p>

              </div>

            </motion.div>

          ))}

        </div>

        <button
          onClick={handleShareLocation}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-elevated transition-all hover:bg-primary-deep"
        >

          <Navigation className="h-4 w-4" />

          Share live location

        </button>

      </section>

      <BottomNav />

    </AppShell>
  );
}