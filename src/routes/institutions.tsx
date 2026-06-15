import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  MapPin,
  Building2,
  Phone,
  MoreHorizontal,
  Mail,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import i18n from "@/i18n";

export const Route = createFileRoute("/institutions")({
  head: () => ({
    meta: [
      { title: i18n.t("institutions.meta.title") },
      { name: "description", content: i18n.t("institutions.meta.description") },
    ],
  }),
  component: InstitutionsPage,
});

type InstType = "donor" | "charity" | "both";

interface Branch {
  name: string;
  city: string;
  street: string;
  phone: string;
}

interface Institution {
  id: string;
  name: string;
  initials: string;
  owner: string;
  type: InstType;
  email: string;
  hue: string;
  branches: Branch[];
}

function useTypeMeta() {
  const { t } = useTranslation();
  const meta: Record<InstType, { label: string; className: string; style?: React.CSSProperties }> = {
    donor: {
      label: t("institutions.types.donor"),
      className: "text-[#8a6a10] dark:text-gold",
      style: { backgroundColor: "rgba(242, 201, 76, 0.20)", borderColor: "rgba(242, 201, 76, 0.45)" },
    },
    charity: {
      label: t("institutions.types.charity"),
      className: "text-[#0F3D2E] dark:text-emerald-200",
      style: { backgroundColor: "rgba(30, 90, 70, 0.10)", borderColor: "rgba(30, 90, 70, 0.30)" },
    },
    both: {
      label: t("institutions.types.both"),
      className: "text-[#0F3D2E] dark:text-foreground",
      style: {
        backgroundImage:
          "linear-gradient(135deg, rgba(242,201,76,0.22), rgba(30,90,70,0.14))",
        borderColor: "rgba(15, 61, 46, 0.35)",
      },
    },
  };
  return meta;
}

function TypePill({ type }: { type: InstType }) {
  const meta = useTypeMeta()[type];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${meta.className}`}
      style={meta.style}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {meta.label}
    </span>
  );
}

function Avatar({ initials, hue }: { initials: string; hue: string }) {
  return (
    <span
      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-base font-extrabold text-white shadow-md"
      style={{
        backgroundImage: `linear-gradient(135deg, ${hue}, color-mix(in oklab, ${hue} 60%, #0F3D2E))`,
      }}
    >
      {initials}
    </span>
  );
}

