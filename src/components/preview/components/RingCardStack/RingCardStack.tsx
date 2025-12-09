import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./RingCardStack.module.css";

export type RingCard = {
  id: string;
  imageUrl: string;
  sourceUrl?: string;
};

type RingCardStackProps = {
  rings: RingCard[];
  onSwipe?: (direction: "left" | "right", ring: RingCard) => void;
  onSwipeDirectionChange?: (direction: "left" | "right" | null) => void;
};

type SwipeableCardProps = {
  ring: RingCard;
  index: number;
  totalCards: number;
  isTop: boolean;
  onSwipe?: (direction: "left" | "right", ring: RingCard) => void;
  onSwipeDirectionChange?: (direction: "left" | "right" | null) => void;
};

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  ring,
  index,
  totalCards,
  isTop,
  onSwipe,
  onSwipeDirectionChange,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const dragCurrent = useRef({ x: 0, y: 0 });

  const handleStart = (clientX: number, clientY: number) => {
    if (!isTop || isLeaving) return;
    setIsDragging(true);
    dragStart.current = { x: clientX, y: clientY };
    dragCurrent.current = { x: clientX, y: clientY };
  };

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isTop || isLeaving) return;

      dragCurrent.current = { x: clientX, y: clientY };

      const deltaX = clientX - dragStart.current.x;
      const deltaY = clientY - dragStart.current.y;
      const rotation = deltaX * 0.08;

      setPosition({ x: deltaX, y: deltaY, rotation });

      if (onSwipeDirectionChange) {
        const threshold = 30;
        if (Math.abs(deltaX) > threshold) {
          onSwipeDirectionChange(deltaX > 0 ? "right" : "left");
        } else {
          onSwipeDirectionChange(null);
        }
      }
    },
    [isLeaving, isTop, onSwipeDirectionChange]
  );

  const animateOut = useCallback(
    (direction: "left" | "right") => {
      setIsLeaving(true);
      const width = typeof window !== "undefined" ? window.innerWidth : 375;
      const finalX = direction === "left" ? -width * 1.5 : width * 1.5;
      const finalRotation = direction === "left" ? -28 : 28;

      setPosition({ x: finalX, y: 0, rotation: finalRotation });

      if (onSwipe) onSwipe(direction, ring);
    },
    [onSwipe, ring]
  );

  const handleEnd = useCallback(() => {
    if (!isTop || isLeaving) return;
    setIsDragging(false);

    if (onSwipeDirectionChange) {
      onSwipeDirectionChange(null);
    }

    const deltaX = dragCurrent.current.x - dragStart.current.x;
    const width = typeof window !== "undefined" ? window.innerWidth : 375;
    const threshold = width * 0.25;

    if (Math.abs(deltaX) > threshold) {
      const direction = deltaX > 0 ? "right" : "left";
      animateOut(direction);
    } else {
      setPosition({ x: 0, y: 0, rotation: 0 });
    }
  }, [animateOut, isLeaving, isTop, onSwipeDirectionChange]);

  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    };

    const handleGlobalMouseUp = () => {
      handleEnd();
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      handleMove(touch.clientX, touch.clientY);
    };

    const handleGlobalTouchEnd = () => {
      handleEnd();
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("touchmove", handleGlobalTouchMove, { passive: false });
    document.addEventListener("touchend", handleGlobalTouchEnd);
    document.addEventListener("touchcancel", handleGlobalTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchmove", handleGlobalTouchMove);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
      document.removeEventListener("touchcancel", handleGlobalTouchEnd);
    };
  }, [handleEnd, handleMove, isDragging]);

  const cardStyle: React.CSSProperties = {
    zIndex: totalCards - index,
    transform: isTop
      ? `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`
      : `scale(${1 - index * 0.05}) translateY(${index * 10}px)`,
    transition: isDragging ? "none" : "transform 0.3s ease-out, opacity 0.2s ease-out",
    opacity: isLeaving ? 0 : 1,
  };

  return (
    <div
      className={styles.swipeCard}
      style={cardStyle}
      onMouseDown={(e) => {
        if (e.button === 0) handleStart(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        if (!touch) return;
        handleStart(touch.clientX, touch.clientY);
      }}
    >
      <div className={styles.ringCard}>
        <img src={ring.imageUrl} alt="Ring for selection" className={styles.ringImage} draggable={false} />
        <div className={styles.pinterestIconOverlay}>
          <img
            src="/Pinterest_Logo_Red.png"
            alt="Pinterest"
            className={styles.pinterestIcon}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

const RingCardStack: React.FC<RingCardStackProps> = ({ rings = [], onSwipe, onSwipeDirectionChange }) => {
  const displayStack = useMemo(() => rings.slice(0, 4), [rings]);
  const topRing = displayStack[0];

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardStack}>
        {displayStack.map((ring, index) => (
          <SwipeableCard
            key={ring.id}
            ring={ring}
            index={index}
            totalCards={displayStack.length}
            isTop={index === 0}
            onSwipe={onSwipe}
            onSwipeDirectionChange={onSwipeDirectionChange}
          />
        ))}
      </div>

      {topRing?.sourceUrl && (
        <a href={topRing.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.pinterestLink}>
          <span>View this ring on Pinterest</span>
          <ArrowIcon />
        </a>
      )}
    </div>
  );
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17l10-10M10 7h7v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default RingCardStack;
