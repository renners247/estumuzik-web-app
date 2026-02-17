"use client";

import React, { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiSearchLine } from "react-icons/ri";

import Picture from "@/components/picture/Index";
import { APICall } from "@/components/utils/extra";
import { categories } from "@/components/utils/endpoints";
import { useQuery } from "react-query";
import { Skeleton } from "@heroui/react";
import GlobalLoader from "@/components/reusables/GlobalLoader";

interface ApiSubCategory {
  name: string;
  image_url: string;
}

interface ApiCategory {
  name: string;
  categories: ApiSubCategory[];
  images: string[];
}

const CategoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categoriesData, isLoading: categoriesIsLoading } = useQuery(
    ["categories"],
    async () => {
      const response = await APICall(categories, false, false);
      return response?.data?.data;
    },
    {
      // staleTime: 30 * 1000, // Removed to allow refetch on mount/focus
      // refetchOnWindowFocus: false,
    },
  );

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCategoryClick = (categoryName: string) => {
    startTransition(() => {
      router.push(`/category/${categoryName.toLowerCase()}`);
    });
  };

  const apiCategories: ApiCategory[] = categoriesData?.data || [];

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return apiCategories;
    return apiCategories.filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, apiCategories]);

  return (
    <section className="px-3 sm:px-4 lg:px-6 mt-2 lg:mt-6">
      <div className="w-full max-w-7xl mx-auto">
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

        {/* Loading State */}
        {categoriesIsLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 pb-24 sm:pb-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-square rounded-xl bg-gray-800"
              />
            ))}
          </div>
        )}

        {/* Category Grid */}
        {!categoriesIsLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 pb-24 sm:pb-8">
            {filteredCategories.map((category, index) => {
              // Use the first image from the 'images' array, fallback to null/placeholder if empty
              const categoryImage =
                category.images && category.images.length > 0 ?
                  category.images[0]
                : "";

              return (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(category.name)}
                  className="group rounded-xl overflow-hidden bg-[#1A1A1A] cursor-pointer 
                          transition-transform duration-300 hover:scale-[1.03] 
                          focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/50">
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Picture
                      src={categoryImage}
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
                </div>
              );
            })}

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
        )}
      </div>
      <GlobalLoader isPending={isPending} />
    </section>
  );
};

export default CategoryPage;
