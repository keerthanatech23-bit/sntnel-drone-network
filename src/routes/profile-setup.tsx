import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { motion } from "framer-motion";

import {
  Upload,
  User2,
  Droplet,
  IdCard,
  ArrowRight,
} from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";

export const Route = createFileRoute("/profile-setup")({
  component: ProfileSetup,
});

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {label}
    </span>

    <div className="mt-1.5">
      {children}
    </div>
  </label>
);

const inputCls =
  "w-full rounded-xl border border-input bg-card px-3.5 py-3 text-sm text-foreground shadow-card outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15";

function ProfileSetup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    address: "",
    medical: "",
    identification: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    localStorage.setItem(
      "sntnel-user",
      JSON.stringify(form)
    );

    alert("Personal details saved successfully.");

    navigate({
      to: "/guardian",
    });

  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (file) {
      setUploadedFile(file);
    }

  };

  return (
    <AppShell>

      <TopBar
        title="Personal details"
        subtitle="Step 1 of 2"
      />

      {/* Progress */}
      <div className="px-5 pt-2">

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 0.6 }}
            className="h-full bg-primary"
          />

        </div>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="px-5 pb-8 pt-5"
      >

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 rounded-2xl bg-primary-soft p-5"
        >

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card text-primary shadow-card">

            <User2 className="h-8 w-8" />

          </div>

          <button
            type="button"
            className="text-xs font-semibold text-primary hover:underline"
          >

            Add profile photo

          </button>

        </motion.div>

        {/* Inputs */}
        <div className="mt-6 space-y-4">

          {/* Full Name */}
          <Field label="Full name">

            <input
              className={inputCls}
              placeholder="As per official ID"
              value={form.fullName}
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName: e.target.value,
                })
              }
              required
            />

          </Field>

          {/* Age + DOB */}
          <div className="grid grid-cols-2 gap-3">

            <Field label="Age">

              <input
                type="number"
                className={inputCls}
                placeholder="28"
                value={form.age}
                onChange={(e) =>
                  setForm({
                    ...form,
                    age: e.target.value,
                  })
                }
                required
              />

            </Field>

            <Field label="Date of birth">

              <input
                type="date"
                className={inputCls}
                value={form.dob}
                onChange={(e) =>
                  setForm({
                    ...form,
                    dob: e.target.value,
                  })
                }
                required
              />

            </Field>

          </div>

          {/* Gender + Blood */}
          <div className="grid grid-cols-2 gap-3">

            <Field label="Gender">

              <select
                className={inputCls}
                value={form.gender}
                onChange={(e) =>
                  setForm({
                    ...form,
                    gender: e.target.value,
                  })
                }
              >

                <option value="">
                  Select
                </option>

                <option>
                  Female
                </option>

                <option>
                  Male
                </option>

                <option>
                  Non-binary
                </option>

                <option>
                  Prefer not to say
                </option>

              </select>

            </Field>

            <Field label="Blood group">

              <div className="relative">

                <Droplet className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-destructive" />

                <select
                  className={`${inputCls} pl-9`}
                  value={form.bloodGroup}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      bloodGroup: e.target.value,
                    })
                  }
                >

                  <option value="">
                    Select
                  </option>

                  {[
                    "A+",
                    "A-",
                    "B+",
                    "B-",
                    "AB+",
                    "AB-",
                    "O+",
                    "O-",
                  ].map((b) => (

                    <option key={b}>
                      {b}
                    </option>

                  ))}

                </select>

              </div>

            </Field>

          </div>

          {/* Phone */}
          <Field label="Phone number">

            <input
              className={inputCls}
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              required
            />

          </Field>

          {/* Address */}
          <Field label="Residential address">

            <textarea
              className={`${inputCls} min-h-[88px] resize-none`}
              placeholder="House no., street, city, state, pincode"
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
              required
            />

          </Field>

          {/* Medical */}
          <Field label="Medical conditions">

            <textarea
              className={`${inputCls} min-h-[68px] resize-none`}
              placeholder="Medical history and ongoing medications"
              value={form.medical}
              onChange={(e) =>
                setForm({
                  ...form,
                  medical: e.target.value,
                })
              }
            />

          </Field>

          {/* Identification */}
          <Field label="Identification mark">

            <input
              className={inputCls}
              placeholder="Example: Mole on right cheek"
              value={form.identification}
              onChange={(e) =>
                setForm({
                  ...form,
                  identification: e.target.value,
                })
              }
            />

          </Field>

          {/* Upload */}
          <Field label="ID proof upload">

            <label
              className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-primary/40 bg-primary-soft/60 px-4 py-4 text-sm text-foreground transition-colors hover:bg-primary-soft"
            >

              <span className="flex items-center gap-3">

                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">

                  <IdCard className="h-4 w-4" />

                </span>

                <span>

                  <span className="block font-semibold">
                    Upload ID proof
                  </span>

                  <span className="block text-[11px] text-muted-foreground">
                    Aadhaar, PAN, Passport
                  </span>

                  {uploadedFile && (
                    <span className="mt-1 block text-[10px] text-success">
                      {uploadedFile.name}
                    </span>
                  )}

                </span>

              </span>

              <Upload className="h-4 w-4 text-primary" />

              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />

            </label>

          </Field>

        </div>

        {/* Continue */}
        <button
          type="submit"
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-elevated transition-all hover:bg-primary-deep"
        >

          Continue

          <ArrowRight className="h-4 w-4" />

        </button>

      </form>

    </AppShell>
  );
}