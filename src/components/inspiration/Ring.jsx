import { useState, useEffect } from "react";
import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import arrowDown from "../../assets/icons/dropdown-arrow.svg";
import img1 from "../../assets/Image/ins1.png";
import img2 from "../../assets/Image/ins2.png";
import img3 from "../../assets/Image/ins3.png";
import img4 from "../../assets/Image/ins4.png";
import img5 from "../../assets/Image/ins5.png";
import img6 from "../../assets/Image/ins6.png";
import img7 from "../../assets/Image/ins7.jpg";
import img8 from "../../assets/Image/ins8.png";
import img9 from "../../assets/Image/ins9.png";
import img10 from "../../assets/Image/ins10.png";
import img11 from "../../assets/Image/ins11.png";
import img12 from "../../assets/Image/ins12.png";
import closeIcon from "../../assets/icons/close-icon.svg";
import nextIcon from "../../assets/icons/next-arrow.svg";
import preIcon from "../../assets/icons/pre-arrow.svg";

const data = [
  {
    id: 1,
    title: "Oval Tanzanite Engagement Ring",
    images: [img1, img1],
    price: 1200,
    type: "Yellow gold",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
  {
    id: 2,
    title: "Emerald Cut Diamond Ring",
    images: [img2, img2],
    price: 1100,
    type: "Classic",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
  {
    id: 3,
    title: "Emerald Cut Diamond Ring",
    images: [img3, img3],
    price: 1100,
    type: "Classic",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
  {
    id: 4,
    title: "Round Brilliant Engagement Ring",
    images: [img4, img4],
    price: 1300,
    type: "Bold",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
  {
    id: 5,
    title: "Round Brilliant Engagement Ring",
    images: [img5, img5],
    price: 1300,
    type: "Bold",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
  {
    id: 6,
    title: "Round Brilliant Engagement Ring",
    images: [img6, img6],
    price: 1300,
    type: "Bold",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
  {
    id: 7,
    title: "Round Brilliant Engagement Ring",
    images: [img7, img7],
    price: 1300,
    type: "Bold",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
  {
    id: 8,
    title: "Round Brilliant Engagement Ring",
    images: [img8, img8],
    price: 1300,
    type: "Bold",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
  {
    id: 9,
    title: "Round Brilliant Engagement Ring",
    images: [img9, img9],
    price: 1300,
    type: "Bold",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
  {
    id: 10,
    title: "Round Brilliant Engagement Ring",
    images: [img10, img10],
    price: 1300,
    type: "Bold",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
  {
    id: 11,
    title: "Round Brilliant Engagement Ring",
    images: [img11, img11],
    price: 1300,
    type: "Bold",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
  {
    id: 12,
    title: "Round Brilliant Engagement Ring",
    images: [img12, img12],
    price: 1300,
    type: "Bold",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
  {
    id: 13,
    title: "Round Brilliant Engagement Ring",
    images: [img1, img1],
    price: 3300,
    type: "Bold",
    description:
      "A bespoke ring in this style will start at £1200. Opting for higher carat and quality gemstones and metal will increase the price accordingly. ",
  },
];

const filters = [
  "Yellow gold",
  "Classic",
  "Bold",
  "Colorful",
  "Organic",
  "Rose gold",
];

const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

export default function RingModal() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [shuffledData, setShuffledData] = useState([]);

  const [open, setOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    setShuffledData(shuffleArray(data));
  }, []);

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
    setCurrentPage(1);
  };

  const removeFilter = (filter) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
    setCurrentPage(1);
  };

  const filteredData =
    activeFilters.length > 0
      ? shuffledData.filter((item) => activeFilters.includes(item.type))
      : shuffledData;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="md:mt-[80px]">
      <div className="flex gap-4 w-full justify-center flex-nowrap">
        <div className="w-1/2 sm:w-auto flex items-center gap-2 py-2 px-3 bg-cardColor rounded-[12px] text-[16px] leading-[20px]">
          <span className="text-textSecondary">Budget:</span>
          <div className="relative flex-1">
            <select className="cursor-pointer w-full appearance-none bg-transparent outline-none pr-6">
              <option value="" className="!text-textPrimary !font-medium">
                Any
              </option>
            </select>
            <img
              src={arrowDown.src}
              alt="arrow icons"
              className="absolute right-1 top-3 -translate-y-1/2  pointer-events-none rotate-180 w-[16px] h-5"
            />
          </div>
        </div>

        <div className="lg:hidden relative w-1/2 sm:w-[155px]">
          {/* Filter Button */}
          <div
            onClick={() => setOpen(true)}
            className="h-9 py-2 px-3 bg-cardColor rounded-[12px] flex justify-between items-center"
          >
            <div className="flex items-center gap-1">
              <span className="font-figtree font-medium text-[16px] leading-[20px] text-textPrimary">
                Filters
              </span>
              {activeFilters.length > 0 && (
                <div className="text-[12px] w-[20px] h-[20px] flex items-center justify-center bg-[linear-gradient(76deg,#B9F551_22.87%,#D7F650_74.01%)] text-textPrimary font-medium rounded-full">
                  {activeFilters.length}
                </div>
              )}
            </div>
            <img
              src={arrowDown.src}
              alt="arrow icons"
              className="absolute right-3 top-4.5 -translate-y-1/2  pointer-events-none rotate-180 w-[16px] h-5"
            />
          </div>

          {/* Bottom Sheet */}
          {open && (
            <div className="fixed inset-0 bg-[#17171966] flex justify-center items-end z-50">
              <div className="w-full bg-white rounded-t-[25px] pb-[20px] px-4">
                {/* Drag Handle */}
                <div className="h-[36px]  p-4">
                  <div className="w-8 h-1 bg-[#79747E] rounded-full mx-auto "></div>
                </div>

                {/* Filter Options */}
                <div className="flex flex-col gap-2 mb-[32px]  pt-3 ">
                  {filters.map((f) => (
                    <label key={f} className="flex items-center gap-2 h-9">
                      <input
                        type="checkbox"
                        checked={activeFilters.includes(f)}
                        onChange={() => toggleFilter(f)}
                        className="p-1 rounded-[8px] border-2 border-textPrimary accent-textPrimary h-5 w-5"
                      />
                      <span className="font-figtree font-normal text-base leading-5 text-textPrimary">
                        {f}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="h-[36px] py-[8px] px-[16px]  rounded-[40px] bg-textPrimary font-figtree font-medium text-base leading-5 text-white w-full"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:flex gap-[16px] flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              className={`cursor-pointer filter-btn flex items-center py-[7px] px-[12px] text-[16px] leading-[20px] text-textPrimary border border-borderOutline rounded-full font-figtree ${
                activeFilters.includes(f) ? "bg-[#D6F99A]" : ""
              }`}
            >
              {f}
              {activeFilters.includes(f) && (
                <span
                  className="ml-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFilter(f);
                  }}
                >
                  <img src={closeIcon.src} alt="arrow icons" className="" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-[20px] gap-[16px] mt-[32px] overflow-hidden">
        {paginatedData.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="cursor-pointer hover:border md:rounded-[32px] rounded-[24px]"
          >
            <img
              src={item.images[0].src}
              alt={item.title}
              className="w-full h-auto md:rounded-[32px] rounded-[24px]"
              data-aos="fade-up"
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center md:mt-[80px] mt-[48px] gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-full ${
              currentPage === 1 ? " text-gray-400 cursor-not-allowed" : ""
            }`}
          >
            <img
              src={preIcon.src}
              alt="arrow icons"
              className="cursor-pointer"
            />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`cursor-pointer px-3 py-1 font-figtree rounded-[8px] w-[36px] h-[36px] ${
                currentPage === i + 1
                  ? "bg-[#D6F99A] font-bold w-[36px] h-[36px]"
                  : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-full ${
              currentPage === totalPages
                ? " text-gray-400 cursor-not-allowed"
                : ""
            }`}
          >
            <img
              src={nextIcon.src}
              alt="arrow icons"
              className="cursor-pointer"
            />
          </button>
        </div>
      )}

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/50 z-40 flex justify-end items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedItem(null);
          }}
        >
          <div className=" md:w-[calc(100%_-_16px)] w-full relative md:max-w-[520px] md:mx-[8px] md:rounded-[32px] h-full md:h-[calc(100%_-_16px)] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
            <div className="flex justify-between pt-[17px] pb-[9px] pl-[24px] pr-[28px]">
              <h5 className="lg:text-[22px] text-[16px] lg:leading-[26px] leading-[20px] text-textPrimary font-figtree">
                Ring info
              </h5>
              <button onClick={() => setSelectedItem(null)}>
                <img
                  src={closeIcon.src}
                  alt="arrow icons"
                  className="w-[16.96px] h-[16.96px] cursor-pointer"
                />
              </button>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay, A11y]}
              spaceBetween={24}
              slidesPerView={1}
              loop
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="!pb-[38px] swiper-modal w-full"
            >
              {selectedItem.images.map((it, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={it.src}
                    alt="ring"
                    className="w-full h-auto md:max-h-[520px] max-h-[375px] object-cover"
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

            <div className="flex-1 custom-scrollbar overflow-y-auto md:p-[24px] p-[16px] md:pt-0 mt-[30px] rounded-tl-[24px] rounded-tr-[24px] shadow-[0px_-3px_15px_0px_#5580C014] ms:rounded-0 md:shadow-none">
              <div className="flex flex-col gap-[8px]">
                <h2 className="text-[22px] text-textPrimary mb-[20px] font-medium leading-[26px] font-figtree">
                  {selectedItem.title}
                </h2>
                <p className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] font-figtree flex justify-between">
                  <span className="text-textSecondary">Price:</span>
                  <span className="text-textPrimary">
                    £{selectedItem.price}
                  </span>
                </p>
                <p className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] font-figtree flex justify-between">
                  <span className="text-textSecondary">Metal:</span>
                  <span className="text-textPrimary">18ct Yellow Gold</span>
                </p>
                <p className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] font-figtree flex justify-between">
                  <span className="text-textSecondary">Gemstone:</span>
                  <span className="text-textPrimary">Diamond</span>
                </p>
                <p className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] font-figtree flex justify-between">
                  <span className="text-textSecondary">Stone Type:</span>
                  <span className="text-textPrimary">Lab Grown</span>
                </p>
                <p className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] font-figtree flex justify-between">
                  <span className="text-textSecondary">Stone Size:</span>
                  <span className="text-textPrimary">0.72ct</span>
                </p>
                <p className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] font-figtree flex justify-between">
                  <span className="text-textSecondary">Color/Clarity</span>
                  <span className="text-textPrimary">E VVS2</span>
                </p>
              </div>
              <p className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] font-figtree text-textPrimary mt-[20px]">
                {selectedItem.description}
              </p>
            </div>

            <div className="px-[24px] py-[16px]">
              <button className="bg-textPrimary w-full h-[48px] text-white text-[16px] font-medium font-figtree rounded-[40px]">
                Sign Up to contact Jeweller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
