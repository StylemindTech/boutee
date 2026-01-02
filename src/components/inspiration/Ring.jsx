import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { doc, collection, documentId, getDocs, query, where, runTransaction, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import arrowDown from "../../assets/icons/dropdown-arrow.svg";
import closeIcon from "../../assets/icons/close-icon.svg";
import nextIcon from "../../assets/icons/next-arrow.svg";
import preIcon from "../../assets/icons/pre-arrow.svg";
import { auth, db, ensureAnonAuth } from "../../lib/firebaseClient";
import { optimizeImageUrl } from "../../lib/imageKit";

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><rect width='800' height='800' fill='%23f5f6f8'/><text x='50%' y='50%' font-family='Figtree,Arial' font-size='32' fill='%239197a3' text-anchor='middle' dominant-baseline='middle'>Ring image</text></svg>";

const BUDGET_BANDS = [
  { value: "any", label: "Any budget" },
  { value: "0-500", label: "Under £500", min: 0, max: 500 },
  { value: "500-1000", label: "£500 - £1,000", min: 500, max: 1000 },
  { value: "1000-1500", label: "£1,000 - £1,500", min: 1000, max: 1500 },
  { value: "1500-2000", label: "£1,500 - £2,000", min: 1500, max: 2000 },
  { value: "2000-2500", label: "£2,000 - £2,500", min: 2000, max: 2500 },
  { value: "2500-3000", label: "£2,500 - £3,000", min: 2500, max: 3000 },
  { value: "3000-3500", label: "£3,000 - £3,500", min: 3000, max: 3500 },
  { value: "3500-4000", label: "£3,500 - £4,000", min: 3500, max: 4000 },
  { value: "4000+", label: "£4,000+", min: 4000 },
];

const SORT_OPTIONS = [
  { value: "trending", label: "Trending" },
  { value: "popular", label: "Most popular" },
  { value: "recent", label: "Most recent" },
  { value: "priceDesc", label: "Price: high to low" },
  { value: "priceAsc", label: "Price: low to high" },
];

const normalizeLabel = (value) => {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

const normalizeArray = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input
      .map((item) => {
        if (typeof item === "string") return normalizeLabel(item);
        if (item && typeof item === "object" && typeof item.label === "string") return normalizeLabel(item.label);
        return "";
      })
      .filter(Boolean);
  }
  if (typeof input === "string") return [normalizeLabel(input)];
  return [];
};

const extractImages = (data) => {
  const images = [];
  const candidates = [
    data.imageUrl,
    data.imageURL,
    data.image_url,
    data.image,
    data.imgUrl,
    data.url,
    data.thumbnailUrl,
    data.thumbnail,
  ];

  candidates.forEach((item) => {
    if (typeof item === "string" && item.trim()) images.push(item.trim());
  });

  const fromArray = data.imageUrls;
  if (Array.isArray(fromArray)) {
    fromArray.forEach((item) => {
      if (typeof item === "string" && item.trim()) {
        images.push(item.trim());
        return;
      }
      if (item && typeof item === "object" && typeof item.url === "string") {
        images.push(item.url.trim());
      }
    });
  } else if (typeof fromArray === "string" && fromArray.trim()) {
    images.push(fromArray.trim());
  } else if (fromArray && typeof fromArray === "object" && typeof fromArray.url === "string") {
    images.push(fromArray.url.trim());
  }

  if (data.metadata && typeof data.metadata === "object") {
    const metaUrl = data.metadata.imageUrl || data.metadata.url;
    if (typeof metaUrl === "string" && metaUrl.trim()) images.push(metaUrl.trim());
  }

  return Array.from(new Set(images.filter((src) => typeof src === "string" && src.trim()))).map((src) => toSafeString(src, ""));
};

const parsePriceNumber = (value) => {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string") {
    const numeric = Number(value.replace(/[^\d.]/g, ""));
    return Number.isFinite(numeric) ? numeric : null;
  }
  return null;
};

const parseCountNumber = (value) => {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) return value;
  return 0;
};

const computeTrendingScore = (ring) => {
  const votes = parseCountNumber(ring.voteCount);
  const updated = typeof ring.updatedAt === "number" ? ring.updatedAt : 0;
  if (!updated) return votes;
  const ageHours = Math.max(1, (Date.now() - updated) / 3600000);
  return (votes + 1) / Math.pow(ageHours + 2, 1.5);
};

