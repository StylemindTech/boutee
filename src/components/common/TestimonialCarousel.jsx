import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import rating from '../../assets/icons/rating.svg'
import userImage1 from '../../assets/Image/img-test.png'

function TestimonialCard({  review, name, location, userImage = '' }) {
  return (
    <div className="bg-white rounded-[32px] shadow-[0px_4px_12px_0px_#1617190F,0px_2px_6px_0px_#00000008] lg:p-[32px] p-[24px] h-full flex flex-col justify-between overflow-hidden">
      <img
        src={rating?.src}
        alt="stars"
        className="w-[152px]"
      />


      <p className="lg:text-[18px] mt-[20px] text-[16px] lg:leading-[22px] leading-[20px] text-textPrimary font-figtree mb-[20px]">
        {review}
      </p>

      <div className="mt-auto flex items-center gap-[8px]">
        {userImage && 
          <div>
          <img
            src={userImage1.src}
            alt="user"
            className="w-[40px] h-[40px] rounded-full"
          />
        </div>
        }
        <div>
          <h3 className="lg:text-[16px] text-[14px] lg:leading-[20px] font-bold leading-[18px] text-textPrimary font-figtree mb-[4px]">{name}</h3>
          <p className="lg:text-[16px] text-[14px] lg:leading-[20px] leading-[18px] text-textSecondary font-figtree">{location}</p>
        </div>
      </div>
    </div>
  );
}

export default function ResponsiveCarousel({ items = [] }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="md:!pb-30 !pb-22 lg:!pt-[80px] !pt-[40px] !px-[15px]"
      >
        {items.map((it, i) => (
          <SwiperSlide key={i}>
            <TestimonialCard {...it} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-prev, .swiper-button-next {
          width: 38px; height: 38px; border-radius: 9999px;
          background: white; z-index:999;
        }
        .swiper-button-prev:after, .swiper-button-next:after { font-size: 14px; color: black; }
        .swiper-pagination-bullet { opacity: .4; }
        .swiper-pagination-bullet-active { opacity: 1; background: black; }
      `}</style>
    </div>
  );
}