import { Outlet } from "@tanstack/react-router";

export function AppShell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-muted">
      <div className="app-frame">{children ?? <Outlet />}</div>
    </div>
  );
}