"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PAYERS, STATES, findPayer } from "@/lib/payers";
import { writeIntake } from "@/lib/intake";

type Result = {
  source: "live" | "cached";
  payerName: string;
  planName: string | null;
  active: boolean;
  insuranceType: string | null;
  copay: number | null;
  coinsurance: number | null;
  deductibleRemaining: number | null;
  evidence: string[];
};

/** YYYYMMDD -> YYYY-MM-DD for the date input. */
function toDateInput(yyyymmdd: string) {
  return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
}

const labelClass = "block text-[13px] font-medium text-ink-soft";
const fieldClass =
  "mt-1.5 w-full rounded-card border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15";

export default function CoveragePage() {
  const router = useRouter();
  const [state, setState] = useState("");
  const [payerId, setPayerId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [memberId, setMemberId] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  function selectPayer(id: string) {
    setPayerId(id);
    const payer = findPayer(id);
    if (!payer) return;
    // Prefill the sandbox test member so the live call actually succeeds.
    setFirstName(payer.testMember.firstName);
    setLastName(payer.testMember.lastName);
    setMemberId(payer.testMember.memberId);
    setDob(toDateInput(payer.testMember.dateOfBirth));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payerId,
          firstName,
          lastName,
          memberId,
          dateOfBirth: dob.replace(/-/g, ""),
        }),
      });
      if (!res.ok) throw new Error("bad response");
      const data: Result = await res.json();
      setResult(data);
      writeIntake({
        coverage: {
          state,
          payerName: data.payerName,
          payerId,
          memberId,
          dateOfBirth: dob,
          firstName,
          lastName,
          active: data.active,
          planName: data.planName ?? "",
          copay: data.copay,
          coinsurance: data.coinsurance,
          deductibleRemaining: data.deductibleRemaining,
          source: data.source,
          checkedAt: new Date().toISOString(),
        },
      });
      window.scrollTo({ top: 0 });
    } catch {
      setError(
        "We couldn't reach the eligibility network just now. Try once more — nothing was submitted.",
      );
    } finally {
      setLoading(false);
    }
  }

  const canSubmit =
    state && payerId && firstName && lastName && memberId && dob && !loading;

  if (result) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-14">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
          Step 1 of 3 · Complete
        </p>

        <div
          className={`mt-4 rounded-card border p-7 ${
            result.active
              ? "border-ok/25 bg-ok-soft"
              : "border-accent/30 bg-accent-soft"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className={`grid h-7 w-7 place-items-center rounded-full text-sm font-bold text-white ${
                result.active ? "bg-ok" : "bg-accent"
              }`}
            >
              {result.active ? "✓" : "!"}
            </span>
            <span
              className={`text-[13px] font-semibold uppercase tracking-[0.12em] ${
                result.active ? "text-ok" : "text-accent"
              }`}
            >
              {result.active ? "Coverage active" : "Coverage not active"}
            </span>
          </div>

          <h1 className="font-display mt-4 text-3xl font-semibold leading-tight">
            {result.active ? (
              result.copay !== null ? (
                <>
                  Your psychiatry visits cost{" "}
                  <span className="text-ok">${result.copay}</span>.
                </>
              ) : (
                <>You&apos;re covered for outpatient mental health.</>
              )
            ) : (
              <>We couldn&apos;t confirm active coverage.</>
            )}
          </h1>

          <p className="mt-3 text-[17px] leading-relaxed text-ink">
            {result.active ? (
              <>
                {result.payerName}
                {result.planName ? ` · ${result.planName}` : ""} — verified in
                real time, before you gave us an email address.
              </>
            ) : (
              <>
                {result.payerName} didn&apos;t return active benefits for this
                member. That usually means the policy lapsed or the details
                don&apos;t match their records.
              </>
            )}
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-card border border-line bg-surface p-5">
            <p className="text-[13px] text-ink-soft">Copay per visit</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {result.copay !== null ? `$${result.copay}` : "—"}
            </p>
          </div>
          <div className="rounded-card border border-line bg-surface p-5">
            <p className="text-[13px] text-ink-soft">Coinsurance</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {result.coinsurance !== null ? `${result.coinsurance}%` : "—"}
            </p>
          </div>
          <div className="rounded-card border border-line bg-surface p-5">
            <p className="text-[13px] text-ink-soft">Deductible left</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {result.deductibleRemaining !== null
                ? `$${result.deductibleRemaining}`
                : "—"}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-card border border-line bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold">How we read your benefits</h2>
            <span
              className={`rounded-card px-2.5 py-1 text-[12px] font-semibold ${
                result.source === "live"
                  ? "bg-brand-soft text-brand"
                  : "bg-accent-soft text-accent"
              }`}
            >
              {result.source === "live"
                ? "Live X12 270/271 via Stedi"
                : "Cached sandbox response"}
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {result.evidence.map((line) => (
              <li
                key={line}
                className="flex gap-2.5 text-[15px] leading-relaxed text-ink-soft"
              >
                <span aria-hidden className="text-brand">
                  ·
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>

        {result.active ? (
          <button
            type="button"
            onClick={() => router.push("/screener")}
            className="mt-8 w-full rounded-card bg-brand px-7 py-4 text-base font-medium text-white transition-colors hover:bg-brand-hover"
          >
            Continue to screening
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setResult(null)}
            className="mt-8 w-full rounded-card border border-line bg-surface px-7 py-4 text-base font-medium transition-colors hover:bg-brand-soft"
          >
            Check a different plan
          </button>
        )}

        <p className="mt-4 text-center text-sm text-ink-faint">
          Estimates from your payer&apos;s benefit response. Not a guarantee of
          payment — and in this prototype, nothing is billed.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
        Step 1 of 3
      </p>
      <h1 className="font-display mt-3 text-3xl font-semibold">
        Let&apos;s check your insurance first
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
        No account, no email. We run a real eligibility check against your payer
        and tell you what a visit costs before you answer a single clinical
        question.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-9 rounded-card border border-line bg-surface p-6 sm:p-7"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="state">
              What state are you in?
            </label>
            <select
              id="state"
              className={fieldClass}
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Select a state</option>
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-[13px] text-ink-faint">
              Psychiatrists can only treat you where they hold a license.
            </p>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="payer">
              Who is your insurance with?
            </label>
            <select
              id="payer"
              className={fieldClass}
              value={payerId}
              onChange={(e) => selectPayer(e.target.value)}
              required
            >
              <option value="">Select a payer</option>
              {PAYERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {payerId && (
              <p className="mt-1.5 text-[13px] text-ink-faint">
                Prefilled with this payer&apos;s Stedi sandbox test member so the
                live eligibility call returns real benefit data.
              </p>
            )}
          </div>

          <div>
            <label className={labelClass} htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              className={fieldClass}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              className={fieldClass}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="memberId">
              Member ID
            </label>
            <input
              id="memberId"
              className={fieldClass}
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="dob">
              Date of birth
            </label>
            <input
              id="dob"
              type="date"
              className={fieldClass}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
        </div>

        {error && (
          <p className="mt-5 rounded-card border border-accent/30 bg-accent-soft px-4 py-3 text-[14px] text-ink">
            {error}
          </p>
        )}

        <button
          type="submit"
          aria-disabled={!canSubmit}
          className={`mt-7 w-full rounded-card px-7 py-4 text-base font-medium transition-colors ${
            canSubmit
              ? "bg-brand text-white hover:bg-brand-hover"
              : "bg-line text-ink-faint"
          }`}
        >
          {loading ? "Checking with your payer…" : "Check my coverage"}
        </button>
        <p className="mt-3 text-center text-[13px] text-ink-faint">
          Sent server-side to Stedi as an X12 270 eligibility request.
        </p>
      </form>
    </div>
  );
}
