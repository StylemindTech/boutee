import React, { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, ExternalLink } from "lucide-react";
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
  { key: "inPersonConsultations", label: "In-person consults" },
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

const Card: React.FC<{ jeweller: Jeweller; clipped?: boolean }> = ({ jeweller, clipped = false }) => {
  const [leftLoaded, setLeftLoaded] = useState(false);
  const [rightLoaded, setRightLoaded] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const gallery = jeweller.galleryImages && jeweller.galleryImages.length ? jeweller.galleryImages : [];
  const pills = jeweller.tags || [];
  const imgSizes = "(max-width: 640px) 100vw, 640px";
  return (
    <article
      className={`relative bg-white rounded-[32px] overflow-hidden shadow-[0px_4px_24px_#1617190f] px-3 ${clipped ? "max-h-[360px]" : ""}`}
    >
      <div className="relative p-0">
        <div className="relative -mx-3 w-[calc(100%+24px)] overflow-hidden">
          <span className="absolute left-3 top-3 z-20 rounded-full bg-gradient-to-r from-[#b9f551] to-[#ddf456] px-3 py-1 text-[12px] font-medium text-[#171719] shadow">
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
              onLoad={() => setLeftLoaded(true)}
              onError={() => setLeftLoaded(true)}
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
              onLoad={() => setRightLoaded(true)}
              onError={() => setRightLoaded(true)}
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
              onLoad={() => setAvatarLoaded(true)}
              onError={() => setAvatarLoaded(true)}
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
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#b9f551] text-[#0f1b03] shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              <span className="leading-none">{label}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="pb-4">
        <button
          className="Button_button__rqctt Button_large__1HWt1 Button_normal__3bvFj inline-flex w-full items-center justify-center gap-2 rounded-[50px] border border-transparent bg-[#f0f1f5] text-[1rem] font-normal text-[#171719] antialiased transition-colors duration-200 ease-in-out cursor-pointer whitespace-nowrap"
          style={{ minHeight: "48px", padding: "14px 0" }}
        >
          <ExternalLink className="h-[15px] w-[15px] text-[#171719]" aria-hidden="true" />
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
    </article>
  );
};

const JewellerMatchesTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [jewellers, setJewellers] = useState<Jeweller[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeJewellerCount, setActiveJewellerCount] = useState<number | null>(null);

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
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
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
  }, [profile]);

  return (
    <div className="flex flex-col gap-4 pb-6">
      <p className="text-sm text-[#4b4f58] leading-relaxed">
        Based on your liked rings, we think you'll like these jewellers:
      </p>

      {loading && <div className="text-sm text-[#4b4f58]">Loading jeweller matches...</div>}
      {error && <div className="text-sm text-red-700">{error}</div>}
      {!loading && !error && jewellers.length === 0 && (
        <div className="text-sm text-[#4b4f58]">No jeweller matches available right now.</div>
      )}

      <div className="relative flex flex-col gap-4">
        {!loading &&
          !error &&
          jewellers.slice(0, 4).map((jeweller) => <Card key={jeweller.id} jeweller={jeweller} />)}
        {!loading && !error && jewellers.length >= 4 && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 bottom-[-100px] z-40 h-[350px] w-screen"
            style={{
              transform: "translateX(-50%)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0.65) 100px, rgba(255,255,255,1) 150px, #ffffff 350px)",
            }}
          >
            <div
              className="pointer-events-auto absolute left-1/2 bottom-[100px] w-full max-w-[520px] -translate-x-1/2 px-3"
            >
              <button
                className="flex w-full items-center gap-3 rounded-[1rem] border border-[#c8c1f2] bg-white px-4 py-5 text-left text-[#73737d]"
                style={{ minHeight: "64px" }}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = "/signup";
                  }
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/boutee-app.firebasestorage.app/o/CustomerApp%2FIcons%2FInfo.svg?alt=media&token=b0d06b83-8598-4a31-9bdd-dc3a6e4f7365"
                  alt="Info"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                <span className="flex-1 text-[0.875rem] font-normal leading-tight">
                  {`You need to create a free account to see all ${activeJewellerCount ?? jewellers.length} of your jeweller matches`}
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

const CrossIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
