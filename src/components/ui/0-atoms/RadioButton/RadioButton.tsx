import React from "react";
import styles from "./RadioButton.module.css";

type RadioButtonProps = {
  id: string;
  name: string;
  value: string;
  label: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({ id, name, value, label, checked, disabled, onChange, className }) => {
  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ""} ${className ?? ""}`} htmlFor={id}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={styles.input}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default RadioButton;
