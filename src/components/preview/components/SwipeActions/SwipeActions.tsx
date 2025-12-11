import React from "react";
import { Heart, X } from "lucide-react";
import styles from "./SwipeActions.module.css";

type SwipeActionsProps = {
  onLike: () => void;
  onDislike: () => void;
  disabled?: boolean;
  emphasizedDirection?: "left" | "right" | null;
  nudgeLikeButton?: boolean;
};

const SwipeActions: React.FC<SwipeActionsProps> = ({
  onLike,
  onDislike,
  disabled = false,
  emphasizedDirection = null,
  nudgeLikeButton = false,
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
        <X aria-hidden="true" />
      </button>

      <button
        type="button"
        className={`${styles.button} ${styles.like} ${emphasizedDirection === "right" ? styles.emphasized : ""} ${nudgeLikeButton ? styles.nudge : ""}`}
        onClick={onLike}
        disabled={disabled}
        aria-label="Like"
      >
        <Heart aria-hidden="true" />
      </button>
    </div>
  );
};

export default SwipeActions;
