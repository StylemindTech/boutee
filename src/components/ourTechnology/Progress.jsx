import React, { useState } from "react";
import ring1 from "../../assets/Image/dim1.png";
import ring2 from "../../assets/Image/dim2.png";
import ring3 from "../../assets/Image/dim3.png";
import ring4 from "../../assets/Image/dim4.png";

const rings = [
  {
    id: 1,
    image: ring1,
    attributes: {
      classic: 73,
      bold: 45,
      monotone: 20,
      organic: 17,
    },
  },
  {
    id: 2,
    image: ring2,
    attributes: {
      classic: 23,
      bold: 77,
      monotone: 27,
      organic: 52,
    },
  },
  {
    id: 3,
    image: ring3,
    attributes: {
      classic: 17,
      bold: 88,
      monotone: 19,
      organic: 61,
    },
  },
  {
    id: 4,
    image: ring4,
    attributes: {
      classic: 76,
      bold: 35,
      monotone: 27,
      organic: 17,
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
            src={ring.image.src}
            alt={`Ring ${ring.id}`}
            className={`aspect-[144/144] object-cover  rounded-[12px] cursor-pointer ${
              selectedRing.id === ring.id
                ? "border-[3px] border-[#D7F650]"
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
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">
              Classic
            </span>
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">
              Alternative
            </span>
          </div>
          {renderBar(selectedRing.attributes.classic, "classic")}
        </div>

        {/* Bold vs Minimalist */}
        <div>
          <div className="flex justify-between mb-[4px]">
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">
              Bold
            </span>
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">
              Minimalist
            </span>
          </div>
          {renderBar(selectedRing.attributes.bold, "bold")}
        </div>

        {/* Monotone vs Colourful */}
        <div>
          <div className="flex justify-between mb-[4px]">
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">
              Monotone
            </span>
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">
              Colourful
            </span>
          </div>
          {renderBar(selectedRing.attributes.monotone, "monotone")}
        </div>

        {/* Organic vs Refined */}
        <div>
          <div className="flex justify-between mb-[4px]">
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">
              Organic
            </span>
            <span className="font-figtree text-textPrimary font-normal text-[14px] leading-[18px]">
              Refined
            </span>
          </div>
          {renderBar(selectedRing.attributes.organic, "organic")}
        </div>
      </div>
    </div>
  );
}
