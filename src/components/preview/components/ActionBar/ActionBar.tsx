import React from "react";
import styles from "./ActionBar.module.css";

type ActionBarProps = {
  helperText?: string;
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const ActionBar: React.FC<ActionBarProps> = ({ helperText, label, href, onClick, disabled = false }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {helperText ? <p className={styles.helper}>{helperText}</p> : null}
        {href ? (
          <a
            href={disabled ? undefined : href}
            onClick={disabled ? (e) => e.preventDefault() : onClick}
            className={styles.button}
            aria-disabled={disabled}
          >
            <img src="/btn-icon.svg" alt="" className={styles.buttonIcon} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ) : (
          <button type="button" className={styles.button} onClick={onClick} disabled={disabled}>
            <img src="/btn-icon.svg" alt="" className={styles.buttonIcon} aria-hidden="true" />
            <span>{label}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionBar;
