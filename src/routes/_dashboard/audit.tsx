import { createFileRoute } from "@tanstack/react-router";
import { FileWarning } from "lucide-react";

import { Card, SectionTitle } from "@/components/dashboard/data";

export const Route = createFileRoute("/_dashboard/audit")({
  component: Audit,
  head: () => ({
    meta: [
      { title: "Audit & Guardrails — SENTINEL GRID" },
      { name: "description", content: "Append-only evidence trail and model safety controls." },
      { property: "og:title", content: "Audit & Guardrails — SENTINEL GRID" },
      { property: "og:description", content: "Append-only evidence trail and model safety controls." },
    ],
  }),
});

function Audit() {
  return (
    <>
      <SectionTitle
        icon={FileWarning}
        eyebrow="Trust & control"
        title="Audit & Guardrails"
        detail="Append-only evidence trail and model safety controls."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-5 text-sm font-semibold">Guardrail status</h2>
          {[
            ["Invalid CVE / ATT&CK identifiers", "Blocked", "text-green-300"],
            ["Prompt injection attempts", "3 flagged", "text-orange-300"],
            ["Citation validation", "100% valid", "text-green-300"],
            ["LLM availability", "Operational", "text-green-300"],
            ["Source health", "4 / 4 operational", "text-green-300"],
          ].map(([label, state, color]) => (
            <div key={label} className="flex items-center justify-between border-b border-slate-700/40 py-3 text-xs last:border-0">
              <span className="text-slate-300">{label}</span>
              <span className={color}>{state}</span>
            </div>
          ))}
        </Card>
        <Card className="p-5">
          <h2 className="mb-5 text-sm font-semibold">Recent audit events</h2>
          {[
            "Warning WRN-2026-041 created",
            "Asset AST-00421 matched",
            "Threat brief generated",
            "Source provenance verified",
            "Analyst session started",
          ].map((label, i) => (
            <div key={label} className="mb-4 flex gap-3 text-xs">
              <span className="font-mono text-[10px] text-slate-600">10:{42 - i * 6}</span>
              <span className="mt-1 h-2 w-2 rounded-full bg-teal-400" />
              <span className="text-slate-300">
                {label}
                <span className="ml-2 text-slate-600">SIMULATED</span>
              </span>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
