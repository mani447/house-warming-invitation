"use client";

import { useState, FormEvent } from "react";

interface AdminLoginProps {
  onAuthenticated: (password: string) => void;
}

export default function AdminLogin({ onAuthenticated }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/export?verify=1", {
        headers: { "x-admin-password": password },
      });

      if (res.ok) {
        onAuthenticated(password);
      } else {
        setError("Invalid password.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg border border-gold/20 p-8 w-full max-w-sm space-y-5"
      >
        <h1 className="text-2xl font-display text-warm-brown text-center">
          Admin Access
        </h1>
        <div>
          <label className="block text-sm text-warm-brown mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 text-warm-text"
            placeholder="Enter admin password"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gold hover:bg-gold-dark disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
        >
          {loading ? "Verifying..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
