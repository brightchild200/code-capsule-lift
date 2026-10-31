import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import { Card, SectionTitle, SeverityBadge, assets, warnings, type Severity } from "@/components/dashboard/data";

export const Route = createFileRoute("/_dashboard/exposure")({
  component: Exposure,
  head: () => ({
    meta: [
      { title: "Exposure Management — SENTINEL GRID" },
      { name: "description", content: "Confidence-aware exposure status across matched assets." },
      { property: "og:title", content: "Exposure Management — SENTINEL GRID" },
      { property: "og:description", content: "Confidence-aware exposure status across matched assets." },
    ],
  }),
});

function Exposure() {
  return (
    <>
      <SectionTitle
        icon={ShieldCheck}
        eyebrow="Vulnerability matching"
        title="Exposure Management"
        detail="Confidence-aware exposure status across matched assets."
      />
      <div className="mb-5 grid gap-4 sm:grid-cols-4">
        {[
          { label: "CONFIRMED", count: "12", color: "text-red-300" },
          { label: "LIKELY", count: "28", color: "text-orange-300" },
          { label: "POSSIBLE", count: "16", color: "text-yellow-300" },
          { label: "MITIGATED", count: "41", color: "text-green-300" },
        ].map(({ label, count, color }) => (
          <Card key={label} className="p-4">
            <div className="text-[10px] font-bold tracking-wider text-slate-500">{label}</div>
            <div className={`mt-2 text-2xl font-semibold ${color}`}>{count}</div>
          </Card>
        ))}
      </div>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.2fr_1.5fr_1fr_0.9fr_0.9fr_1fr] gap-4 border-b border-slate-700/60 bg-table-head px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <span>Asset</span>
          <span>Threat</span>
          <span>Match status</span>
          <span>Criticality</span>
          <span>Exposure</span>
          <span>Warning</span>
        </div>
        {assets.map((a, i) => (
          <div
            key={a[0]}
            className="grid grid-cols-[1.2fr_1.5fr_1fr_0.9fr_0.9fr_1fr] items-center gap-4 border-b border-slate-700/40 px-5 py-4 text-xs last:border-0"
          >
            <div>
              <div className="font-medium">{a[1]}</div>
              <div className="mt-1 font-mono text-[10px] text-slate-500">{a[2]}</div>
            </div>
            <span className="text-slate-300">{warnings[i]?.cve}</span>
            <span
              className={`w-fit rounded border px-2 py-1 text-[10px] font-bold ${i < 2 ? "border-red-400/30 bg-red-400/10 text-red-300" : i === 2 ? "border-orange-400/30 bg-orange-400/10 text-orange-300" : "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"}`}
            >
              {i < 2 ? "CONFIRMED" : i === 2 ? "LIKELY" : "POSSIBLE"}
            </span>
            <SeverityBadge severity={a[5] as Severity} />
            <span className="text-orange-300">{a[6]}</span>
            <span className="font-mono text-[10px] text-teal-300">{warnings[i]?.id}</span>
          </div>
        ))}
      </Card>
    </>
  );
}
