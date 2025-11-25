import React from "react";
import styles from "./SwipeIntroMessage.module.css";

const SwipeIntroMessage: React.FC = () => {
  return <p className={styles.copy}>Swipe 10 rings to start building your style profile.</p>;
};

export default SwipeIntroMessage;
