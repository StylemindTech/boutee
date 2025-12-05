import React, { useEffect, useMemo, useRef, useState } from "react";
import { BadgeCheck, Check, ExternalLink } from "lucide-react";
import { collection, getCountFromServer, getDocs, limit, query, where } from "firebase/firestore";
import { db, ensureAnonAuth } from "../../lib/firebaseClient";

type StyleProfile = Record<string, number>;

type Jeweller = {
  id: string;
  name: string;
  tagline?: string;
  image?: string;
  location?: string;
  matchPercent: number;
  avatar?: string;
  galleryImages?: string[];
  styleProfile?: StyleProfile;
  tags?: string[];
};

type RingDoc = {
  id: string;
  imageUrl?: string;
  imageUrls?: unknown;
  image?: string;
  imgUrl?: string;
  url?: string;
  styleProfile?: StyleProfile;
  metadata?: Record<string, unknown>;
};

const profileStorageKey = "previewStyleProfile";
const prefetchedMatchesKey = "previewPrefetchedMatches";

const placeholderRing =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><rect width='600' height='600' fill='%23ededf0'/><text x='50%' y='50%' font-family='Figtree,Arial' font-size='48' fill='%239197a3' text-anchor='middle' dominant-baseline='middle'>Ring</text></svg>";
const placeholderAvatar =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' rx='100' fill='%23ededf0'/><text x='50%' y='50%' font-family='Figtree,Arial' font-size='28' fill='%239197a3' text-anchor='middle' dominant-baseline='middle'>Profile</text></svg>";
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
const defaultProfile: StyleProfile = {
  classic: 50,
  bold: 50,
  monotone: 50,
  organic: 50,
  alternative: 50,
  minimal: 50,
  colourful: 50,
  refined: 50,
};

type Burst = { id: number; x: number; y: number; delay: number; w: number; h: number; r: number };

type ConfettiParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  color: string;
};

const createConfetti = (canvas: HTMLCanvasElement, originX: number, originY: number) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const particles: ConfettiParticle[] = Array.from({ length: 36 }, () => {
    const baseAngle = -Math.PI / 2; // upward
    const spread = (Math.PI * 5) / 6; // 150deg fan
    const angle = baseAngle + (Math.random() - 0.5) * spread;
    const speed = 8 + Math.random() * 6;
    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 6 + Math.random() * 8,
      alpha: 1,
      decay: 0.008 + Math.random() * 0.01,
      rotation: Math.random() * Math.PI * 2,
      color: Math.random() > 0.6 ? "#111113" : Math.random() > 0.5 ? "#1c1d22" : "#2b2c33",
    };
  });

  let raf: number | null = null;
  const step = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // gravity
      p.vx *= 0.99;
      p.vy *= 0.99;
      p.rotation += 0.12;
      p.alpha -= p.decay;
      if (p.alpha < 0) p.alpha = 0;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });

    if (particles.some((p) => p.alpha > 0.02)) {
      raf = window.requestAnimationFrame(step);
    }
  };

  step();
  return () => {
    if (raf) window.cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
};

