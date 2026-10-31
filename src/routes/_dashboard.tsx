import { useEffect } from "react";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileWarning,
  LayoutDashboard,
  Menu,
  Moon,
  Radar,
  Search,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  Sun,
  type LucideIcon,
} from "lucide-react";

import { DashboardProvider, useDashboard } from "@/components/dashboard/dashboard-context";
import { WarningDrawer } from "@/components/dashboard/warning-drawer";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayout,
});

const NAV: { label: string; icon: LucideIcon; to: "/" | "/threats" | "/warnings" | "/assets" | "/exposure" | "/approvals" | "/audit" | "/settings" }[] = [
  { label: "Overview", icon: LayoutDashboard, to: "/" },
  { label: "Threat Intelligence", icon: Radar, to: "/threats" },
  { label: "Warning Centre", icon: AlertTriangle, to: "/warnings" },
  { label: "Asset Inventory", icon: Server, to: "/assets" },
  { label: "Exposure Management", icon: ShieldCheck, to: "/exposure" },
  { label: "Approvals & Response", icon: CheckCircle2, to: "/approvals" },
  { label: "Audit & Guardrails", icon: FileWarning, to: "/audit" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

function DashboardLayout() {
  return (
    <DashboardProvider>
      <DashboardChrome />
    </DashboardProvider>
  );
}

function DashboardChrome() {
  const { theme, toggleTheme, collapsed, setCollapsed, query, setQuery, selected, mobileOpen, setMobileOpen } =
    useDashboard();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = NAV.find((n) => n.to === pathname) ?? { label: "Overview", icon: LayoutDashboard, to: "/" as const };

  useEffect(() => {
    document.body.style.overflow = selected || mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected, mobileOpen]);

  return (
    <div className={`${theme === "light" ? "light-theme" : ""} min-h-screen bg-background text-slate-100 selection:bg-teal-400/30`}>
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-[248px] flex-col border-r border-slate-800/80 bg-surface transition-all lg:w-auto ${collapsed ? "lg:w-[76px]" : "lg:w-[248px]"} ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex h-[72px] items-center border-b border-slate-800/80 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-400 text-on-accent">
            <Shield className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <div className="text-sm font-bold tracking-[0.16em] text-slate-100">SENTINEL</div>
              <div className="text-[9px] font-semibold tracking-[0.28em] text-teal-400">GRID / SOC</div>
            </div>
          )}
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map(({ label, icon: Icon, to }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={label}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-xs font-medium transition ${active ? "bg-teal-400/10 text-teal-300" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"}`}
                title={collapsed ? label : undefined}
              >
                <Icon className="h-[17px] w-[17px] shrink-0" />
                {!collapsed && <span>{label}</span>}
                {!collapsed && label === "Warning Centre" && (
                  <span className="ml-auto rounded bg-red-400/15 px-1.5 py-0.5 text-[9px] font-bold text-red-300">4</span>
                )}
              </Link>
            );
          })}
        </nav>
        {!collapsed && (
          <div className="m-3 rounded-lg border border-teal-400/20 bg-teal-400/5 p-3">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-teal-300">
              <Activity className="h-3.5 w-3.5" />
              System health
            </div>
            <div className="mb-2 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">All systems operational</span>
              <span className="h-2 w-2 rounded-full bg-green-400" />
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-slate-700">
              <div className="h-full w-[96%] bg-teal-400" />
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="m-3 hidden items-center justify-center rounded-lg border border-slate-700 p-2 text-slate-500 hover:text-slate-200 lg:flex"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className={`min-h-screen transition-all ${collapsed ? "lg:pl-[76px]" : "lg:pl-[248px]"}`}>
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-800/80 bg-background/95 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
              <span>Operations</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-200">{current.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-700 bg-card px-3 py-2 md:flex">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search threats, assets, CVEs"
                className="w-52 bg-transparent text-xs outline-none placeholder:text-slate-600"
              />
            </div>
            <button
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
            >
              <span className="sr-only">Switch theme</span>
              {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </button>
            <button aria-label="Open notifications" className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-800">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-400" />
            </button>
            <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 text-xs font-bold text-cyan-300">AK</div>
              <div className="hidden text-right sm:block">
                <div className="text-xs font-medium">Alex Kim</div>
                <div className="text-[10px] text-slate-500">SOC Lead</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1600px] p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
      {selected && <WarningDrawer />}
    </div>
  );
}
