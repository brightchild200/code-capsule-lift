import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Network,
  Radar,
  Server,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

import { Card, OverviewHeader, SeverityBadge, warnings } from "@/components/dashboard/data";

export const Route = createFileRoute("/_dashboard/")({
  component: Overview,
  head: () => ({
    meta: [
      { title: "Overview — SENTINEL GRID" },
      {
        name: "description",
        content:
          "Your organisation's current threat posture at a glance: assets, active warnings, threat activity and risk distribution.",
      },
      { property: "og:title", content: "Overview — SENTINEL GRID" },
      {
        property: "og:description",
        content:
          "Your organisation's current threat posture at a glance: assets, active warnings, threat activity and risk distribution.",
      },
    ],
  }),
});

const stats: { label: string; value: string; sub: string; color: string; icon: LucideIcon }[] = [
  { label: "Registered assets", value: "2,847", sub: "+4.8%", color: "text-cyan-300", icon: Server },
  { label: "Active warnings", value: "32", sub: "4 critical", color: "text-red-300", icon: AlertTriangle },
  { label: "Threats discovered", value: "184", sub: "last 7 days", color: "text-orange-300", icon: Radar },
  { label: "Risk posture", value: "Elevated", sub: "72 / 100", color: "text-yellow-300", icon: ShieldAlert },
];

function Overview() {
  return (
    <>
      <OverviewHeader />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, sub, color, icon: Icon }) => (
          <Card key={label} className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs text-slate-400">{label}</span>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <div className={`text-3xl font-semibold ${color}`}>{value}</div>
            <div className="mt-2 text-[11px] text-slate-500">{sub}</div>
          </Card>
        ))}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">Threat activity</h2>
              <p className="mt-1 text-xs text-slate-500">New intelligence signals, last 30 days</p>
            </div>
            <Link
              to="/threats"
              className="rounded-md border border-slate-700 px-2.5 py-1.5 text-[10px] text-slate-400 hover:text-slate-200"
            >
              View intelligence
            </Link>
          </div>
          <div className="flex h-48 items-end gap-2 border-b border-l border-slate-700/60 px-3 pb-0 pt-5">
            {[32, 45, 38, 56, 49, 68, 61, 75, 83, 71, 91, 88, 74, 96, 82, 100, 89, 76, 95, 88, 106, 92, 101, 112, 104, 118, 110, 126, 121, 139].map(
              (n, i) => (
                <div key={i} className="group relative flex-1">
                  <div
                    style={{ height: `${n / 1.55}%` }}
                    className="rounded-t-sm bg-linear-to-t from-teal-500/30 to-cyan-300 transition-all group-hover:from-teal-400 group-hover:to-cyan-200"
                  />
                </div>
              ),
            )}
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-slate-600">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-5">
            <h2 className="text-sm font-semibold">Risk distribution</h2>
            <p className="mt-1 text-xs text-slate-500">Across matched assets</p>
          </div>
          <div
            className="mx-auto flex h-36 w-36 items-center justify-center rounded-full"
            style={{ background: "conic-gradient(#ef4444 0 9%, #f97316 9% 29%, #eab308 29% 58%, #22c55e 58% 100%)" }}
          >
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-card">
              <span className="text-2xl font-semibold">2,847</span>
              <span className="text-[10px] text-slate-500">assets</span>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
            {[
              { label: "Critical", share: "9%", dot: "bg-red-400" },
              { label: "High", share: "20%", dot: "bg-orange-400" },
              { label: "Medium", share: "29%", dot: "bg-yellow-400" },
              { label: "Low", share: "42%", dot: "bg-green-400" },
            ].map(({ label, share, dot }) => (
              <div key={label} className="flex items-center gap-2 text-slate-400">
                <span className={`h-2 w-2 rounded-full ${dot}`} />
                {label}
                <span className="ml-auto text-slate-200">{share}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-700/60 p-5">
            <div>
              <h2 className="text-sm font-semibold">Recent warning activity</h2>
              <p className="mt-1 text-xs text-slate-500">Prioritised by risk and exposure</p>
            </div>
            <Link to="/warnings" className="text-xs font-medium text-teal-400 hover:text-teal-300">
              Open queue →
            </Link>
          </div>
          <div className="divide-y divide-slate-700/40">
            {warnings.slice(0, 4).map((w) => (
              <Link
                key={w.id}
                to="/warnings"
                className="flex w-full items-center gap-4 p-4 text-left hover:bg-slate-800/30"
              >
                <SeverityBadge severity={w.severity} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-medium">{w.title}</div>
                  <div className="mt-1 text-[10px] text-slate-500">
                    {w.cve} · {w.assets} affected assets
                  </div>
                </div>
                <span className="hidden text-[10px] text-slate-500 sm:block">{w.detected}</span>
                <span className="font-mono text-sm font-semibold text-slate-200">{w.score}</span>
              </Link>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-5 flex items-center gap-2">
            <Network className="h-4 w-4 text-cyan-300" />
            <h2 className="text-sm font-semibold">Intelligence source health</h2>
          </div>
          {[
            { name: "CISA KEV", state: "Operational", pct: "99.8%", dot: "bg-green-400" },
            { name: "NVD / NIST", state: "Operational", pct: "98.4%", dot: "bg-green-400" },
            { name: "Mandiant", state: "Degraded", pct: "84.1%", dot: "bg-yellow-400" },
            { name: "Microsoft MSRC", state: "Operational", pct: "100%", dot: "bg-green-400" },
          ].map(({ name, state, pct, dot }) => (
            <div key={name} className="mb-4">
              <div className="mb-2 flex justify-between text-[11px]">
                <span className="text-slate-300">{name}</span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                  {state}
                </span>
              </div>
              <div className="h-1 rounded-full bg-slate-700">
                <div className="h-full rounded-full bg-teal-400" style={{ width: pct }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