const optimizeImageUrl = (url?: string, targetWidth = 640) => {
  if (!url) return url;
  try {
    const u = new URL(url);
    const sep = url.includes("?") ? "&" : "?";

    if (u.hostname.includes("pinimg.com")) {
      return url.replace(/\/(\d+)x\//, `/${Math.max(200, targetWidth)}x/`);
    }
    if (u.hostname.includes("unsplash.com")) {
      return `${url}${sep}auto=format&w=${targetWidth}`;
    }
    if (u.hostname.includes("firebasestorage.googleapis.com")) {
      return `${url}${sep}w=${targetWidth}`;
    }
  } catch {
    return url;
  }
  return url;
};

const Card: React.FC<{
  jeweller: Jeweller;
  clipped?: boolean;
  delayMs?: number;
  allReady?: boolean;
  onAssetLoaded?: () => void;
}> = ({ jeweller, clipped = false, delayMs = 0, allReady = false, onAssetLoaded }) => {
  const [leftLoaded, setLeftLoaded] = useState(false);
  const [rightLoaded, setRightLoaded] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [notifiedLeft, setNotifiedLeft] = useState(false);
  const [notifiedRight, setNotifiedRight] = useState(false);
  const [notifiedAvatar, setNotifiedAvatar] = useState(false);
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [overlayGone, setOverlayGone] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const hideTimerRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stopConfettiRef = useRef<(() => void) | null>(null);
  const gallery = jeweller.galleryImages && jeweller.galleryImages.length ? jeweller.galleryImages : [];
  const pills = jeweller.tags || [];
  const imgSizes = "(max-width: 640px) 100vw, 640px";

  useEffect(() => {
    const t = setTimeout(() => {
      window.requestAnimationFrame(() => setVisible(true));
    }, delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
      if (stopConfettiRef.current) stopConfettiRef.current();
    };
  }, []);

  const handleReveal = () => {
    if (revealed) return;
    const now = Date.now();
    setBursts(
      Array.from({ length: 22 }, (_, idx) => ({
        id: now + idx,
        x: Math.random() * 320 - 160,
        y: Math.random() * 260 - 130,
        delay: Math.random() * 140,
        w: 8 + Math.random() * 10,
        h: 3 + Math.random() * 8,
        r: Math.random() * 200 - 100,
      }))
    );
    if (typeof window !== "undefined" && canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      stopConfettiRef.current = createConfetti(canvas, (rect.width / 2) * dpr, (rect.height / 2) * dpr);
    }
    setRevealed(true);
    hideTimerRef.current = window.setTimeout(() => setOverlayGone(true), 260);
  };

  return (
    <article
      className={`relative bg-white rounded-[32px] overflow-hidden border border-[#f0f1f5] shadow-[0px_4px_24px_#1617190f] px-3 ${
        clipped ? "max-h-[360px]" : ""
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 500ms ease, transform 500ms ease",
      }}
    >
      <div className="relative p-0">
        <div className="relative -mx-3 w-[calc(100%+24px)] overflow-hidden">
          <span
            className="absolute left-3 top-3 z-20 rounded-full bg-[#171719] px-3 py-1 text-[12px] font-medium text-white shadow"
            style={{ display: "none" }}
            aria-hidden="true"
          >
            {jeweller.matchPercent}% match
          </span>
          <div className="flex h-[200px] w-full overflow-hidden">
            <img
              src={optimizeImageUrl(gallery[0]) || placeholderRing}
              srcSet={`${optimizeImageUrl(gallery[0], 360)} 360w, ${optimizeImageUrl(gallery[0], 640)} 640w, ${optimizeImageUrl(
                gallery[0],
                800
              )} 800w`}
              sizes={imgSizes}
              alt={`${jeweller.name} left ring`}
              className="h-[240px] w-1/2 object-cover object-center -translate-y-5"
            loading="lazy"
            decoding="async"
            onLoad={() => {
              setLeftLoaded(true);
              if (!notifiedLeft) {
                onAssetLoaded?.();
                setNotifiedLeft(true);
              }
            }}
            onError={() => {
              setLeftLoaded(true);
              if (!notifiedLeft) {
                onAssetLoaded?.();
                setNotifiedLeft(true);
              }
            }}
            style={{
              opacity: leftLoaded ? 1 : 0,
              transition: "opacity 220ms ease, transform 220ms ease",
              willChange: "opacity, transform",
            }}
            />
            <img
              src={optimizeImageUrl(gallery[1] || gallery[0]) || placeholderRing}
              srcSet={`${optimizeImageUrl(gallery[1] || gallery[0], 360)} 360w, ${optimizeImageUrl(
                gallery[1] || gallery[0],
                640
              )} 640w, ${optimizeImageUrl(gallery[1] || gallery[0], 800)} 800w`}
              sizes={imgSizes}
              alt={`${jeweller.name} right ring`}
              className="h-[240px] w-1/2 object-cover object-center -translate-y-5"
            loading="lazy"
            decoding="async"
            onLoad={() => {
              setRightLoaded(true);
              if (!notifiedRight) {
                onAssetLoaded?.();
                setNotifiedRight(true);
              }
            }}
            onError={() => {
              setRightLoaded(true);
              if (!notifiedRight) {
                onAssetLoaded?.();
                setNotifiedRight(true);
              }
            }}
            style={{
              opacity: rightLoaded ? 1 : 0,
              transition: "opacity 220ms ease, transform 220ms ease",
              willChange: "opacity, transform",
            }}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute left-1/2 z-50 flex -translate-x-1/2 items-center justify-center" style={{ top: "160px" }}>
          <div className="h-20 w-20 rounded-full bg-white p-1 shadow-[0px_4px_8px_#00000026]">
            <img
              src={optimizeImageUrl(jeweller.avatar, 320) || placeholderAvatar}
              alt={jeweller.name}
              className="h-full w-full rounded-full object-cover"
            loading="lazy"
            decoding="async"
            onLoad={() => {
              setAvatarLoaded(true);
              if (!notifiedAvatar) {
                onAssetLoaded?.();
                setNotifiedAvatar(true);
              }
            }}
            onError={() => {
              setAvatarLoaded(true);
              if (!notifiedAvatar) {
                onAssetLoaded?.();
                setNotifiedAvatar(true);
              }
            }}
            style={{
              opacity: avatarLoaded ? 1 : 0,
              transition: "opacity 200ms ease, transform 200ms ease",
              transform: avatarLoaded ? "scale(1)" : "scale(0.98)",
                willChange: "opacity, transform",
              }}
            />
          </div>
        </div>
        <div className="mt-12 text-center space-y-1">
          <h3
            className="m-0 text-[1.25rem] font-[700] text-[var(--Text-Primary)] [font-family:var(--font-family-primary)]"
            style={{ fontFamily: "var(--font-family-primary)" }}
          >
            {jeweller.name}
          </h3>
          <div className="flex items-center justify-center gap-1 text-[0.875rem] text-[#73737d]">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/boutee-app.firebasestorage.app/o/CustomerApp%2FIcons%2FLocation.svg?alt=media&token=cd310c6b-f797-4b87-95a7-9f2a48733470"
              alt=""
              className="h-4 w-4"
              aria-hidden="true"
            />
            <span>{jeweller.location}</span>
          </div>
        </div>
        <div className="mt-4 mb-4 flex flex-wrap justify-center gap-2">
          {pills.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f2f3f7] to-[#edeaef] py-1 pl-1 pr-2 text-[0.75rem] font-normal text-[#1d2130]"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#171719] text-white shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              <span className="leading-none">{label}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="pb-4">
        <button
          className="Button_button__rqctt Button_large__1HWt1 Button_normal__3bvFj inline-flex w-full items-center justify-center gap-2 rounded-[50px] border border-transparent bg-[#171719] text-[1rem] font-normal text-white antialiased transition-colors duration-200 ease-in-out cursor-pointer whitespace-nowrap"
          style={{ minHeight: "48px", padding: "14px 0", color: "#ffffff" }}
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = "https://app.boutee.co.uk/";
            }
          }}
        >
          <ExternalLink className="h-[15px] w-[15px] text-white" aria-hidden="true" />
          More From {jeweller.name}
        </button>
      </div>
      {clipped && (
        <div className="pointer-events-none absolute inset-0 flex items-end">
          <div className="w-full text-center text-sm font-semibold text-[#171719] pb-6 bg-gradient-to-b from-transparent via-white/80 to-white">
            Create a free account to see more matches!
          </div>
        </div>
      )}
      {!overlayGone && (
        <div
          className={`reveal-overlay ${revealed ? "reveal-overlay--revealed" : ""}`}
          style={{ borderRadius: "inherit" }}
        >
          {!revealed && (
            <button type="button" className="reveal-overlay__button" onClick={handleReveal}>
              Reveal
            </button>
          )}
          {!revealed &&
            bursts.map((burst) => (
              <span
                key={burst.id}
                className="reveal-burst"
                style={
                  {
                    "--x": `${burst.x}px`,
                    "--y": `${burst.y}px`,
                    "--delay": `${burst.delay}ms`,
                    "--w": `${burst.w}px`,
                    "--h": `${burst.h}px`,
                    "--r": `${burst.r}deg`,
                  } as React.CSSProperties
                }
              />
            ))}
        </div>
      )}
      <canvas ref={canvasRef} className="reveal-confetti-canvas" aria-hidden="true" />
    </article>
  );
};

const JewellerMatchesTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [jewellers, setJewellers] = useState<Jeweller[]>([]);
  const [hasPrefetched, setHasPrefetched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeJewellerCount, setActiveJewellerCount] = useState<number | null>(null);
  const [assetsLoaded, setAssetsLoaded] = useState(0);
  const [allAssetsReady, setAllAssetsReady] = useState(false);
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("jeweller-reveal-styles")) return;
    const style = document.createElement("style");
    style.id = "jeweller-reveal-styles";
    style.textContent = `
      .reveal-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.55);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 80;
        transition: background-color 260ms ease, transform 200ms ease, backdrop-filter 260ms ease;
        border-radius: inherit;
      }
      .reveal-overlay--revealed {
        background: rgba(255, 255, 255, 0);
        backdrop-filter: blur(0px);
        -webkit-backdrop-filter: blur(0px);
        transform: scale(0.94);
        pointer-events: none;
      }
      .reveal-overlay__button {
        padding: 14px 28px;
        border-radius: 999px;
        border: none;
        background: #171719;
        color: #ffffff;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.01em;
        box-shadow: 0 14px 36px rgba(0, 0, 0, 0.18);
        cursor: pointer;
        transition: transform 120ms ease, box-shadow 140ms ease, opacity 120ms ease;
      }
      .reveal-overlay__button:active {
        transform: translateY(1px) scale(0.99);
        box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);
      }
      .reveal-burst {
        position: absolute;
        top: 50%;
        left: 50%;
        width: var(--w, 10px);
        height: var(--h, 6px);
        border-radius: 3px;
        background: linear-gradient(135deg, #0d0d10 0%, #1d1e23 80%);
        box-shadow: 0 0 0 0 rgba(0,0,0,0.18), 0 0 10px rgba(0,0,0,0.15);
        opacity: 0;
        transform: translate(-50%, -50%) rotate(var(--r, 0deg)) scale(0.7);
        animation: reveal-burst 700ms ease-out forwards;
        animation-delay: var(--delay, 0ms);
        pointer-events: none;
        z-index: 90;
        mix-blend-mode: multiply;
      }
      .reveal-confetti-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 92;
      }
      @keyframes reveal-burst {
        0% { opacity: 0; transform: translate(calc(-50% + var(--x, 0px)), calc(-50% + var(--y, 0px))) rotate(var(--r, 0deg)) scale(0.6); filter: blur(0px); }
        30% { opacity: 0.9; }
        100% { opacity: 0; transform: translate(calc(-50% + var(--x, 0px)), calc(-50% + var(--y, 0px))) rotate(calc(var(--r, 0deg) + 40deg)) scale(1.9); filter: blur(2px); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const profile = useMemo<StyleProfile>(() => {
    if (typeof window === "undefined") return defaultProfile;
    try {
      const raw = window.localStorage.getItem(profileStorageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as StyleProfile;
        return { ...defaultProfile, ...parsed };
      }
    } catch (err) {
      console.warn("[JewellerMatchesTab] Unable to parse profile", err);
    }
    return defaultProfile;
  }, []);

  const similarity = (user: StyleProfile, target?: StyleProfile) => {
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
  };

  const parseRingImage = (ring: RingDoc) => {
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
    return placeholderRing;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem(prefetchedMatchesKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { ts?: number; jewellers?: Jeweller[] };
      if (parsed && Array.isArray(parsed.jewellers) && parsed.jewellers.length) {
        setJewellers(parsed.jewellers);
        setHasPrefetched(true);
        setLoading(false);
      }
    } catch (err) {
      console.warn("[JewellerMatchesTab] Unable to read prefetched matches", err);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        if (!hasPrefetched) setLoading(true);
        setError(null);
        await ensureAnonAuth();

        try {
          const totalSnap = await getCountFromServer(query(collection(db, "jewellers"), where("active", "==", true)));
          setActiveJewellerCount(totalSnap.data().count);
        } catch (err) {
          console.warn("[JewellerMatchesTab] Unable to fetch active jeweller count", err);
        }

        const jewellerSnap = await getDocs(
          query(collection(db, "jewellers"), where("active", "==", true), limit(20))
        );
        const jewellerDocs = jewellerSnap.docs.map((doc) => {
          const data = doc.data() as Record<string, any>;
          const tagsRaw = (data.tags || {}) as Record<string, boolean>;
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
            styleProfile: data.styleProfile,
            tags,
          } as Jeweller;
        });

        const ringPromises = jewellerDocs.map(async (jeweller) => {
          const snap = await getDocs(
            query(collection(db, "rings"), where("jewellerId", "==", jeweller.id), limit(20))
          );
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
            } as RingDoc;
          });
          const sortedByFit = rings
            .map((ring) => ({ ring, score: similarity(profile, ring.styleProfile) }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 2)
            .map((entry) => parseRingImage(entry.ring));
          return { ...jeweller, galleryImages: sortedByFit };
        });

        const jewellersWithRings = await Promise.all(ringPromises);
        const scored = jewellersWithRings
          .map((j) => ({
            ...j,
            matchPercent: similarity(profile, j.styleProfile),
          }))
          .sort((a, b) => b.matchPercent - a.matchPercent);

        if (!cancelled) {
          setJewellers(scored);
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem(prefetchedMatchesKey, JSON.stringify({ ts: Date.now(), jewellers: scored }));
          }
        }
      } catch (err: any) {
        console.error("[JewellerMatchesTab] Failed to load jewellers", err);
        if (!cancelled) setError("Unable to load jeweller matches right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [profile, hasPrefetched]);

  const displayedJewellers = useMemo(() => jewellers.slice(0, 4), [jewellers]);
  const totalAssets = displayedJewellers.length * 3;

  useEffect(() => {
    setAssetsLoaded(0);
    setAllAssetsReady(false);
  }, [totalAssets]);

  useEffect(() => {
    if (totalAssets > 0 && assetsLoaded >= totalAssets) {
      setAllAssetsReady(true);
    }
  }, [assetsLoaded, totalAssets]);

  return (
    <div className="flex flex-col gap-4 pb-3">
      <Intro />

      {loading && (
        <div className="flex w-full justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d1d5db] border-t-[#171719]" aria-label="Loading" />
        </div>
      )}
      {error && <div className="text-sm text-red-700">{error}</div>}
      {!loading && !error && jewellers.length === 0 && (
        <div className="text-sm text-[#4b4f58]">No jeweller matches available right now.</div>
      )}

      <div className="relative flex flex-col gap-4">
        {!loading &&
          !error &&
          displayedJewellers.map((jeweller, idx) => (
            <Card
              key={jeweller.id}
              jeweller={jeweller}
              delayMs={idx * 520}
              allReady={allAssetsReady}
              onAssetLoaded={() => setAssetsLoaded((c) => c + 1)}
            />
          ))}
        {!loading && !error && jewellers.length >= 4 && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 bottom-[-15px] z-40 h-[215px] w-screen"
            style={{
              transform: "translateX(-50%)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0.65) 65px, rgba(255,255,255,1) 120px, #ffffff 215px)",
            }}
          >
            <div
              className="pointer-events-auto absolute left-1/2 bottom-[12px] w-full max-w-[520px] -translate-x-1/2 px-3"
            >
              <button
                className="flex w-full items-center gap-3 rounded-[1rem] border border-[#c8c1f2] bg-white px-4 py-5 text-left text-[#73737d]"
                style={{ minHeight: "64px" }}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "https://app.boutee.co.uk/";
                }
              }}
            >
              <BadgeCheck className="h-5 w-5 text-[#73737d] shrink-0" aria-hidden="true" />
              <span className="flex-1 text-[0.875rem] font-normal leading-tight">
                  {`Create a free account to browse all ${activeJewellerCount ?? jewellers.length} Boutee jewellers and see your top ten matches`}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-[#73737d]"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default JewellerMatchesTab;

const Intro = () => (
  <div className="flex flex-col gap-2">
    <h3
      className="m-0 text-[1.125rem] font-[700] text-[var(--Text-Primary)] [font-family:var(--font-family-primary)]"
      style={{ fontFamily: "var(--font-family-primary)" }}
    >
      We think you'll like these Boutee jewellers
    </h3>
    <p className="m-0 text-sm text-[#4b4f58] leading-relaxed">
      Based on the answers you've given, we have 14 jewellers who we think you'll like! Here's a preview of the top 3:
    </p>
  </div>
);

const CrossIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