function InstitutionRow({ inst, index }: { inst: Institution; index: number }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-gold/60 hover:shadow-lg"
    >
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-4">
          <Avatar initials={inst.initials} hue={inst.hue} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-bold">{inst.name}</h3>
              <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                {inst.id}
              </span>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="h-3 w-3" /> {inst.email}
            </p>
          </div>
        </div>

        <div className="hidden min-w-[180px] flex-col md:flex">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {t("institutions.ownerLabel")}
          </span>
          <span className="mt-0.5 text-sm font-semibold">{inst.owner}</span>
        </div>

        <div className="hidden min-w-[140px] md:block">
          <TypePill type={inst.type} />
        </div>

        <div className="hidden min-w-[110px] items-center gap-1.5 text-sm text-muted-foreground md:flex">
          <Building2 className="h-4 w-4 text-gold" />
          <span className="font-bold text-foreground">{inst.branches.length}</span>
          <span>{t("common.branch", { count: inst.branches.length })}</span>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <TypePill type={inst.type} />
          <span className="text-xs text-muted-foreground">· {inst.branches.length} {t("common.branch", { count: inst.branches.length })}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label={t("common.options")}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-gold hover:text-foreground md:inline-flex"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-2 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground dark:bg-gold/15 dark:text-gold dark:hover:bg-gold dark:hover:text-gold-foreground"
          >
            <span>{open ? t("institutions.hideBranches") : t("institutions.showBranches")}</span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div
              className="border-t border-dashed border-border px-5 py-5"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, color-mix(in oklab, #1E5A46 5%, transparent), transparent)",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-6 rounded-full bg-gold" />
                  <h4 className="text-sm font-extrabold">{t("institutions.branchesTitle")}</h4>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                    {inst.branches.length}
                  </span>
                </div>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-gold/60 bg-gold/10 px-2.5 py-1 text-[11px] font-bold text-foreground transition-all hover:bg-gold/20">
                  <Plus className="h-3 w-3" /> {t("institutions.addBranch")}
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {inst.branches.map((b, i) => (
                  <motion.div
                    key={b.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative overflow-hidden rounded-xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-y-3 end-0 w-[3px] rounded-full bg-gold opacity-0 transition-opacity group-hover:opacity-100"
                    />
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold">
                          <Building2 className="h-4 w-4" />
                        </span>
                        <div>
                          <h5 className="text-sm font-bold leading-tight">{b.name}</h5>
                          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {b.city}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs">
                      <p className="flex items-start gap-1.5 text-muted-foreground">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold" />
                        <span className="leading-relaxed">{b.street}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-muted-foreground" dir="ltr">
                        <Phone className="h-3.5 w-3.5 flex-shrink-0 text-gold" />
                        <span className="font-semibold tracking-wide">{b.phone}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InstitutionsPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | InstType>("all");
  const institutions = t("institutions.list", { returnObjects: true }) as Institution[];

  const filtered = institutions.filter((i) => {
    const q = query.toLowerCase();
    const matchesQ =
      !query ||
      i.name.toLowerCase().includes(q) ||
      i.owner.toLowerCase().includes(q) ||
      i.email.toLowerCase().includes(q);
    const matchesT = filter === "all" || i.type === filter;
    return matchesQ && matchesT;
  });

  const counts = {
    all: institutions.length,
    donor: institutions.filter((i) => i.type === "donor").length,
    charity: institutions.filter((i) => i.type === "charity").length,
    both: institutions.filter((i) => i.type === "both").length,
  };

  const tabs: { key: "all" | InstType; label: string }[] = [
    { key: "all", label: t("institutions.tabs.all") },
    { key: "donor", label: t("institutions.tabs.donor") },
    { key: "charity", label: t("institutions.tabs.charity") },
    { key: "both", label: t("institutions.tabs.both") },
  ];

  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            {t("institutions.eyebrow")}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            {t("institutions.title")}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {t("institutions.subtitle")}
          </p>
        </div>
        <button className="group inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary-medium active:scale-95 dark:bg-gold dark:text-gold-foreground dark:shadow-gold/20">
          <Plus className="h-4 w-4" />
          {t("institutions.new")}
        </button>
      </div>

      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 start-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("institutions.searchPlaceholder")}
            className="h-11 w-full rounded-xl border border-border bg-background ps-10 pe-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-gold focus:ring-4 focus:ring-gold/15"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-muted/60 p-1">
          {tabs.map((tab) => {
            const active = filter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`relative rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="inst-tab"
                    className="absolute inset-0 rounded-lg bg-card shadow-sm ring-1 ring-gold/40"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  {tab.label}
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                    {counts[tab.key]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-xs font-bold text-muted-foreground transition-all hover:border-gold hover:text-foreground">
          <Filter className="h-3.5 w-3.5" /> {t("institutions.advancedFilter")}
        </button>
      </div>

      <div className="mb-2 hidden grid-cols-[1fr_180px_140px_110px_auto] gap-4 px-5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:grid">
        <span>{t("institutions.columns.institution")}</span>
        <span>{t("institutions.columns.owner")}</span>
        <span>{t("institutions.columns.type")}</span>
        <span>{t("institutions.columns.branches")}</span>
        <span className="text-end">{t("institutions.columns.actions")}</span>
      </div>

      <div className="space-y-3">
        {filtered.map((inst, i) => (
          <InstitutionRow key={inst.id} inst={inst} index={i} />
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-sm text-muted-foreground">
            {t("institutions.empty")}
          </div>
        )}
      </div>
    </AppShell>
  );
}
