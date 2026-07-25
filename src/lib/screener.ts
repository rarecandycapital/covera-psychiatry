// PHQ-9 and GAD-7 are public-domain screening instruments developed by Drs. Robert L.
// Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant
// from Pfizer Inc. Item wording and scoring below follow the standard published forms.
//
// These are screening tools. They are not diagnostic, and Covera is a prototype that
// provides no medical advice.

export const RESPONSE_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
] as const;

export const PHQ9_PROMPT =
  "Over the last 2 weeks, how often have you been bothered by any of the following problems?";

export const PHQ9_ITEMS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed — or the opposite, being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself in some way",
] as const;

/** Zero-based index of the PHQ-9 self-harm item. Any score above 0 here stops the funnel. */
export const PHQ9_RISK_ITEM_INDEX = 8;

export const GAD7_PROMPT =
  "Over the last 2 weeks, how often have you been bothered by the following problems?";

export const GAD7_ITEMS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
] as const;

export type Severity =
  | "Minimal"
  | "Mild"
  | "Moderate"
  | "Moderately severe"
  | "Severe";

export type Tone = "ok" | "accent" | "danger";

export type Band = {
  severity: Severity;
  tone: Tone;
  /** Inclusive score range for this band. */
  range: [number, number];
};

const PHQ9_BANDS: Band[] = [
  { severity: "Minimal", tone: "ok", range: [0, 4] },
  { severity: "Mild", tone: "ok", range: [5, 9] },
  { severity: "Moderate", tone: "accent", range: [10, 14] },
  { severity: "Moderately severe", tone: "danger", range: [15, 19] },
  { severity: "Severe", tone: "danger", range: [20, 27] },
];

const GAD7_BANDS: Band[] = [
  { severity: "Minimal", tone: "ok", range: [0, 4] },
  { severity: "Mild", tone: "ok", range: [5, 9] },
  { severity: "Moderate", tone: "accent", range: [10, 14] },
  { severity: "Severe", tone: "danger", range: [15, 21] },
];

function bandFor(bands: Band[], score: number): Band {
  return bands.find((b) => score >= b.range[0] && score <= b.range[1]) ?? bands[0];
}

export const PHQ9_MAX = 27;
export const GAD7_MAX = 21;

export function scorePhq9(answers: number[]) {
  const score = answers.reduce((sum, n) => sum + n, 0);
  return { score, max: PHQ9_MAX, ...bandFor(PHQ9_BANDS, score) };
}

export function scoreGad7(answers: number[]) {
  const score = answers.reduce((sum, n) => sum + n, 0);
  return { score, max: GAD7_MAX, ...bandFor(GAD7_BANDS, score) };
}

/**
 * The hard safety rule: any non-zero response to PHQ-9 item 9 (thoughts of death or
 * self-harm) ends the intake. Downstream screens must check this before rendering
 * anything bookable.
 */
export function hasRiskFlag(phq9Answers: number[]): boolean {
  return (phq9Answers[PHQ9_RISK_ITEM_INDEX] ?? 0) > 0;
}

/** Which presenting condition to match clinicians against. */
export type PresentingCondition = "Depression" | "Anxiety" | "Depression + anxiety";

export function presentingCondition(
  phq9Score: number,
  gad7Score: number,
): PresentingCondition {
  const depression = phq9Score >= 10;
  const anxiety = gad7Score >= 10;
  if (depression && anxiety) return "Depression + anxiety";
  if (anxiety) return "Anxiety";
  if (depression) return "Depression";
  // Sub-threshold on both: lean toward whichever is proportionally higher.
  return gad7Score / GAD7_MAX > phq9Score / PHQ9_MAX ? "Anxiety" : "Depression";
}
