import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Building2,
  HeartHandshake,
  PackageCheck,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { KawnLogo } from "./kawn-logo";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { to: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { to: "/donations", label: "التبرعات", icon: HeartHandshake },
  { to: "/institutions", label: "المؤسسات", icon: Building2 },
  { to: "/beneficiaries", label: "المستفيدون", icon: Users },
  { to: "/requests", label: "الطلبات", icon: FileText },
  { to: "/delivered", label: "المُسلَّمة", icon: PackageCheck },
  { to: "/settings", label: "الإعدادات", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      {/* Ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(at 90% 10%, color-mix(in oklab, #F2C94C 12%, transparent), transparent 50%), radial-gradient(at 10% 90%, color-mix(in oklab, #1E5A46 14%, transparent), transparent 55%)",
        }}
      />

      <div className="flex min-h-screen w-full">
        {/* SIDEBAR */}
        <motion.aside
          animate={{ width: collapsed ? 84 : 272 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="sticky top-0 z-20 hidden h-screen flex-shrink-0 lg:block"
        >
          <div className="flex h-full flex-col border-s border-border bg-card/70 backdrop-blur-xl">
            {/* Brand */}
            <div className="flex h-20 items-center gap-3 px-5">
              <KawnLogo size={36} />
              {!collapsed && (
                <div className="overflow-hidden">
                  <h1 className="text-lg font-extrabold leading-none">كون</h1>
                  <p className="mt-1 text-[10px] text-muted-foreground">لوحة المشرف</p>
                </div>
              )}
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1 px-3">
              {nav.map((item) => {
                const active = pathname === item.to || pathname.startsWith(item.to + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                    style={
                      active
                        ? {
                            backgroundImage:
                              "linear-gradient(to left, color-mix(in oklab, #1E5A46 22%, transparent), transparent)",
                          }
                        : undefined
                    }
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-y-1.5 end-0 w-[3px] rounded-full bg-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Icon
                      className={`h-5 w-5 flex-shrink-0 ${active ? "text-gold" : ""}`}
                      strokeWidth={active ? 2.4 : 2}
                    />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </nav>

            {/* Collapse + logout */}
            <div className="space-y-1 border-t border-border p-3">
              <button
                onClick={() => setCollapsed((c) => !c)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground"
              >
                <ChevronRight
                  className={`h-5 w-5 transition-transform ${collapsed ? "" : "rotate-180"}`}
                />
                {!collapsed && <span>طيّ القائمة</span>}
              </button>
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-destructive transition-all hover:bg-destructive/10">
                <LogOut className="h-5 w-5" />
                {!collapsed && <span>تسجيل الخروج</span>}
              </button>
            </div>
          </div>
        </motion.aside>

        {/* MAIN */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* HEADER */}
          <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b border-border bg-background/70 px-6 backdrop-blur-xl">
            {/* Search */}
            <div className="relative hidden max-w-md flex-1 md:block">
              <Search className="pointer-events-none absolute top-1/2 start-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="ابحث عن متبرع، مؤسسة أو طلب…"
                className="h-11 w-full rounded-xl border border-border bg-card ps-10 pe-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-gold focus:ring-4 focus:ring-gold/15"
              />
            </div>

            <div className="ms-auto flex items-center gap-2">
              {/* Notifications */}
              <button
                aria-label="الإشعارات"
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-all hover:scale-105 hover:border-gold active:scale-95"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-2 end-2 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-card" />
                </span>
              </button>

              <ThemeToggle />

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-3 rounded-full border border-border bg-card py-1 ps-1 pe-3 transition-all hover:border-gold"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground dark:bg-gold dark:text-gold-foreground">
                    ع
                  </span>
                  <span className="hidden text-sm font-semibold sm:block">عبدالله</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute end-0 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-popover shadow-xl"
                  >
                    <div className="border-b border-border p-4">
                      <p className="text-sm font-bold">عبدالله الراشد</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">مشرف عام</p>
                    </div>
                    <div className="p-2 text-sm">
                      <a className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted" href="#">
                        <Users className="h-4 w-4" /> الملف الشخصي
                      </a>
                      <a className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted" href="#">
                        <Settings className="h-4 w-4" /> الإعدادات
                      </a>
                      <a
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-destructive hover:bg-destructive/10"
                        href="/auth"
                      >
                        <LogOut className="h-4 w-4" /> تسجيل الخروج
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
