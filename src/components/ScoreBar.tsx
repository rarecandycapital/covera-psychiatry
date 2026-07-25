import type { Severity, Tone } from "@/lib/screener";

const toneClasses: Record<Tone, { bar: string; chip: string }> = {
  ok: { bar: "bg-ok", chip: "bg-ok-soft text-ok" },
  accent: { bar: "bg-accent", chip: "bg-accent-soft text-accent" },
  danger: { bar: "bg-danger", chip: "bg-danger-soft text-danger" },
};

export function ScoreBar({
  label,
  score,
  max,
  severity,
  tone,
}: {
  label: string;
  score: number;
  max: number;
  severity: Severity;
  tone: Tone;
}) {
  const t = toneClasses[tone];
  return (
    <div className="rounded-card border border-line bg-surface p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-semibold">{label}</h3>
        <span
          className={`rounded-card px-3 py-1 text-[13px] font-semibold ${t.chip}`}
        >
          {severity}
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold tabular-nums">
        {score}
        <span className="text-lg font-normal text-ink-faint"> / {max}</span>
      </p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-bg">
        <div
          className={`h-full rounded-full ${t.bar}`}
          style={{ width: `${Math.max(2, (score / max) * 100)}%` }}
        />
      </div>
    </div>
  );
}
