import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Clock, PackageOpen, Truck, PackageCheck, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type DeliveryStatus = "pending" | "picked_up" | "in_transit" | "delivered";

const ORDER: DeliveryStatus[] = ["pending", "picked_up", "in_transit", "delivered"];

const STEP_ICONS: Record<DeliveryStatus, LucideIcon> = {
  pending: Clock,
  picked_up: PackageOpen,
  in_transit: Truck,
  delivered: PackageCheck,
};

interface Props {
  current: DeliveryStatus;
  timestamps?: Partial<Record<DeliveryStatus, string>>;
}

export function DeliveryTimeline({ current, timestamps = {} }: Props) {
  const { t, i18n } = useTranslation();
  const currentIdx = ORDER.indexOf(current);
  const loc = i18n.language?.startsWith("ar") ? "ar-EG" : "en-US";

  const fmt = (iso?: string) => {
    if (!iso) return "";
    try {
      return new Intl.DateTimeFormat(loc, {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <div className="relative">
      <ol className="relative space-y-2">
        {ORDER.map((key, i) => {
          const status: "done" | "active" | "todo" =
            i < currentIdx ? "done" : i === currentIdx ? "active" : "todo";
          const Icon = STEP_ICONS[key];
          const ts = timestamps[key];
          const isLast = i === ORDER.length - 1;

          return (
            <li key={key} className="relative grid grid-cols-[56px_1fr] gap-4">
              <div className="relative flex flex-col items-center">
                {!isLast && (
                  <div className="absolute top-14 bottom-[-8px] start-1/2 -translate-x-1/2 w-[2px]">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to bottom, color-mix(in oklab, #636363 35%, transparent) 0 6px, transparent 6px 12px)",
                      }}
                    />
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: status === "done" ? 1 : 0 }}
                      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 + i * 0.15 }}
                      style={{ originY: 0, backgroundColor: "#1E5A46" }}
                      className="absolute inset-0 rounded-full"
                    />
                  </div>
                )}

                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.12, type: "spring", stiffness: 260, damping: 22 }}
                  className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border transition-all ${
                    status === "done"
                      ? "border-transparent bg-[#1E5A46] text-white"
                      : status === "active"
                        ? "border-[#1E5A46]/40 bg-card text-[#1E5A46] dark:text-gold"
                        : "border-border bg-card text-muted-foreground"
                  }`}
                  style={
                    status === "active"
                      ? { boxShadow: "0 0 10px #1E5A46, 0 0 24px color-mix(in oklab, #1E5A46 45%, transparent)" }
                      : undefined
                  }
                >
                  {status === "active" && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border-2 border-[#1E5A46]"
                      animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                  {status === "done" ? <Check className="h-6 w-6" strokeWidth={2.6} /> : <Icon className="h-5 w-5" />}
                </motion.div>
              </div>

              <div className="min-h-[56px] pt-1 pb-8">
                <h3
                  className={`text-base font-bold ${
                    status === "todo" ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {t(`tracking.stages.${key}`)}
                </h3>
                {ts ? (
                  <p className="mt-1 text-xs font-medium" style={{ color: "#636363" }}>
                    {fmt(ts)}
                  </p>
                ) : status === "active" ? (
                  <p className="mt-1 text-xs font-medium text-[#1E5A46] dark:text-gold">
                    {t("tracking.inProgress")}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground/60">— — —</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
