"use client";

import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { setSearchValue } from "../Redux/Share";
import GlobalLoader from "../reusables/GlobalLoader";

interface SearchProps {
  className?: string;
}

export default function Search({ className }: SearchProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { searchValue } = useAppSelector((state) => state.share);
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
  };

  const handleSearch = () => {
    if (searchValue.length > 0) {
      startTransition(() => {
        router.push(`/search?${searchValue}`);
      });
    }
  };

  return (
    <>
      <div className={`relative w-full group ${className}`}>
        <input
          type="text"
          placeholder="Search by Podcast Name"
          className="w-full bg-black-700 text-gray-300 text-sm py-3 px-5 lg:py-3.5 lg:px-6 pr-12 rounded-full 
                   outline-none border border-transparent focus:border-primary-500/50 
                   transition-all duration-300 placeholder:text-gray-500"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          onClick={handleSearch}>
          <RiSearchLine size={18} className="lg:size-5" />
        </button>
      </div>
      <GlobalLoader isPending={isPending} />
    </>
  );
}
