import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Shield } from "lucide-react";

import { Card, SectionTitle } from "@/components/dashboard/data";

export const Route = createFileRoute("/_dashboard/approvals")({
  component: Approvals,
  head: () => ({
    meta: [
      { title: "Approvals & Response — SENTINEL GRID" },
      {
        name: "description",
        content: "Human-in-the-loop approvals and response proposals requiring analyst and approver review.",
      },
      { property: "og:title", content: "Approvals & Response — SENTINEL GRID" },
      {
        property: "og:description",
        content: "Human-in-the-loop approvals and response proposals requiring analyst and approver review.",
      },
    ],
  }),
});

function Approvals() {
  return (
    <>
      <SectionTitle
        icon={CheckCircle2}
        eyebrow="Human-in-the-loop control"
        title="Approvals & Response"
        detail="Actions requiring analyst acknowledgement and approver review."
      />
      <div className="mb-5 rounded-lg border border-amber-400/20 bg-amber-400/5 p-4 text-xs text-amber-200">
        <div className="flex items-center gap-2 font-semibold">
          <Shield className="h-4 w-4" />
          SIMULATED WORKFLOW
        </div>
        <p className="mt-1 pl-6 text-amber-200/70">
          Actions shown here are demonstrations. Backend authorisation is required for production enforcement.
        </p>
      </div>
      <div className="grid gap-4">
        {[
          ["WRN-2026-031", "Response proposal: patch Apache Tomcat fleet", "Pending approval", "M. Torres · CISO"],
          ["WRN-2026-035", "Confirm exposure and assign remediation owner", "Awaiting analyst", "Alex Kim · SOC Lead"],
          ["WRN-2026-029", "Remediation verification evidence", "Approved", "J. Morrison · Patch Manager"],
        ].map(([id, title, status, owner], i) => (
          <Card key={id} className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center">
            <div>
              <div className="mb-2 font-mono text-xs text-teal-300">{id}</div>
              <h2 className="text-sm font-medium">{title}</h2>
              <div className="mt-2 text-xs text-slate-500">{owner}</div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`rounded-md px-2.5 py-1.5 text-[10px] font-bold ${status === "Approved" ? "bg-green-400/10 text-green-300" : "bg-yellow-400/10 text-yellow-300"}`}
              >
                {status}
              </span>
              {i < 2 && (
                <button className="rounded-lg bg-teal-400 px-3 py-2 text-xs font-semibold text-on-accent">Review</button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
