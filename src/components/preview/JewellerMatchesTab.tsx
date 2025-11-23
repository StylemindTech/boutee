import React from "react";

type Jeweller = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  location: string;
  matchPercent: number;
  bannerLeft?: string;
  bannerRight?: string;
  avatar?: string;
  traits?: { label: string; status: "hit" | "miss" }[];
};

const placeholderRing =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><rect width='600' height='600' fill='%23ededf0'/><text x='50%' y='50%' font-family='Figtree,Arial' font-size='48' fill='%239197a3' text-anchor='middle' dominant-baseline='middle'>Ring</text></svg>";
const placeholderAvatar =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' rx='100' fill='%23ededf0'/><text x='50%' y='50%' font-family='Figtree,Arial' font-size='28' fill='%239197a3' text-anchor='middle' dominant-baseline='middle'>Profile</text></svg>";

const jewellers: Jeweller[] = [
  {
    id: "j-1",
    name: "Aurora Atelier",
    tagline: "Soft curves, hidden halos, and modern bezel details.",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=500&q=80",
    location: "London, UK",
    matchPercent: 92,
    bannerLeft: placeholderRing,
    bannerRight: placeholderRing,
    avatar: placeholderAvatar,
    traits: [
      { label: "4 weeks", status: "hit" },
      { label: "Warranty", status: "hit" },
      { label: "Ethical jeweller", status: "miss" },
    ],
  },
  {
    id: "j-2",
    name: "Arden & Finch",
    tagline: "Champagne diamonds, recycled gold, and minimal bands.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
    location: "Bristol, UK",
    matchPercent: 88,
    bannerLeft: placeholderRing,
    bannerRight: placeholderRing,
    avatar: placeholderAvatar,
    traits: [
      { label: "Custom design", status: "hit" },
      { label: "Recycled gold", status: "hit" },
      { label: "Ready in 6 weeks", status: "miss" },
    ],
  },
  {
    id: "j-3",
    name: "Stone & Sage",
    tagline: "Organic silhouettes with nature-inspired textures.",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=500&q=80",
    location: "Edinburgh, UK",
    matchPercent: 84,
    bannerLeft: placeholderRing,
    bannerRight: placeholderRing,
    avatar: placeholderAvatar,
    traits: [
      { label: "Nature-inspired", status: "hit" },
      { label: "Sustainable", status: "hit" },
      { label: "In-house stones", status: "miss" },
    ],
  },
  {
    id: "j-4",
    name: "Marais Atelier",
    tagline: "Parisian-inspired silhouettes with sculptural bezels.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80",
    location: "Manchester, UK",
    matchPercent: 81,
    bannerLeft: placeholderRing,
    bannerRight: placeholderRing,
    avatar: placeholderAvatar,
    traits: [
      { label: "Art deco", status: "hit" },
      { label: "Gem sourcing", status: "hit" },
      { label: "Ultra fast", status: "miss" },
    ],
  },
];

const Card: React.FC<{ jeweller: Jeweller; clipped?: boolean }> = ({ jeweller, clipped = false }) => {
  return (
    <article
      className={`relative bg-white rounded-3xl border border-[#eceff2] overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.04)] ${clipped ? "max-h-[360px]" : ""}`}
    >
      <div className="relative pt-7 pb-6 px-5">
        <div className="relative w-full aspect-[16/10] rounded-3xl bg-[#f5f6f8] overflow-hidden">
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#b9f551] to-[#ddf456] text-[#171719] text-[12px] font-medium shadow">
            {jeweller.matchPercent}% match
          </span>
          <img
            src={jeweller.bannerLeft || placeholderRing}
            alt={`${jeweller.name} left ring`}
            className="absolute left-4 top-[14%] h-[70%] w-[44%] object-cover rounded-2xl shadow-lg"
            loading="lazy"
          />
          <img
            src={jeweller.bannerRight || placeholderRing}
            alt={`${jeweller.name} right ring`}
            className="absolute right-4 top-[14%] h-[70%] w-[44%] object-cover rounded-2xl shadow-lg"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white shadow-lg border border-white/70 overflow-hidden flex items-center justify-center">
              <img
                src={jeweller.avatar || placeholderAvatar}
                alt={jeweller.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 text-center space-y-2">
          <h3 className="text-xl font-black text-[#171719]">{jeweller.name}</h3>
          <div className="flex items-center justify-center gap-2 text-sm text-[#73737d]">
            <LocationIcon />
            <span>{jeweller.location}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {(jeweller.traits || []).map((trait) => (
            <span
              key={trait.label}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm ${
                trait.status === "hit" ? "bg-[#e6f6ce] text-[#1d2b0e]" : "bg-[#edeff3] text-[#53575f]"
              }`}
            >
              {trait.status === "hit" ? <CheckIcon /> : <CrossIcon />}
              {trait.label}
            </span>
          ))}
        </div>
      </div>
      <div className="px-5 pb-5">
        <button className="w-full py-3 rounded-full border border-[#e5e7eb] text-sm font-semibold text-[#171719] bg-white">
          See more
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
  return (
    <div className="flex flex-col gap-4 pb-24">
      <p className="text-sm text-[#4b4f58] leading-relaxed">
        Based on your liked rings, we think you'll like these jewellers
      </p>
      {jewellers.map((jeweller, idx) => (
        <Card key={jeweller.id} jeweller={jeweller} clipped={idx === 3} />
      ))}

      <a
        href="/our-jewellers"
        className="mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#171719] text-white font-semibold shadow-lg"
      >
        Browse all jewellers on Boutee (it's free)
      </a>
    </div>
  );
};

export default JewellerMatchesTab;

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 10.5C19 15.5 12 20 12 20s-7-4.5-7-9.5a7 7 0 1 1 14 0Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m6 12 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
