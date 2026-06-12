import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  Building2,
  FileClock,
  PackageCheck,
  ArrowUpRight,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "كون · لوحة التحكم" },
      { name: "description", content: "لوحة تحكم المشرف العام في نظام كون — متابعة التبرعات والمؤسسات والطلبات." },
    ],
  }),
  component: DashboardPage,
});

const stats = [
  {
    label: "إجمالي التبرعات",
    value: 124530,
    icon: <HeartHandshake className="h-5 w-5" />,
    delta: "+12.4%",
    accent: "gold" as const,
    trend: [18, 22, 19, 28, 26, 34, 32, 41, 38, 46, 52, 58],
  },
  {
    label: "المؤسسات النشطة",
    value: 248,
    icon: <Building2 className="h-5 w-5" />,
    delta: "+4.1%",
    accent: "primary" as const,
    trend: [12, 14, 13, 16, 18, 17, 20, 22, 21, 24, 26, 28],
  },
  {
    label: "الطلبات قيد المعالجة",
    value: 1342,
    icon: <FileClock className="h-5 w-5" />,
    delta: "-2.3%",
    accent: "primary" as const,
    trend: [30, 28, 32, 27, 25, 26, 24, 22, 25, 23, 21, 20],
  },
  {
    label: "تم التسليم",
    value: 8732,
    icon: <PackageCheck className="h-5 w-5" />,
    delta: "+18.7%",
    accent: "gold" as const,
    trend: [10, 14, 18, 22, 28, 30, 36, 40, 48, 54, 62, 70],
  },
];

function DashboardPage() {
  return (
    <AppShell>
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="text-sm text-muted-foreground">مرحباً بعودتك 👋</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">لوحة المشرف العام</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            نظرة شاملة على أداء المنصة، التبرعات الواردة، والمؤسسات الفعّالة على مدار اليوم.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_12px_24px_-12px_rgba(15,61,46,0.6)] transition-all hover:scale-105 active:scale-95 dark:bg-gold dark:text-gold-foreground">
          تقرير اليوم
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>

      {/* Placeholder lower section */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border bg-card p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">تطور التبرعات</h2>
            <span className="text-xs text-muted-foreground">آخر 12 شهراً</span>
          </div>
          <div className="mt-6 h-56 rounded-xl border border-dashed border-border bg-muted/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h2 className="text-lg font-bold">أحدث النشاطات</h2>
          <ul className="mt-5 space-y-4">
            {[
              { t: "تبرع جديد بقيمة 5,000 ر.س", s: "قبل دقيقتين", c: "gold" },
              { t: "انضمام مؤسسة الخير", s: "قبل 12 دقيقة", c: "primary" },
              { t: "تم تسليم طلب #4821", s: "قبل ساعة", c: "primary" },
              { t: "طلب جديد قيد المراجعة", s: "قبل 3 ساعات", c: "gold" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${
                    a.c === "gold" ? "bg-gold" : "bg-primary-medium"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{a.t}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.s}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </AppShell>
  );
}
