import React from "react";
import StyleDNARadarChart from "./components/StyleDNARadarChart/StyleDNARadarChart";
import LikedRingsGrid from "./components/LikedRingsGrid/LikedRingsGrid";

const StyleProfileTab: React.FC = () => {
  const profile = {
    classic: 58,
    bold: 45,
    monotone: 42,
    organic: 72,
    alternative: 63,
    minimal: 82,
    colourful: 38,
    refined: 70,
  };

  const likedRings = [
    { id: "lr-1", imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" },
    { id: "lr-2", imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=400&q=80" },
    { id: "lr-3", imageUrl: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80" },
    { id: "lr-4", imageUrl: "https://images.unsplash.com/photo-1524901548305-08eeddc35080?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#eceff2] p-6 pb-24">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.08em] text-[#73737d]">Style preview</p>
        <h3 className="text-xl font-bold text-[#171719]">Your style profile</h3>
        <p className="text-sm text-[#4b4f58]">
          Based on your swipes, here&apos;s an early snapshot. We will refine this once you create a free account.
        </p>
      </div>

      <div className="mt-6">
        <StyleDNARadarChart userData={profile} noBackground />
      </div>

      <div className="mt-8">
        <LikedRingsGrid items={likedRings} title="Liked rings" />
      </div>

      <a
        href="/app"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#171719] text-white font-semibold shadow-lg"
      >
        Improve/refine your style profile - continue here...
      </a>
    </div>
  );
};

export default StyleProfileTab;
