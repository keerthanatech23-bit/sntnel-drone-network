import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Bell } from "lucide-react";

export function TopBar({
  title,
  subtitle,
  back = true,
  showBell = false,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  showBell?: boolean;
}) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-md">
      <div className="gov-stripe h-1" />
      <div className="flex items-center gap-3 px-4 py-3.5">
        {back && (
          <button
            onClick={() => router.history.back()}
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent"
          >
            <ArrowLeft className="h-[18px] w-[18px]" />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="truncate text-[15px] font-semibold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>}
        </div>
        {showBell && (
          <Link
            to="/home"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          </Link>
        )}
      </div>
    </header>
  );
}