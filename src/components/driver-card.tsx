import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Phone, MessageCircle, Star, Truck, BadgeCheck, MapPin, Navigation } from "lucide-react";

export interface DriverInfo {
  name: string;
  phone: string;
  rating: number;
  trips: number;
  vehicle: string;
  plate: string;
  eta: string;
  location: string;
  avatarHue?: number;
}

export function DriverCard({ driver }: { driver: DriverInfo }) {
  const { t, i18n } = useTranslation();
  const loc = i18n.language?.startsWith("ar") ? "ar-EG" : "en-US";
  const hue = driver.avatarHue ?? 152;
  const initials = driver.name.trim().charAt(0);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -end-16 h-48 w-48 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, #F2C94C 55%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -start-12 h-52 w-52 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, #1E5A46 65%, transparent), transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E5A46]/10 px-2.5 py-1 text-[11px] font-bold text-[#0F3D2E] dark:text-gold">
            <Truck className="h-3.5 w-3.5" />
            {t("tracking.driver.badge")}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <div className="relative">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-extrabold text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, hsl(${hue} 55% 32%), hsl(${hue + 20} 60% 22%))`,
              }}
            >
              {initials}
            </div>
            <span className="absolute -bottom-1 -end-1 flex h-6 w-6 items-center justify-center rounded-full bg-card ring-2 ring-card">
              <BadgeCheck className="h-5 w-5 text-[#1E5A46] dark:text-gold" />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-extrabold">{driver.name}</h3>
            <div className="mt-1.5 flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                {driver.rating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                {driver.trips.toLocaleString(loc)} {t("common.trips")}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-border/70 bg-background/40 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-muted-foreground">
                {t("tracking.driver.vehicleLabel")}
              </p>
              <p className="mt-0.5 truncate text-sm font-bold">{driver.vehicle}</p>
            </div>
            <div className="flex-shrink-0 rounded-lg border border-dashed border-gold/50 bg-gold/10 px-3 py-1.5 text-center">
              <p className="text-[10px] font-medium text-muted-foreground">{t("tracking.driver.plateLabel")}</p>
              <p className="font-mono text-sm font-bold tracking-wider text-foreground">
                {driver.plate}
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border/60 pt-3 text-xs">
            <div className="flex items-start gap-1.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#1E5A46] dark:text-gold" />
              <p className="font-semibold">{driver.location}</p>
            </div>
            <div className="flex items-start gap-1.5">
              <Navigation className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#1E5A46] dark:text-gold" />
              <p className="font-semibold">{driver.eta}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E5A46] px-4 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#0F3D2E] active:scale-95">
            <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
            {t("tracking.driver.call")}
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground transition-all hover:scale-[1.02] hover:border-gold active:scale-95">
            <MessageCircle className="h-4 w-4" />
            {t("tracking.driver.chat")}
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] text-muted-foreground" dir="ltr">
          {driver.phone}
        </p>
      </div>
    </motion.aside>
  );
}
