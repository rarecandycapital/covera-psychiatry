// FICTIONAL DATA. These twelve psychiatrists do not exist. Names, credentials, license
// states, network participation, and appointment slots are all invented for a hackathon
// prototype. Nothing here represents a real provider or a real network contract.

export type Clinician = {
  id: string;
  name: string;
  credential: "MD" | "DO";
  /** Two-letter state codes where this (fictional) clinician holds a license. */
  licensedIn: string[];
  /** Payer ids from src/lib/payers.ts that this clinician is in-network with. */
  acceptedPayers: string[];
  conditions: string[];
  yearsInPractice: number;
  bio: string;
  /** Human-readable upcoming slots, soonest first. */
  slots: string[];
};

export const CLINICIANS: Clinician[] = [
  {
    id: "okonkwo",
    name: "Adaeze Okonkwo",
    credential: "MD",
    licensedIn: ["CA", "WA"],
    acceptedPayers: ["aetna", "kaiser", "cigna"],
    conditions: ["Depression", "Anxiety", "Depression + anxiety"],
    yearsInPractice: 11,
    bio: "Adaeze trained at UCSF and spent six years in a county outpatient clinic before moving to telepsychiatry. She works mostly with adults managing depression alongside a demanding job.",
    slots: ["Tomorrow, 8:30 AM PT", "Thursday, 4:00 PM PT", "Friday, 11:15 AM PT"],
  },
  {
    id: "brennan",
    name: "Michael Brennan",
    credential: "DO",
    licensedIn: ["CA", "TX"],
    acceptedPayers: ["aetna", "uhc", "uhc-inactive", "ambetter"],
    conditions: ["Anxiety", "Depression + anxiety"],
    yearsInPractice: 7,
    bio: "Michael came to psychiatry after five years in emergency medicine, which shaped how he handles acute anxiety. He is direct, practical, and unusually good with first-time patients.",
    slots: ["Tomorrow, 1:00 PM PT", "Wednesday, 9:45 AM PT", "Monday, 3:30 PM PT"],
  },
  {
    id: "rios",
    name: "Valeria Ríos",
    credential: "MD",
    licensedIn: ["CA", "NY", "FL"],
    acceptedPayers: ["cigna", "humana", "aetna"],
    conditions: ["Depression", "Depression + anxiety"],
    yearsInPractice: 15,
    bio: "Valeria has run a bilingual outpatient practice for over a decade and sees patients in English and Spanish. Much of her work is with people navigating depression after a major life change.",
    slots: ["Thursday, 10:00 AM ET", "Friday, 2:15 PM ET", "Tuesday, 8:00 AM ET"],
  },
  {
    id: "hartley",
    name: "Simone Hartley",
    credential: "MD",
    licensedIn: ["NY", "IL"],
    acceptedPayers: ["aetna", "cigna", "uhc", "uhc-inactive"],
    conditions: ["Anxiety", "Depression", "Depression + anxiety"],
    yearsInPractice: 9,
    bio: "Simone splits her week between a hospital consult service and outpatient care. She is known for spending the full hour on a first visit rather than the scheduled forty minutes.",
    slots: ["Tomorrow, 7:45 AM ET", "Wednesday, 5:30 PM ET", "Thursday, 12:00 PM ET"],
  },
  {
    id: "adeyemi",
    name: "Tunde Adeyemi",
    credential: "DO",
    licensedIn: ["TX", "FL"],
    acceptedPayers: ["humana", "ambetter", "uhc", "uhc-inactive"],
    conditions: ["Depression", "Anxiety"],
    yearsInPractice: 6,
    bio: "Tunde finished residency in Houston and built his panel around working adults who cannot take time off during business hours. He holds early-morning and evening slots on purpose.",
    slots: ["Tomorrow, 6:30 AM CT", "Tomorrow, 7:00 PM CT", "Friday, 6:45 AM CT"],
  },
  {
    id: "kowalski",
    name: "Irena Kowalski",
    credential: "MD",
    licensedIn: ["IL", "WA"],
    acceptedPayers: ["cms", "humana", "aetna"],
    conditions: ["Depression", "Depression + anxiety"],
    yearsInPractice: 22,
    bio: "Irena has practiced geriatric psychiatry since the late nineties and takes most of her referrals from primary care. She is deliberate, unhurried, and comfortable with complex medical histories.",
    slots: ["Wednesday, 11:00 AM CT", "Thursday, 9:30 AM CT", "Monday, 1:45 PM CT"],
  },
  {
    id: "farouk",
    name: "Layla Farouk",
    credential: "MD",
    licensedIn: ["NY", "CA"],
    acceptedPayers: ["cigna", "aetna", "kaiser"],
    conditions: ["Anxiety", "Depression + anxiety"],
    yearsInPractice: 8,
    bio: "Layla focuses on anxiety disorders and does a lot of work with graduate students and early-career professionals. She is a strong fit for people who intellectualize their symptoms.",
    slots: ["Tomorrow, 9:00 AM ET", "Wednesday, 2:30 PM ET", "Friday, 4:45 PM ET"],
  },
  {
    id: "delacroix",
    name: "Marcus Delacroix",
    credential: "DO",
    licensedIn: ["FL", "TX", "IL"],
    acceptedPayers: ["uhc", "uhc-inactive", "ambetter", "humana"],
    conditions: ["Depression", "Anxiety", "Depression + anxiety"],
    yearsInPractice: 13,
    bio: "Marcus spent most of his career in community mental health across three states. He is pragmatic about cost and will say plainly when something is not worth the money.",
    slots: ["Thursday, 3:00 PM ET", "Friday, 10:30 AM ET", "Tuesday, 1:15 PM ET"],
  },
  {
    id: "nakamura",
    name: "Hana Nakamura",
    credential: "MD",
    licensedIn: ["WA", "CA"],
    acceptedPayers: ["kaiser", "cigna", "uhc", "uhc-inactive"],
    conditions: ["Anxiety"],
    yearsInPractice: 5,
    bio: "Hana is the newest clinician in the network and has built her practice almost entirely around anxiety and panic. She is the most likely to have a slot within forty-eight hours.",
    slots: ["Today, 5:15 PM PT", "Tomorrow, 10:00 AM PT", "Wednesday, 8:15 AM PT"],
  },
  {
    id: "obrien",
    name: "Fiona O'Brien",
    credential: "MD",
    licensedIn: ["IL", "NY"],
    acceptedPayers: ["aetna", "humana", "cms"],
    conditions: ["Depression", "Depression + anxiety"],
    yearsInPractice: 18,
    bio: "Fiona teaches residents two days a week and sees patients the other three. She takes a conservative, evidence-first approach and is candid about what screening scores can and cannot tell you.",
    slots: ["Wednesday, 4:00 PM CT", "Monday, 11:30 AM CT", "Tuesday, 9:00 AM CT"],
  },
  {
    id: "vasquez",
    name: "Danilo Vásquez",
    credential: "DO",
    licensedIn: ["TX", "CA", "FL"],
    acceptedPayers: ["ambetter", "cigna", "uhc", "uhc-inactive"],
    conditions: ["Anxiety", "Depression + anxiety"],
    yearsInPractice: 10,
    bio: "Danilo works largely with first-generation patients navigating the US health system for the first time. He is patient with paperwork questions that other clinicians rush past.",
    slots: ["Tomorrow, 12:30 PM CT", "Thursday, 8:45 AM CT", "Friday, 3:15 PM CT"],
  },
  {
    id: "stern",
    name: "Rebecca Stern",
    credential: "MD",
    licensedIn: ["NY", "FL", "WA"],
    acceptedPayers: ["cms", "aetna", "humana", "cigna"],
    conditions: ["Depression", "Anxiety", "Depression + anxiety"],
    yearsInPractice: 26,
    bio: "Rebecca has been in practice since 1999 and now limits her panel to twenty patients. She takes the most complex referrals in the network and has the longest wait for a first visit.",
    slots: ["Next Tuesday, 2:00 PM ET", "Next Thursday, 10:15 AM ET", "Next Friday, 1:00 PM ET"],
  },
];
