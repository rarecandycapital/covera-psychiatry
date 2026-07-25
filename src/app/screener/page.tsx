"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CrisisInterrupt } from "@/components/CrisisInterrupt";
import { ScoreBar } from "@/components/ScoreBar";
import { writeIntake } from "@/lib/intake";
import {
  GAD7_ITEMS,
  GAD7_PROMPT,
  PHQ9_ITEMS,
  PHQ9_PROMPT,
  PHQ9_RISK_ITEM_INDEX,
  RESPONSE_OPTIONS,
  hasRiskFlag,
  presentingCondition,
  scoreGad7,
  scorePhq9,
} from "@/lib/screener";

type Answers = (number | null)[];

function QuestionGrid({
  items,
  answers,
  onChange,
  namePrefix,
  riskIndex,
}: {
  items: readonly string[];
  answers: Answers;
  onChange: (index: number, value: number) => void;
  namePrefix: string;
  riskIndex?: number;
}) {
  return (
    <ol className="divide-y divide-line">
      {items.map((item, i) => (
        <li key={item} className="py-5 first:pt-0 last:pb-0">
          <div className="flex gap-3">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bg text-[12px] font-semibold text-ink-soft">
              {i + 1}
            </span>
            <p className="text-[15px] leading-relaxed">{item}</p>
          </div>
          <div
            role="radiogroup"
            aria-label={item}
            className="mt-3 grid grid-cols-2 gap-2 pl-9 sm:grid-cols-4"
          >
            {RESPONSE_OPTIONS.map((opt) => {
              const selected = answers[i] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  name={`${namePrefix}-${i}`}
                  onClick={() => onChange(i, opt.value)}
                  className={`rounded-card border px-3 py-2.5 text-left text-[13px] leading-tight transition-colors ${
                    selected
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-surface hover:border-brand/40 hover:bg-brand-soft"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          {riskIndex === i && (answers[i] ?? 0) > 0 && (
            <div className="ml-9 mt-3 rounded-card border border-danger/25 bg-danger-soft px-4 py-3 text-[14px] leading-relaxed text-ink">
              <span className="font-semibold text-danger">
                We hear you, and we&apos;re taking this seriously.
              </span>{" "}
              You can stop and call or text{" "}
              <a
                href="tel:988"
                className="font-semibold text-danger underline underline-offset-2"
              >
                988
              </a>{" "}
              right now. We&apos;ll show you support options instead of
              appointments when you continue.
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function ScreenerPage() {
  const router = useRouter();
  const [phq9, setPhq9] = useState<Answers>(() =>
    Array(PHQ9_ITEMS.length).fill(null),
  );
  const [gad7, setGad7] = useState<Answers>(() =>
    Array(GAD7_ITEMS.length).fill(null),
  );
  const [submitted, setSubmitted] = useState(false);
  const [showIncomplete, setShowIncomplete] = useState(false);

  const answeredCount =
    phq9.filter((a) => a !== null).length + gad7.filter((a) => a !== null).length;
  const totalCount = PHQ9_ITEMS.length + GAD7_ITEMS.length;
  const complete = answeredCount === totalCount;

  const results = useMemo(() => {
    if (!complete) return null;
    const p = phq9 as number[];
    const g = gad7 as number[];
    const phq9Result = scorePhq9(p);
    const gad7Result = scoreGad7(g);
    return {
      phq9Result,
      gad7Result,
      riskFlag: hasRiskFlag(p),
      condition: presentingCondition(phq9Result.score, gad7Result.score),
    };
  }, [complete, phq9, gad7]);

  function handleSubmit() {
    if (!complete || !results) {
      setShowIncomplete(true);
      return;
    }
    writeIntake({
      screener: {
        phq9: phq9 as number[],
        gad7: gad7 as number[],
        phq9Score: results.phq9Result.score,
        gad7Score: results.gad7Result.score,
        phq9Severity: results.phq9Result.severity,
        gad7Severity: results.gad7Result.severity,
        phq9Tone: results.phq9Result.tone,
        gad7Tone: results.gad7Result.tone,
        riskFlag: results.riskFlag,
        presentingCondition: results.condition,
        completedAt: new Date().toISOString(),
      },
    });
    setSubmitted(true);
    window.scrollTo({ top: 0 });
  }

  // The hard stop. When the risk item is positive, the results view is replaced
  // entirely — there is no branch of this render tree that shows a booking control.
  if (submitted && results?.riskFlag) {
    return <CrisisInterrupt />;
  }

  if (submitted && results) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-14">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
          Step 2 of 3 · Complete
        </p>
        <h1 className="font-display mt-3 text-3xl font-semibold">
          Your screening results
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          These are standard scored instruments, not a diagnosis. A clinician
          reviews them with you — we&apos;re showing them to you because you
          answered the questions and they&apos;re yours.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ScoreBar
            label="PHQ-9 · Depression"
            score={results.phq9Result.score}
            max={results.phq9Result.max}
            severity={results.phq9Result.severity}
            tone={results.phq9Result.tone}
          />
          <ScoreBar
            label="GAD-7 · Anxiety"
            score={results.gad7Result.score}
            max={results.gad7Result.max}
            severity={results.gad7Result.severity}
            tone={results.gad7Result.tone}
          />
        </div>

        <div className="mt-4 rounded-card border border-line bg-surface p-6">
          <h2 className="text-base font-semibold">What we&apos;ll match on</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            Presenting concern:{" "}
            <span className="font-semibold text-ink">{results.condition}</span>.
            We use this to filter to clinicians who actually treat it — alongside
            your state licensure and your specific plan.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/match")}
          className="mt-8 w-full rounded-card bg-brand px-7 py-4 text-base font-medium text-white transition-colors hover:bg-brand-hover"
        >
          See psychiatrists who match
        </button>
        <p className="mt-4 text-center text-sm text-ink-faint">
          Screening tools, not a diagnosis. No medication is prescribed through
          Covera.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 pb-32">
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
        Step 2 of 3
      </p>
      <h1 className="font-display mt-3 text-3xl font-semibold">
        Two standard questionnaires
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
        The PHQ-9 and GAD-7 are the same validated screeners a psychiatrist would
        hand you in the waiting room. Answer honestly — there are no wrong
        answers, and nothing here is a diagnosis.
      </p>

      <section className="mt-9 rounded-card border border-line bg-surface p-6 sm:p-7">
        <h2 className="text-lg font-semibold">PHQ-9</h2>
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
          {PHQ9_PROMPT}
        </p>
        <div className="mt-6">
          <QuestionGrid
            items={PHQ9_ITEMS}
            answers={phq9}
            namePrefix="phq9"
            riskIndex={PHQ9_RISK_ITEM_INDEX}
            onChange={(i, v) =>
              setPhq9((prev) => prev.map((a, idx) => (idx === i ? v : a)))
            }
          />
        </div>
      </section>

      <section className="mt-6 rounded-card border border-line bg-surface p-6 sm:p-7">
        <h2 className="text-lg font-semibold">GAD-7</h2>
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
          {GAD7_PROMPT}
        </p>
        <div className="mt-6">
          <QuestionGrid
            items={GAD7_ITEMS}
            answers={gad7}
            namePrefix="gad7"
            onChange={(i, v) =>
              setGad7((prev) => prev.map((a, idx) => (idx === i ? v : a)))
            }
          />
        </div>
      </section>

      {showIncomplete && !complete && (
        <p className="mt-5 rounded-card border border-accent/30 bg-accent-soft px-4 py-3 text-[14px] text-ink">
          Please answer all {totalCount} questions — {totalCount - answeredCount}{" "}
          left.
        </p>
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-bg via-bg to-transparent pt-10">
        <div className="pointer-events-auto mx-auto max-w-2xl px-5 pb-5">
          <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${(answeredCount / totalCount) * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            aria-disabled={!complete}
            className={`w-full rounded-card px-7 py-4 text-base font-medium transition-colors ${
              complete
                ? "bg-brand text-white hover:bg-brand-hover"
                : "bg-line text-ink-faint"
            }`}
          >
            {complete
              ? "See my results"
              : `${answeredCount} of ${totalCount} answered`}
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-ink-faint">
        Feeling unsafe right now?{" "}
        <Link
          href="/crisis"
          className="font-medium text-danger underline underline-offset-4"
        >
          Get help immediately
        </Link>
      </p>
    </div>
  );
}
