"use client";

import React from "react";
import SectionTitle from "@/components/reusables/SectionTitle";
import { useAppDispatch } from "@/components/Hooks";
import { setSearchValue } from "@/components/Redux/Share";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getKeywords } from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";
import { Skeleton } from "@heroui/react";

const SearchByPopularKeywords = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data: keywordsData, isLoading } = useQuery(
    ["popularKeywords"],
    async () => {
      const response = await APICall(getKeywords);
      return response.data?.data;
    },
    {
      staleTime: Infinity,
    },
  );

  const PopularKeywordsData: PodcastKeyword[] =
    keywordsData?.data?.data || keywordsData?.data || [];

  const handlePopularKeywordsClick = (name: string) => {
    router.push(`/search?${name}`);
    dispatch(setSearchValue(name));
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-col items-center lg:items-start px-2">
        <SectionTitle name="Search by popular keywords" />
      </div>

      <div className="flex justify-center lg:justify-start gap-2 sm:gap-3 mt-5 px-2 flex-wrap">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full bg-white/5" />
          ))}

        {PopularKeywordsData?.map((data) => (
          <button
            className="text-white font-semibold cursor-pointer lg:text-base text-sm bg-black-200/50 hover:bg-primary-600 transition-[.4] rounded-full lg:px-4 px-2.5 lg:py-2.5 py-2"
            key={data.id}
            onClick={() => handlePopularKeywordsClick(data.name)}>
            #{data.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchByPopularKeywords;
