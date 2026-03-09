"use client";

import { useState, FormEvent } from "react";
import { RSVPFormData, ValidationErrors, validateRSVP, hasErrors } from "@/lib/validations";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function RSVPForm() {
  const [form, setForm] = useState<RSVPFormData>({
    name: "",
    contact: "",
    attending: true,
    guest_count: 1,
  });
  const [guestCountInput, setGuestCountInput] = useState("1");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState("");

  function handleChange(field: keyof RSVPFormData, value: string | boolean | number) {
    const updated = { ...form, [field]: value };

    // If not attending, force guest_count to 0
    if (field === "attending" && value === false) {
      updated.guest_count = 0;
      setGuestCountInput("0");
    }
    // If switching to attending, default to 1
    if (field === "attending" && value === true && form.guest_count === 0) {
      updated.guest_count = 1;
      setGuestCountInput("1");
    }

    setForm(updated);

    // Clear field error on change
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof ValidationErrors];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");

    const payload: RSVPFormData = {
      ...form,
      guest_count: form.attending ? form.guest_count : 0,
    };

    const validationErrors = validateRSVP(payload);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setSubmitState("submitting");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitState("success");
    } catch (err: unknown) {
      setSubmitState("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (submitState === "success") {
    return (
      <section id="rsvp" className="py-16 px-4 bg-cream">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gold/20 p-8 md:p-12">
            <div className="text-5xl mb-4">🏡</div>
            <h3 className="text-2xl font-display text-warm-brown mb-3">
              Thank You!
            </h3>
            <p className="text-warm-text/70 text-lg">
              {form.attending
                ? "Thank you for your RSVP! We look forward to celebrating with you."
                : "Thank you for letting us know. We will miss you!"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-16 px-4 bg-cream">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-sm uppercase tracking-[0.3em] text-gold mb-2">
          RSVP
        </h3>
        <p className="text-2xl font-display text-warm-brown mb-3">
          Will You Join Us?
        </p>
        <p className="text-warm-text/60 text-sm mb-8">
          Kindly RSVP by <span className="font-semibold text-warm-brown">April 5, 2026</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gold/20 p-8 md:p-10 text-left space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-warm-brown mb-1.5">
              Your Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-warm-text placeholder:text-warm-text/30"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-warm-brown mb-1.5">
              Phone or Email <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
              placeholder="Enter your phone number or email"
              className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-warm-text placeholder:text-warm-text/30"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
            )}
          </div>

          {/* Attending */}
          <div>
            <label className="block text-sm font-medium text-warm-brown mb-3">
              Will you attend?
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleChange("attending", true)}
                className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all ${
                  form.attending
                    ? "border-gold bg-gold/10 text-warm-brown"
                    : "border-gold/20 text-warm-text/50 hover:border-gold/40"
                }`}
              >
                Yes, I&apos;ll be there!
              </button>
              <button
                type="button"
                onClick={() => handleChange("attending", false)}
                className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all ${
                  !form.attending
                    ? "border-gold bg-gold/10 text-warm-brown"
                    : "border-gold/20 text-warm-text/50 hover:border-gold/40"
                }`}
              >
                Sorry, can&apos;t make it
              </button>
            </div>
          </div>

          {/* Guest Count */}
          {form.attending && (
            <div>
              <label className="block text-sm font-medium text-warm-brown mb-1.5">
                Number of Guests (including yourself)
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={guestCountInput}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setGuestCountInput(val);
                  handleChange("guest_count", val === "" ? 1 : Math.min(parseInt(val), 20));
                }}
                onBlur={() => {
                  const num = Math.max(1, Math.min(parseInt(guestCountInput) || 1, 20));
                  setGuestCountInput(String(num));
                  handleChange("guest_count", num);
                }}
                className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-warm-text"
              />
              {errors.guest_count && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.guest_count}
                </p>
              )}
            </div>
          )}

          {/* Server Error */}
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {serverError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="w-full py-3.5 bg-gold hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors shadow-md text-lg"
          >
            {submitState === "submitting" ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              "Send RSVP"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
