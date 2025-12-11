import React from "react";
import styles from "./SwipeGuideModal.module.css";
import tapGuideImage from "../../../../assets/Image/Preview-Tap-Guide.jpg";

type SwipeGuideModalProps = {
  open: boolean;
  onClose: () => void;
};

const SwipeGuideModal: React.FC<SwipeGuideModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.modal} onClick={onClose}>
        <img
          src={tapGuideImage.src}
          alt="Use the like or dislike buttons to pick rings"
          className={styles.guideImage}
          loading="lazy"
          decoding="async"
        />

        <button type="button" className={styles.button} onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
};

export default SwipeGuideModal;
