import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import type { warnings } from "@/components/dashboard/data";

export type WarningRow = (typeof warnings)[number];

type DashboardContextValue = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  ack: string[];
  setAck: Dispatch<SetStateAction<string[]>>;
  selected: WarningRow | null;
  setSelected: Dispatch<SetStateAction<WarningRow | null>>;
  theme: "dark" | "light";
  toggleTheme: () => void;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [ack, setAck] = useState<string[]>([]);
  const [selected, setSelected] = useState<WarningRow | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <DashboardContext.Provider
      value={{
        query,
        setQuery,
        ack,
        setAck,
        selected,
        setSelected,
        theme,
        toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
        collapsed,
        setCollapsed,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const value = useContext(DashboardContext);
  if (!value) throw new Error("useDashboard must be used within DashboardProvider");
  return value;
}
