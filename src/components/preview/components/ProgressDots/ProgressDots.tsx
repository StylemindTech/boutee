import React from "react";
import styles from "./ProgressDots.module.css";

type ProgressDotsProps = {
  total?: number;
  completed?: number;
};

const ProgressDots: React.FC<ProgressDotsProps> = ({ total = 10, completed = 0 }) => {
  return (
    <div className={styles.container} aria-label={`Progress ${completed} of ${total}`}>
      {Array.from({ length: total }).map((_, index) => {
        const isCompleted = index < completed;
        return (
          <div
            key={index}
            className={`${styles.dot} ${isCompleted ? styles.completed : ""}`}
            aria-label={`Step ${index + 1} ${isCompleted ? "completed" : "incomplete"}`}
          >
            <span className={styles.innerDot} />
          </div>
        );
      })}
    </div>
  );
};

export default ProgressDots;
