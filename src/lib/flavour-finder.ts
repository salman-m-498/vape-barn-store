import type { Product } from "@/lib/products";

export type Experience = "new" | "months" | "expert";
export type Family = "fruit" | "dessert" | "tobacco" | "ice" | "surprise";
export type FruitMood = "sweet" | "tart" | "sour";
export type TobaccoStyle = "classic" | "sweet" | "nutty" | "mint";
export type IceStyle = "menthol" | "spearmint" | "fruit-ice" | "dessert-ice";
export type IceLevel = "none" | "little" | "lot";
export type Sweetness = "light" | "medium" | "very";
export type Device = "disposable" | "refillable" | "subohm" | "unsure";
export type Nicotine = "lot" | "fair" | "little" | "unsure";

export type StepId =
  | "age"
  | "experience"
  | "family"
  | "fruit-notes"
  | "fruit-mood"
  | "dessert-notes"
  | "tobacco-style"
  | "ice-style"
  | "ice"
  | "sweet"
  | "device"
  | "nicotine"
  | "results";

export type Answers = {
  experience: Experience | null;
  family: Family | null;
  fruitNotes: string[];
  fruitMood: FruitMood | null;
  dessertNotes: string[];
  tobaccoStyle: TobaccoStyle | null;
  iceStyle: IceStyle | null;
  ice: IceLevel | null;
  sweet: Sweetness | null;
  device: Device | null;
  nicotine: Nicotine | null;
};

export const EMPTY_ANSWERS: Answers = {
  experience: null,
  family: null,
  fruitNotes: [],
  fruitMood: null,
  dessertNotes: [],
  tobaccoStyle: null,
  iceStyle: null,
  ice: null,
  sweet: null,
  device: null,
  nicotine: null,
};

export type Option = { value: string; label: string };

export type StepDef = {
  message: string;
  multi?: boolean;
  options: Option[];
};

