// The whole intake lives in sessionStorage. No backend session, nothing stored at rest,
// and it clears when the tab closes.

import type { PresentingCondition, Severity, Tone } from "./screener";

export type CoverageResult = {
  state: string;
  payerName: string;
  payerId: string;
  memberId: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  active: boolean;
  planName: string;
  copay: number | null;
  coinsurance: number | null;
  deductibleRemaining: number | null;
  /** "live" when Stedi answered, "cached" when we fell back. */
  source: "live" | "cached";
  checkedAt: string;
};

export type ScreenerResult = {
  phq9: number[];
  gad7: number[];
  phq9Score: number;
  gad7Score: number;
  phq9Severity: Severity;
  gad7Severity: Severity;
  phq9Tone: Tone;
  gad7Tone: Tone;
  riskFlag: boolean;
  presentingCondition: PresentingCondition;
  completedAt: string;
};

export type Booking = {
  clinicianId: string;
  clinicianName: string;
  credential: string;
  slot: string;
  copay: number | null;
  bookedAt: string;
};

export type Intake = {
  coverage?: CoverageResult;
  screener?: ScreenerResult;
  booking?: Booking;
};

const KEY = "covera.intake";

export function readIntake(): Intake {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Intake;
  } catch {
    return {};
  }
}

export function writeIntake(patch: Partial<Intake>): Intake {
  const next = { ...readIntake(), ...patch };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private-mode or storage-disabled browsers: the demo still walks, it just
    // won't carry state between screens. Never throw here.
  }
  return next;
}

export function clearIntake() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
