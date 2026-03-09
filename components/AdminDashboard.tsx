"use client";

import { useEffect, useState, useCallback } from "react";
import { formatDate } from "@/lib/utils";

interface RSVP {
  id: string;
  name: string;
  contact: string;
  attending: boolean;
  guest_count: number;
  created_at: string;
}

interface AdminDashboardProps {
  password: string;
}

export default function AdminDashboard({ password }: AdminDashboardProps) {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRsvps = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/export", {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        const data = await res.json();
        setRsvps(data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    fetchRsvps();
  }, [fetchRsvps]);

  const totalSubmissions = rsvps.length;
  const attending = rsvps.filter((r) => r.attending);
  const declining = rsvps.filter((r) => !r.attending);
  const totalGuests = attending.reduce((sum, r) => sum + r.guest_count, 0);

  function handleExportCSV() {
    const header = "Name,Contact,Attending,Guests,Submitted At\n";
    const body = rsvps
      .map(
        (r) =>
          `"${r.name}","${r.contact}",${r.attending ? "Yes" : "No"},${r.guest_count},"${formatDate(r.created_at)}"`
      )
      .join("\n");
    const csv = header + body;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvps-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-warm-text/60">Loading RSVPs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-display text-warm-brown">
            RSVP Dashboard
          </h1>
          <button
            onClick={handleExportCSV}
            className="px-6 py-2.5 bg-gold hover:bg-gold-dark text-white rounded-xl font-medium transition-colors text-sm"
          >
            Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total RSVPs" value={totalSubmissions} />
          <StatCard label="Attending" value={attending.length} />
          <StatCard label="Expected Guests" value={totalGuests} />
          <StatCard label="Declined" value={declining.length} />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gold/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-cream-dark border-b border-gold/20">
                  <th className="px-4 py-3 text-xs uppercase tracking-wider text-warm-brown font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wider text-warm-brown font-semibold">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wider text-warm-brown font-semibold">
                    Attending
                  </th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wider text-warm-brown font-semibold">
                    Guests
                  </th>
                  <th className="px-4 py-3 text-xs uppercase tracking-wider text-warm-brown font-semibold">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10">
                {rsvps.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-warm-text/50"
                    >
                      No RSVPs yet.
                    </td>
                  </tr>
                ) : (
                  rsvps.map((r) => (
                    <tr key={r.id} className="hover:bg-cream/50">
                      <td className="px-4 py-3 text-warm-text font-medium">
                        {r.name}
                      </td>
                      <td className="px-4 py-3 text-warm-text/70">
                        {r.contact}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            r.attending
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {r.attending ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-warm-text">
                        {r.guest_count}
                      </td>
                      <td className="px-4 py-3 text-warm-text/60 text-sm">
                        {formatDate(r.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gold/20 p-5 text-center">
      <p className="text-3xl font-display text-warm-brown">{value}</p>
      <p className="text-xs uppercase tracking-wider text-warm-text/60 mt-1">
        {label}
      </p>
    </div>
  );
}
