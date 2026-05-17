import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  Shield,
  Phone,
  ArrowRight,
} from "lucide-react";

import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {

  const [step, setStep] = useState<"phone" | "otp">("phone");

  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (step === "otp") {
      inputsRef.current[0]?.focus();
    }
  }, [step]);

  const handleOtp = (i: number, v: string) => {

    const ch = v
      .replace(/\D/g, "")
      .slice(-1);

    const next = [...otp];

    next[i] = ch;

    setOtp(next);

    if (ch && i < 5) {
      inputsRef.current[i + 1]?.focus();
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (phone.length >= 10) {

      alert("OTP sent successfully.");

      setStep("otp");
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Phone number verified successfully.");

    navigate({
      to: "/profile-setup",
    });
  };

  return (
    <AppShell>

      <div className="gov-stripe h-1" />

      <div className="flex min-h-[calc(100dvh-4px)] flex-col">

        <div className="flex-1 px-6 pb-6 pt-10">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 text-center"
          >

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-elevated">
              <Shield className="h-8 w-8" />
            </div>

            <div>

              <h1 className="text-2xl font-bold tracking-tight">
                Verify your number
              </h1>

              <p className="mt-1.5 text-sm text-muted-foreground">
                {step === "phone"
                  ? "Secure login for emergency response access."
                  : `Enter the code sent to +91 ${phone}`}
              </p>

            </div>

          </motion.div>

          {/* Form */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10"
          >

            {step === "phone" ? (

              <form onSubmit={handleSendOtp}>

                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Phone number
                </label>

                <div className="mt-2 flex items-stretch gap-2 rounded-2xl border border-input bg-card px-4 py-3.5 shadow-card focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">

                  <div className="flex items-center gap-2 border-r border-border pr-3 text-sm font-semibold text-foreground">

                    <Phone className="h-4 w-4 text-primary" />

                    +91

                  </div>

                  <input
                    autoFocus
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10)
                      )
                    }
                    placeholder="98765 43210"
                    className="flex-1 bg-transparent text-base font-medium tracking-wider outline-none placeholder:text-muted-foreground/60"
                  />

                </div>

                <button
                  type="submit"
                  disabled={phone.length < 10}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-elevated transition-all hover:bg-primary-deep disabled:opacity-50"
                >

                  Send OTP

                  <ArrowRight className="h-4 w-4" />

                </button>

              </form>

            ) : (

              <form onSubmit={handleVerifyOtp}>

                <div className="flex justify-between gap-2">

                  {otp.map((v, i) => (

                    <input
                      key={i}
                      ref={(el) => {
                        inputsRef.current[i] = el;
                      }}
                      value={v}
                      onChange={(e) =>
                        handleOtp(i, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          !otp[i] &&
                          i > 0
                        ) {
                          inputsRef.current[i - 1]?.focus();
                        }
                      }}
                      inputMode="numeric"
                      maxLength={1}
                      className="h-14 w-12 rounded-xl border border-input bg-card text-center text-xl font-bold text-foreground shadow-card outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />

                  ))}

                </div>

                <div className="mt-4 text-center text-xs text-muted-foreground">

                  Didn't receive it?

                  <button
                    type="button"
                    className="ml-1 font-semibold text-primary hover:underline"
                  >
                    Resend OTP
                  </button>

                </div>

                <button
                  type="submit"
                  disabled={otp.join("").length < 6}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-elevated transition-all hover:bg-primary-deep disabled:opacity-50"
                >

                  Verify & continue

                  <ArrowRight className="h-4 w-4" />

                </button>

                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="mt-3 w-full text-center text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Change phone number
                </button>

              </form>

            )}

          </motion.div>

        </div>

        {/* Footer */}
        <p className="px-6 pb-6 text-center text-[11px] leading-relaxed text-muted-foreground">

          By continuing you agree to SNTNEL's{" "}

          <Link
            to="/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Terms
          </Link>

          {" "}and{" "}

          <Link
            to="/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>

        </p>

      </div>

    </AppShell>
  );
}