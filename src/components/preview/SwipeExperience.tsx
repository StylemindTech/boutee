import React, { useEffect, useMemo, useState } from "react";
import MobileOnlyGate from "./MobileOnlyGate";
import PreviewHeader from "./components/PreviewHeader/PreviewHeader";
import ProgressDots from "./components/ProgressDots/ProgressDots";
import SwipeActions from "./components/SwipeActions/SwipeActions";
import RingCardStack, { type RingCard } from "./components/RingCardStack/RingCardStack";

type SwipeDecision = {
  ringId: string;
  direction: "like" | "dislike";
};

const SwipeExperience: React.FC = () => {
  const maxSwipes = 10;
  const ringDeck = useMemo<RingCard[]>(
    () => [
      {
        id: "ring-1",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        sourceUrl: "https://www.pinterest.com",
      },
      {
        id: "ring-2",
        imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80",
        sourceUrl: "https://www.pinterest.com",
      },
      {
        id: "ring-3",
        imageUrl: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80",
        sourceUrl: "https://www.pinterest.com",
      },
      {
        id: "ring-4",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        sourceUrl: "https://www.pinterest.com",
      },
      {
        id: "ring-5",
        imageUrl: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80",
        sourceUrl: "https://www.pinterest.com",
      },
      {
        id: "ring-6",
        imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80",
        sourceUrl: "https://www.pinterest.com",
      },
      {
        id: "ring-7",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        sourceUrl: "https://www.pinterest.com",
      },
      {
        id: "ring-8",
        imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80",
        sourceUrl: "https://www.pinterest.com",
      },
      {
        id: "ring-9",
        imageUrl: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80",
        sourceUrl: "https://www.pinterest.com",
      },
      {
        id: "ring-10",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        sourceUrl: "https://www.pinterest.com",
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipes, setSwipes] = useState<SwipeDecision[]>([]);
  const [redirecting, setRedirecting] = useState(false);
  const [highlightDirection, setHighlightDirection] = useState<"left" | "right" | null>(null);

  const handleClose = () => {
    if (typeof window === "undefined") return;
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = "/";
  };

  useEffect(() => {
    if (swipes.length >= maxSwipes) {
      setRedirecting(true);
      const timer = setTimeout(() => {
        window.location.href = "/preview/results";
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [swipes.length]);

  const handleSwipe = (direction: SwipeDecision["direction"]) => {
    if (swipes.length >= maxSwipes) return;
    const ring = ringDeck[currentIndex % ringDeck.length];
    setSwipes((prev) => [...prev, { ringId: ring.id, direction }]);
    setCurrentIndex((prev) => prev + 1);
    setHighlightDirection(null);
  };

  const visibleRings = useMemo(() => {
    const items: RingCard[] = [];
    for (let i = 0; i < 4; i += 1) {
      const ring = ringDeck[(currentIndex + i) % ringDeck.length];
      items.push(ring);
    }
    return items;
  }, [currentIndex, ringDeck]);

  return (
    <MobileOnlyGate>
      <div className="relative bg-[#f5f6f8] text-[#171719] min-h-screen flex flex-col">
        <PreviewHeader title="Build your style profile" onClose={handleClose} />

        <div className="px-4">
          <ProgressDots total={maxSwipes} completed={swipes.length} />
        </div>

        <div className="px-5 mt-6 flex-1 flex flex-col items-center gap-4">
          <RingCardStack
            rings={visibleRings}
            onSwipe={(dir) => handleSwipe(dir === "left" ? "dislike" : "like")}
            onSwipeDirectionChange={(dir) => setHighlightDirection(dir)}
          />

          <div className="w-full max-w-[520px] mx-auto mt-auto pb-6">
            <SwipeActions
              onDislike={() => handleSwipe("dislike")}
              onLike={() => handleSwipe("like")}
              disabled={redirecting}
              emphasizedDirection={highlightDirection === "left" ? "left" : highlightDirection === "right" ? "right" : null}
            />
          </div>
          {redirecting && (
            <p className="text-center text-sm text-[#4b4f58] pb-4">Building your matches...</p>
          )}
        </div>
      </div>
    </MobileOnlyGate>
  );
};

export default SwipeExperience;
