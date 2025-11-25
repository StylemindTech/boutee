import React, { useEffect, useState } from "react";
import styles from "./SwipeGuideModal.module.css";

type SwipeGuideModalProps = {
  open: boolean;
  onClose: () => void;
};

const SwipeGuideModal: React.FC<SwipeGuideModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState<0 | 1>(0);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const isFirstStep = step === 0;
  const heading = isFirstStep ? "Like" : "Dislike";
  const imageSrc = isFirstStep ? "/swipe-right.gif" : "/swipe-left.gif";
  const buttonLabel = isFirstStep ? "Next" : "Got it";

  const handlePrimaryAction = () => {
    if (isFirstStep) {
      setStep(1);
      return;
    }
    onClose();
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={stopPropagation}>
        <img src={imageSrc} alt={heading} className={styles.gif} loading="lazy" decoding="async" />

        <p className={styles.message}>{heading}</p>
        <button type="button" className={styles.button} onClick={handlePrimaryAction}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

const AnimatedArrow: React.FC<{ direction: "left" | "right" }> = ({ direction }) => (
  <span className={`${styles.arrow} ${direction === "left" ? styles.arrowLeft : styles.arrowRight}`} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export default SwipeGuideModal;
