import React, { useMemo, useRef, useState } from "react";
import styles from "./LikedRingsGrid.module.css";

type LikedRing = {
  id: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  src?: string;
  alt?: string;
  title?: string;
  name?: string;
  ringName?: string;
};

type LikedRingsGridProps = {
  items: LikedRing[];
  onItemClick?: (ring: LikedRing) => void;
  title?: string;
};

const FALLBACK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='400' height='400' fill='%23ededf0'/><text x='50%' y='50%' font-family='Figtree,Arial' font-size='28' fill='%239197a3' text-anchor='middle' dominant-baseline='middle'>Ring</text></svg>";

const LikedRingsGrid: React.FC<LikedRingsGridProps> = ({ items, onItemClick, title = "Liked rings" }) => {
  const imgRefs = useRef<Record<string, HTMLImageElement | null>>({});
  const [status, setStatus] = useState<Record<string, "loading" | "loaded" | "error">>({});

  const prepared = useMemo(
    () =>
      items.map((item) => {
        const candidate = item.thumbnailUrl || item.thumbnailUrl || item.src || item.imageUrl || FALLBACK;
        return {
          item,
          src: candidate || FALLBACK,
          alt: item.alt || item.title || item.name || item.ringName || "Ring",
        };
      }),
    [items]
  );

  const handleError = (id: string) => {
    const ref = imgRefs.current[id];
    if (ref && ref.src !== FALLBACK) {
      ref.src = FALLBACK;
      return;
    }
    setStatus((prev) => ({ ...prev, [id]: "error" }));
  };

  const handleLoad = (id: string) => {
    setStatus((prev) => ({ ...prev, [id]: "loaded" }));
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
      </div>

      <div className={styles.grid}>
        {prepared.map(({ item, src, alt }) => {
          const s = status[item.id] || "loading";
          return (
            <button
              key={item.id}
              type="button"
              className={styles.gridItem}
              onClick={() => onItemClick?.(item)}
              aria-label={alt}
            >
              <img
                ref={(node) => {
                  imgRefs.current[item.id] = node;
                }}
                src={src}
                alt={alt}
                loading="lazy"
                className={`${styles.image} ${s === "loading" ? styles.imageLoading : ""} ${
                  s === "error" ? styles.imageError : ""
                }`}
                onLoad={() => handleLoad(item.id)}
                onError={() => handleError(item.id)}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default LikedRingsGrid;
