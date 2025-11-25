import React from "react";
import styles from "./SegmentControl.module.css";

type SegmentItem = {
  id: string;
  label: string;
};

type SegmentControlProps = {
  items: SegmentItem[];
  activeItemId: string;
  onItemClick: (id: string) => void;
};

const SegmentControl: React.FC<SegmentControlProps> = ({ items, activeItemId, onItemClick }) => {
  const activeIndex = items.findIndex((item) => item.id === activeItemId);
  const count = items.length || 1;
  const gutter = 8; // total horizontal padding (4px each side)

  return (
    <div className={styles.container}>
      <div
        className={styles.slider}
        style={{
          width: `calc((100% - ${gutter}px) / ${count})`,
          left: "4px",
          transform: `translateX(calc(${activeIndex} * 100%))`,
        }}
      />
      {items.map((item) => (
        <button
          key={item.id}
          className={styles.tabButton}
          onClick={() => onItemClick(item.id)}
          aria-pressed={item.id === activeItemId}
          type="button"
        >
          <span className={`${styles.label} ${item.id === activeItemId ? styles.activeLabel : ""}`}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SegmentControl;
