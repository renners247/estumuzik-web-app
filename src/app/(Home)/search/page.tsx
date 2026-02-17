import { Suspense } from "react";
import { Metadata } from "next";
import Applayout from "@/components/globals/Applayout";
import SearchPage from "./_components/SearchPage";

export const metadata: Metadata = {
  title: "Search | Jolly Podcast",
  description: "Search for podcasts on Jolly Podcast",
};

const Page = () => {
  return (
    <Applayout className="px-2 lg:px-0 mt-4 lg:mt-16">
      <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
        <SearchPage />
      </Suspense>
    </Applayout>
  );
};

export default Page;
