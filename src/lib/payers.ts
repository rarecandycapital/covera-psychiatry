// Stedi's sandbox only answers for a fixed set of payers, and only for the exact test
// identities published in their docs — any other name, DOB, or member ID returns an
// error. So the payer picker is constrained to that list, and choosing a payer prefills
// its sandbox test member. This keeps the *live* API call real during the demo instead of
// silently falling back.
//
// Values verified against https://www.stedi.com/docs/healthcare/api-reference/mock-requests-eligibility-checks

export type Payer = {
  id: string;
  /** Stedi's tradingPartnerServiceId. */
  tradingPartnerServiceId: string;
  name: string;
  /** Plan label we show in the UI when the payer response doesn't name one. */
  planName: string;
  /** Stedi sandbox test member — not a real person. */
  testMember: {
    firstName: string;
    lastName: string;
    /** YYYYMMDD, as Stedi expects it. */
    dateOfBirth: string;
    memberId: string;
  };
};

export const PAYERS: Payer[] = [
  {
    id: "aetna",
    tradingPartnerServiceId: "60054",
    name: "Aetna",
    planName: "Aetna Choice POS II",
    testMember: {
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: "20040404",
      memberId: "AETNA12345",
    },
  },
  {
    id: "uhc",
    tradingPartnerServiceId: "87726",
    name: "UnitedHealthcare",
    planName: "UHC Choice Plus",
    testMember: {
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: "19710101",
      memberId: "UHC123456",
    },
  },
  {
    id: "cigna",
    tradingPartnerServiceId: "62308",
    name: "Cigna",
    planName: "Cigna Open Access Plus",
    testMember: {
      firstName: "James",
      lastName: "Jones",
      dateOfBirth: "19910202",
      memberId: "23456789100",
    },
  },
  {
    id: "humana",
    tradingPartnerServiceId: "61101",
    name: "Humana",
    planName: "Humana ChoiceCare PPO",
    testMember: {
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: "19750505",
      memberId: "HUMANA123",
    },
  },
  {
    id: "kaiser",
    tradingPartnerServiceId: "KSRCN",
    name: "Kaiser Permanente (N. California)",
    planName: "Kaiser Permanente HMO",
    testMember: {
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: "20020202",
      memberId: "KAISER123456",
    },
  },
  {
    id: "ambetter",
    tradingPartnerServiceId: "68069",
    name: "Ambetter",
    planName: "Ambetter Balanced Care",
    testMember: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "19940404",
      memberId: "AMBETTER123",
    },
  },
  {
    id: "cms",
    tradingPartnerServiceId: "CMS",
    name: "Medicare (CMS)",
    planName: "Medicare Part B",
    testMember: {
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: "19550505",
      memberId: "CMS12345678",
    },
  },
  {
    // Same payer, a member ID Stedi answers as terminated coverage. Kept so the
    // "we couldn't verify active coverage" branch can be shown against a real response.
    id: "uhc-inactive",
    tradingPartnerServiceId: "87726",
    name: "UnitedHealthcare (lapsed policy — demo)",
    planName: "UHC Choice Plus",
    testMember: {
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: "19710101",
      memberId: "UHCINACTIVE",
    },
  },
];

export function findPayer(id: string): Payer | undefined {
  return PAYERS.find((p) => p.id === id);
}

/** The six states our (fictional) clinician network covers. */
export const STATES = [
  { code: "CA", name: "California" },
  { code: "NY", name: "New York" },
  { code: "TX", name: "Texas" },
  { code: "FL", name: "Florida" },
  { code: "IL", name: "Illinois" },
  { code: "WA", name: "Washington" },
] as const;
