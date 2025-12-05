import React, { useState } from "react";
import type { AudienceChoice } from "../../preview/components/OnboardingFlow/OnboardingFlow";
import styles from "./AudienceQuestion.module.css";

type AudienceQuestionProps = {
  defaultValue?: AudienceChoice;
  onSelect?: (value: AudienceChoice) => void;
};

const AUDIENCE_OPTIONS: Array<{ id: AudienceChoice; label: string; helper: string }> = [
  { id: "self", label: "Myself", helper: "I'm picking a ring for me" },
  { id: "partner", label: "My partner", helper: "I'm choosing for them" },
];

const AudienceQuestion: React.FC<AudienceQuestionProps> = ({ defaultValue, onSelect }) => {
  const [selected, setSelected] = useState<AudienceChoice | undefined>(defaultValue);

  const handleSelect = (choice: AudienceChoice) => {
    setSelected(choice);
    onSelect?.(choice);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.stepRow}>
        <span className={styles.stepBadge}>Onboarding · Step 1</span>
      </div>

      <div className={styles.headingBlock}>
        <h3 className={styles.heading}>Who are you looking for?</h3>
        <p className={styles.subheading}>Tell us who this ring is for so we can tailor the journey.</p>
      </div>

      <div className={styles.optionGrid}>
        {AUDIENCE_OPTIONS.map((option) => {
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
              <p className={styles.optionHelper}>{option.helper}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default AudienceQuestion;
