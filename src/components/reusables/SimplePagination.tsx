"use client";

import React from "react";

interface SimplePaginationProps {
  currentPage: number;
  totalContent: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

const SimplePagination: React.FC<SimplePaginationProps> = ({
  currentPage,
  totalContent,
  perPage,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalContent / perPage));

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8">
      <div className="flex gap-2 bg-[#1A1A1A] p-2 rounded-full border border-white/5">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
              currentPage === index + 1 ?
                "bg-[#FFCC00] text-black scale-110 shadow-lg shadow-[#FFCC00]/20"
              : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SimplePagination;
