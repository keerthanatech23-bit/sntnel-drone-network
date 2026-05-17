import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import {
  ShieldAlert,
  Video,
  Phone,
  Upload,
  Circle,
  FileVideo,
  Clock3,
} from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/security")({
  component: Security,
});

const recordings = [
  {
    id: 1,
    title: "Emergency Recording",
    time: "Today • 11:42 PM",
    duration: "01:28",
  },

  {
    id: 2,
    title: "SOS Evidence Capture",
    time: "Yesterday • 09:14 PM",
    duration: "02:51",
  },

  {
    id: 3,
    title: "Guardian Alert Recording",
    time: "Yesterday • 07:32 PM",
    duration: "00:56",
  },
];

function Security() {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [cameraOn, setCameraOn] = useState(false);

  const [recording, setRecording] = useState(false);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {

    let interval: NodeJS.Timeout;

    if (recording) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(interval);

  }, [recording]);

  const startEmergencyCapture = async () => {

    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraOn(true);

      setRecording(true);

    } catch (err) {

      alert("Camera permission denied.");

    }
  };

  const stopCapture = () => {

    const stream = videoRef.current?.srcObject as MediaStream;

    stream?.getTracks().forEach((track) => track.stop());

    setCameraOn(false);

    setRecording(false);

    setSeconds(0);
  };

  const formatTime = (s: number) => {

    const mins = String(Math.floor(s / 60)).padStart(2, "0");

    const secs = String(s % 60).padStart(2, "0");

    return `${mins}:${secs}`;
  };

  return (
    <AppShell>

      <TopBar
        title="Evidence Capture"
        subtitle="Emergency recording system"
        showBell
      />

      {/* Emergency Banner */}
      <div className="px-5 pt-3">

        <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-4 shadow-card">

          <div className="flex items-start justify-between gap-3">

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-destructive">
                SOS Evidence Mode
              </p>

              <p className="mt-1 text-[12px] text-muted-foreground">
                Camera recording will be securely shared with guardians and emergency authorities.
              </p>

            </div>

            {recording && (
              <div className="flex items-center gap-1 rounded-full bg-destructive px-2 py-1 text-[10px] font-bold uppercase text-destructive-foreground">

                <Circle className="h-2.5 w-2.5 fill-current" />

                REC

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Camera Feed */}
      <section className="px-5 pt-4">

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">

          <div className="relative aspect-[9/16] bg-black">

            {cameraOn ? (

              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="h-full w-full object-cover"
              />

            ) : (

              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">

                  <Video className="h-8 w-8" />

                </div>

                <div>

                  <p className="text-base font-bold text-white">
                    Camera inactive
                  </p>

                  <p className="mt-1 text-sm text-white/60">
                    Start emergency evidence capture
                  </p>

                </div>

              </div>

            )}

            {/* Overlay */}
            {recording && (

              <div className="absolute left-0 right-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent p-4">

                <div className="flex items-center gap-2 rounded-full bg-destructive px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-destructive-foreground">

                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />

                  Recording

                </div>

                <div className="rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">

                  {formatTime(seconds)}

                </div>

              </div>

            )}

            {/* Bottom Overlay */}
            {recording && (

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-bold text-white">
                      Live Emergency Upload
                    </p>

                    <p className="text-[11px] text-white/70">
                      Sending encrypted stream to guardians and authorities
                    </p>

                  </div>

                  <Upload className="h-5 w-5 text-white" />

                </div>

              </div>

            )}

          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-3 p-4">

            {!recording ? (

              <button
                onClick={startEmergencyCapture}
                className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-destructive py-4 text-sm font-semibold text-destructive-foreground shadow-elevated"
              >

                <ShieldAlert className="h-4 w-4" />

                Activate SOS Recording

              </button>

            ) : (

              <>
                <button
                  onClick={stopCapture}
                  className="rounded-2xl border border-border bg-card py-3.5 text-sm font-semibold text-foreground"
                >

                  Stop recording

                </button>

                <button
                  onClick={() =>
                    alert("Emergency evidence shared successfully.")
                  }
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
                >

                  <Phone className="h-4 w-4" />

                  Send alert

                </button>
              </>

            )}

          </div>

        </div>

      </section>

      {/* AI Detection */}
      <section className="px-5 pt-5">

        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-bold">
                AI Threat Detection
              </p>

              <p className="mt-1 text-[11px] text-muted-foreground">
                Live analysis running on current emergency feed
              </p>

            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-success">

              <span className="h-2 w-2 animate-pulse rounded-full bg-success" />

              ACTIVE

            </div>

          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">

            <div className="rounded-xl bg-primary-soft p-3">

              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Motion detection
              </p>

              <p className="mt-1 text-sm font-bold">
                Enabled
              </p>

            </div>

            <div className="rounded-xl bg-primary-soft p-3">

              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Face recognition
              </p>

              <p className="mt-1 text-sm font-bold">
                Monitoring
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Evidence Logs */}
      <section className="px-5 pb-6 pt-5">

        <h2 className="mb-3 text-sm font-bold">
          Recorded evidence
        </h2>

        <div className="space-y-3">

          {recordings.map((r) => (

            <motion.div
              key={r.id}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">

                <FileVideo className="h-5 w-5" />

              </div>

              <div className="flex-1">

                <p className="text-sm font-semibold">
                  {r.title}
                </p>

                <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">

                  <Clock3 className="h-3 w-3" />

                  {r.time}

                </div>

              </div>

              <div className="rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">

                {r.duration}

              </div>

            </motion.div>

          ))}

        </div>

      </section>

      <BottomNav />

    </AppShell>
  );
}