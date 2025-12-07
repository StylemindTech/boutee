import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
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

const RingCardStack: React.FC<RingCardStackProps> = ({ rings = [], onSwipe, onSwipeDirectionChange }) => {
  const [position, setPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [leavingRingId, setLeavingRingId] = useState<string | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragCurrent = useRef({ x: 0, y: 0 });
  const leavingRingRef = useRef<RingCard | null>(null);
  const activePointerId = useRef<number | null>(null);

  const displayStack = useMemo(() => {
    const baseStack = rings.slice(0, 4);
    const shouldInjectLeaving =
      isLeaving && leavingRingId && leavingRingRef.current && baseStack.every((ring) => ring.id !== leavingRingId);
    if (shouldInjectLeaving) {
      baseStack.unshift(leavingRingRef.current);
    }
    return baseStack.slice(0, 4);
  }, [rings, isLeaving, leavingRingId]);
  const topRing = displayStack[0];

  const resetDirection = useCallback(() => {
    if (onSwipeDirectionChange) onSwipeDirectionChange(null);
  }, [onSwipeDirectionChange]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!topRing || isLeaving) return;
    activePointerId.current = e.pointerId;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    dragCurrent.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !topRing || isLeaving) return;
    if (activePointerId.current !== e.pointerId) return;
    if (e.cancelable) e.preventDefault();
    dragCurrent.current = { x: e.clientX, y: e.clientY };
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
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
  };

  const animateOut = (direction: "left" | "right", ring: RingCard) => {
    setIsLeaving(true);
    leavingRingRef.current = ring;
    setLeavingRingId(ring.id);
    const width = typeof window !== "undefined" ? window.innerWidth : 375;
    const finalX = direction === "left" ? -width * 1.5 : width * 1.5;
    const finalRotation = direction === "left" ? -28 : 28;
    setPosition({ x: finalX, y: 0, rotation: finalRotation });
    onSwipe?.(direction, ring);
    window.setTimeout(() => {
      setIsLeaving(false);
      setLeavingRingId(null);
      leavingRingRef.current = null;
      setPosition({ x: 0, y: 0, rotation: 0 });
    }, 280);
  };

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !topRing || isLeaving) return;
      if (activePointerId.current !== e.pointerId) return;
      activePointerId.current = null;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      resetDirection();
      setIsDragging(false);

      const deltaX = dragCurrent.current.x - dragStart.current.x;
      const width = typeof window !== "undefined" ? window.innerWidth : 375;
      const threshold = width * 0.22;
      if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? "right" : "left";
        animateOut(direction, topRing);
      } else {
        setPosition({ x: 0, y: 0, rotation: 0 });
      }
    },
    [isDragging, isLeaving, topRing, resetDirection]
  );

  const handlePointerCancel = useCallback((e: React.PointerEvent) => {
    if (activePointerId.current !== e.pointerId) return;
    activePointerId.current = null;
    setIsDragging(false);
    resetDirection();
    setPosition({ x: 0, y: 0, rotation: 0 });
  }, [resetDirection]);

  useLayoutEffect(() => {
    setPosition({ x: 0, y: 0, rotation: 0 });
    setIsLeaving(false);
  }, [topRing?.id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardStack}>
        {displayStack.map((ring, index) => {
          const isTop = index === 0;
          const isLeavingCard = leavingRingId === ring.id;
          const cardStyle = isTop
            ? {
                transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
                transition: isDragging ? "none" : "transform 0.3s ease-out, opacity 0.2s ease-out",
                opacity: isLeaving && isLeavingCard ? 0 : 1,
                zIndex: displayStack.length - index,
              }
            : {
                zIndex: displayStack.length - index,
              };

          return (
            <div
              key={ring.id}
              className={styles.swipeCard}
              style={cardStyle}
              onPointerDown={isTop ? handlePointerDown : undefined}
              onPointerMove={isTop ? handlePointerMove : undefined}
              onPointerUp={isTop ? handlePointerUp : undefined}
              onPointerCancel={isTop ? handlePointerCancel : undefined}
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
        })}
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
