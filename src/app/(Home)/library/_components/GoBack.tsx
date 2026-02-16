"use client";

import { useRouter } from "next/navigation";
import { BiChevronLeft } from "react-icons/bi";

const GoBack = () => {
  const router = useRouter();
  return (
    <button
      className="bg-black-100 border-1.5 border-white rounded-3xl text-white pl-2 pr-4 py-2 flex items-center"
      onClick={() => router.back()}
    >
      <BiChevronLeft className="text-2xl" /> Go Back
    </button>
  );
};

export default GoBack;
