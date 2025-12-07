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

type StyleProfileTabProps = {
  isActive?: boolean;
};

const StyleProfileTab: React.FC<StyleProfileTabProps> = ({ isActive = true }) => {
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
  const [chartKey, setChartKey] = useState(0);

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

  useEffect(() => {
    if (isActive) {
      setChartKey((k) => k + 1);
    }
  }, [isActive]);

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
            Based on your swipes, here&apos;s an early snapshot of what we think you like. People with 10-15 liked rings have the most accurate style profiles.
          </p>
        </div>
        <StyleDNARadarChart key={chartKey} userData={profile} noBackground />
        <button
          className="Button_button__rqctt Button_large__1HWt1 Button_normal__3bvFj inline-flex w-full items-center justify-center gap-2 rounded-[50px] border border-transparent bg-[#171719] text-[1rem] font-normal text-white antialiased transition-colors duration-200 ease-in-out cursor-pointer whitespace-nowrap"
          style={{ minHeight: "48px", padding: "14px 0" }}
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = "https://app.boutee.co.uk/";
            }
          }}
        >
          <ExternalLink className="h-[15px] w-[15px] text-white" aria-hidden="true" />
          See Your Full Style Profile
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
            You didn't like any of the 10 random rings we showed you - sorry! There are over 1000 rings to swipe through once you create your free account.
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
