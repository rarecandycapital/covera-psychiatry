# Covera

Insurance-first psychiatry intake. Built at a hackathon.

**Live:** https://covera-psychiatry.vercel.app

Psychiatry has the lowest insurance-acceptance rate of any medical specialty, and
it isn't because psychiatrists are greedy. Verifying benefits, chasing intake forms
and re-documenting a history the patient already gave somebody else costs more per
visit than the network rate pays back, so the rational move is to go cash-pay.
Thousands have.

Covera does that admin work up front, on both sides of the appointment. Patients get
a real eligibility check before they create anything. Clinicians get an intake that
arrives already verified, scored and written up.

## What actually works

The eligibility integration is real. It posts an X12 270 to the Stedi sandbox and
parses the 271 that comes back, pulling the mental-health-specific in-network copay,
coinsurance and remaining deductible out of the payer's own benefit segments. If the
API key is missing or the call fails it falls back to a cached real 271 rather than
dead-ending.

PHQ-9 and GAD-7 are the real instruments with the published severity bands.

**The twelve psychiatrists are made up.** So are their licences, network
participation and appointment slots — see `src/lib/clinicians.ts`, which says so at
the top. No appointment is really booked and no clinician is contacted.

## The one hard rule

Any non-zero answer on PHQ-9 item 9 (thoughts of death or self-harm) ends the intake.
The results view is replaced entirely with crisis resources, and `/match` and
`/confirmation` redirect there too, so you can't get to a booking screen by typing the
URL. There is no render path where a positive risk flag and a booking control coexist.

There is also no prescribing surface anywhere in the product. That's deliberate — it's
the thing that sank most of this category — and it's not coming later.

## Running it

```bash
npm install
npm run dev
```

For live eligibility checks you need a Stedi sandbox key (free, no sales call, at
stedi.com/create-sandbox — generate it in **Test** mode):

```
# .env.local
STEDI_API_KEY=test_xxxxxxxx
```

Without the key everything still runs, the coverage screen just serves the cached
response and labels itself as doing so.

The sandbox only answers for a fixed list of payers and only for the exact test
identities in Stedi's docs, so picking a payer prefills its sandbox member. Aetna
returns the richest data ($30 mental-health copay, $500 deductible remaining).

## Layout

```
src/app/                 five funnel screens + /for-clinicians
src/app/api/eligibility  server-side Stedi call, key never reaches the browser
src/lib/screener.ts      PHQ-9 / GAD-7 items, scoring, severity bands, risk flag
src/lib/eligibility.ts   271 parsing
src/lib/match.ts         rule-based matching, returns its own reasoning
src/lib/clinicians.ts    the fictional seed data
```

No database. The intake lives in `sessionStorage` and dies with the tab — no accounts,
no email, nothing stored at rest.

## Disclaimer

Prototype. Not a medical service, gives no medical advice, diagnoses nothing, books
nothing. If you're in crisis, call or text 988.
