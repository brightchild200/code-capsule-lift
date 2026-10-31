import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Server, SlidersHorizontal, Upload } from "lucide-react";

import { Card, EmptyState, SectionTitle, SeverityBadge, assets, type Severity } from "@/components/dashboard/data";

export const Route = createFileRoute("/_dashboard/assets")({
  component: AssetInventory,
  head: () => ({
    meta: [
      { title: "Asset Inventory — SENTINEL GRID" },
      {
        name: "description",
        content: "2,847 registered assets with versions, environments, criticality and ownership.",
      },
      { property: "og:title", content: "Asset Inventory — SENTINEL GRID" },
      { property: "og:description", content: "2,847 registered assets with versions, environments, criticality and ownership." },
    ],
  }),
});

function AssetInventory() {
  const [term, setTerm] = useState("");
  const rows = assets.filter((a) => a.join(" ").toLowerCase().includes(term.toLowerCase()));

  return (
    <>
      <SectionTitle
        icon={Server}
        eyebrow="Infrastructure visibility"
        title="Asset Inventory"
        detail="2,847 registered assets · last synchronised 4 minutes ago"
      />
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-card px-3 py-2">
          <Search className="h-3.5 w-3.5 text-slate-500" />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search hostname, product or owner"
            className="w-64 bg-transparent text-xs outline-none placeholder:text-slate-600"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>
        <button className="ml-auto flex items-center gap-2 rounded-lg bg-teal-400 px-3 py-2 text-xs font-semibold text-on-accent">
          <Upload className="h-3.5 w-3.5" />
          Import CSV
        </button>
      </div>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[0.9fr_1.35fr_1.4fr_0.9fr_0.8fr_0.7fr_1fr_0.9fr] gap-4 border-b border-slate-700/60 bg-table-head px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {["Asset ID", "Hostname", "Product", "Version", "Environment", "Criticality", "Exposure", "Owner"].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        {rows.map((a) => (
          <div
            key={a[0]}
            className="grid grid-cols-[0.9fr_1.35fr_1.4fr_0.9fr_0.8fr_0.7fr_1fr_0.9fr] items-center gap-4 border-b border-slate-700/40 px-5 py-4 text-xs last:border-0 hover:bg-slate-800/30"
          >
            <span className="font-mono text-[10px] text-slate-500">{a[0]}</span>
            <span className="font-medium text-slate-200">{a[1]}</span>
            <span className="text-slate-300">{a[2]}</span>
            <span className="font-mono text-[10px] text-slate-400">{a[3]}</span>
            <span className="text-slate-400">{a[4]}</span>
            <SeverityBadge severity={a[5] as Severity} />
            <span className={a[6] === "Internet-facing" ? "text-orange-300" : "text-slate-500"}>{a[6]}</span>
            <span className="text-slate-400">{a[7]}</span>
          </div>
        ))}
      </Card>
    </>
  );
}
