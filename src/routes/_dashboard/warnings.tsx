import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Filter } from "lucide-react";

import { Card, SectionTitle, SeverityBadge, warnings, type Severity } from "@/components/dashboard/data";
import { useDashboard } from "@/components/dashboard/dashboard-context";

export const Route = createFileRoute("/_dashboard/warnings")({
  component: WarningCentre,
  head: () => ({
    meta: [
      { title: "Warning Centre — SENTINEL GRID" },
      {
        name: "description",
        content: "Risk-prioritised early warnings matched to your organisation's infrastructure.",
      },
      { property: "og:title", content: "Warning Centre — SENTINEL GRID" },
      {
        property: "og:description",
        content: "Risk-prioritised early warnings matched to your organisation's infrastructure.",
      },
    ],
  }),
});

function WarningCentre() {
  const { query, setQuery, ack, setSelected } = useDashboard();
  const [severityFilter, setSeverityFilter] = useState<Severity | "All">("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(
    () =>
      warnings.filter(
        (w) =>
          `${w.title} ${w.cve} ${w.id}`.toLowerCase().includes(query.toLowerCase()) &&
          (severityFilter === "All" || w.severity === severityFilter) &&
          (statusFilter === "All" || w.status === statusFilter),
      ),
    [query, severityFilter, statusFilter],
  );

  return (
    <>
      <SectionTitle
        icon={AlertTriangle}
        eyebrow="Risk-prioritised queue"
        title="Warning Centre"
        detail="Actionable early warnings matched to your organisation's infrastructure."
      />
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 rounded-lg border border-slate-700 bg-card px-3 py-2 text-xs text-slate-300">
          <Filter className="h-3.5 w-3.5" />
          <span className="sr-only">Filter by severity</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as Severity | "All")}
            className="bg-transparent outline-none"
          >
            <option value="All">All severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-slate-700 bg-card px-3 py-2 text-xs text-slate-300">
          <span className="sr-only">Filter by status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent outline-none"
          >
            <option value="All">All statuses</option>
            <option value="New">New</option>
            <option value="Investigating">Investigating</option>
            <option value="Acknowledged">Acknowledged</option>
            <option value="Pending approval">Pending approval</option>
            <option value="Mitigated">Mitigated</option>
          </select>
        </label>
        <span className="ml-auto text-[11px] text-slate-500">{filtered.length} warnings · refreshed just now</span>
      </div>
      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[1.1fr_2fr_0.7fr_0.65fr_0.7fr_0.8fr_0.8fr] gap-4 border-b border-slate-700/60 bg-table-head px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 md:grid">
          <span>Warning</span>
          <span>Threat</span>
          <span>Risk band</span>
          <span>Score</span>
          <span>Assets</span>
          <span>Status</span>
          <span>Detected</span>
        </div>
        {filtered.map((w) => (
          <button
            key={w.id}
            onClick={() => setSelected(w)}
            className="grid w-full items-center gap-4 border-b border-slate-700/40 px-5 py-4 text-left transition last:border-0 hover:bg-slate-800/40 md:grid-cols-[1.1fr_2fr_0.7fr_0.65fr_0.7fr_0.8fr_0.8fr]"
          >
            <div>
              <div className="font-mono text-xs text-teal-300">{w.id}</div>
              <div className="mt-1 text-[10px] text-slate-500">{w.source}</div>
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-medium text-slate-200">{w.title}</div>
              <div className="mt-1 font-mono text-[10px] text-slate-500">{w.cve}</div>
            </div>
            <div>
              <SeverityBadge severity={w.severity} />
            </div>
            <div className="text-sm font-semibold text-slate-100">
              {w.score}
              <span className="text-[10px] text-slate-600"> / 100</span>
            </div>
            <div className="text-xs text-slate-300">
              {w.assets}
              <span className="ml-1 text-[10px] text-slate-500">assets</span>
            </div>
            <div>
              <span
                className={`rounded px-2 py-1 text-[10px] ${ack.includes(w.id) || w.status === "Acknowledged" ? "bg-teal-400/10 text-teal-300" : "bg-slate-700 text-slate-300"}`}
              >
                {ack.includes(w.id) ? "Acknowledged" : w.status}
              </span>
            </div>
            <div className="text-[11px] text-slate-500">{w.detected}</div>
          </button>
        ))}
      </Card>
    </>
  );
}
