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

  return (
    <div className={styles.container}>
      <div
        className={styles.slider}
        style={{
          width: `calc((100% - 0px) / ${count})`,
          transform: `translateX(calc(100% * ${activeIndex}))`,
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
