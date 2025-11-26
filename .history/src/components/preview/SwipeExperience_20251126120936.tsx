import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import MobileOnlyGate from "./MobileOnlyGate";
import PreviewHeader from "./components/PreviewHeader/PreviewHeader";
import ProgressDots from "./components/ProgressDots/ProgressDots";
import SwipeIntroMessage from "./components/SwipeIntroMessage/SwipeIntroMessage";
import SwipeGuideModal from "./components/SwipeGuideModal/SwipeGuideModal";
import SwipeActions from "./components/SwipeActions/SwipeActions";
import RingCardStack, { type RingCard } from "./components/RingCardStack/RingCardStack";
import { db, ensureAnonAuth } from "../../lib/firebaseClient";

type SwipeDecision = {
  ringId: string;
  direction: "like" | "dislike";
};

type RingStyleProfile = Record<string, number>;

type RingWithStyle = RingCard & { styleProfile?: RingStyleProfile };

const fallbackRingDeck: RingCard[] = [
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
];

const SwipeExperience: React.FC = () => {
  const maxSwipes = 10;
  const likedStorageKey = "previewLikedRings";
  const profileStorageKey = "previewStyleProfile";

  const [ringDeck, setRingDeck] = useState<RingWithStyle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalRings, setTotalRings] = useState<number>(maxSwipes);
  const [swipes, setSwipes] = useState<SwipeDecision[]>([]);
  const [redirecting, setRedirecting] = useState(false);
  const [highlightDirection, setHighlightDirection] = useState<"left" | "right" | null>(null);
  const [guideOpen, setGuideOpen] = useState(true);
  const [loadingRings, setLoadingRings] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleClose = () => {
    if (typeof window === "undefined") return;
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = "/";
  };

  useEffect(() => {
    let isCancelled = false;

    const resetLikedStorage = () => {
      if (typeof window === "undefined") return;
      try {
        window.localStorage.setItem(likedStorageKey, "[]");
        window.localStorage.setItem(profileStorageKey, "");
      } catch (err) {
        console.warn("[SwipeExperience] Unable to reset liked storage", err);
      }
    };

    const fetchRings = async () => {
      try {
        setLoadingRings(true);
        setFetchError(null);
        const uid = await ensureAnonAuth();
        // Helpful diagnostics in browser console for env/auth
        console.log("[SwipeExperience] Authenticated as anonymous user:", uid);
        console.log("[SwipeExperience] Firebase project:", import.meta.env.PUBLIC_FIREBASE_PROJECT_ID);
        const ringsCollection = collection(db, "rings");
        const seed = Math.random();

        const randomQuerySlice = async (op: ">=" | "<") => {
          const q = query(
            ringsCollection,
            where("isDiscovery", "==", true),
            where("randomSeed", op, seed),
            orderBy("randomSeed"),
            limit(30)
          );
          const snap = await getDocs(q);
          return snap.docs;
        };

        let docs: typeof getDocs extends (...args: any) => Promise<infer R> ? R["docs"] : any = [];
        try {
          const first = await randomQuerySlice(">=");
          docs = [...first];
          if (docs.length < 30) {
            const wrap = await randomQuerySlice("<");
            docs = [...docs, ...wrap];
          }
        } catch (randError) {
          console.warn("[SwipeExperience] Random seed query failed, falling back to basic query", randError);
          const fallbackSnap = await getDocs(query(ringsCollection, where("isDiscovery", "==", true), limit(30)));
          docs = fallbackSnap.docs;
        }

        console.log("[SwipeExperience] Rings query size:", docs.length, "seed:", seed);
        const rings: RingWithStyle[] = docs
          .map((doc) => {
            const data = doc.data() as {
              imageUrl?: string;
              imageURL?: string;
              image_url?: string;
              image?: string;
              imgUrl?: string;
              imageUrls?: unknown;
              sourceUrl?: string;
              sourceURL?: string;
              source_url?: string;
              url?: string;
              metadata?: Record<string, unknown>;
              styleProfile?: RingStyleProfile;
            };

            const primaryImage =
              data.imageUrl || data.imageURL || data.image_url || data.image || data.imgUrl || data.url;

            let imageUrl = primaryImage;
            if (!imageUrl && data.imageUrls) {
              const imgField = data.imageUrls;
              if (Array.isArray(imgField)) {
                const stringUrl = imgField.find((item) => typeof item === "string" && item.trim().length > 0) as
                  | string
                  | undefined;
                const objectUrl = !stringUrl
                  ? (imgField.find(
                      (item) =>
                        item &&
                        typeof item === "object" &&
                        (item as any).url &&
                        typeof (item as any).url === "string"
                    ) as Record<string, unknown> | undefined)
                  : undefined;
                imageUrl =
                  stringUrl ||
                  (objectUrl && typeof objectUrl.url === "string" ? (objectUrl.url as string) : undefined) ||
                  undefined;
              } else if (typeof imgField === "string" && imgField.trim().length > 0) {
                imageUrl = imgField;
              }
            }

            const sourceUrl =
              data.sourceUrl ||
              data.sourceURL ||
              data.source_url ||
              (data.metadata && typeof data.metadata === "object" && (data.metadata as any).sourceUrl
                ? ((data.metadata as any).sourceUrl as string)
                : undefined);

            const styleProfile = data.styleProfile || (data.metadata && (data.metadata as any).styleProfile);

            if (!imageUrl) {
              console.warn("[SwipeExperience] Missing image field for ring doc:", doc.id, "keys:", Object.keys(data));
              return null;
            }
            return {
              id: doc.id,
              imageUrl,
              sourceUrl,
              styleProfile: typeof styleProfile === "object" ? (styleProfile as RingStyleProfile) : undefined,
            };
          })
          .filter(Boolean) as RingWithStyle[];
        console.log("[SwipeExperience] Rings after filtering:", rings.length);

        const shuffled = [...rings].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, maxSwipes);

        if (!isCancelled) {
          resetLikedStorage();
          const finalDeck = selected.length ? selected : fallbackRingDeck.slice(0, maxSwipes);
          if (!selected.length) {
            setFetchError("No rings returned from Firestore. Showing a sample deck.");
          }
          setRingDeck(finalDeck);
          setTotalRings(finalDeck.length);
          setCurrentIndex(0);
          setSwipes([]);
          setHighlightDirection(null);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("[SwipeExperience] Failed to fetch rings:", error);
          setFetchError("Unable to load rings right now. Showing a sample deck.");
          resetLikedStorage();
          const finalDeck = fallbackRingDeck.slice(0, maxSwipes);
          setRingDeck(finalDeck);
          setTotalRings(finalDeck.length);
          setCurrentIndex(0);
          setSwipes([]);
          setHighlightDirection(null);
        }
      } finally {
        if (!isCancelled) {
          setLoadingRings(false);
        }
      }
    };

    fetchRings();

    return () => {
      isCancelled = true;
    };
  }, [maxSwipes]);

  useEffect(() => {
    if (totalRings > 0 && swipes.length >= totalRings) {
      setRedirecting(true);
      const timer = setTimeout(() => {
        window.location.href = "/preview/results";
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [swipes.length, totalRings]);

  const baseStyleProfile: RingStyleProfile = {
    classic: 50,
    bold: 50,
    monotone: 50,
    organic: 50,
    alternative: 50,
    minimal: 50,
    colourful: 50,
    refined: 50,
  };

  const aggregateProfile = (liked: RingWithStyle[]): RingStyleProfile => {
    if (!liked.length) return baseStyleProfile;
    const sums: Record<string, { total: number; count: number }> = {};
    liked.forEach((ring) => {
      if (!ring.styleProfile) return;
      Object.entries(ring.styleProfile).forEach(([key, value]) => {
        if (typeof value !== "number") return;
        if (!sums[key]) sums[key] = { total: 0, count: 0 };
        sums[key].total += value;
        sums[key].count += 1;
      });
    });

    const result: RingStyleProfile = { ...baseStyleProfile };
    Object.entries(sums).forEach(([key, { total, count }]) => {
      result[key] = Math.round(total / count);
    });
    return result;
  };

  const persistLike = (ring: RingWithStyle) => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(likedStorageKey);
      const existing: RingWithStyle[] = raw ? (JSON.parse(raw) as RingWithStyle[]) : [];
      if (existing.some((item) => item.id === ring.id)) return;
      const next = [...existing, ring];
      window.localStorage.setItem(likedStorageKey, JSON.stringify(next));
      const profile = aggregateProfile(next);
      window.localStorage.setItem(profileStorageKey, JSON.stringify(profile));
    } catch (err) {
      console.warn("[SwipeExperience] Unable to persist liked ring", err);
    }
  };

  const handleSwipe = (direction: SwipeDecision["direction"]) => {
    if (!ringDeck.length || swipes.length >= totalRings || guideOpen || loadingRings) return;
    const ring = ringDeck[currentIndex % ringDeck.length];
    setSwipes((prev) => [...prev, { ringId: ring.id, direction }]);
    if (direction === "like") {
      persistLike(ring);
    }
    setCurrentIndex((prev) => prev + 1);
    setHighlightDirection(null);
  };

  const visibleRings = useMemo(() => {
    if (!ringDeck.length) return [];
    if (currentIndex >= ringDeck.length) return [];
    const remaining = ringDeck.slice(currentIndex, currentIndex + Math.min(4, ringDeck.length - currentIndex));
    return remaining;
  }, [currentIndex, ringDeck]);

  return (
    <MobileOnlyGate>
      <div className="relative bg-white text-[#171719] min-h-[100dvh] flex flex-col overflow-x-hidden">
        <PreviewHeader title="Start by swiping 10 rings" onClose={handleClose} />

        <div className="px-3 flex flex-col gap-4">
          <SwipeIntroMessage />
          <ProgressDots total={totalRings} completed={swipes.length} />
        </div>

        <div className="px-3 mt-6 flex-1 flex flex-col items-stretch gap-5 pb-[140px] overflow-hidden">
          <div className="w-full">
            <RingCardStack
              rings={visibleRings}
              onSwipe={(dir) => handleSwipe(dir === "left" ? "dislike" : "like")}
              onSwipeDirectionChange={(dir) => setHighlightDirection(dir)}
            />
          </div>
          {(redirecting || loadingRings || fetchError) && (
            <div className="text-center text-sm text-[#4b4f58] pb-4 space-y-1">
              {loadingRings && <p>Loading rings...</p>}
              {redirecting && <p>Building your matches...</p>}
              {fetchError && <p>{fetchError}</p>}
            </div>
          )}
        </div>

        <div
          className="fixed inset-x-0 bottom-0 px-3 pt-3 z-30"
          style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))", background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 35%)" }}
        >
          <div className="w-full mx-auto">
            <SwipeActions
              onDislike={() => handleSwipe("dislike")}
              onLike={() => handleSwipe("like")}
              disabled={redirecting || guideOpen || loadingRings}
              emphasizedDirection={highlightDirection === "left" ? "left" : highlightDirection === "right" ? "right" : null}
            />
          </div>
        </div>

        <SwipeGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
      </div>
    </MobileOnlyGate>
  );
};

export default SwipeExperience;
