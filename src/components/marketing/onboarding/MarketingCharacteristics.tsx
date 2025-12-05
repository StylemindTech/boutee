import React, { useMemo, useState } from "react";
import Chip from "../../ui/0-atoms/Chip/Chip";
import Button from "../../ui/1-molecules/Button/Button";
import styles from "./MarketingCharacteristics.module.css";

export type TagKey =
  | "emergingDesigner"
  | "ethicalJeweller"
  | "freeRingResizing"
  | "lgbtqOwned"
  | "offersWarranty"
  | "queerFriendly"
  | "madeuk";

const DEFAULT_TAGS: Record<TagKey, boolean> = {
  emergingDesigner: false,
  ethicalJeweller: false,
  freeRingResizing: false,
  lgbtqOwned: false,
  offersWarranty: false,
  queerFriendly: false,
  madeuk: false,
};

const LABELS: Record<TagKey, string> = {
  emergingDesigner: "Emerging Designer",
  ethicalJeweller: "Ethical Jeweller",
  freeRingResizing: "Free Ring Resizing",
  lgbtqOwned: "LGBTQ+ Owner",
  offersWarranty: "Offers Warranty",
  queerFriendly: "Queer Friendly",
  madeuk: "Made in the UK",
};

type MarketingCharacteristicsProps = {
  onSubmit?: (value: { tags: Record<TagKey, boolean>; selectedTags: TagKey[] }) => void;
  onChange?: (value: Record<TagKey, boolean>) => void;
  value?: Partial<Record<TagKey, boolean>>;
  defaultValue?: Partial<Record<TagKey, boolean>>;
  variant?: "page" | "embedded";
  hideSubmit?: boolean;
  showCopy?: boolean;
};

/**
 * Marketing version of the characteristics chip selector.
 * Uses the same Chip atom so it mirrors the onboarding flow.
 */
export default function MarketingCharacteristics({
  onSubmit,
  onChange,
  value,
  defaultValue,
  variant = "page",
  hideSubmit = false,
  showCopy = true,
}: MarketingCharacteristicsProps) {
  const [tags, setTags] = useState<Record<TagKey, boolean>>({
    ...DEFAULT_TAGS,
    ...(defaultValue || {}),
    ...(value || {}),
  });

  const selectedCount = useMemo(() => Object.values(tags).filter(Boolean).length, [tags]);

  const updateTags = (next: Record<TagKey, boolean>) => {
    setTags(next);
    onChange?.(next);
  };

  const toggleTag = (key: TagKey) => {
    const next = { ...tags, [key]: !tags[key] };
    updateTags(next);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      const selectedTags = Object.keys(tags).filter((key) => tags[key as TagKey]) as TagKey[];
      onSubmit({ tags, selectedTags });
    }
  };

  const containerClass = variant === "embedded" ? styles.embedded : styles.page;
  const cardClass = variant === "embedded" ? styles.embeddedCard : styles.card;

  return (
    <div className={containerClass}>
      <div className={cardClass}>
        {showCopy && (
          <>
            <p className={styles.kicker}>Characteristics</p>
            <h1 className={styles.title}>Are any of these characteristics important to you in a jeweller?</h1>
            <p className={styles.helper}>Direct reuse of the onboarding chip component for parity on the marketing site.</p>
          </>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.chips}>
            {Object.entries(LABELS).map(([key, label]) => (
              <Chip key={key} label={label} selected={!!tags[key as TagKey]} onClick={() => toggleTag(key as TagKey)} />
            ))}
          </div>

          {!hideSubmit && (
            <div className={styles.actions}>
              <span className={styles.selectionCount}>{selectedCount} selected</span>
              <Button type="submit" className={styles.cta}>
                Continue
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
