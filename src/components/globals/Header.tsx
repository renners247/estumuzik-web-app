"use client";
import { useState } from "react";
import Picture from "../picture/Index";
// import { NaijaDreamsLogoMobile } from "../utils/function";

import { usePathname } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const ActionButton: React.FC<{ icon: React.ReactNode; hasDot?: boolean }> = ({
  icon,
  hasDot,
}) => (
  <button className="relative p-2.5 rounded-xl bg-gray_1-300 text-gray-400 hover:bg-gray_1-400 hover:text-white transition-all">
    <span className="text-xl">{icon}</span>
    {hasDot && (
      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-gray_1-300 rounded-full"></span>
    )}
  </button>
);

const Header = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between w-full lg:hidden pt-6">
        {/* <NaijaDreamsLogoMobile /> */}
        <div className="flex gap-2">
          <button className="w-16 py-2 lg:py-3 bg-primary-100 hover:bg-primary-100/90 text-black font-medium rounded-md lg:rounded-xl transition-all text-xs lg:text-sm active:scale-95 shadow-lg shadow-green-900/20">
            Register
          </button>
          <button className="w-16 py-2 lg:py-3 border border-primary-100 text-primary-100 hover:bg-primary-100/10 font-medium rounded-md lg:rounded-xl transition-all text-xs lg:text-sm active:scale-95">
            Log in
          </button>
        </div>
        <div className="flex items-center justify-between px-2 gap-2">
          <ActionButton
            icon={
              <Picture
                src={""}
                alt=""
                className="w-auto h-auto shrink-0"
              />
            }
          />
          <ActionButton
            icon={
              <Picture
                src={""}
                alt=""
                className="w-auto h-auto shrink-0"
              />
            }
          />
        </div>
      </div>
      <Picture
        src={""}
        alt=""
        className="w-auto h-auto hidden lg:block"
      />
      <div className="lg:hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-full"
          spaceBetween={0}
        >
          {["1", "2", "3"].map((index) => (
            <SwiperSlide key={index} className="pb-4">
              <Picture
                src={""}
                alt={`Banner ${index}`}
                className="w-full h-auto px-2 py-6"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Header;
