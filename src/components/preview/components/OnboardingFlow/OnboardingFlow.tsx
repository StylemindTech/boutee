import React, { useEffect, useMemo, useRef, useState } from "react";
import { Coffee, Palette, Dumbbell, Wine, Utensils, TentTree } from "lucide-react";
import MarketingBudget from "../../../marketing/onboarding/MarketingBudget";
import MarketingTimeframe, { type TimeframeId } from "../../../marketing/onboarding/MarketingTimeframe";
import RadioButton from "../../../ui/0-atoms/RadioButton/RadioButton";
import MarketingCharacteristics, { type TagKey } from "../../../marketing/onboarding/MarketingCharacteristics";
import Chip from "../../../ui/0-atoms/Chip/Chip";
import styles from "./OnboardingFlow.module.css";

export type AudienceChoice = "self" | "partner";

export type OnboardingAnswers = {
  audience?: AudienceChoice;
  traits: string[];
  intent?: "high" | "low";
  perfectWeekend: Array<"cosy" | "creative" | "productive" | "social" | "foodie" | "outdoorsy">;
  budgetUpper?: string;
  budgetNotSure?: boolean;
  timeframe?: "none" | "1m" | "2m" | "3m" | "3mPlus";
  timeFrameNotSure?: boolean;
  values: string[];
};

type OnboardingFlowProps = {
  answers: OnboardingAnswers;
  onAnswersChange: (next: OnboardingAnswers) => void;
  onComplete: () => void;
  onSkip?: () => void;
  onBackToWelcome?: () => void;
};

type StepId = "audience" | "traits" | "intent" | "budget" | "timeframe" | "weekend" | "values";

type Step = {
  id: StepId;
  title: string;
  description?: string;
};

type Option = {
  id: string;
  label: string;
  helper?: string;
};

const AUDIENCE_OPTIONS: Array<{ id: AudienceChoice; label: string; helper: string }> = [
  { id: "self", label: "Myself", helper: "I'll be wearing the ring" },
  { id: "partner", label: "My partner", helper: "I'm buying for somebody else" },
];

const TRAIT_OPTIONS: Option[] = [
  { id: "bookworm", label: "Bookworm" },
  { id: "creative", label: "Creative" },
  { id: "youngProfessional", label: "Young Professional" },
  { id: "sassy", label: "Sassy" },
  { id: "sporty", label: "Sporty" },
  { id: "outdoorsy", label: "Outdoorsy" },
  { id: "sentimental", label: "Sentimental" },
  { id: "social", label: "Social" },
  { id: "foodie", label: "Foodie" },
  { id: "planner", label: "Planner" },
];

const INTENT_OPTIONS: Option[] = [
  { id: "high", label: "There will probably be one soon" },
  { id: "low", label: "I'm just browsing for ideas" },
];

const WEEKEND_OPTIONS: Option[] = [
  { id: "cosy", label: "Reading, cafe time, quiet and comfy." },
  { id: "creative", label: "Gallery wandering, making things, exploring cute spots." },
  { id: "productive", label: "Workout, errands, planning, feeling organised." },
  { id: "social", label: "Getting dressed up, drinks, laughs, going out." },
  { id: "foodie", label: "Brunch, new cafes, food markets, city exploring." },
  { id: "outdoorsy", label: "Hiking, long walks, fresh air, spontaneous adventures." },
];

const VALUES_OPTIONS: Option[] = [
  { id: "emergingDesigner", label: "Emerging Designer" },
  { id: "ethicalJeweller", label: "Ethical Jeweller" },
  { id: "lgbtqOwned", label: "LGBTQ+ Owner" },
  { id: "queerFriendly", label: "Queer Friendly" },
  { id: "madeuk", label: "Made in the UK" },
];

type ValueKey = (typeof VALUES_OPTIONS)[number]["id"];

const BUDGET_MIN = 500;

const toMarketingTimeframeId = (timeframe?: OnboardingAnswers["timeframe"]): TimeframeId => {
  switch (timeframe) {
    case "1m":
      return "1_month";
    case "2m":
      return "2_months";
    case "3m":
      return "3_months";
    case "3mPlus":
      return "more_than_3_months";
    case "none":
    default:
      return "none";
  }
};

const toOnboardingTimeframe = (id: TimeframeId): OnboardingAnswers["timeframe"] => {
  switch (id) {
    case "1_month":
      return "1m";
    case "2_months":
      return "2m";
    case "3_months":
      return "3m";
    case "more_than_3_months":
      return "3mPlus";
    case "none":
    default:
      return "none";
  }
};

