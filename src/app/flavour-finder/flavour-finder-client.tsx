"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products, formatRand } from "@/lib/products";
import { STORE } from "@/lib/store";
import {
  EMPTY_ANSWERS,
  STEP_DEFS,
  DEVICE_TIP,
  NICOTINE_GUIDE,
  getSteps,
  nextStep,
  prevStep,
  getNicotineSuggestion,
  matchProducts,
  type Answers,
  type StepId,
  type Experience,
  type Family,
  type FruitMood,
  type TobaccoStyle,
  type IceStyle,
  type IceLevel,
  type Sweetness,
  type Device,
  type Nicotine,
  type Match,
} from "@/lib/flavour-finder";

type IconName =
  | "check"
  | "cross"
  | "apple"
  | "cupcake"
  | "leaf"
  | "snowflake"
  | "sparkle"
  | "pod"
  | "kit"
  | "mod"
  | "question"
  | "sun"
  | "gauge-little"
  | "gauge-fair"
  | "gauge-lot";

const ICONS: Record<IconName, string[]> = {
  check: ["M5 13l4 4L19 7"],
  cross: ["M6 6l12 12", "M18 6L6 18"],
  apple: ["M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z", "M12 7V5", "M12 5c-1.5 0-1.5-1.5-3-1.5"],
  cupcake: ["M12 4a3 3 0 0 1 3 3", "M9 11c0-2 1-3 3-3s3 1 3 3", "M5 11h14l-1 6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2l-1-6Z"],
  leaf: ["M5 19C5 9 12 4 19 4c0 10-5 15-14 15Z", "M5 19c3-4 6-6 10-7"],
  snowflake: ["M12 2v20", "M3.3 7l17.4 10", "M20.7 7L3.3 17"],
  sparkle: ["M12 3l1.7 4.6L18.5 9l-4.8 1.7L12 15.5l-1.7-4.8L5.5 9l4.8-1.4L12 3Z"],
  pod: ["M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z", "M10 7h4", "M12 16v2"],
  kit: ["M9 3h6a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z", "M12 8v8", "M9 11h6"],
  mod: ["M3 8h18a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z", "M8 14h8"],
  question: ["M10 9a2 2 0 1 1 3 1.7c-.8.5-1 1-1 2", "M12 17h.01"],
  sun: ["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z", "M12 2v2", "M12 20v2", "M4.9 4.9l1.4 1.4", "M17.7 17.7l1.4 1.4", "M2 12h2", "M20 12h2", "M4.9 19.1l1.4-1.4", "M17.7 6.3l1.4-1.4"],
  "gauge-little": ["M7 20v-5"],
  "gauge-fair": ["M7 20v-5", "M12 20v-10"],
  "gauge-lot": ["M7 20v-5", "M12 20v-10", "M17 20V3"],
};

function PillIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={"shrink-0 " + (className ?? "")}
    >
      {ICONS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function iconFor(step: StepId, value: string): IconName | null {
  switch (step) {
    case "age":
      return value === "yes" ? "check" : "cross";
    case "family":
      if (value === "fruit") return "apple";
      if (value === "dessert") return "cupcake";
      if (value === "tobacco") return "leaf";
      if (value === "ice") return "snowflake";
      if (value === "surprise") return "sparkle";
      return null;
    case "ice":
      if (value === "none") return "sun";
      return "snowflake";
    case "device":
      if (value === "disposable") return "pod";
      if (value === "refillable") return "kit";
      if (value === "subohm") return "mod";
      if (value === "unsure") return "question";
      return null;
    case "nicotine":
      if (value === "lot") return "gauge-lot";
      if (value === "fair") return "gauge-fair";
      if (value === "little") return "gauge-little";
      if (value === "unsure") return "question";
      return null;
    default:
      return null;
  }
}

function CloudeAvatar({ base, className }: { base: string; className?: string }) {
  return (
    <div className={"relative shrink-0 " + (className ?? "")}>
      <span
        aria-hidden
        className="absolute inset-0 -z-0 rounded-full bg-pop/30 blur-2xl"
      />
      <Image
        src={base + "/brand/cloude_standing.png"}
        alt="Cloude McPuff"
        width={194}
        height={194}
        className="relative h-48 w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] sm:h-44 ml-4"
      />
    </div>
  );
}

function GuidePanel() {
  return (
    <details className="group mt-6 rounded-xl border border-pop/30 bg-navy-soft/60 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
      <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-body text-xs font-bold uppercase tracking-[0.14em] text-pop transition-colors hover:text-white">
        Know your strength
        <span aria-hidden className="text-cream/50 transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="space-y-4 border-t border-cream/10 px-6 py-5">
        <p className="font-body text-sm leading-relaxed text-cream/70">
          Quick guide so you don&rsquo;t end up with a bottle that&rsquo;s too
          strong or too weak.
        </p>
        {NICOTINE_GUIDE.map((item, i) => (
          <div key={item.title} className="font-body text-sm leading-relaxed text-cream/80">
            <span className="font-semibold text-cream">
              {i + 1}. {item.title}
            </span>{" "}
            <span className="text-cream/65">{item.body}</span>
          </div>
        ))}
      </div>
    </details>
  );
}

function strengthLabel(tags: Match["tags"]): string {
  if (tags.strengthMg) return `${tags.strengthMg}mg`;
  return tags.device === "salt" ? "Nic salt" : "Freebase";
}

export function FlavourFinderClient() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [step, setStep] = useState<StepId>("age");
  const [denied, setDenied] = useState(false);

  const steps = getSteps(answers);
  const currentIndex = steps.indexOf(step);
  const totalQuestions = steps.length - 1;

  const matches = useMemo(() => matchProducts(answers, products), [answers]);

  function advance(from: StepId, next: Answers) {
    setStep(nextStep(from, next));
  }

  function goBack() {
    setStep(prevStep(step, answers));
  }

  function startOver() {
    setAnswers(EMPTY_ANSWERS);
    setStep("age");
    setDenied(false);
  }

  function toggleMulti(field: "fruitNotes" | "dessertNotes", value: string) {
    setAnswers((prev) => {
      const list = prev[field];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...prev, [field]: next };
    });
  }

  function handleOption(id: StepId, value: string) {
    let next: Answers;
    switch (id) {
      case "age":
        if (value === "no") {
          setDenied(true);
          return;
        }
        advance(id, answers);
        return;
      case "experience":
        next = { ...answers, experience: value as Experience };
        setAnswers(next);
        advance(id, next);
        return;
      case "family":
        next = {
          ...answers,
          family: value as Family,
          fruitNotes: [],
          fruitMood: null,
          dessertNotes: [],
          tobaccoStyle: null,
          iceStyle: null,
        };
        setAnswers(next);
        advance(id, next);
        return;
      case "fruit-notes":
        toggleMulti("fruitNotes", value);
        return;
      case "fruit-mood":
        next = { ...answers, fruitMood: value as FruitMood };
        setAnswers(next);
        advance(id, next);
        return;
      case "dessert-notes":
        toggleMulti("dessertNotes", value);
        return;
      case "tobacco-style":
        next = { ...answers, tobaccoStyle: value as TobaccoStyle };
        setAnswers(next);
        advance(id, next);
        return;
      case "ice-style":
        next = { ...answers, iceStyle: value as IceStyle };
        setAnswers(next);
        advance(id, next);
        return;
      case "ice":
        next = { ...answers, ice: value as IceLevel };
        setAnswers(next);
        advance(id, next);
        return;
      case "sweet":
        next = { ...answers, sweet: value as Sweetness };
        setAnswers(next);
        advance(id, next);
        return;
      case "device":
        next = { ...answers, device: value as Device };
        setAnswers(next);
        if (value !== "unsure") advance(id, next);
        return;
      case "nicotine":
        next = { ...answers, nicotine: value as Nicotine };
        setAnswers(next);
        advance(id, next);
        return;
      default:
        return;
    }
  }

  if (denied) {
    return (
      <main className="relative isolate overflow-hidden bg-navy">
        <div aria-hidden className="absolute inset-0 barn-xbrace" />
        <div className="relative mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center">
          <CloudeAvatar base={base} />
          <p className="mt-8 font-script text-2xl text-pop">see you then</p>
          <h1 className="mt-2 font-display text-5xl leading-[0.9] tracking-brand text-cream sm:text-6xl">
            Come back when you&rsquo;re 18.
          </h1>
          <button
            onClick={startOver}
            className="mt-10 rounded-sm border border-pop/60 px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.14em] text-pop transition-all hover:-translate-y-0.5 hover:bg-pop hover:text-navy"
          >
            Start over
          </button>
        </div>
      </main>
    );
  }

  if (step === "results") {
    const cards: {
      label: string;
      match: Match | null;
      badge?: boolean;
      accent: "gold" | "pop" | "muted";
    }[] = [
      { label: "Cloude's pick", match: matches.pick, badge: true, accent: "gold" },
      { label: "If you want something similar", match: matches.second, accent: "muted" },
      { label: "Something different", match: matches.wildcard, accent: "pop" },
    ];

    return (
      <main className="relative isolate overflow-hidden bg-navy">
        <div aria-hidden className="absolute inset-0 barn-xbrace" />
        <div className="relative mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex items-start gap-4 sm:gap-6">
            <CloudeAvatar base={base} className="hidden sm:block" />
            <div className="relative rounded-2xl border border-navy/10 bg-cream px-6 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <p className="font-script text-2xl text-gold">all sorted</p>
              <h1 className="mt-1 font-display text-4xl leading-[0.9] tracking-brand text-navy sm:text-6xl">
                Done. Here&rsquo;s what I&rsquo;d grab.
              </h1>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {cards.map(({ label, match, badge, accent }) => {
              const accentBar =
                accent === "gold"
                  ? "bg-gold"
                  : accent === "pop"
                    ? "bg-pop"
                    : "bg-navy/20";
              const labelColor =
                accent === "gold"
                  ? "text-gold"
                  : accent === "pop"
                    ? "text-pop"
                    : "text-navy/60";
              return (
                <div
                  key={label}
                  className="relative flex flex-col overflow-hidden rounded-xl border border-navy/10 bg-cream p-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <span aria-hidden className={`absolute inset-x-0 top-0 h-1 ${accentBar}`} />
                  {badge && (
                    <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold font-display text-xl leading-none text-navy shadow-[0_0_16px_rgba(212,166,74,0.6)]">
                      1
                    </span>
                  )}
                  <p className={`font-body text-[10px] font-bold uppercase tracking-[0.14em] ${labelColor}`}>
                    {label}
                  </p>
                  {match ? (
                    <>
                      <div className="relative mt-3 grid aspect-square place-items-center overflow-hidden rounded-lg bg-tan/30">
                        <span aria-hidden className="absolute inset-0 rounded-full bg-gold/15 blur-2xl" />
                        <Image
                          src={match.product.image}
                          alt={match.product.name}
                          width={400}
                          height={400}
                          className="relative h-full w-full object-contain"
                        />
                      </div>
                      <p className="mt-4 font-display text-2xl leading-tight tracking-brand text-navy">
                        {match.product.name}
                      </p>
                      <p className="mt-1 font-body text-xs font-semibold text-navy/60">
                        {match.tags.sizeMl ? `${match.tags.sizeMl}ml · ` : ""}
                        {strengthLabel(match.tags)}
                      </p>
                      <p className="mt-auto pt-3 font-display text-2xl tracking-brand text-gold">
                        {formatRand(match.product.price)}
                      </p>
                    </>
                  ) : (
                    <p className="mt-6 font-body text-sm text-navy/50">
                      Nothing in stock here yet — pop into the Barn and Cloude
                      will sort you out.
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-xl border border-pop/50 bg-navy-soft px-6 py-5 shadow-[0_0_24px_rgba(99,163,255,0.15)]">
            <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-pop">
              Your nicotine suggestion
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-cream/85">
              {getNicotineSuggestion(answers)}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/#find-us"
              className="rounded-sm bg-gold px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.14em] text-navy shadow-[0_8px_20px_rgba(171,122,43,0.4)] transition-all hover:-translate-y-0.5 hover:bg-gold-bright"
            >
              Visit the Barn
            </Link>
            <button
              onClick={startOver}
              className="rounded-sm border border-pop/50 px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-pop transition-all hover:-translate-y-0.5 hover:bg-pop/10"
            >
              Start over
            </button>
            <a
              href={STORE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-cream/25 px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-all hover:-translate-y-0.5 hover:bg-cream/10"
            >
              Follow on Instagram
            </a>
          </div>

          <p className="mt-8 font-body text-xs leading-relaxed text-cream/50">
            Adults 18+ only. Nicotine is addictive. If you don&rsquo;t use
            nicotine, you don&rsquo;t need to start.
          </p>

          <GuidePanel />
        </div>
      </main>
    );
  }

  const def = STEP_DEFS[step as Exclude<StepId, "results">];
  const isDeviceUnsure = step === "device" && answers.device === "unsure";
  const progressPct =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  function isSelected(value: string): boolean {
    if (step === "fruit-notes") return answers.fruitNotes.includes(value);
    if (step === "dessert-notes") return answers.dessertNotes.includes(value);
    if (step === "device") return answers.device === value;
    return false;
  }

  return (
    <main className="relative isolate overflow-hidden bg-navy">
      <div aria-hidden className="absolute inset-0 barn-xbrace" />
      <div aria-hidden className="absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-script text-2xl text-pop">let&rsquo;s find your flavour</p>
            <h1 className="font-display text-4xl leading-[0.85] tracking-brand text-cream sm:text-6xl">
              Cloude&rsquo;s{" "}
              <span className="text-gold-bright">Flavour Finder</span>
            </h1>
          </div>
          <p className="font-display text-3xl leading-none tracking-brand text-cream/80">
            <span className="text-pop">
              {String(Math.min(currentIndex + 1, totalQuestions)).padStart(2, "0")}
            </span>
            <span className="text-cream/30">
              {" "}
              / {String(totalQuestions).padStart(2, "0")}
            </span>
          </p>
        </div>

        <div className="mb-10 h-2 w-full overflow-hidden rounded-full bg-cream/10 ring-1 ring-cream/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-bright shadow-[0_0_14px_rgba(212,166,74,0.55)] transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="flex items-start gap-3 sm:gap-6">
          <CloudeAvatar base={base} />
          <div className="relative flex-1 rounded-2xl border border-navy/10 bg-cream px-6 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <span
              aria-hidden
              className="absolute -left-2 top-7 h-4 w-4 rotate-45 border-b border-l border-navy/10 bg-cream"
            />
            <p className="whitespace-pre-line font-body text-lg leading-relaxed text-navy">
              {def.message}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {def.options.map((option) => {
            const selected = isSelected(option.value);
            const icon = iconFor(step, option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOption(step, option.value)}
                className={`group flex items-center gap-2.5 rounded-full border-2 px-5 py-3 font-body text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-200 ${
                  selected
                    ? "border-gold bg-gold text-navy shadow-[0_6px_20px_rgba(171,122,43,0.4)]"
                    : "border-pop bg-navy-soft text-cream hover:-translate-y-0.5 hover:border-pop hover:text-white hover:shadow-[0_8px_24px_rgba(99,163,255,0.35)]"
                }`}
              >
                {icon && (
                  <PillIcon
                    name={icon}
                    className={selected ? "text-navy" : "text-gold-bright group-hover:text-pop"}
                  />
                )}
                {option.label}
              </button>
            );
          })}
        </div>

        {def.multi && (
          <button
            type="button"
            onClick={() => advance(step, answers)}
            className="mt-6 rounded-sm bg-gold px-8 py-3.5 font-body text-xs font-bold uppercase tracking-[0.14em] text-navy shadow-[0_8px_20px_rgba(171,122,43,0.4)] transition-all hover:-translate-y-0.5 hover:bg-gold-bright"
          >
            Continue
          </button>
        )}

        {isDeviceUnsure && (
          <>
            <p className="mt-6 rounded-xl border border-pop/40 bg-navy-soft/60 px-5 py-4 font-body text-sm leading-relaxed text-cream/85">
              {DEVICE_TIP}
            </p>
            <button
              type="button"
              onClick={() => advance(step, answers)}
              className="mt-5 rounded-sm bg-gold px-8 py-3.5 font-body text-xs font-bold uppercase tracking-[0.14em] text-navy shadow-[0_8px_20px_rgba(171,122,43,0.4)] transition-all hover:-translate-y-0.5 hover:bg-gold-bright"
            >
              Continue
            </button>
          </>
        )}

        <div className="mt-12 flex items-center gap-6 border-t border-cream/10 pt-6">
          {step !== "age" && (
            <button
              type="button"
              onClick={goBack}
              className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/60 transition-colors hover:text-pop"
            >
              &larr; Back
            </button>
          )}
          <button
            type="button"
            onClick={startOver}
            className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-cream/60 transition-colors hover:text-pop"
          >
            Start over
          </button>
        </div>

        {step === "nicotine" && <GuidePanel />}
      </div>
    </main>
  );
}
