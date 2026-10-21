/**
 * The onboarding questionnaire, transcribed VERBATIM from the production
 * bundle of beta.synaps.app (assets/index-*.js, onboarding steps array —
 * observed 2026-10-21 with operator-authorized access; see ANALYSIS.md
 * “Authenticated surface” section).
 *
 * Structure: id / kind (input | select) / title / sheetKicker / options,
 * including the multi-select `tools` step and the closing `start` step whose
 * answer routes the user into the product (template picker, AI prompt,
 * existing-plan update or fresh model).
 */

export type OnboardingOption = {
  value: string;
  label: string;
  detail?: string;
};

export type OnboardingStep = {
  id: string;
  kind: "input" | "select";
  inputType?: "email" | "text";
  multi?: boolean;
  columns?: 1 | 2;
  title: string;
  subtitle?: string;
  sheetKicker: string;
  placeholder?: string;
  imagePosition?: string;
  options?: OnboardingOption[];
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "email",
    kind: "input",
    inputType: "email",
    title: "What's your email?",
    placeholder: "you@studio.com",
    sheetKicker: "Let's set up your account.",
    imagePosition: "center top",
  },
  {
    id: "name",
    kind: "input",
    inputType: "text",
    title: "Now your name please",
    placeholder: "Jane Doe",
    sheetKicker: "Nice to meet you.",
  },
  {
    id: "role",
    kind: "select",
    title: "What best describes you?",
    sheetKicker: "A little about you.",
    imagePosition: "center top",
    options: [
      { value: "architect", label: "Architect / Designer" },
      { value: "real-estate", label: "Real estate professional" },
      { value: "homeowner", label: "Homeowner / Prosumer" },
      { value: "student", label: "Student" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "tools",
    kind: "select",
    multi: true,
    columns: 2,
    title: "Which tools have you worked with before?",
    sheetKicker: "Your toolkit.",
    imagePosition: "center bottom",
    options: [
      { value: "autocad", label: "AutoCad" },
      { value: "revit", label: "Revit" },
      { value: "rhino", label: "Rhino" },
      { value: "archicad", label: "ArchiCAD" },
      { value: "sketchup", label: "SketchUp" },
      { value: "other", label: "Other" },
      { value: "none", label: "None" },
    ],
  },
  {
    id: "designing",
    kind: "select",
    columns: 2,
    title: "What are you designing today?",
    sheetKicker: "Your project.",
    options: [
      { value: "apartment", label: "Apartment" },
      { value: "house", label: "House" },
      { value: "office", label: "Office / Workspace" },
      { value: "retail", label: "Retail / Hospitality" },
      { value: "public", label: "Public space" },
      { value: "exploring", label: "Just exploring" },
    ],
  },
  {
    id: "size",
    kind: "select",
    title: "How large is the space?",
    sheetKicker: "The scale of things.",
    options: [
      { value: "small", label: "Small", detail: "under 50 m² / 500 sq ft" },
      { value: "medium", label: "Medium", detail: "50–200 m² / 500–2000 sq ft" },
      { value: "large", label: "Large", detail: "200 m²+ / 2000+ sq ft" },
      { value: "unknown", label: "I don't know yet" },
    ],
  },
  {
    id: "collaboration",
    kind: "select",
    title: "Will you be working solo or with a team?",
    subtitle: "You can invite others to build things with you.",
    sheetKicker: "Better together.",
    options: [
      { value: "solo", label: "Just me" },
      { value: "small-team", label: "With a small team", detail: "2–5 people" },
      { value: "large-team", label: "With a larger team", detail: "6+ people" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "start",
    kind: "select",
    title: "How would you like to start?",
    sheetKicker: "Ready when you are.",
    options: [
      { value: "update", label: "Update existing plan" },
      { value: "template", label: "Start from template" },
      { value: "describe", label: "Describe what you want" },
      { value: "fresh", label: "Start fresh" },
    ],
  },
];

/** AI prompt examples from the production bundle (journeyProject module). */
export const AI_PROMPT_EXAMPLES = [
  {
    id: "corner",
    label: "Corner café",
    prompt:
      "A three-story corner building with a café and outdoor seating downstairs, offices on the first floor and three apartments above.",
  },
  {
    id: "townhouse",
    label: "Townhouse",
    prompt:
      "A four-story townhouse on a narrow plot, with parking and a studio office downstairs, open living spaces, three bedrooms, a balcony and a large rooftop terrace.",
  },
  {
    id: "courtyard",
    label: "Courtyard house",
    prompt:
      "A two-story courtyard house with a private courtyard, open living spaces, three bedrooms plus a guest room, a home office, an upstairs terrace and parking.",
  },
];
