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
  const activePointerType = useRef<"pointer" | "touch" | null>(null);

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

  const beginDrag = useCallback(
    (point: { x: number; y: number }, id: number, type: "pointer" | "touch") => {
      if (!topRing || isLeaving) return;
      if (activePointerId.current !== null) return;
      activePointerId.current = id;
      activePointerType.current = type;
      setIsDragging(true);
      dragStart.current = point;
      dragCurrent.current = point;
    },
    [topRing, isLeaving]
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

      if (onSwipeDirectionChange) {
        const threshold = 30;
        if (Math.abs(deltaX) > threshold) {
          onSwipeDirectionChange(deltaX > 0 ? "right" : "left");
        } else {
          onSwipeDirectionChange(null);
        }
      }
    },
    [topRing, isLeaving, onSwipeDirectionChange]
  );

  const finishDrag = useCallback(
    (type: "pointer" | "touch") => {
      if (!topRing || activePointerId.current === null) return;
      if (activePointerType.current && activePointerType.current !== type) return;
      resetDirection();
      setIsDragging(false);

      const deltaX = dragCurrent.current.x - dragStart.current.x;
      const width = typeof window !== "undefined" ? window.innerWidth : 375;
      const threshold = width * 0.22;
      activePointerId.current = null;
      activePointerType.current = null;

      if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? "right" : "left";
        animateOut(direction, topRing);
      } else {
        setPosition({ x: 0, y: 0, rotation: 0 });
      }
    },
    [topRing, resetDirection]
  );

  const cancelDrag = useCallback(() => {
    activePointerId.current = null;
    activePointerType.current = null;
    setIsDragging(false);
    resetDirection();
    setPosition({ x: 0, y: 0, rotation: 0 });
  }, [resetDirection]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") {
      // Let the touch path handle it to avoid iOS pointer quirks.
      return;
    }
    beginDrag({ x: e.clientX, y: e.clientY }, e.pointerId, "pointer");
    if (e.cancelable) e.preventDefault();
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
    (e: { pointerId: number }) => {
      if (activePointerType.current !== "pointer") return;
      if (activePointerId.current !== e.pointerId) return;
      finishDrag("pointer");
    },
    [finishDrag]
  );

  const handlePointerCancel = useCallback(
    (e?: { pointerId?: number }) => {
      if (e?.pointerId && activePointerId.current !== e.pointerId) return;
      cancelDrag();
    },
    [cancelDrag]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      if (!touch) return;
      beginDrag({ x: touch.clientX, y: touch.clientY }, touch.identifier, "touch");
      if (e.cancelable) e.preventDefault();
    },
    [beginDrag]
  );

  useLayoutEffect(() => {
    setPosition({ x: 0, y: 0, rotation: 0 });
    setIsLeaving(false);
    activePointerId.current = null;
    activePointerType.current = null;
    setIsDragging(false);
    resetDirection();
  }, [topRing?.id]);

  useEffect(() => {
    if (!isDragging || activePointerId.current === null) return;

    if (activePointerType.current === "touch") {
      const handleMove = (e: TouchEvent) => {
        const id = activePointerId.current;
        if (id === null) return;
        const touch = Array.from(e.touches).find((t) => t.identifier === id);
        if (!touch) return;
        if (e.cancelable) e.preventDefault();
        updateDragPosition({ x: touch.clientX, y: touch.clientY });
      };

      const handleEnd = (e: TouchEvent) => {
        const id = activePointerId.current;
        if (id === null) return;
        const ended = Array.from(e.changedTouches).some((t) => t.identifier === id);
        if (!ended) return;
        finishDrag("touch");
      };

      const handleCancel = () => {
        cancelDrag();
      };

      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd, { passive: false });
      document.addEventListener("touchcancel", handleCancel, { passive: false });
      return () => {
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
        document.removeEventListener("touchcancel", handleCancel);
      };
    }

    const handleMove = (e: PointerEvent) => {
      if (activePointerType.current && activePointerType.current !== "pointer") return;
      if (activePointerId.current !== e.pointerId) return;
      if (!topRing || isLeaving) return;
      if (e.cancelable) e.preventDefault();
      updateDragPosition({ x: e.clientX, y: e.clientY });
    };

    const handleUp = (e: PointerEvent) => {
      if (activePointerId.current !== e.pointerId) return;
      finishDrag("pointer");
    };

    const handleCancel = (e: PointerEvent) => {
      if (activePointerId.current !== e.pointerId) return;
      cancelDrag();
    };

    document.addEventListener("pointermove", handleMove, { passive: false });
    document.addEventListener("pointerup", handleUp, { passive: false });
    document.addEventListener("pointercancel", handleCancel, { passive: false });
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointercancel", handleCancel);
    };
  }, [isDragging, isLeaving, updateDragPosition, finishDrag, cancelDrag, topRing]);

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
                pointerEvents: isLeaving && isLeavingCard ? "none" : "auto",
              }
            : {
                zIndex: displayStack.length - index,
                pointerEvents: isLeaving && isLeavingCard ? "none" : "auto",
              };

          return (
            <div
              key={ring.id}
              className={styles.swipeCard}
              style={cardStyle}
              onPointerDown={isTop ? handlePointerDown : undefined}
              onTouchStart={isTop ? handleTouchStart : undefined}
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