const formatPrice = (numberValue, fallback) => {
  if (typeof numberValue === "number" && Number.isFinite(numberValue)) {
    return `£${numberValue.toLocaleString("en-GB")}`;
  }
  if (typeof fallback === "string" && fallback.trim()) {
    return fallback.startsWith("£") ? fallback : `£${fallback}`;
  }
  return "Price on request";
};

const toSafeString = (value, fallback = "") => {
  if (value == null) return fallback;
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map((v) => toSafeString(v, "")).join(" ");
  if (typeof value === "object") {
    if (typeof value.__html === "string") return value.__html;
    const possible = value.text || value.content || value.description || value.title || value.value;
    if (typeof possible === "string" || typeof possible === "number") return String(possible);
  }
  return fallback;
};

const buildRingFromDoc = (doc) => {
  const data = doc.data() || {};
  const images = extractImages(data);
  const priceNumber = parsePriceNumber(data.price ?? data.metadata?.price);
  const gemstones = normalizeArray(data.gemstone || data.gemstones || data.stones);
  const metals = normalizeArray(data.metal || data.metals);
  const styles = normalizeArray(data.style || data.styles);
  const descriptionText = toSafeString(data.description || data.metadata?.description);
  const voteCount = parseCountNumber(data.voteCount);

  const updatedAt =
    (data.updatedAt && typeof data.updatedAt.toMillis === "function" ? data.updatedAt.toMillis() : data.updatedAt) ??
    (data.createdAt && typeof data.createdAt.toMillis === "function" ? data.createdAt.toMillis() : data.createdAt) ??
    null;

  return {
    id: doc.id,
    title: toSafeString(data.name || data.title || data.metadata?.name, "Untitled ring") || "Untitled ring",
    description: descriptionText,
    priceNumber,
    priceDisplay: toSafeString(formatPrice(priceNumber, data.price ?? data.metadata?.price), "Price on request"),
    metals,
    gemstones,
    styles,
    voteCount,
    images: images.length ? images : [FALLBACK_IMAGE],
    jewellerId: data.jewellerId || data.jewelerId || data.jewelleryId || null,
    updatedAt,
  };
};

const chunk = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const fetchJewellersMap = async (ids) => {
  const unique = Array.from(new Set(ids.filter((id) => typeof id === "string" && id.trim().length > 0)));
  if (!unique.length) return {};
  const map = {};

  for (const batch of chunk(unique, 10)) {
    try {
      const snap = await getDocs(
        query(collection(db, "jewellers"), where(documentId(), "in", batch), where("active", "==", true))
      );
      snap.forEach((docSnap) => {
        const data = docSnap.data() || {};
        map[docSnap.id] = {
          id: docSnap.id,
          companyName: toSafeString(data.companyName || data.name || data.displayName, "Jeweller"),
          profilePhoto: toSafeString(data.profilePhoto || data.avatar || data.logo, ""),
          active: Boolean(data.active),
        };
      });
    } catch (err) {
      console.warn(
        "[RingInspiration] Skipping a batch of jewellers due to permission error (likely deleted/inactive)",
        batch,
        err
      );
      // continue with next batch
    }
  }

  return map;
};

const containsReactNode = (value) => {
  if (!value) return false;
  if (typeof value === "object") {
    if (value.$$typeof) return true;
    if (Array.isArray(value)) return value.some(containsReactNode);
    return Object.values(value).some(containsReactNode);
  }
  return false;
};

