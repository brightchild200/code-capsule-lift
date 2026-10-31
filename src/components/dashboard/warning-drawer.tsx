import { useEffect } from "react";
import { CheckCircle2, ShieldAlert, X, Zap } from "lucide-react";

import { Card, SeverityBadge } from "@/components/dashboard/data";
import { useDashboard } from "@/components/dashboard/dashboard-context";

export function WarningDrawer() {
  const { selected, setSelected, ack, setAck } = useDashboard();

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, setSelected]);

  if (!selected) return null;
  const warning = selected;
  const acknowledged = ack.includes(warning.id);

  const scoreRows = [
    { name: "Severity", label: "S", value: 94, color: "text-red-300" },
    { name: "Exploitation evidence", label: "E", value: 98, color: "text-orange-300" },
    { name: "Exposure", label: "X", value: 91, color: "text-yellow-300" },
    { name: "Signal velocity", label: "V", value: 87, color: "text-cyan-300" },
    { name: "Impact", label: "I", value: 96, color: "text-red-300" },
  ];

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/60" onClick={() => setSelected(null)} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l border-slate-700 bg-surface p-6 shadow-2xl">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-xs text-teal-300">
              <ShieldAlert className="h-4 w-4" />
              {warning.id}
            </div>
            <h2 className="max-w-lg text-xl font-semibold">{warning.title}</h2>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              {warning.cve} · {warning.source} · detected {warning.detected}
            </div>
          </div>
          <button onClick={() => setSelected(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          <SeverityBadge severity={warning.severity} />
          <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
            {warning.confidence}% confidence
          </span>
          <span className="rounded-md border border-slate-700 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            CISA KEV
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
          <Card className="flex flex-col items-center justify-center p-6">
            <div
              className="relative flex h-36 w-36 items-center justify-center rounded-full"
              style={{ background: `conic-gradient(#ef4444 ${warning.score}%, #24344a 0)` }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-card">
                <span className="text-4xl font-bold text-red-300">{warning.score}</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500">risk score</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-red-300">Critical priority</div>
          </Card>
          <Card className="p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Explainable score</h3>
            {scoreRows.map(({ name, label, value, color }) => (
              <div key={name} className="mb-3">
                <div className="mb-1.5 flex justify-between text-[11px]">
                  <span className="text-slate-400">
                    <b className={`mr-2 ${color}`}>{label}</b>
                    {name}
                  </span>
                  <span className="text-slate-200">{value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-700">
                  <div className="h-full rounded-full bg-teal-400" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </Card>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Card className="p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Rules fired</h3>
            {["KEV listing confirmed", "Internet-facing asset match", "Exploit evidence L4 / weaponised", "Critical business service"].map((x) => (
              <div key={x} className="mb-3 flex gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-400" />
                {x}
              </div>
            ))}
          </Card>
          <Card className="p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Lifecycle</h3>
            {["Detected · 18 min ago", "Triaged · Automated", "Matched · 12 assets", "Awaiting human acknowledgement"].map((x, i) => (
              <div key={x} className="mb-3 flex gap-2 text-xs text-slate-400">
                <span className={`mt-1 h-2 w-2 rounded-full ${i < 3 ? "bg-teal-400" : "bg-slate-600"}`} />
                {x}
              </div>
            ))}
          </Card>
        </div>
        <div className="mt-5 rounded-lg border border-orange-400/20 bg-orange-400/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-orange-300">
            <Zap className="h-4 w-4" />
            Recommended remediation
          </div>
          <p className="text-xs leading-5 text-slate-300">
            Apply the vendor security update to affected Citrix NetScaler ADC instances. Restrict management interface
            access until patch verification is complete.
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setAck((a) => [...a, warning.id])}
            disabled={acknowledged}
            className="flex-1 rounded-lg bg-teal-400 px-4 py-3 text-xs font-bold text-on-accent transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {acknowledged ? "Acknowledged" : "Acknowledge warning"}
          </button>
          <button className="rounded-lg border border-slate-700 px-4 py-3 text-xs font-medium text-slate-300 hover:bg-slate-800">
            Create response proposal
          </button>
        </div>
        <div className="mt-4 text-center text-[10px] uppercase tracking-wider text-slate-600">
          All lifecycle actions are logged · Frontend permissions do not replace backend authorisation
        </div>
      </aside>
    </div>
  );
}
