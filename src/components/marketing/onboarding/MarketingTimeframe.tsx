import React, { useEffect, useState } from "react";
import RadioButton from "../../ui/0-atoms/RadioButton/RadioButton";
import Button from "../../ui/1-molecules/Button/Button";
import styles from "./MarketingTimeframe.module.css";

export type TimeframeId = "none" | "1_month" | "2_months" | "3_months" | "more_than_3_months";

const TIMEFRAME_TO_WEEKS_MAP: Record<TimeframeId, number | null> = {
  none: null,
  "1_month": 4,
  "2_months": 8,
  "3_months": 12,
  "more_than_3_months": 16,
};

const TIMEFRAME_OPTIONS: Array<{ id: TimeframeId; label: string }> = [
  { id: "none", label: "I don't have a timeframe" },
  { id: "1_month", label: "Up to 1 month" },
  { id: "2_months", label: "Up to 2 months" },
  { id: "3_months", label: "Up to 3 months" },
  { id: "more_than_3_months", label: "More than 3 months" },
];

type MarketingTimeframeProps = {
  onSubmit?: (value: { timeframeId: TimeframeId; timeFrameWeeks: number | null; timeFrameNotSure: boolean }) => void;
  onChange?: (id: TimeframeId) => void;
  value?: TimeframeId;
  defaultValue?: TimeframeId;
  variant?: "page" | "embedded";
  hideSubmit?: boolean;
  showCopy?: boolean;
};

/**
 * Marketing version of the timeframe question from onboarding.
 * Uses the same radio atoms so it matches the in-app UI.
 */
export default function MarketingTimeframe({
  onSubmit,
  onChange,
  value,
  defaultValue = "none",
  variant = "page",
  hideSubmit = false,
  showCopy = true,
}: MarketingTimeframeProps) {
  const [timeframeId, setTimeframeId] = useState<TimeframeId>(value ?? defaultValue);

  const isEmbedded = variant === "embedded";

  useEffect(() => {
    if (value) {
      setTimeframeId(value);
    }
  }, [value]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      const weeks = TIMEFRAME_TO_WEEKS_MAP[timeframeId];
      onSubmit({
        timeframeId,
        timeFrameWeeks: weeks,
        timeFrameNotSure: timeframeId === "none",
      });
    }
  };

  const handleSelect = (id: TimeframeId) => {
    setTimeframeId(id);
    onChange?.(id);
  };

  const containerClass = isEmbedded ? styles.embedded : styles.page;
  const cardClass = isEmbedded ? styles.embeddedCard : styles.card;

  return (
    <div className={containerClass}>
      <div className={cardClass}>
        {showCopy && (
          <>
            <p className={styles.kicker}>Timeframe</p>
            <h1 className={styles.title}>Do you need a ring within a certain time?</h1>
            <p className={styles.helper}>Same five options shown in the app&apos;s onboarding and preferences screens.</p>
          </>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.options}>
            {TIMEFRAME_OPTIONS.map((opt) => (
              <RadioButton
                key={opt.id}
                id={`time-${opt.id}-marketing`}
                name="timeframe"
                value={opt.id}
                label={opt.label}
                checked={timeframeId === opt.id}
                onChange={() => handleSelect(opt.id)}
              />
            ))}
          </div>

          {!hideSubmit && (
            <Button type="submit" className={styles.cta}>
              Continue
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
