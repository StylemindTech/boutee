import React, { useState } from "react";
import type { OnboardingAnswers } from "../../preview/components/OnboardingFlow/OnboardingFlow";
import styles from "./TimeframeQuestion.module.css";

const TIMEFRAME_OPTIONS: Array<{ id: NonNullable<OnboardingAnswers["timeframe"]>; label: string }> = [
  { id: "none", label: "I don't have a timeframe" },
  { id: "1m", label: "Up to 1 month" },
  { id: "2m", label: "Up to 2 months" },
  { id: "3m", label: "Up to 3 months" },
  { id: "3mPlus", label: "More than 3 months" },
];

type TimeframeQuestionProps = {
  defaultValue?: OnboardingAnswers["timeframe"];
  onSelect?: (value: OnboardingAnswers["timeframe"]) => void;
  onConfirm?: (value: OnboardingAnswers["timeframe"]) => void;
};

const TimeframeQuestion: React.FC<TimeframeQuestionProps> = ({ defaultValue, onSelect, onConfirm }) => {
  const [selected, setSelected] = useState<OnboardingAnswers["timeframe"]>(defaultValue ?? "none");

  const handleSelect = (value: OnboardingAnswers["timeframe"]) => {
    setSelected(value);
    onSelect?.(value);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.stepRow}>
        <span className={styles.stepBadge}>Onboarding · Step 3</span>
      </div>

      <div className={styles.headingBlock}>
        <h3 className={styles.heading}>Do you need a ring within a certain time?</h3>
        <p className={styles.subheading}>We'll match you with jewellers who can work to it.</p>
      </div>

      <div className={styles.optionGrid}>
        {TIMEFRAME_OPTIONS.map((option) => {
          const active = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              className={`${styles.optionCard} ${active ? styles.optionCardSelected : ""}`}
              onClick={() => handleSelect(option.id)}
              aria-pressed={active}
            >
              <div className={styles.optionHeader}>
                <span className={`${styles.optionDot} ${active ? styles.optionDotSelected : ""}`} aria-hidden="true" />
                <span className={styles.optionLabel}>{option.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={styles.primaryButton}
        onClick={() => onConfirm?.(selected)}
      >
        Save timeframe
      </button>
    </section>
  );
};

export default TimeframeQuestion;
