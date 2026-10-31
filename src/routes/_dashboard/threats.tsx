import { createFileRoute } from "@tanstack/react-router";
import { CircleHelp, ShieldAlert } from "lucide-react";

import { Card, SeverityBadge, SectionTitle, warnings } from "@/components/dashboard/data";

export const Route = createFileRoute("/_dashboard/threats")({
  component: ThreatIntelligence,
  head: () => ({
    meta: [
      { title: "Threat Intelligence — SENTINEL GRID" },
      {
        name: "description",
        content:
          "Threats discovered in the last 7 days with preserved provenance from CISA KEV, NVD, Mandiant and Microsoft MSRC.",
      },
      { property: "og:title", content: "Threat Intelligence — SENTINEL GRID" },
      {
        property: "og:description",
        content:
          "Threats discovered in the last 7 days with preserved provenance from CISA KEV, NVD, Mandiant and Microsoft MSRC.",
      },
    ],
  }),
});

function ThreatIntelligence() {
  return (
    <>
      <SectionTitle
        icon={ShieldAlert}
        eyebrow="Signal collection"
        title="Threat Intelligence"
        detail="184 threats discovered in the last 7 days · provenance preserved"
      />
      <div className="mb-5 rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4 text-xs text-slate-300">
        <div className="flex items-center gap-2 font-semibold text-cyan-300">
          <CircleHelp className="h-4 w-4" />
          Matching policy
        </div>
        <p className="mt-1 pl-6 text-slate-400">
          Unmatched threats remain INFORMATION ONLY and never appear in the organisation warning queue.
        </p>
      </div>
      <div className="grid gap-4">
        {warnings.map((w) => (
          <Card key={w.id} className="p-5">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="flex min-w-0 items-start gap-4">
                <div className="rounded-lg border border-red-400/20 bg-red-400/10 p-2.5">
                  <ShieldAlert className="h-5 w-5 text-red-300" />
                </div>
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-semibold">{w.title}</h2>
                    <SeverityBadge severity={w.severity} />
                  </div>
                  <div className="font-mono text-xs text-teal-300">{w.cve}</div>
                  <div className="mt-2 text-xs text-slate-500">
                    Source: {w.source} · Collected {w.detected} · KEV status:{" "}
                    <span className="text-orange-300">Confirmed</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-center">
                <div>
                  <div className="text-lg font-semibold text-slate-100">9.8</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">CVSS</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-orange-300">0.94</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">EPSS</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-red-300">L4</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Evidence</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
