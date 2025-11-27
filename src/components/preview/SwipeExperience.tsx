import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { collection, doc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore";
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

const progressSteps = ["Analysing your swipes", "Searching Boutee jewellers", "Calculating match %"];

type SwipeExperienceProps = {
  disableAutoRedirect?: boolean;
  forceRedirectOverlay?: boolean;
};

const SwipeExperience: React.FC<SwipeExperienceProps> = ({
  disableAutoRedirect = false,
  forceRedirectOverlay = false,
}) => {
  const maxSwipes = 10;
  const likedStorageKey = "previewLikedRings";
  const profileStorageKey = "previewStyleProfile";
  const prefetchedMatchesKey = "previewPrefetchedMatches";

  const [ringDeck, setRingDeck] = useState<RingWithStyle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalRings, setTotalRings] = useState<number>(maxSwipes);
  const [swipes, setSwipes] = useState<SwipeDecision[]>([]);
  const [redirecting, setRedirecting] = useState(forceRedirectOverlay);
  const [completionStep, setCompletionStep] = useState(0);
  const [highlightDirection, setHighlightDirection] = useState<"left" | "right" | null>(null);
  const [guideOpen, setGuideOpen] = useState(true);
  const [loadingRings, setLoadingRings] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const prefetchingRef = useRef(false);

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
        const snap = await getDocs(query(ringsCollection, where("isDiscovery", "==", true), limit(60)));
        const docs = snap.docs;
        console.log("[SwipeExperience] Rings query size:", docs.length);
        const buildRings = (inputDocs: typeof docs) =>
          (inputDocs
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
                thumbnailUrl?: string;
                metadata?: Record<string, unknown>;
                styleProfile?: RingStyleProfile;
              };

              const primaryImage =
                data.imageUrl ||
                data.imageURL ||
                data.image_url ||
                data.image ||
                data.imgUrl ||
                data.url ||
                data.thumbnailUrl;

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

              if (!imageUrl) return null;
              return {
                id: doc.id,
                imageUrl,
                sourceUrl,
                styleProfile: typeof styleProfile === "object" ? (styleProfile as RingStyleProfile) : undefined,
              };
            })
            .filter(Boolean) as RingWithStyle[]);

        let rings: RingWithStyle[] = buildRings(docs);

        if (!rings.length) {
          console.warn("[SwipeExperience] No rings with images returned; trying simple discovery query");
          const basicSnap = await getDocs(query(collection(db, "rings"), where("isDiscovery", "==", true), limit(30)));
          rings = buildRings(basicSnap.docs);
        }

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
    if (disableAutoRedirect) return;
    if (totalRings > 0 && swipes.length >= totalRings) {
      setRedirecting(true);
    }
  }, [swipes.length, totalRings, disableAutoRedirect]);

  const baseStyleProfile = useMemo<RingStyleProfile>(
    () => ({
      classic: 50,
      bold: 50,
      monotone: 50,
      organic: 50,
      alternative: 50,
      minimal: 50,
      colourful: 50,
      refined: 50,
    }),
    []
  );

  const similarity = useCallback((user: RingStyleProfile, target?: RingStyleProfile) => {
    const defaultVal = 50;
    if (!target) return 0;
    const keys = Array.from(new Set([...Object.keys(user), ...Object.keys(target)]));
    if (!keys.length) return 0;
    const diffs = keys.map((k) => {
      const u = typeof user[k] === "number" ? (user[k] as number) : defaultVal;
      const t = typeof target[k] === "number" ? (target[k] as number) : defaultVal;
      return Math.abs(u - t);
    });
    const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
    return Math.max(0, Math.round(100 - avgDiff));
  }, []);

  const parseRingImage = useCallback((ring: any) => {
    if (ring.imageUrl) return ring.imageUrl;
    if (ring.image) return ring.image;
    if (ring.imgUrl) return ring.imgUrl;
    if (ring.url) return ring.url;
    if (ring.imageUrls) {
      const field = ring.imageUrls;
      if (Array.isArray(field)) {
        const stringUrl = field.find((item) => typeof item === "string" && item.trim().length > 0) as string | undefined;
        if (stringUrl) return stringUrl;
        const obj = field.find((item) => item && typeof item === "object" && (item as any).url) as Record<
          string,
          unknown
        >;
        if (obj && typeof obj.url === "string") return obj.url;
      } else if (typeof field === "string") {
        return field;
      }
    }
    if (ring.metadata && typeof ring.metadata === "object") {
      const metaUrl = (ring.metadata as any).imageUrl || (ring.metadata as any).url;
      if (typeof metaUrl === "string") return metaUrl;
    }
    return null;
  }, []);

  const prefetchResults = useCallback(async () => {
    if (prefetchingRef.current) return;
    prefetchingRef.current = true;
    try {
      await ensureAnonAuth();
      const profile = (() => {
        try {
          const raw = typeof window !== "undefined" ? window.localStorage.getItem(profileStorageKey) : null;
          if (raw) {
            const parsed = JSON.parse(raw) as RingStyleProfile;
            return { ...baseStyleProfile, ...parsed };
          }
        } catch (err) {
          console.warn("[SwipeExperience] Unable to parse profile for prefetch", err);
        }
        return baseStyleProfile;
      })();

      const jewellerSnap = await getDocs(query(collection(db, "jewellers"), where("active", "==", true), limit(20)));
      const jewellerDocs = jewellerSnap.docs.map((doc) => {
        const data = doc.data() as Record<string, any>;
        const tagsRaw = (data.tags || {}) as Record<string, boolean>;
        const tagOrder: Array<{ key: string; label: string }> = [
          { key: "madeUK", label: "Made in the UK" },
          { key: "ethicalJeweller", label: "Ethical jeweller" },
          { key: "offersWarranty", label: "Warranty" },
          { key: "emergingDesigner", label: "Emerging designer" },
          { key: "freeRingResizing", label: "Free resizing" },
          { key: "inPersonConsultations", label: "Online or in-person" },
          { key: "lgbtqOwned", label: "LGBTQ+ owned" },
          { key: "queerFriendly", label: "Queer-friendly" },
        ];
        const tags = tagOrder
          .filter((t) => tagsRaw[t.key])
          .map((t) => t.label)
          .slice(0, 3);
        return {
          id: doc.id,
          name: data.companyName || data.name || data.displayName || "Jeweller",
          tagline: data.tagline || data.bio || "",
          image: data.heroImage || data.bannerImage || data.image || "",
          avatar: data.profilePhoto || data.avatar || data.logo || "",
          location: data.location || data.city || "",
          styleProfile: data.styleProfile as RingStyleProfile | undefined,
          tags,
        };
      });

      const jewellersWithRings = await Promise.all(
        jewellerDocs.map(async (jeweller) => {
          try {
            const snap = await getDocs(query(collection(db, "rings"), where("jewellerId", "==", jeweller.id), limit(20)));
            const rings = snap.docs.map((doc) => {
              const data = doc.data() as Record<string, any>;
              return {
                id: doc.id,
                imageUrl: data.imageUrl,
                imageUrls: data.imageUrls,
                image: data.image,
                imgUrl: data.imgUrl,
                url: data.url,
                styleProfile: data.styleProfile || (data.metadata && data.metadata.styleProfile),
                metadata: data.metadata,
              };
            });
            const sortedByFit = rings
              .map((ring) => ({ ring, score: similarity(profile, ring.styleProfile) }))
              .sort((a, b) => b.score - a.score)
              .slice(0, 2)
              .map((entry) => parseRingImage(entry.ring))
              .filter(Boolean) as string[];
            return { ...jeweller, galleryImages: sortedByFit };
          } catch (err) {
            console.warn("[SwipeExperience] Unable to fetch rings for jeweller", jeweller.id, err);
            return { ...jeweller, galleryImages: [] };
          }
        })
      );

      const scored = jewellersWithRings
        .map((j) => ({
          ...j,
          matchPercent: similarity(profile, j.styleProfile),
        }))
        .sort((a, b) => b.matchPercent - a.matchPercent);

      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(prefetchedMatchesKey, JSON.stringify({ ts: Date.now(), jewellers: scored }));
      }
    } catch (err) {
      console.warn("[SwipeExperience] Prefetch of results failed", err);
    }
  }, [baseStyleProfile, parseRingImage, profileStorageKey, similarity]);

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

  useEffect(() => {
    if (!redirecting) {
      setCompletionStep(0);
      return;
    }
    prefetchResults();
    setCompletionStep(0);
    const stepTimers = [600, 1500, 2400].map((ms, idx) =>
      window.setTimeout(() => setCompletionStep(idx + 1), ms)
    );
    const redirectTimer =
      disableAutoRedirect || forceRedirectOverlay
        ? undefined
        : window.setTimeout(() => {
            window.location.href = "/preview/results";
          }, 3200);
    return () => {
      stepTimers.forEach((t) => window.clearTimeout(t));
      if (redirectTimer) window.clearTimeout(redirectTimer);
    };
  }, [redirecting, disableAutoRedirect, forceRedirectOverlay, prefetchResults]);

  const persistLike = async (ring: RingWithStyle) => {
    if (typeof window === "undefined") return;
    try {
      console.log("[SwipeExperience] Persisting like locally and to Firestore for ring:", ring.id);
      const raw = window.localStorage.getItem(likedStorageKey);
      const existing: RingWithStyle[] = raw ? (JSON.parse(raw) as RingWithStyle[]) : [];
      if (existing.some((item) => item.id === ring.id)) return;
      const next = [...existing, ring];
      window.localStorage.setItem(likedStorageKey, JSON.stringify(next));
      const profile = aggregateProfile(next);
      window.localStorage.setItem(profileStorageKey, JSON.stringify(profile));

      // Persist to Firestore for carry-over to linked accounts
      const uid = await ensureAnonAuth();
      if (!uid) {
        console.warn("[SwipeExperience] Missing UID for persisting likes; skipping Firestore sync");
        return;
      }
      const userDoc = doc(db, "users", uid);
      const previewDoc = doc(collection(userDoc, "preview"), "likes");
      const payload = {
        likedRings: next.map((item) => ({
          id: item.id,
          imageUrl: item.imageUrl,
          sourceUrl: item.sourceUrl,
          thumbnailUrl: item.imageUrl,
        })),
        profile,
        updatedAt: Date.now(),
      };
      try {
        await setDoc(previewDoc, payload, { merge: true });
        console.log("[SwipeExperience] Synced preview likes to Firestore for uid:", uid);
      } catch (firestoreErr) {
        console.error("[SwipeExperience] Firestore sync failed", firestoreErr, "payload:", payload);
      }
    } catch (err) {
      console.warn("[SwipeExperience] Unable to persist liked ring", err);
    }
  };

  const handleSwipe = (direction: SwipeDecision["direction"]) => {
    if (!ringDeck.length || swipes.length >= totalRings || guideOpen || loadingRings) return;
    const ring = ringDeck[currentIndex % ringDeck.length];
    setSwipes((prev) => {
      const next = [...prev, { ringId: ring.id, direction }];
      if (!disableAutoRedirect && next.length >= totalRings) {
        setRedirecting(true);
      }
      return next;
    });
    if (direction === "like") {
      persistLike(ring).catch((err) => console.error("[SwipeExperience] persistLike failed", err));
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
          {(loadingRings || fetchError) && (
            <div className="text-center text-sm text-[#4b4f58] pb-4 space-y-1">
              {loadingRings && <p>Loading rings...</p>}
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

        {redirecting && (
          <div className="absolute inset-0 bg-white/96 backdrop-blur-sm z-40 flex items-center justify-center px-4">
            <div className="w-full max-w-[360px] text-left flex flex-col gap-5">
              <h3
                className="m-0 text-[1.25rem] font-[700] text-[#171719]"
                style={{ fontFamily: "var(--font-family-primary)" }}
              >
                Calculating your matches
              </h3>
              <div className="flex flex-col gap-5">
                {progressSteps.map((label, idx) => {
                  const done = completionStep > idx;
                  return (
                    <div
                      key={label}
                      className="flex items-center gap-3 p-1 rounded-xl"
                      style={{
                        border: "none",
                        background: done ? "#f0f1f5" : "#fafafa",
                      }}
                    >
                      <div
                        className="h-7 w-7 p-1 rounded-full flex items-center justify-center border"
                        style={{
                          background: done ? "#b9f551" : "#fafafa",
                          borderColor: done ? "#b9f551" : "#d5d9e1",
                        }}
                      >
                        {done && (
                          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
                            <path
                              d="M4 8.5 6.5 11 12 5"
                              stroke="#0f1b03"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-[0.95rem] leading-tight ${
                          done ? "text-[#171719] font-semibold" : "text-[#4b4f58]"
                        }`}
                        style={{ fontFamily: "var(--font-family-primary)" }}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <SwipeGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
      </div>
    </MobileOnlyGate>
  );
};

export default SwipeExperience;