const UpvoteIcon = ({ filled = false, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill={filled ? "currentColor" : "transparent"}
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4l7 8h-4v8h-6v-8H5z" />
  </svg>
);

export default function RingModal() {
  const [mounted, setMounted] = useState(false);
  const [rings, setRings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [slideIn, setSlideIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState(null);
  const [userVotes, setUserVotes] = useState({});
  const [votePending, setVotePending] = useState({});
  const [budgetFilters, setBudgetFilters] = useState([]);
  const [sortOrder, setSortOrder] = useState("trending");
  const [budgetDropdownOpen, setBudgetDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [modalImagesLoaded, setModalImagesLoaded] = useState({});
  const [avatarLoaded, setAvatarLoaded] = useState({});
  const dropdownRef = useRef(null);
  const sortRef = useRef(null);
  const itemsPerPage = 24;

  const openModal = useCallback((item) => {
    setSelectedItem(item);
    setModalImagesLoaded({});
    requestAnimationFrame(() => setSlideIn(true));
  }, []);

  const closeModal = useCallback(() => {
    setSlideIn(false);
    setTimeout(() => {
      setSelectedItem(null);
      setModalImagesLoaded({});
    }, 250);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid ?? null);
    });
    return () => unsub();
  }, []);

  const loadRings = useCallback(
    async (isCancelled) => {
      try {
        setLoading(true);
        setError("");
        const ringSnap = await getDocs(query(collection(db, "rings"), where("status", "==", "live")));
        const liveRings = ringSnap.docs.map(buildRingFromDoc).filter((ring) => ring.jewellerId);

        const jewellerMap = await fetchJewellersMap(liveRings.map((r) => r.jewellerId));
        const enriched = liveRings
          .map((ring) => ({
            ...ring,
            jeweller: ring.jewellerId ? jewellerMap[ring.jewellerId] : undefined,
          }))
          .filter((ring) => ring.jeweller && ring.jeweller.active)
          .filter(
            (ring) =>
              !containsReactNode(ring.title) &&
              !containsReactNode(ring.description) &&
              !containsReactNode(ring.priceDisplay) &&
              !containsReactNode(ring.images) &&
              !containsReactNode(ring.jeweller)
          );

        if (!isCancelled()) setRings(enriched);
      } catch (err) {
        console.error("[RingInspiration] Unable to load rings", err);
        if (!isCancelled()) setError("We couldn't load rings right now. Please try again in a moment.");
      } finally {
        if (!isCancelled()) setLoading(false);
      }
    },
    []
  );

  const fetchUserVotes = useCallback(
    async (uid, isCancelled) => {
      if (!uid) return;
      try {
        const voteSnap = await getDocs(query(collection(db, "ringVotes"), where("userId", "==", uid)));
        if (isCancelled()) return;
        const voteMap = {};
        voteSnap.forEach((voteDoc) => {
          const data = voteDoc.data() || {};
          if (typeof data.ringId === "string") {
            voteMap[data.ringId] = true;
          }
        });
        setUserVotes(voteMap);
      } catch (err) {
        console.error("[RingInspiration] Unable to fetch user votes", err);
      }
    },
    []
  );

  useEffect(() => {
    let cancelled = false;
    loadRings(() => cancelled).catch(() => {
      if (!cancelled) setError("We couldn't load rings right now. Please try again in a moment.");
    });
    return () => {
      cancelled = true;
    };
  }, [loadRings]);

  useEffect(() => {
    let cancelled = false;
    if (userId) {
      fetchUserVotes(userId, () => cancelled);
    } else {
      setUserVotes({});
    }
    return () => {
      cancelled = true;
    };
  }, [userId, fetchUserVotes]);

  const toggleBudget = (value) => {
    setBudgetFilters((prev) => {
      if (value === "any") {
        return prev.includes("any") ? prev.filter((v) => v !== "any") : ["any"];
      }
      const withoutAny = prev.filter((v) => v !== "any");
      return withoutAny.includes(value) ? withoutAny.filter((v) => v !== value) : [...withoutAny, value];
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [budgetFilters, sortOrder]);

  const filteredRings = useMemo(() => {
    const activeBudgets =
      budgetFilters.includes("any") || budgetFilters.length === 0
        ? []
        : BUDGET_BANDS.filter((b) => budgetFilters.includes(b.value));
    let list = [...rings];

    if (activeBudgets.length) {
      list = list.filter((ring) => {
        if (ring.priceNumber === null) return false;
        return activeBudgets.some((band) => {
          if (typeof band.min === "number" && ring.priceNumber < band.min) return false;
          if (typeof band.max === "number" && ring.priceNumber > band.max) return false;
          return true;
        });
      });
    }

    const byDate = (ring) => ring.updatedAt ?? 0;
    const byPrice = (ring) => ring.priceNumber ?? (sortOrder === "priceAsc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);
    const byVotes = (ring) => parseCountNumber(ring.voteCount);
    const byTrending = (ring) => computeTrendingScore(ring);

    return list.sort((a, b) => {
      if (sortOrder === "popular") return byVotes(b) - byVotes(a) || byDate(b) - byDate(a);
      if (sortOrder === "trending") {
        const diff = byTrending(b) - byTrending(a);
        return diff || byDate(b) - byDate(a) || byVotes(b) - byVotes(a);
      }
      if (sortOrder === "priceAsc") return byPrice(a) - byPrice(b);
      if (sortOrder === "priceDesc") return byPrice(b) - byPrice(a);
      return byDate(b) - byDate(a);
    });
  }, [rings, budgetFilters, sortOrder]);

  const totalPages = Math.ceil(filteredRings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredRings.slice(startIndex, startIndex + itemsPerPage);
  const budgetActiveCount = budgetFilters.includes("any") ? 0 : budgetFilters.length;
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3)
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  }, [totalPages, currentPage]);

  const handleEscClose = useCallback(
    (e) => {
      if (e.key === "Escape" && selectedItem) closeModal();
    },
    [selectedItem, closeModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [handleEscClose]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setBudgetDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const previousOverflow = document.body.style.overflow;
    if (selectedItem) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    return undefined;
  }, [selectedItem]);

  const getOrCreateUserId = useCallback(async () => {
    if (userId) return userId;
    const uid = await ensureAnonAuth();
    setUserId(uid);
    return uid;
  }, [userId]);

  const toggleVote = useCallback(
    async (ringId) => {
      if (!ringId || votePending[ringId]) return;
      setVotePending((prev) => ({ ...prev, [ringId]: true }));
      try {
        const uid = await getOrCreateUserId();
        const voteRef = doc(db, "ringVotes", `${ringId}_${uid}`);
        const ringRef = doc(db, "rings", ringId);

        const result = await runTransaction(db, async (transaction) => {
          const voteSnap = await transaction.get(voteRef);
          const ringSnap = await transaction.get(ringRef);
          if (!ringSnap.exists()) {
            throw new Error("Ring not found");
          }
          const currentCount = parseCountNumber(ringSnap.data()?.voteCount);

          if (!voteSnap.exists()) {
            transaction.set(voteRef, { ringId, userId: uid, createdAt: serverTimestamp() });
            transaction.set(ringRef, { voteCount: currentCount + 1 }, { merge: true });
            return { voted: true, newCount: currentCount + 1 };
          }

          const decremented = Math.max(0, currentCount - 1);
          transaction.delete(voteRef);
          transaction.set(ringRef, { voteCount: decremented }, { merge: true });
          return { voted: false, newCount: decremented };
        });

        setUserVotes((prev) => {
          const next = { ...prev };
          if (result.voted) next[ringId] = true;
          else delete next[ringId];
          return next;
        });

        setRings((prev) =>
          prev.map((ring) => (ring.id === ringId ? { ...ring, voteCount: result.newCount } : ring))
        );

        setSelectedItem((prev) => (prev && prev.id === ringId ? { ...prev, voteCount: result.newCount } : prev));
      } catch (err) {
        console.error("[RingInspiration] Unable to toggle vote", err);
      } finally {
        setVotePending((prev) => {
          const next = { ...prev };
          delete next[ringId];
          return next;
        });
      }
    },
    [getOrCreateUserId, votePending]
  );

  const heroImage = (ring) => optimizeImageUrl(ring.images[0], 600) || FALLBACK_IMAGE;
  const slideCount = selectedItem?.images?.length || 0;
  const multipleImages = slideCount > 1;
  const selectedUpvoted = selectedItem ? Boolean(userVotes[selectedItem.id]) : false;
  const selectedVoteCount = selectedItem ? parseCountNumber(selectedItem.voteCount) : 0;

  if (!mounted) {
    return null;
  }

  return (
    <div className="md:mt-[80px]">
      <div className="flex gap-3 w-full justify-center flex-wrap items-center">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => {
              setBudgetDropdownOpen((v) => !v);
              setSortDropdownOpen(false);
            }}
            className="flex items-center gap-2 py-2 px-3 bg-cardColor rounded-xl text-[16px] leading-[20px] text-textPrimary"
          >
            <span className="text-textSecondary">Budget:</span>
            <span className="font-figtree font-medium min-w-[120px] text-left">
              {budgetFilters.length === 0 || budgetFilters.includes("any")
                ? "Any budget"
                : `${budgetFilters.length} Selected`}
            </span>
            <img src={arrowDown.src} alt="toggle budget dropdown" className="w-4 h-4 rotate-180" />
          </button>

          {budgetDropdownOpen && (
            <div className="absolute z-30 mt-2 w-64 bg-white rounded-xl shadow-lg p-3">
              <div className="flex flex-col gap-2">
                {BUDGET_BANDS.filter((band) => band.value !== "any").map((band) => (
                  <label key={band.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={budgetFilters.includes(band.value)}
                      onChange={() => toggleBudget(band.value)}
                      className="p-1 rounded-[6px] border-2 border-textPrimary accent-textPrimary h-4 w-4"
                    />
                    <span className="font-figtree text-[14px] text-textPrimary">{band.label}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={budgetFilters.length === 0 || budgetFilters.includes("any")}
                    onChange={() => setBudgetFilters(["any"])}
                    className="p-1 rounded-[6px] border-2 border-textPrimary accent-textPrimary h-4 w-4"
                  />
                  <span className="font-figtree text-[14px] text-textPrimary">Any budget</span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={sortRef}>
          <button
            type="button"
            onClick={() => {
              setSortDropdownOpen((v) => !v);
              setBudgetDropdownOpen(false);
            }}
            className="hidden sm:flex items-center gap-2 py-2 px-3 bg-cardColor rounded-xl text-[16px] leading-[20px] text-textPrimary"
          >
            <span className="text-textSecondary">Sort by:</span>
            <span className="font-figtree font-medium min-w-[140px] text-left">
              {SORT_OPTIONS.find((o) => o.value === sortOrder)?.label || "Most recent"}
            </span>
            <img src={arrowDown.src} alt="toggle sort dropdown" className="w-4 h-4 rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => {
              setSortDropdownOpen((v) => !v);
              setBudgetDropdownOpen(false);
            }}
            className="sm:hidden flex items-center justify-center w-10 h-10 bg-cardColor rounded-xl text-textPrimary ml-auto"
            aria-label="Sort"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {sortDropdownOpen && (
            <div className="absolute z-30 mt-2 right-0 w-56 bg-white rounded-xl shadow-lg p-3">
              <div className="flex flex-col gap-2">
                {SORT_OPTIONS.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={sortOrder === option.value}
                      onChange={() => {
                        setSortOrder(option.value);
                        setSortDropdownOpen(false);
                      }}
                      className="p-1 rounded-[6px] border-2 border-textPrimary accent-textPrimary h-4 w-4"
                    />
                    <span className="font-figtree text-[14px] text-textPrimary">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-[24px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 text-textSecondary">
            <span className="loading-spinner" aria-hidden="true" />
            <p>Loading rings…</p>
          </div>
        ) : error ? (
          <p className="text-center text-textSecondary">{error}</p>
        ) : filteredRings.length === 0 ? (
          <p className="text-center text-textSecondary">No rings match your filters yet. Try adjusting the filters.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-[20px] gap-[16px] mt-[8px] overflow-hidden">
              {paginatedData.map((item) => {
                const upvoted = Boolean(userVotes[item.id]);
                const voteCount = parseCountNumber(item.voteCount);

                return (
                  <div
                    key={item.id}
                    onClick={() => openModal(item)}
                    data-aos="fade-up"
                    data-aos-once="true"
                    className="cursor-pointer rounded-xl overflow-hidden bg-white border border-transparent hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)] transition"
                  >
                    <div className="relative">
                      <img
                        src={heroImage(item)}
                        alt={item.title}
                        className={`w-full h-full object-cover aspect-square transition-opacity duration-500 ${
                          loadedImages[item.id] ? "opacity-100" : "opacity-0"
                        }`}
                        loading="lazy"
                        sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
                        fetchPriority={item.id === paginatedData[0]?.id ? "high" : "auto"}
                        onLoad={() => setLoadedImages((prev) => ({ ...prev, [item.id]: true }))}
                        onError={(e) => {
                          if (e.currentTarget.src !== FALLBACK_IMAGE) {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }
                          setLoadedImages((prev) => ({ ...prev, [item.id]: true }));
                        }}
                      />
                      {item.jeweller?.profilePhoto ? (
                        <span className="absolute top-2 left-2 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-cardColor">
                          <img
                            src={optimizeImageUrl(item.jeweller.profilePhoto, 140) || FALLBACK_IMAGE}
                            alt={item.jeweller.companyName || "Jeweller"}
                            className={`w-full h-full object-cover transition-opacity duration-500 ${
                              avatarLoaded[item.id] ? "opacity-100" : "opacity-0"
                            }`}
                            loading="lazy"
                            sizes="48px"
                            onLoad={() => setAvatarLoaded((prev) => ({ ...prev, [item.id]: true }))}
                            onError={(e) => {
                              if (e.currentTarget.src !== FALLBACK_IMAGE) {
                                e.currentTarget.src = FALLBACK_IMAGE;
                              }
                              setAvatarLoaded((prev) => ({ ...prev, [item.id]: true }));
                            }}
                          />
                        </span>
                      ) : null}
                    </div>
                    <div className="p-3 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] text-textPrimary font-figtree font-medium line-clamp-1">
                          {typeof item.title === "string" ? item.title : toSafeString(item.title, "")}
                        </p>
                        <p className="text-[14px] text-textSecondary font-figtree">
                          Price from{" "}
                          {typeof item.priceDisplay === "string" ? item.priceDisplay : toSafeString(item.priceDisplay, "")}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVote(item.id);
                        }}
                        disabled={votePending[item.id]}
                        aria-pressed={upvoted}
                        className={`group flex items-center gap-1 px-3 py-2 rounded-full border transition-colors ${
                          upvoted
                            ? "bg-[#DDF456] border-[#DDF456] text-black"
                            : "bg-[#eef1f4] border-transparent text-[#4a4f5a] group-hover:text-black"
                        } ${votePending[item.id] ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <UpvoteIcon
                          filled={upvoted}
                          className="w-5 h-5 transition-all group-hover:fill-current group-hover:text-black"
                        />
                        <span
                          className={`text-[14px] font-figtree font-semibold ${
                            upvoted ? "text-black" : "text-[#4a4f5a] group-hover:text-black"
                          }`}
                        >
                          {voteCount}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center md:mt-[80px] mt-[48px] gap-1 items-center">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-full ${currentPage === 1 ? " text-gray-400 cursor-not-allowed" : ""}`}
                  aria-label="Previous page"
                >
                  <img src={preIcon.src} alt="" className="cursor-pointer" />
                </button>

                {pageNumbers.map((page, idx) =>
                  page === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-textSecondary">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`cursor-pointer px-3 py-1 font-figtree rounded-[8px] min-w-[36px] h-[36px] ${
                        currentPage === page ? "bg-[#D6F99A] font-bold" : ""
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-full ${
                    currentPage === totalPages ? " text-gray-400 cursor-not-allowed" : ""
                  }`}
                  aria-label="Next page"
                >
                  <img src={nextIcon.src} alt="" className="cursor-pointer" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-end items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className={`md:w-[calc(100%_-_16px)] w-full relative md:max-w-[640px] md:mx-[8px] rounded-xl h-full md:h-[calc(100%_-_16px)] bg-white shadow-2xl transform transition-all duration-300 ease-in-out flex flex-col max-h-[calc(100vh-16px)] overflow-hidden ${
              slideIn ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <div className="flex justify-between items-center pt-[17px] pb-[9px] pl-[24px] pr-[28px] sticky top-0 bg-white z-20">
              <h5 className="lg:text-[22px] text-[16px] lg:leading-[26px] leading-[20px] text-textPrimary font-figtree">
                {selectedItem.title}
              </h5>
              <button onClick={() => closeModal()}>
                <img src={closeIcon.src} alt="close modal" className="w-[16.96px] h-[16.96px] cursor-pointer" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                spaceBetween={24}
                slidesPerView={1}
                loop={multipleImages}
                allowTouchMove={multipleImages}
                navigation={multipleImages}
                pagination={multipleImages ? { clickable: true } : false}
                autoplay={multipleImages ? { delay: 4000, disableOnInteraction: false } : false}
                className="swiper-modal w-full !pb-0"
              >
                {(selectedItem.images || [FALLBACK_IMAGE]).map((it, i) => (
                  <SwiperSlide key={`${selectedItem.id}-${i}`}>
                    <img
                      src={optimizeImageUrl(it, 900) || FALLBACK_IMAGE}
                      alt={selectedItem.title}
                      className={`w-full h-auto max-h-[520px] object-cover transition-opacity duration-500 ${
                        modalImagesLoaded[`${selectedItem.id}-${i}`] ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() =>
                        setModalImagesLoaded((prev) => ({
                          ...prev,
                          [`${selectedItem.id}-${i}`]: true,
                        }))
                      }
                      onError={(e) => {
                        if (e.currentTarget.src !== FALLBACK_IMAGE) {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }
                        setModalImagesLoaded((prev) => ({
                          ...prev,
                          [`${selectedItem.id}-${i}`]: true,
                        }));
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <style>{`
      .swiper-button-prev, .swiper-button-next {
        width: 38px; height: 38px; border-radius: 9999px;
        background: white; box-shadow: 0 4px 16px rgba(0,0,0,.08);
      }
      .swiper-button-prev:after, .swiper-button-next:after { font-size: 14px; color: black; }
      .swiper-pagination-bullet { opacity: .4; }
      .swiper-pagination-bullet-active { opacity: 1; background: black; }
    `}</style>
              <style>{`
                .loading-spinner {
                  width: 32px;
                  height: 32px;
                  border-radius: 9999px;
                  border: 3px solid #e5e7eb;
                  border-top-color: #171719;
                  animation: ring-spin 0.8s linear infinite;
                }
                @keyframes ring-spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>

              <div className="md:p-[24px] p-[16px] md:pt-0 mt-[10px] shadow-[0px_-3px_15px_0px_#5580C014] ms:rounded-0 md:shadow-none">
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center justify-between mb-[10px]">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-cardColor overflow-hidden border border-borderOutline flex items-center justify-center">
                        <img
                          src={optimizeImageUrl(selectedItem.jeweller?.profilePhoto, 220) || FALLBACK_IMAGE}
                          alt={selectedItem.jeweller?.companyName || "Jeweller"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <a
                      href="https://app.boutee.co.uk"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[16px] md:text-[18px] text-textPrimary font-ppradio font-semibold text-right hover:underline"
                    >
                      {selectedItem.jeweller?.companyName || "Jeweller"}
                    </a>
                  </div>

                  <p className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] font-figtree flex justify-between">
                    <span className="text-textSecondary">Price from:</span>
                    <span className="text-textPrimary">{selectedItem.priceDisplay}</span>
                  </p>
                  <p className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] font-figtree flex justify-between">
                    <span className="text-textSecondary">Metal:</span>
                    <span className="text-textPrimary">
                      {selectedItem.metals.length ? selectedItem.metals.join(", ") : "Not specified"}
                    </span>
                  </p>
                  <p className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] font-figtree flex justify-between">
                    <span className="text-textSecondary">Gemstone:</span>
                    <span className="text-textPrimary">
                      {selectedItem.gemstones.length ? selectedItem.gemstones.join(", ") : "Not specified"}
                    </span>
                  </p>
                  {selectedItem.styles.length ? (
                    <p className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] font-figtree flex justify-between">
                      <span className="text-textSecondary">Style:</span>
                      <span className="text-textPrimary">{selectedItem.styles.join(", ")}</span>
                    </p>
                  ) : null}
                </div>
                {selectedItem.description ? (
                  <div
                    className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] font-figtree text-textPrimary mt-[16px] space-y-2"
                    dangerouslySetInnerHTML={{ __html: selectedItem.description }}
                  />
                ) : null}
              </div>
            </div>

            <div className="px-[24px] py-[16px]">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <button
                  type="button"
                  onClick={() => toggleVote(selectedItem.id)}
                  disabled={votePending[selectedItem.id]}
                  aria-pressed={selectedUpvoted}
                  className={`group flex items-center justify-center gap-2 px-4 py-3 rounded-full border transition-colors ${
                    selectedUpvoted
                      ? "bg-[#DDF456] border-[#DDF456] text-black"
                      : "bg-[#eef1f4] border-transparent text-[#4a4f5a] group-hover:text-black"
                  } ${votePending[selectedItem.id] ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <UpvoteIcon
                    filled={selectedUpvoted}
                    className="w-5 h-5 transition-all group-hover:fill-current group-hover:text-black"
                  />
                  <span
                    className={`text-[16px] font-figtree font-semibold ${
                      selectedUpvoted ? "text-black" : "text-[#4a4f5a] group-hover:text-black"
                    }`}
                  >
                    {selectedVoteCount}
                  </span>
                  <span className={`text-[14px] font-figtree ${selectedUpvoted ? "text-black/80" : "text-[#6b7280]"}`}>
                    Upvote
                  </span>
                </button>

                <a
                  href="https://app.boutee.co.uk"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-textPrimary w-full h-[48px] text-white text-[16px] font-medium font-figtree rounded-[40px] flex items-center justify-center"
                >
                  View More On The Boutee App
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
