"use client";

import React, { useState } from "react";

interface FilterPillsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterPills = ({
  filters,
  activeFilter,
  onFilterChange,
}: FilterPillsProps) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            ${
              activeFilter === filter ?
                "bg-white text-black"
              : "bg-[#333333] text-gray-300 hover:bg-[#444444]"
            }`}>
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterPills;
