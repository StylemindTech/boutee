import React, { useState } from "react";

const rings = [
  {
    id: 1,
    image: "/src/assets/Image/tech-1.png",
    attributes: {
      classic: 30,
      bold: 90,
      monotone: 10,
      organic: 95,
    },
  },
  {
    id: 2,
    image: "/src/assets/Image/tech-8.png",
    attributes: {
      classic: 70,
      bold: 10,
      monotone: 80,
      organic: 60,
    },
  },
  {
    id: 3,
    image: "/src/assets/Image/tech-5.png",
    attributes: {
      classic: 50,
      bold: 45,
      monotone: 50,
      organic: 55,
    },
  },
  {
    id: 4,
    image: "/src/assets/Image/tech-4.png",
    attributes: {
      classic: 40,
      bold: 70,
      monotone: 30,
      organic: 20,
    },
  },
];

export default function RingSelector() {
  const [selectedRing, setSelectedRing] = useState(rings[0]);

  const renderBar = (value, key) => (
    <div className="w-full bg-[#E3E4E8] h-1 rounded overflow-hidden">
      <div
        key={key}
        className="h-1 bg-textPrimary rounded transition-all duration-500 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <div className="lg:max-w-[600px]">
      {/* Ring Images */}
      <div className="grid grid-cols-4 gap-[8px]">
        {rings.map((ring) => (
          <img
            key={ring.id}
            src={ring.image}
            alt={`Ring ${ring.id}`}
            className={`aspect-[144/144] object-cover border-1  rounded-[12px] cursor-pointer ${
              selectedRing.id === ring.id
                ? "border-[#D7F650]"
                : "border-transparent"
            }`}
            onClick={() => setSelectedRing(ring)}
          />
        ))}
      </div>

      {/* Bars */}
      <div className="space-y-[12px] mt-[20px]">
        <div>
          <div className="flex justify-between mb-[4px]">
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">Classic</span>
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">Alternative</span>
          </div>
          {renderBar(selectedRing.attributes.classic, "classic")}
        </div>

        {/* Bold vs Minimalist */}
        <div>
          <div className="flex justify-between mb-[4px]">
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">Bold</span>
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">Minimalist</span>
          </div>
          {renderBar(selectedRing.attributes.bold, "bold")}
        </div>

        {/* Monotone vs Colourful */}
        <div>
          <div className="flex justify-between mb-[4px]">
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">Monotone</span>
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">Colourful</span>
          </div>
          {renderBar(selectedRing.attributes.monotone, "monotone")}
        </div>

        {/* Organic vs Refined */}
        <div>
          <div className="flex justify-between mb-[4px]">
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">Organic</span>
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">Refined</span>
          </div>
          {renderBar(selectedRing.attributes.organic, "organic")}
        </div>
      </div>
    </div>
  );
}