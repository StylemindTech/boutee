import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ type = "button", children, className, disabled, onClick }) => {
  return (
    <button type={type} className={`${styles.button} ${className ?? ""}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
