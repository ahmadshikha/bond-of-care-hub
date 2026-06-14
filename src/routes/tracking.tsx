import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Package, Hash, Calendar, ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DeliveryTimeline, type DeliveryStatus } from "@/components/delivery-timeline";
import { DriverCard, type DriverInfo } from "@/components/driver-card";

export const Route = createFileRoute("/tracking")({
  head: () => ({
    meta: [
      { title: "كون · تتبع التسليم" },
      {
        name: "description",
        content:
          "تتبع حالة التبرع من الاستلام حتى التسليم في الوقت الفعلي · Real-time delivery tracking.",
      },
    ],
  }),
  component: TrackingPage,
});

const STAGES: { key: DeliveryStatus; ar: string; en: string }[] = [
  { key: "pending", ar: "بانتظار الموافقة", en: "Pending" },
  { key: "picked_up", ar: "تم الاستلام", en: "Picked up" },
  { key: "in_transit", ar: "في الطريق", en: "In transit" },
  { key: "delivered", ar: "تم التسليم", en: "Delivered" },
];

const TIMESTAMPS: Partial<Record<DeliveryStatus, string>> = {
  pending: "2026-06-13T09:14:00",
  picked_up: "2026-06-13T11:02:00",
  in_transit: "2026-06-13T11:48:00",
};

const driver: DriverInfo = {
  name: { ar: "خالد المنصور", en: "Khaled Al-Mansour" },
  phone: "+966 55 412 0987",
  rating: 4.9,
  trips: 286,
  vehicle: { ar: "تويوتا هايلوكس · أبيض", en: "Toyota Hilux · White" },
  plate: "ر س ٤ ٢ ٧ ٩",
  eta: { ar: "وصول خلال ١٨ دقيقة", en: "Arriving in 18 min" },
  location: { ar: "حي الملقا، الرياض", en: "Al-Malqa, Riyadh" },
};

function TrackingPage() {
  const [current, setCurrent] = useState<DeliveryStatus>("in_transit");

  return (
    <AppShell>
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <button className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            العودة إلى الطلبات · Back to requests
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight">
            تتبع التسليم
            <span className="ms-3 text-base font-medium text-muted-foreground">Delivery Tracking</span>
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            متابعة حالة الطلب لحظة بلحظة من الاستلام إلى التسليم.
          </p>
        </div>

        {/* Stage simulator */}
        <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-card/70 p-1 backdrop-blur-xl">
          {STAGES.map((s) => (
            <button
              key={s.key}
              onClick={() => setCurrent(s.key)}
              className={`relative rounded-xl px-3 py-1.5 text-[11px] font-bold transition-colors ${
                current === s.key ? "text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {current === s.key && (
                <motion.span
                  layoutId="stage-pill"
                  className="absolute inset-0 rounded-xl bg-[#1E5A46]"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              <span className="relative">{s.ar}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Order meta */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 grid gap-3 rounded-2xl border border-border bg-card p-5 sm:grid-cols-3"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
            <Package className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] text-muted-foreground">التبرع · Donation</p>
            <p className="text-sm font-bold">سلال غذائية رمضانية</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E5A46]/10 text-[#1E5A46] dark:text-gold">
            <Hash className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] text-muted-foreground">رقم الطلب · Order #</p>
            <p className="font-mono text-sm font-bold">REQ-2026-00412</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F3D2E]/10 text-[#0F3D2E] dark:bg-gold/15 dark:text-gold">
            <Calendar className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] text-muted-foreground">تاريخ الطلب · Requested</p>
            <p className="text-sm font-bold">١٣ يونيو ٢٠٢٦</p>
          </div>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Timeline panel */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-8"
        >
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-lg font-extrabold">
              مراحل التسليم
              <span className="ms-2 text-xs font-medium text-muted-foreground">Delivery stages</span>
            </h2>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              حيّ · Live
            </span>
          </div>
          <DeliveryTimeline current={current} timestamps={TIMESTAMPS} />
        </motion.section>

        {/* Driver card */}
        <DriverCard driver={driver} />
      </div>
    </AppShell>
  );
}