export const STEP_DEFS: Record<Exclude<StepId, "results">, StepDef> = {
  age: {
    message:
      "Welcome to the Barn. I'm Cloude. Tell me what you like and I'll point you at the right bottle. Takes about a minute.\n\nOne thing first: this is for adults who already use nicotine. Are you 18 or older?",
    options: [
      { value: "yes", label: "Yes, I'm 18+" },
      { value: "no", label: "No" },
    ],
  },
  experience: {
    message: "Quick question. How long have you been vaping?",
    options: [
      { value: "new", label: "I'm new to this" },
      { value: "months", label: "A few months" },
      { value: "expert", label: "I know my way around" },
    ],
  },
  family: {
    message: "Right, what are you in the mood for?",
    options: [
      { value: "fruit", label: "Fruity" },
      { value: "dessert", label: "Dessert and sweet" },
      { value: "tobacco", label: "Tobacco" },
      { value: "ice", label: "Icy and minty" },
      { value: "surprise", label: "Surprise me" },
    ],
  },
  "fruit-notes": {
    message: "Good choice. Which fruits? Pick as many as you like.",
    multi: true,
    options: [
      { value: "citrus", label: "Citrus (lemon, lime, orange)" },
      { value: "berry", label: "Berries (strawberry, blueberry, raspberry)" },
      { value: "tropical", label: "Tropical (mango, pineapple, passionfruit)" },
      { value: "stone", label: "Stone fruit (peach, apricot)" },
      { value: "melon", label: "Melon and watermelon" },
      { value: "apple", label: "Apple and pear" },
      { value: "grape", label: "Grape" },
      { value: "sour", label: "Sour candy fruit" },
    ],
  },
  "fruit-mood": {
    message: "Do you like them sweet and juicy, or sharp and sour?",
    options: [
      { value: "sweet", label: "Sweet and juicy" },
      { value: "tart", label: "A bit tart" },
      { value: "sour", label: "Properly sour" },
    ],
  },
  "dessert-notes": {
    message: "Sweet tooth. What's your weakness?",
    multi: true,
    options: [
      { value: "custard", label: "Custard and cream" },
      { value: "bakery", label: "Bakery (donut, biscuit, cake)" },
      { value: "icecream", label: "Ice cream" },
      { value: "candy", label: "Candy and gummies" },
      { value: "choc-caramel", label: "Chocolate, caramel, nuts" },
      { value: "cereal", label: "Milk and cereal" },
    ],
  },
  "tobacco-style": {
    message: "Classic. How do you like it?",
    options: [
      { value: "classic", label: "Traditional tobacco" },
      { value: "sweet", label: "Smooth and sweet (vanilla, caramel)" },
      { value: "nutty", label: "Nutty and rich" },
      { value: "mint", label: "Tobacco with a hint of mint" },
    ],
  },
  "ice-style": {
    message: "Cold front incoming. What are we chilling?",
    options: [
      { value: "menthol", label: "Pure menthol" },
      { value: "spearmint", label: "Spearmint or peppermint" },
      { value: "fruit-ice", label: "Fruit with ice" },
      { value: "dessert-ice", label: "Dessert with ice" },
    ],
  },
  ice: {
    message: "Almost there. How much ice do you want in it?",
    options: [
      { value: "none", label: "None" },
      { value: "little", label: "A little" },
      { value: "lot", label: "A lot" },
    ],
  },
  sweet: {
    message: "And how sweet do you like things?",
    options: [
      { value: "light", label: "Light" },
      { value: "medium", label: "Medium" },
      { value: "very", label: "Very sweet" },
    ],
  },
  device: {
    message: "What do you vape on? This changes which strength I'd suggest.",
    options: [
      { value: "disposable", label: "Disposable or small pod device" },
      { value: "refillable", label: "Refillable pod kit" },
      { value: "subohm", label: "Bigger mod or sub-ohm kit" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
  nicotine: {
    message: "Last one, nicotine. How much do you use now?",
    options: [
      { value: "lot", label: "A lot (heavy daily smoker or vaper)" },
      { value: "fair", label: "A fair bit (a pack or less a day)" },
      { value: "little", label: "Just a little (social, occasional)" },
      { value: "unsure", label: "Not sure" },
    ],
  },
};

export const DEVICE_TIP =
  "Quick explainer: disposables and small pods run on nic salts (higher number, smoother hit). Refillable pods take salts or freebase. Bigger mods and sub-ohm kits use lower-strength freebase. When in doubt, start lower.";

export function getSteps(answers: Answers): StepId[] {
  const steps: StepId[] = ["age", "experience", "family"];
  if (answers.family === "fruit") steps.push("fruit-notes", "fruit-mood");
  else if (answers.family === "dessert") steps.push("dessert-notes");
  else if (answers.family === "tobacco") steps.push("tobacco-style");
  else if (answers.family === "ice") steps.push("ice-style");
  steps.push("ice", "sweet", "device", "nicotine", "results");
  return steps;
}

export function nextStep(current: StepId, answers: Answers): StepId {
  const steps = getSteps(answers);
  const i = steps.indexOf(current);
  return steps[Math.min(i + 1, steps.length - 1)];
}

export function prevStep(current: StepId, answers: Answers): StepId {
  const steps = getSteps(answers);
  const i = steps.indexOf(current);
  return steps[Math.max(i - 1, 0)];
}

export const NICOTINE_GUIDE = [
  {
    title: "Start with your habit, not a number.",
    body: "Heavier daily users generally need a higher strength. Lighter or occasional users usually do better lower. These are starting points. Go by how you feel.",
  },
  {
    title: "Freebase vs nic salts: the numbers aren't comparable.",
    body: "Freebase (standard e-liquid) comes in lower numbers, often 3 to 12mg, and suits bigger mods and sub-ohm kits. Nic salts come in higher numbers, often 20mg and up, but feel smoother in small pod devices and disposables. A higher number on a salt does not mean a harsher hit. Always check the bottle and your device's recommended range.",
  },
  {
    title: "Too strong? You'll know.",
    body: "Dizziness, nausea, a headache, a hot or sweaty feeling, or a harsh scratchy throat all mean it's too strong or you're puffing too fast. Stop, have some water, take a break, and go down a strength next time.",
  },
  {
    title: "Too weak? You'll know that too.",
    body: "Constant cravings and chain-vaping usually mean it's too low, and moving up a step helps.",
  },
  {
    title: "Don't mix up your devices.",
    body: "A strength that suits a small pod isn't the same one for a big mod. If you change device, change the strength too.",
  },
  {
    title: "Keep it out of reach.",
    body: "Store bottles and devices away from children and pets. E-liquid can be harmful if swallowed or spilled on skin.",
  },
  {
    title: "If you don't use nicotine, don't start.",
    body: "Cloude can suggest a 0mg option for anyone who wants the flavour without nicotine.",
  },
];

export function getNicotineSuggestion(answers: Answers): string {
  const device = answers.device;
  const usage = answers.nicotine;

  let base: string;
  if (device === "subohm") base = "freebase around 3mg–6mg";
  else if (device === "refillable")
    base = "nic salts around 20mg–35mg, or freebase 6mg–12mg";
  else if (device === "disposable") base = "nic salts around 20mg–50mg";
  else base = "a mid-range nic salt around 20mg–35mg";

  let note = "";
  if (usage === "lot") note = "You're on the heavier side, so lean to the top of that range.";
  else if (usage === "little") note = "You're lighter, so start at the bottom of that range (or a 0mg).";
  else if (usage === "unsure") note = "Not sure? Start in the middle and go by feel.";
  else note = "Start in the middle and adjust by feel.";

  if (answers.experience === "new") note += " Since you're new, err on the gentler side.";

  return `${base}. ${note}`;
}

type EliqidTags = {
  family: "fruit" | "dessert" | "tobacco" | "ice";
  fruits: string[];
  dessert: string[];
  tobacco: string[];
  iceLevel: 0 | 1 | 2;
  sweetness: Sweetness;
  device: "salt" | "freebase";
  strengthMg?: number;
  sizeMl?: number;
};

const FRUIT_KEYWORDS: Record<string, string[]> = {
  citrus: ["lemon", "lime", "orange", "citrus"],
  berry: ["berry", "blueberry", "raspberry", "strawberry", "cherry", "blackberry"],
  tropical: ["mango", "pineapple", "passionfruit", "passion fruit", "guava", "papaya", "cactus"],
  stone: ["apricot", "peach", "nectarine", "plum"],
  melon: ["melon", "watermelon"],
  apple: ["apple", "pear"],
  grape: ["grape"],
  sour: ["sour", "sherbet", "tart"],
};

const DESSERT_KEYWORDS: Record<string, string[]> = {
  custard: ["custard", "cream", "cheesecake", "pudding", "milk"],
  bakery: ["cookie", "biscuit", "cake", "donut", "doughnut", "bakery", "swiss roll", "krispy", "treats", "malva"],
  icecream: ["ice cream", "icecream", "gelato"],
  candy: ["candy", "gummies", "gummy", "lollipop", "sweets", "cola", "pop"],
  "choc-caramel": ["chocolate", "caramel", "butterscotch", "hazelnut", "almond", "peanut", "nut"],
  cereal: ["cereal", "granola", "oats"],
};

const TOBACCO_KEYWORDS: Record<string, string[]> = {
  classic: ["tobacco", "cigar", "classic"],
  sweet: ["vanilla", "caramel", "ry4", "sweet tobacco"],
  nutty: ["nutty", "hazelnut", "almond"],
  mint: ["mint", "menthol"],
};

const ICE_KEYWORDS = ["ice", "mint", "menthol", "cool", "chill", "freeze"];
const SOUR_KEYWORDS = ["sour", "tart", "sherbet"];

function matchAny(text: string, keywords: string[]): boolean {
  return keywords.some((k) => text.includes(k));
}

export function tagEliqid(product: Product): EliqidTags {
  const text = `${product.name} ${product.flavour ?? ""}`.toLowerCase();

  const fruits = Object.entries(FRUIT_KEYWORDS)
    .filter(([, words]) => matchAny(text, words))
    .map(([key]) => key);
  const dessert = Object.entries(DESSERT_KEYWORDS)
    .filter(([, words]) => matchAny(text, words))
    .map(([key]) => key);
  const tobacco = Object.entries(TOBACCO_KEYWORDS)
    .filter(([, words]) => matchAny(text, words))
    .map(([key]) => key);
  const hasIce = matchAny(text, ICE_KEYWORDS);

  let family: EliqidTags["family"];
  if (fruits.length > 0) family = "fruit";
  else if (dessert.length > 0) family = "dessert";
  else if (hasIce || tobacco.length > 0 && matchAny(text, ["mint", "menthol"])) family = "ice";
  else if (tobacco.length > 0) family = "tobacco";
  else family = "fruit";

  let iceLevel: 0 | 1 | 2 = 0;
  if (hasIce) iceLevel = matchAny(text, ["menthol", "mint"]) ? 2 : 1;

  let sweetness: Sweetness = "medium";
  if (matchAny(text, SOUR_KEYWORDS)) sweetness = "light";
  else if (dessert.length > 0) sweetness = "very";
  else if (matchAny(text, ["mint", "menthol"])) sweetness = "light";

  const mg = /(\d+)\s*mg/i.exec(product.name);
  const ml = /(\d+)\s*ml/i.exec(product.name);

  return {
    family,
    fruits,
    dessert,
    tobacco,
    iceLevel,
    sweetness,
    device: mg ? "salt" : "freebase",
    strengthMg: mg ? Number(mg[1]) : undefined,
    sizeMl: ml ? Number(ml[1]) : undefined,
  };
}

function deviceFilter(device: Device | null): "salt" | "freebase" | "any" {
  if (device === "disposable") return "salt";
  if (device === "subohm") return "freebase";
  return "any";
}

function scoreProduct(tags: EliqidTags, answers: Answers): number {
  let score = 0;
  const f = answers.family;

  if (f === "fruit" && tags.family === "fruit") score += 3;
  if (f === "dessert" && tags.family === "dessert") score += 3;
  if (f === "ice" && tags.family === "ice") score += 3;
  if (f === "tobacco" && tags.family === "tobacco") score += 3;

  if (f === "fruit") {
    for (const note of answers.fruitNotes) if (tags.fruits.includes(note)) score += 2;
    if (answers.fruitMood === "sour" && tags.fruits.includes("sour")) score += 1;
    if (answers.fruitMood === "tart" && tags.fruits.includes("sour")) score += 1;
  }
  if (f === "dessert") {
    for (const note of answers.dessertNotes) if (tags.dessert.includes(note)) score += 2;
  }
  if (f === "tobacco" && answers.tobaccoStyle && tags.tobacco.includes(answers.tobaccoStyle)) score += 2;

  const wantIce: Record<IceLevel, number> = { none: 0, little: 1, lot: 2 };
  const iceTarget = answers.ice ? wantIce[answers.ice] : 1;
  score += Math.max(0, 2 - Math.abs(tags.iceLevel - iceTarget));

  if (answers.sweet && tags.sweetness === answers.sweet) score += 2;

  return score;
}

export type Match = {
  product: Product;
  tags: EliqidTags;
  score: number;
};

const HOT_SELLER_SLUGS = [
  "misfits-biscoff-cheesecake-120ml",
  "prime-mango-to-the-max-120ml",
  "bard-juice-triple-mango-ice-30ml",
  "yeti-mango-ice-50mg-30ml",
  "prime-lemonito-120ml",
  "misfits-cereal-milk-120ml",
];

export type MatchResults = {
  pick: Match | null;
  second: Match | null;
  wildcard: Match | null;
};

export function matchProducts(answers: Answers, products: Product[]): MatchResults {
  const eliqids = products.filter((p) => p.category === "E-liquids" && p.inStock);
  const filter = deviceFilter(answers.device);

  const scored = eliqids
    .map((product) => ({ product, tags: tagEliqid(product), score: 0 }))
    .filter((m) => filter === "any" || m.tags.device === filter)
    .map((m) => ({ ...m, score: scoreProduct(m.tags, answers) }))
    .sort((a, b) => b.score - a.score);

  const pick = scored[0] ?? null;
  const second = scored[1] ?? null;
  const wildcard =
    scored.find((m) => pick && m.tags.family !== pick.tags.family) ?? scored[2] ?? null;

  const hotSellers = HOT_SELLER_SLUGS.map((slug) =>
    products.find((p) => p.slug === slug && p.inStock),
  )
    .filter((p): p is Product => Boolean(p))
    .map((p): Match => ({ product: p, tags: tagEliqid(p), score: 0 }));

  return {
    pick: pick ?? hotSellers[0] ?? null,
    second: second ?? hotSellers[1] ?? null,
    wildcard: wildcard ?? hotSellers[2] ?? null,
  };
}
