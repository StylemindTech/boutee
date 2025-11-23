import React from "react";
import styles from "./SwipeActions.module.css";

type SwipeActionsProps = {
  onLike: () => void;
  onDislike: () => void;
  disabled?: boolean;
  emphasizedDirection?: "left" | "right" | null;
};

const SwipeActions: React.FC<SwipeActionsProps> = ({
  onLike,
  onDislike,
  disabled = false,
  emphasizedDirection = null,
}) => {
  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={`${styles.button} ${styles.dislike} ${emphasizedDirection === "left" ? styles.emphasized : ""}`}
        onClick={onDislike}
        disabled={disabled}
        aria-label="Dislike"
      >
        <CloseIcon />
      </button>

      <button
        type="button"
        className={`${styles.button} ${styles.like} ${emphasizedDirection === "right" ? styles.emphasized : ""}`}
        onClick={onLike}
        disabled={disabled}
        aria-label="Like"
      >
        <HeartIcon />
      </button>
    </div>
  );
};

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M19.5 5.75c-1.35-1.35-3.54-1.35-4.89 0l-.61.61-.61-.61c-1.35-1.35-3.54-1.35-4.89 0-1.35 1.35-1.35 3.54 0 4.89l.61.61 4.89 4.89 4.89-4.89.61-.61c1.35-1.35 1.35-3.54 0-4.89Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SwipeActions;
