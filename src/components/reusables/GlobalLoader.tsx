import React from "react";
import Picture from "../picture/Index";
import { RiLoader2Line } from "react-icons/ri";
import { logoImage } from "../../../public";

interface GlobalLoaderProps {
  classname?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
  isPending: boolean;
}

const GlobalLoader = ({
  classname,
  size = "lg",
  fullScreen = true,
  isPending,
}: GlobalLoaderProps) => {
  // Size configuration
  const sizeConfig = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  // Container classes based on fullScreen prop
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-black-100/10 backdrop-blur-sm"
    : "absolute inset-0 z-50 flex items-center justify-center";

  return (
    <>
      {isPending && (
        <div className={`${containerClasses} ${classname || ""}`}>
          <div className="relative flex items-center justify-center p-2">
            {/* Outer Ring - Clockwise */}
            <div className="absolute w-24 h-24 rounded-full border-b-2 border-primary-100/30 animate-spin"></div>

            {/* Inner Ring - Counter Clockwise */}
            <div className="absolute w-20 h-20 rounded-full border-t-2 border-primary-100 animate-[spin_1.5s_linear_infinite_reverse]"></div>

            <Picture
              src={logoImage}
              alt="loading-image"
              priority
              className="w-[25px] lg:w-[30px] relative z-10 animate-pulse"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalLoader;
