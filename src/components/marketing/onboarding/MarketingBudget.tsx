import React, { useEffect, useRef, useState } from "react";
import RadioButton from "../../ui/0-atoms/RadioButton/RadioButton";
import Button from "../../ui/1-molecules/Button/Button";
import styles from "./MarketingBudget.module.css";

const MIN_BUDGET = 500;

type BudgetValue = { budgetNotSure: boolean; budgetRangeUpper: string | null };

type MarketingBudgetProps = {
  onSubmit?: (value: BudgetValue) => void;
  onChange?: (value: BudgetValue) => void;
  value?: BudgetValue;
  defaultValue?: Partial<BudgetValue>;
  variant?: "page" | "embedded";
  hideSubmit?: boolean;
  showCopy?: boolean;
  errorMessage?: string | null;
};

/**
 * Standalone marketing version of the onboarding budget question.
 * Supports an embedded variant to slot into the in-app onboarding flow.
 */
export default function MarketingBudget({
  onSubmit,
  onChange,
  value,
  defaultValue,
  variant = "page",
  hideSubmit = false,
  showCopy = true,
  errorMessage,
}: MarketingBudgetProps) {
  const [budgetNotSure, setBudgetNotSure] = useState<boolean>(
    value?.budgetNotSure ?? defaultValue?.budgetNotSure ?? true
  );
  const [budgetUpper, setBudgetUpper] = useState<string>(value?.budgetRangeUpper ?? defaultValue?.budgetRangeUpper ?? "");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Keep local state in sync when controlled value changes
  useEffect(() => {
    if (value) {
      setBudgetNotSure(value.budgetNotSure);
      setBudgetUpper(value.budgetRangeUpper ?? "");
      setError("");
    }
  }, [value?.budgetNotSure, value?.budgetRangeUpper]);

  const resolvedError = errorMessage ?? error;
  const isEmbedded = variant === "embedded";

  const emitChange = (next: BudgetValue) => {
    onChange?.(next);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!budgetNotSure) {
      const parsed = parseInt(budgetUpper, 10);
      if (!budgetUpper || Number.isNaN(parsed) || parsed < MIN_BUDGET) {
        setError(`Minimum budget is £${MIN_BUDGET}.`);
        return;
      }
    }

    setError("");
    const next = {
      budgetNotSure,
      budgetRangeUpper: budgetNotSure ? null : String(parseInt(budgetUpper, 10)),
    };
    onSubmit?.(next);
  };

  return (
    <div className={isEmbedded ? styles.embedded : styles.page}>
      <div className={isEmbedded ? styles.embeddedCard : styles.card}>
        {showCopy && (
          <>
            <p className={styles.kicker}>Budget</p>
            <h1 className={styles.title}>What is your maximum budget?</h1>
            <p className={styles.helper}>
              This reuses the onboarding atoms so you can drop it straight into a marketing landing page.
            </p>
          </>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <RadioButton
            id="budget-not-sure-marketing"
            name="budget"
            value="not_sure"
            label="I'm not sure"
            checked={budgetNotSure}
            onChange={() => {
              setBudgetNotSure(true);
              setError("");
              emitChange({ budgetNotSure: true, budgetRangeUpper: null });
            }}
          />

          <div className={styles.inputRow}>
            <RadioButton
              id="budget-up-to-marketing"
              name="budget"
              value="custom"
              label="Up to"
              checked={!budgetNotSure}
              onChange={() => {
                setBudgetNotSure(false);
                emitChange({ budgetNotSure: false, budgetRangeUpper: budgetUpper || null });
                setTimeout(() => inputRef.current?.focus(), 10);
              }}
            />

            <div
              className={`${styles.inputWrapper} ${!budgetNotSure ? styles.inputActive : ""} ${resolvedError ? styles.inputError : ""}`}
            >
              <span className={styles.currency}>£</span>
              <input
                ref={inputRef}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className={styles.inputField}
                value={budgetUpper}
                onChange={(e) => {
                  const next = e.target.value.replace(/[^0-9]/g, "");
                  setBudgetUpper(next);
                  setBudgetNotSure(false);
                  if (next) setError("");
                  emitChange({ budgetNotSure: false, budgetRangeUpper: next ? next : null });
                }}
                min={MIN_BUDGET}
                disabled={budgetNotSure}
                placeholder="500+"
              />
            </div>
          </div>

          {resolvedError && <p className={styles.error}>{resolvedError}</p>}

          {!hideSubmit && (
            <>
              <Button type="submit" className={styles.cta}>
                Continue
              </Button>
              <p className={styles.note}>Pass an onSubmit prop to capture the chosen value.</p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
