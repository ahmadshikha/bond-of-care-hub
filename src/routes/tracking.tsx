import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Package, Hash, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DeliveryTimeline, type DeliveryStatus } from "@/components/delivery-timeline";
import { DriverCard, type DriverInfo } from "@/components/driver-card";
import i18n from "@/i18n";

export const Route = createFileRoute("/tracking")({
  head: () => ({
    meta: [
      { title: i18n.t("tracking.meta.title") },
      { name: "description", content: i18n.t("tracking.meta.description") },
    ],
  }),
  component: TrackingPage,
});

const STAGE_KEYS: DeliveryStatus[] = ["pending", "picked_up", "in_transit", "delivered"];

const TIMESTAMPS: Partial<Record<DeliveryStatus, string>> = {
  pending: "2026-06-13T09:14:00",
  picked_up: "2026-06-13T11:02:00",
  in_transit: "2026-06-13T11:48:00",
};

function TrackingPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language?.startsWith("ar");
  const Arrow = isRtl ? ArrowRight : ArrowLeft;
  const [current, setCurrent] = useState<DeliveryStatus>("in_transit");

  const driver: DriverInfo = {
    name: t("tracking.driver.name"),
    phone: t("tracking.driver.phone"),
    rating: 4.9,
    trips: 286,
    vehicle: t("tracking.driver.vehicle"),
    plate: t("tracking.driver.plate"),
    eta: t("tracking.driver.eta"),
    location: t("tracking.driver.location"),
  };

  return (
    <AppShell>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <button className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <Arrow className="h-3.5 w-3.5" />
            {t("tracking.back")}
          </button>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {t("tracking.title")}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {t("tracking.subtitle")}
          </p>
        </div>

        <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-card/70 p-1 backdrop-blur-xl">
          {STAGE_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setCurrent(key)}
              className={`relative rounded-xl px-3 py-1.5 text-[11px] font-bold transition-colors ${
                current === key ? "text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {current === key && (
                <motion.span
                  layoutId="stage-pill"
                  className="absolute inset-0 rounded-xl bg-[#1E5A46]"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              <span className="relative">{t(`tracking.stages.${key}`)}</span>
            </button>
          ))}
        </div>
      </div>

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
            <p className="text-[11px] text-muted-foreground">{t("tracking.meta_card.donation")}</p>
            <p className="text-sm font-bold">{t("tracking.meta_card.donationValue")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E5A46]/10 text-[#1E5A46] dark:text-gold">
            <Hash className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] text-muted-foreground">{t("tracking.meta_card.order")}</p>
            <p className="font-mono text-sm font-bold">{t("tracking.meta_card.orderValue")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F3D2E]/10 text-[#0F3D2E] dark:bg-gold/15 dark:text-gold">
            <Calendar className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] text-muted-foreground">{t("tracking.meta_card.requested")}</p>
            <p className="text-sm font-bold">{t("tracking.meta_card.requestedValue")}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-8"
        >
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-lg font-extrabold">
              {t("tracking.stagesTitle")}
            </h2>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              {t("tracking.live")}
            </span>
          </div>
          <DeliveryTimeline current={current} timestamps={TIMESTAMPS} />
        </motion.section>

        <DriverCard driver={driver} />
      </div>
    </AppShell>
  );
}
