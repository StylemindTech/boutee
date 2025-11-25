import React, { useEffect, useState } from "react";
import { BadgeCheck, ExternalLink } from "lucide-react";
import StyleDNARadarChart from "./components/StyleDNARadarChart/StyleDNARadarChart";
import LikedRingsGrid from "./components/LikedRingsGrid/LikedRingsGrid";

const likedStorageKey = "previewLikedRings";
const profileStorageKey = "previewStyleProfile";

type LikedRing = {
  id: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  sourceUrl?: string;
};

type StyleProfile = Record<string, number>;

const StyleProfileTab: React.FC = () => {
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

  const [likedRings, setLikedRings] = useState<LikedRing[]>([]);
  const [profile, setProfile] = useState<StyleProfile>(defaultProfile);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(likedStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as LikedRing[];
      setLikedRings(parsed);
    } catch (err) {
      console.warn("[StyleProfileTab] Unable to read liked rings from storage", err);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(profileStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StyleProfile;
      if (parsed && typeof parsed === "object") {
        setProfile({ ...defaultProfile, ...parsed });
      }
    } catch (err) {
      console.warn("[StyleProfileTab] Unable to read profile from storage", err);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-3">
      <div className="rounded-[32px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col gap-4">
          <h3
            className="m-0 text-[1.125rem] font-[700] text-[var(--Text-Primary)] [font-family:var(--font-family-primary)]"
            style={{ fontFamily: "var(--font-family-primary)" }}
          >
            Your style profile
          </h3>
          <p className="text-[0.875rem] text-[#4b4f58]">
            Based on your swipes, here&apos;s an early snapshot. We will refine this once you create a free account.
          </p>
        </div>
        <StyleDNARadarChart userData={profile} noBackground />
        <button
          className="Button_button__rqctt Button_large__1HWt1 Button_normal__3bvFj inline-flex w-full items-center justify-center gap-2 rounded-[50px] border border-transparent bg-[#f0f1f5] text-[1rem] font-normal text-[#171719] antialiased transition-colors duration-200 ease-in-out cursor-pointer whitespace-nowrap"
          style={{ minHeight: "48px", padding: "14px 0" }}
        >
          <ExternalLink className="h-[15px] w-[15px] text-[#171719]" aria-hidden="true" />
          Strengthen your style profile on Boutee
        </button>
      </div>

      <section className="flex flex-col gap-3">
        <h3
          className="m-0 text-[1.125rem] font-[700] text-[var(--Text-Primary)] [font-family:var(--font-family-primary)]"
          style={{ fontFamily: "var(--font-family-primary)" }}
        >
          Liked rings
        </h3>

        {likedRings.length > 0 ? (
          <LikedRingsGrid items={likedRings} title="" interactive={false} />
        ) : (
          <div className="text-[0.875rem] text-[#4b4f58] bg-[#f5f6f8] border border-[#eceff2] rounded-2xl p-4">
            Like rings in the swipe experience to see them here.
          </div>
        )}
      </section>

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
          Create a free account to swipe through our entire collection of rings
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
  );
};

export default StyleProfileTab;
