import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  const topCardRef = useRef<HTMLDivElement>(null);

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

  const handleDirectionChange = useCallback(
    (dir: "left" | "right" | null) => {
      if (onSwipeDirectionChange) onSwipeDirectionChange(dir);
    },
    [onSwipeDirectionChange]
  );

  const updateDragPosition = useCallback(
    (point: { x: number; y: number }) => {
      if (!topRing || isLeaving) return;
      if (activePointerId.current === null) return;
      dragCurrent.current = point;
      const deltaX = point.x - dragStart.current.x;
      const deltaY = point.y - dragStart.current.y;
      const rotation = deltaX * 0.08;
      setPosition({ x: deltaX, y: deltaY, rotation });

      const threshold = 30;
      if (Math.abs(deltaX) > threshold) {
        handleDirectionChange(deltaX > 0 ? "right" : "left");
      } else {
        handleDirectionChange(null);
      }
    },
    [topRing, isLeaving, handleDirectionChange]
  );

  const animateOut = useCallback(
    (direction: "left" | "right", ring: RingCard) => {
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
    },
    [onSwipe]
  );

  const finishDrag = useCallback(() => {
    if (!topRing || activePointerId.current === null) return;
    handleDirectionChange(null);
    setIsDragging(false);

    const deltaX = dragCurrent.current.x - dragStart.current.x;
    const width = typeof window !== "undefined" ? window.innerWidth : 375;
    const threshold = width * 0.22;
    activePointerId.current = null;

    if (Math.abs(deltaX) > threshold) {
      const direction = deltaX > 0 ? "right" : "left";
      animateOut(direction, topRing);
    } else {
      setPosition({ x: 0, y: 0, rotation: 0 });
    }
  }, [topRing, handleDirectionChange, animateOut]);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const id = activePointerId.current;
      if (id === null) return;
      const touch = Array.from(e.touches).find((t) => t.identifier === id);
      if (!touch) return;
      if (e.cancelable) e.preventDefault();
      updateDragPosition({ x: touch.clientX, y: touch.clientY });
    },
    [updateDragPosition]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const id = activePointerId.current;
      if (id === null) return;
      const ended = Array.from(e.changedTouches).some((t) => t.identifier === id);
      if (!ended) return;

      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);

      finishDrag();
    },
    [finishDrag, handleTouchMove]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!topRing || isLeaving || activePointerId.current !== null) return;
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      if (!touch) return;
      if (e.cancelable) e.preventDefault();

      activePointerId.current = touch.identifier;
      dragStart.current = { x: touch.clientX, y: touch.clientY };
      dragCurrent.current = { x: touch.clientX, y: touch.clientY };
      setIsDragging(true);

      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd, { passive: false });
      document.addEventListener("touchcancel", handleTouchEnd, { passive: false });
    },
    [topRing, isLeaving, handleTouchMove, handleTouchEnd]
  );

  useLayoutEffect(() => {
    setPosition({ x: 0, y: 0, rotation: 0 });
    setIsLeaving(false);
    activePointerId.current = null;
    setIsDragging(false);
    handleDirectionChange(null);
  }, [topRing?.id, handleDirectionChange]);

  useEffect(() => {
    const el = topCardRef.current;
    if (!el) return;

    el.addEventListener("touchstart", handleTouchStart, { passive: false });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, topRing?.id]);

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
                pointerEvents: isLeaving && isLeavingCard ? ("none" as const) : ("auto" as const),
              }
            : {
                zIndex: displayStack.length - index,
                pointerEvents: isLeaving && isLeavingCard ? ("none" as const) : ("auto" as const),
              };

          return (
            <div
              key={ring.id}
              ref={isTop ? topCardRef : undefined}
              className={styles.swipeCard}
              style={cardStyle}
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
