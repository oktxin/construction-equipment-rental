import { cn } from "../../../shared/utils/cn";

type AdminStatsCardTone = "accent" | "success" | "warning" | "danger";

const toneClasses: Record<AdminStatsCardTone, string> = {
  accent: "from-primary/22 via-primary/8 to-transparent text-primary",
  success: "from-emerald-400/22 via-emerald-400/8 to-transparent text-emerald-300",
  warning: "from-amber-400/22 via-amber-400/8 to-transparent text-amber-300",
  danger: "from-rose-400/22 via-rose-400/8 to-transparent text-rose-300",
};

export type AdminStatsCardProps = {
  label: string;
  value: string;
  description: string;
  trend?: string;
  tone?: AdminStatsCardTone;
  className?: string;
};

export function AdminStatsCard({
  label,
  value,
  description,
  trend,
  tone = "accent",
  className,
}: AdminStatsCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[28px] border border-white/10 bg-adminSurface p-5 shadow-industrial-dark",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b",
          toneClasses[tone],
        )}
      />
      <div className="relative flex min-h-[168px] flex-col justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/48">
              {label}
            </p>
            {trend ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.72rem] font-semibold text-white/72">
                {trend}
              </span>
            ) : null}
          </div>

          <p className="font-heading text-3xl font-semibold tracking-[-0.05em] text-white sm:text-[2.2rem]">
            {value}
          </p>
        </div>

        <p className="max-w-[26ch] text-sm leading-6 text-white/62">{description}</p>
      </div>
    </div>
  );
}

