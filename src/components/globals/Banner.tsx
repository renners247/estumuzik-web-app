"use client";

import { useState } from "react";
// import { BannerType } from "../utils/constants";
import { IoCloseCircle } from "react-icons/io5";
import Picture from "@/components/picture/Index";

const Banner = ({ banner }: any) => {
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  const handleBannerOpen = () => {
    setIsBannerOpen(true);
  };

  const handleBannerClose = () => {
    setIsBannerOpen(false);
  };

  return (
    <>
      {isBannerOpen ? (
        <div className="w-full h-auto rounded-lg overflow-hidden">
          <div className="w-full h-full relative">
            {banner?.banner_image && (
              <div className="absolute inset-0">
                <Picture
                  src={banner?.banner_image}
                  alt="banner image"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" />
              </div>
            )}

            {/* Content */}
            <div className="space-y-1 px-8 pt-8 pb-10 w-full lg:w-1/2">
              <h4 className="text-xl text-white relative z-10 leading-normal font-semibold capitalize">
                {banner?.title}
              </h4>
              <p className="text-sm text-gray-300 relative z-10">
                {banner?.text}
              </p>
            </div>
            <button
              className="mb-4 group bg-black-100 rounded-full p-1 absolute top-2 right-2"
              type="button"
              onClick={handleBannerClose}
              title="close"
            >
              <IoCloseCircle color="white" size={24} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleBannerOpen}
          className="text-black-100 text-sm underline w-full flex justify-end"
        >
          Show banner
        </button>
      )}
    </>
  );
};

export default Banner;
