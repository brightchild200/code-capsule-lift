import { createFileRoute } from "@tanstack/react-router";
import { Cloud, Settings } from "lucide-react";

import { Card, SectionTitle } from "@/components/dashboard/data";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Settings — SENTINEL GRID" },
      { name: "description", content: "Organisation profile, data ingestion sources and access controls." },
      { property: "og:title", content: "Settings — SENTINEL GRID" },
      { property: "og:description", content: "Organisation profile, data ingestion sources and access controls." },
    ],
  }),
});

function SettingsPage() {
  return (
    <>
      <SectionTitle
        icon={Settings}
        eyebrow="Platform configuration"
        title="Settings"
        detail="Organisation, ingestion and access controls."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-5 text-sm font-semibold">Organisation profile</h2>
          {[
            ["Organisation name", "Northstar Financial Group"],
            ["Industry", "Financial services"],
            ["Region", "United Kingdom / EMEA"],
            ["Organisation type", "Enterprise"],
          ].map(([label, value]) => (
            <div key={label} className="mb-4">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</label>
              <div className="rounded-lg border border-slate-700 bg-surface px-3 py-2.5 text-xs text-slate-200">{value}</div>
            </div>
          ))}
          <button className="rounded-lg bg-teal-400 px-4 py-2.5 text-xs font-semibold text-on-accent">Save changes</button>
        </Card>
        <Card className="p-6">
          <h2 className="mb-5 text-sm font-semibold">Data ingestion</h2>
          {["CISA KEV Catalog", "NVD / NIST", "Mandiant Advantage", "Microsoft MSRC"].map((name, i) => (
            <div key={name} className="mb-3 flex items-center justify-between rounded-lg border border-slate-700/70 bg-surface p-3">
              <div className="flex items-center gap-3">
                <Cloud className="h-4 w-4 text-cyan-300" />
                <span className="text-xs">{name}</span>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] text-green-300">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                {i === 2 ? "Degraded" : "Connected"}
              </span>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
