import React from "react";
import { X } from "lucide-react";
import styles from "./Chip.module.css";

type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  showIcon?: boolean;
};

const Chip: React.FC<ChipProps> = ({ label, selected, onClick, className, disabled = false, showIcon = true }) => {
  return (
    <button
      type="button"
      className={`${styles.chip} ${selected ? styles.chipSelected : ""} ${disabled ? styles.chipDisabled : ""} ${className ?? ""}`}
      onClick={onClick}
      aria-pressed={selected}
      disabled={disabled}
    >
      <span className={styles.label}>{label}</span>
      {selected && showIcon && <X className={styles.icon} aria-hidden="true" />}
    </button>
  );
};

export default Chip;
