import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Database, Gauge, Radar, Shield } from "lucide-react";
import type { ReactNode } from "react";

export type Severity = "Critical" | "High" | "Medium" | "Low";

export const warnings = [
  { id: "WRN-2026-041", cve: "CVE-2026-28472", title: "Citrix NetScaler ADC auth bypass", severity: "Critical" as Severity, score: 94, confidence: 98, assets: 12, status: "New", source: "CISA KEV", detected: "18 min ago" },
  { id: "WRN-2026-038", cve: "CVE-2026-21987", title: "Ivanti Connect Secure command injection", severity: "Critical" as Severity, score: 91, confidence: 94, assets: 4, status: "Investigating", source: "Mandiant", detected: "2h ago" },
  { id: "WRN-2026-035", cve: "CVE-2026-1971", title: "Microsoft Exchange privilege escalation", severity: "High" as Severity, score: 78, confidence: 89, assets: 28, status: "Acknowledged", source: "Microsoft MSRC", detected: "5h ago" },
  { id: "WRN-2026-031", cve: "CVE-2025-44228", title: "Apache Tomcat request smuggling", severity: "High" as Severity, score: 71, confidence: 82, assets: 7, status: "Pending approval", source: "NVD", detected: "1d ago" },
  { id: "WRN-2026-029", cve: "CVE-2026-0722", title: "Fortinet FortiOS heap overflow", severity: "Medium" as Severity, score: 56, confidence: 76, assets: 9, status: "Mitigated", source: "FortiGuard", detected: "2d ago" },
];

export const assets = [
  ["AST-00421", "vpn-gateway-01", "Citrix NetScaler ADC", "13.1-51.19", "Production", "Critical", "Internet-facing", "A. Patel"],
  ["AST-00218", "exchange-prd-02", "Microsoft Exchange", "2019 CU14", "Production", "Critical", "Internal", "J. Morrison"],
  ["AST-00604", "ics-vpn-edge", "Ivanti Connect Secure", "22.7R2", "Production", "High", "Internet-facing", "R. Chen"],
  ["AST-00873", "web-prod-14", "Apache Tomcat", "10.1.18", "Production", "High", "Internet-facing", "S. Williams"],
  ["AST-00109", "fortigate-dmz", "FortiOS", "7.4.2", "DMZ", "High", "Internet-facing", "N. Okafor"],
];

export const severityClass: Record<Severity, string> = {
  Critical: "text-red-300 bg-red-400/10 border-red-400/30",
  High: "text-orange-300 bg-orange-400/10 border-orange-400/30",
  Medium: "text-yellow-300 bg-yellow-400/10 border-yellow-400/30",
  Low: "text-green-300 bg-green-400/10 border-green-400/30",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${severityClass[severity]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {severity}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  detail,
  children,
}: {
  icon: LucideIcon;
  title: string;
  detail?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 px-6 py-16 text-center">
      <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700/60 bg-surface">
        <Icon className="h-5 w-5 text-slate-500" />
      </div>
      <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      {detail && <p className="max-w-sm text-xs text-slate-500">{detail}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

export function SectionTitle({
  icon: Icon,
  eyebrow,
  title,
  detail,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  detail?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-400">
          <Icon className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">{title}</h1>
        {detail && <p className="mt-1 text-sm text-slate-400">{detail}</p>}
      </div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-slate-700/60 bg-card ${className}`}>{children}</div>;
}

export function OverviewHeader() {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-400">
          <Gauge className="h-3.5 w-3.5" />
          National cyber early warning
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Good morning, Alex</h1>
        <p className="mt-1 text-sm text-slate-400">Here is your organisation&apos;s current threat posture.</p>
      </div>
      <span className="synthetic-badge">
        <Database className="h-3 w-3" />
        Synthetic data / demonstration
      </span>
    </div>
  );
}

export { AlertTriangle, Radar, Shield };
