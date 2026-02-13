"use client";

import React, { useState, useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { RiSearchLine } from "react-icons/ri";

import {
  arts,
  business,
  comedy,
  education,
  healthFitness,
  music,
} from "../../../../../public";
import Picture from "@/components/picture/Index";

interface Category {
  id: string;
  name: string;
  image: StaticImageData;
}

const categories: Category[] = [
  { id: "arts", name: "ARTS", image: arts },
  { id: "business", name: "BUSINESS", image: business },
  { id: "education", name: "EDUCATION", image: education },
  { id: "comedy", name: "COMEDY", image: comedy },
  { id: "health-fitness", name: "HEALTH & FITNESS", image: healthFitness },
  { id: "music", name: "MUSIC", image: music },
];

const CategoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <section className="px-3 sm:px-4 lg:px-6 mt-2 lg:mt-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="w-full max-w-md mb-6 lg:mb-8">
          <div className="relative w-full group">
            <input
              type="text"
              placeholder="Search for Categories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] text-gray-300 text-sm py-3 px-5 pr-12 rounded-full 
                       outline-none border border-transparent focus:border-[#FFCC00]/50 
                       transition-all duration-300 placeholder:text-gray-500"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <RiSearchLine size={18} />
            </div>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 pb-24 sm:pb-8">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group rounded-xl overflow-hidden bg-[#1A1A1A] cursor-pointer 
                       transition-transform duration-300 hover:scale-[1.03] 
                       focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/50">
              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden">
                <Picture
                  src={category.image}
                  alt={category.name}
                  className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Category Label Footer */}
              <div className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-left bg-[#1A1A1A]">
                <span className="text-white text-xs sm:text-sm font-bold tracking-wide">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
              <RiSearchLine size={48} className="mb-4 opacity-40" />
              <p className="text-sm">
                No categories found for &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
