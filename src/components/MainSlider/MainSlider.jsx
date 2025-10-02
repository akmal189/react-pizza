import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MainSlider() {
  return (
    <div className="w-full mx-auto pb-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="rounded-2xl shadow-lg"
      >
        <SwiperSlide>
          <div className="flex items-center justify-center  text-white text-2xl font-bold pt-[56%] relative md:pt-[36%]">
            <img src="/public/uploads/tpl25_56-min.webp" alt="tpl25_56-min" className="object-cover w-full h-full absolute top-0 left-0" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center text-white text-2xl font-bold pt-[56%] relative md:pt-[36%]">
            <img src="/public/uploads/tpl25_55254805_2.webp" alt="tpl25_55254805_2" className="object-cover w-full h-full absolute top-0 left-0" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
