import React from "react";
import styles from "./PreviewHeader.module.css";

type PreviewHeaderProps = {
  title: string;
  onClose?: () => void;
};

const closeWithFallback = () => {
  if (typeof window === "undefined") return;
  if (window.history.length > 1) {
    window.history.back();
    return;
  }
  window.location.href = "/";
};

const PreviewHeader: React.FC<PreviewHeaderProps> = ({ title, onClose }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }
    closeWithFallback();
  };

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <button type="button" className={styles.closeButton} aria-label="Close preview" onClick={handleClose}>
        <CloseIcon />
      </button>
    </header>
  );
};

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default PreviewHeader;
