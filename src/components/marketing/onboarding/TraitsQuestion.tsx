import React, { useState } from "react";
import type { OnboardingAnswers } from "../../preview/components/OnboardingFlow/OnboardingFlow";
import styles from "./TraitsQuestion.module.css";

type TraitsQuestionProps = {
  defaultValues?: OnboardingAnswers["traits"];
  limit?: number;
  onChange?: (values: OnboardingAnswers["traits"]) => void;
  onConfirm?: (values: OnboardingAnswers["traits"]) => void;
};

const TRAIT_OPTIONS: Array<{ id: OnboardingAnswers["traits"][number]; label: string }> = [
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

const TraitsQuestion: React.FC<TraitsQuestionProps> = ({ defaultValues, limit = 3, onChange, onConfirm }) => {
  const [selected, setSelected] = useState<OnboardingAnswers["traits"]>(defaultValues ?? []);
  const [error, setError] = useState<string | null>(null);

  const toggle = (id: OnboardingAnswers["traits"][number]) => {
    setError(null);
    const isSelected = selected.includes(id);
    if (isSelected) {
      const next = selected.filter((item) => item !== id);
      setSelected(next);
      onChange?.(next);
      return;
    }
    if (selected.length >= limit) {
      return;
    }
    const next = [...selected, id];
    setSelected(next);
    onChange?.(next);
  };

  const handleConfirm = () => {
    if (!selected.length) {
      setError("Choose at least one trait to continue.");
      return;
    }
    setError(null);
    onConfirm?.(selected);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.stepRow}>
        <span className={styles.stepBadge}>Onboarding · Step 4</span>
      </div>

      <div className={styles.headingBlock}>
        <h3 className={styles.heading}>How would you describe them?</h3>
        <p className={styles.subheading}>Pick up to three that fit best.</p>
      </div>

      <div className={styles.chipGrid}>
        {TRAIT_OPTIONS.map((option) => {
          const active = selected.includes(option.id);
          const disabled = !active && selected.length >= limit;
          return (
            <button
              key={option.id}
              type="button"
              className={`${styles.chip} ${active ? styles.chipActive : ""}`}
              onClick={() => toggle(option.id)}
              aria-pressed={active}
              disabled={disabled}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className={styles.footer}>
        {error && <p className={styles.validation}>{error}</p>}
        <div className={styles.metaRow}>
          <span className={styles.limitNote}>
            {selected.length}/{limit} selected
          </span>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleConfirm}
          >
            Save traits
          </button>
        </div>
      </div>
    </section>
  );
};

export default TraitsQuestion;