const buildSteps = (audience?: AudienceChoice): Step[] => {
  const steps: Step[] = [
    {
      id: "audience",
      title: "Who are you looking for?",
      description: "Tell us who this ring is for so we can tailor the journey.",
    },
  ];

  if (audience === "self") {
    steps.push(
      {
        id: "traits",
        title: "How would you describe yourself?",
        description: "Pick up to three that fit best.",
      },
      {
        id: "intent",
        title: "Are you expecting a proposal soon?",
      },
      {
        id: "weekend",
        title: "What does your perfect weekend look like?",
      },
      {
        id: "values",
        title: "Finding the right jeweller",
        description: "Are any of these important to you?",
      }
    );
  } else if (audience === "partner") {
    steps.push(
      {
        id: "traits",
        title: "How would you describe your partner?",
        description: "Pick up to three that fit best.",
      },
      {
        id: "weekend",
        title: "What does your perfect weekend together look like?",
      },
      {
        id: "budget",
        title: "Do you have a maximum budget?",
        description: "We'll only recommend jewellers that fit.",
      },
      {
        id: "timeframe",
        title: "Do you need a ring within a certain time?",
        description: "We'll match you with jewellers who can work to it.",
      },
      {
        id: "values",
        title: "Finding the right jeweller",
        description: "Are any of these important to you?",
      }
    );
  }

  return steps;
};

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  answers,
  onAnswersChange,
  onComplete,
  onSkip,
  onBackToWelcome,
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showValidation, setShowValidation] = useState(false);
  const [budgetInput, setBudgetInput] = useState<string>(answers.budgetUpper || "");
  const [budgetError, setBudgetError] = useState<string | null>(null);
  const advanceTimeoutRef = useRef<number | null>(null);
  const autoAdvanceDelayMs = 250;

  const steps = useMemo(() => buildSteps(answers.audience), [answers.audience]);
  const currentStep = steps[questionIndex] ?? steps[0];
  const lastStepIndex = Math.max(steps.length - 1, 0);
  const isLastStep = questionIndex >= lastStepIndex;

  useEffect(() => {
    const nextSteps = buildSteps(answers.audience);
    const maxIndex = Math.max(nextSteps.length - 1, 0);
    if (questionIndex > maxIndex) {
      setQuestionIndex(maxIndex);
    }
    if (!answers.audience && questionIndex > 0) {
      setQuestionIndex(0);
    }
  }, [answers.audience, questionIndex]);

  useEffect(() => {
    setBudgetInput(answers.budgetUpper || "");
  }, [answers.budgetUpper]);

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, []);

  const hasAnswerForStep = (stepId: StepId): boolean => {
    switch (stepId) {
      case "audience":
        return Boolean(answers.audience);
      case "traits":
        return answers.traits.length > 0;
      case "intent":
        return Boolean(answers.intent);
      case "budget":
        return Boolean(answers.budgetNotSure) || Boolean(answers.budgetUpper);
      case "timeframe":
        return Boolean(answers.timeframe);
      case "weekend":
        return answers.perfectWeekend.length > 0;
      case "values":
        return true;
      default:
        return true;
    }
  };

  const goNext = () => {
    if (currentStep.id === "budget") {
      const notSure = answers.budgetNotSure;
      const numVal = budgetInput ? Number(budgetInput) : NaN;
      if (!notSure && (!budgetInput || Number.isNaN(numVal) || numVal < BUDGET_MIN)) {
        setBudgetError(`Minimum budget is £${BUDGET_MIN}.`);
        setShowValidation(true);
        return;
      }
      setBudgetError(null);
      onAnswersChange({
        ...answers,
        budgetUpper: notSure ? "" : budgetInput,
      });
    }

    if (!hasAnswerForStep(currentStep.id)) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    if (isLastStep) {
      onComplete();
      return;
    }
    setQuestionIndex((idx) => Math.min(idx + 1, lastStepIndex));
  };

  const goBack = () => {
    setShowValidation(false);
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
    setQuestionIndex((idx) => {
      if (idx === 0 && onBackToWelcome) {
        onBackToWelcome();
        return idx;
      }
      return Math.max(0, idx - 1);
    });
  };

  const toggleValue = (key: "traits" | "values", id: string, limit?: number) => {
    const existing = answers[key];
    if (existing.includes(id)) {
      const next = existing.filter((item) => item !== id);
      onAnswersChange({ ...answers, [key]: next });
      setShowValidation(false);
      return;
    }
    if (limit && existing.length >= limit) {
      return;
    }
    onAnswersChange({ ...answers, [key]: [...existing, id] });
    setShowValidation(false);
  };

  const scheduleAdvance = (nextAudience?: AudienceChoice) => {
    if (typeof window === "undefined") return;
    const targetSteps = buildSteps(nextAudience ?? answers.audience);
    const targetLastStepIndex = Math.max(targetSteps.length - 1, 0);
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }
    advanceTimeoutRef.current = window.setTimeout(() => {
      advanceTimeoutRef.current = null;
      setQuestionIndex((idx) => Math.min(idx + 1, targetLastStepIndex));
    }, autoAdvanceDelayMs);
  };

  const handleAudienceSelect = (choice: AudienceChoice) => {
    const reset: OnboardingAnswers =
      choice === "self"
        ? {
            ...answers,
            audience: choice,
            budgetUpper: "",
            budgetNotSure: true,
            timeframe: "none",
            timeFrameNotSure: true,
            values: answers.values,
          }
        : {
            ...answers,
            audience: choice,
            budgetUpper: "",
            intent: undefined,
            budgetNotSure: true,
            timeframe: "none",
            timeFrameNotSure: true,
            values: answers.values,
          };
    onAnswersChange(reset);
    setShowValidation(false);
    scheduleAdvance(choice);
  };

  const renderOptionCards = (options: Option[], selectedId?: string, onSelect?: (id: string) => void) => (
    <div className={styles.optionGrid}>
      {options.map((option) => {
        const selected = selectedId === option.id;
        return (
          <button
            key={option.id}
            type="button"
            className={`${styles.optionCard} ${selected ? styles.optionCardSelected : ""}`}
            onClick={() => onSelect && onSelect(option.id)}
            aria-pressed={selected}
          >
            <div className={styles.optionHeader}>
              <span className={`${styles.optionDot} ${selected ? styles.optionDotSelected : ""}`} aria-hidden="true" />
              <span className={styles.optionLabel}>{option.label}</span>
            </div>
            {option.helper && <p className={styles.optionHelper}>{option.helper}</p>}
          </button>
        );
      })}
    </div>
  );

  const renderChips = (options: Option[], selected: string[], onToggle: (id: string) => void, limit?: number) => (
    <div className={styles.chipGrid}>
      {options.map((option) => {
        const active = selected.includes(option.id);
        const disabled = !active && limit !== undefined && selected.length >= limit;
        return (
          <Chip
            key={option.id}
            label={option.label}
            selected={active}
            onClick={() => {
              if (disabled) return;
              onToggle(option.id);
            }}
            disabled={disabled}
          />
        );
      })}
    </div>
  );

  const renderIntent = () => (
    <div className={styles.radioList}>
      {INTENT_OPTIONS.map((option) => (
        <RadioButton
          key={option.id}
          id={`intent-${option.id}`}
          name="intent"
          value={option.id}
          label={option.label}
          checked={answers.intent === option.id}
          onChange={() => {
            onAnswersChange({ ...answers, intent: option.id as OnboardingAnswers["intent"] });
            setShowValidation(false);
            scheduleAdvance();
          }}
        />
      ))}
    </div>
  );

  const renderBudget = () => {
    return (
      <MarketingBudget
        variant="embedded"
        hideSubmit
        showCopy={false}
        value={{
          budgetNotSure: Boolean(answers.budgetNotSure),
          budgetRangeUpper: answers.budgetUpper ? answers.budgetUpper : null,
        }}
        errorMessage={budgetError}
        onChange={(next) => {
          const cleanUpper = next.budgetRangeUpper ?? "";
          setBudgetInput(cleanUpper);
          onAnswersChange({
            ...answers,
            budgetNotSure: next.budgetNotSure,
            budgetUpper: next.budgetNotSure ? "" : cleanUpper,
          });
          setBudgetError(null);
          setShowValidation(false);
        }}
      />
    );
  };

  const renderWeekendIcons = () => {
    const iconMap: Record<string, JSX.Element> = {
      cosy: <Coffee className={styles.weekendIcon} aria-hidden="true" />,
      creative: <Palette className={styles.weekendIcon} aria-hidden="true" />,
      productive: <Dumbbell className={styles.weekendIcon} aria-hidden="true" />,
      social: <Wine className={styles.weekendIcon} aria-hidden="true" />,
      foodie: <Utensils className={styles.weekendIcon} aria-hidden="true" />,
      outdoorsy: <TentTree className={styles.weekendIcon} aria-hidden="true" />,
    };

    return (
      <div className={styles.weekendGrid}>
        {WEEKEND_OPTIONS.map((option) => {
          const active = answers.perfectWeekend.includes(option.id as OnboardingAnswers["perfectWeekend"][number]);
          return (
            <button
              key={option.id}
              type="button"
              className={`${styles.weekendButton} ${active ? styles.weekendButtonActive : ""}`}
              onClick={() => {
                const id = option.id as OnboardingAnswers["perfectWeekend"][number];
                const already = answers.perfectWeekend.includes(id);
                if (already) {
                  onAnswersChange({
                    ...answers,
                    perfectWeekend: answers.perfectWeekend.filter((item) => item !== id),
                  });
                } else if (answers.perfectWeekend.length < 2) {
                  onAnswersChange({
                    ...answers,
                    perfectWeekend: [...answers.perfectWeekend, id],
                  });
                }
                setShowValidation(false);
              }}
              aria-pressed={active}
            >
              <span className={styles.weekendIconWrap}>{iconMap[option.id]}</span>
              <span className={styles.weekendLabel}>{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case "audience":
        return (
          <div className={styles.radioList}>
            {AUDIENCE_OPTIONS.map((option) => (
              <RadioButton
                key={option.id}
                id={`audience-${option.id}`}
                name="audience"
                value={option.id}
                label={
                  option.helper ? (
                    <span className={styles.radioLabelBlock}>
                      <span className={styles.radioLabel}>{option.label}</span>
                      <span className={styles.radioHelper}>{option.helper}</span>
                    </span>
                  ) : (
                    option.label
                  )
                }
                checked={answers.audience === option.id}
                onChange={() => handleAudienceSelect(option.id as AudienceChoice)}
              />
            ))}
          </div>
        );
      case "traits":
        return renderChips(TRAIT_OPTIONS, answers.traits, (id) => toggleValue("traits", id, 3), 3);
      case "intent":
        return renderIntent();
      case "budget":
        return renderBudget();
      case "timeframe":
        return (
          <MarketingTimeframe
            variant="embedded"
            hideSubmit
            showCopy={false}
            value={toMarketingTimeframeId(answers.timeframe)}
            onChange={(id) => {
              const mapped = toOnboardingTimeframe(id);
              onAnswersChange({
                ...answers,
                timeframe: mapped,
                timeFrameNotSure: id === "none",
              });
              setShowValidation(false);
              scheduleAdvance();
            }}
          />
        );
      case "weekend":
        return renderWeekendIcons();
      case "values":
        return (
          <MarketingCharacteristics
            variant="embedded"
            hideSubmit
            showCopy={false}
            value={
              VALUES_OPTIONS.reduce((acc, opt) => {
                acc[opt.id as ValueKey] = answers.values.includes(opt.id);
                return acc;
              }, {} as Partial<Record<TagKey, boolean>>)
            }
            onChange={(next) => {
              const selected = Object.entries(next)
                .filter(([, enabled]) => enabled)
                .map(([key]) => key);
              onAnswersChange({ ...answers, values: selected });
              setShowValidation(false);
            }}
          />
        );
      default:
        return null;
    }
  };

  const validationMessage =
    showValidation && !hasAnswerForStep(currentStep.id) && !budgetError
      ? "Choose at least one option to continue."
      : null;

  const displayTotalSteps = Math.max(steps.length, 5);
  const displayStepNumber = Math.min(questionIndex + 1, displayTotalSteps);

  return (
    <div className={styles.wrapper}>
      <div className={styles.stepRow}>
        <span className={styles.stepBadge}>
          Step {displayStepNumber} of {displayTotalSteps}
        </span>
        {onSkip ? (
          <button type="button" className={styles.linkButton} onClick={onSkip}>
            Skip Questions
          </button>
        ) : (
          questionIndex > 0 && (
            <button type="button" className={styles.linkButton} onClick={goBack}>
              Back
            </button>
          )
        )}
      </div>

      <div className={styles.headingBlock}>
        <h3 className={styles.heading}>{currentStep.title}</h3>
        {currentStep.description && <p className={styles.subheading}>{currentStep.description}</p>}
      </div>

      <div key={currentStep.id} className={`${styles.content} ${styles.animatedStep}`}>
        {renderStepContent()}
      </div>

      {validationMessage && <p className={styles.validation}>{validationMessage}</p>}

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={goBack}
          disabled={questionIndex === 0 && !onBackToWelcome}
        >
          Back
        </button>
        <button type="button" className={styles.primaryButton} onClick={goNext}>
          {isLastStep ? "Continue" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default OnboardingFlow;
