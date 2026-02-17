"use client";
import { FaCheck, FaPlus } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import Picture from "../picture/Index";
import React, { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import GlobalLoader from "../reusables/GlobalLoader";
import { getUserStatus } from "../utils/endpoints";
import { useQuery } from "react-query";
import { APICall } from "../utils/extra";

const TopJollyCard = ({ podcast }: { podcast: TopJollyPodcast }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [following, setFollowing] = React.useState(false);

  const { data: followStatus } = useQuery(
    ["userStatus", podcast?.user_id],
    async () => {
      const response = await APICall(
        getUserStatus,
        podcast?.user_id,
        false,
        false,
      );
      return response?.data?.data?.data;
    },
  );

  useEffect(() => {
    if (followStatus) {
      setFollowing(followStatus?.is_following);
    }
  }, [followStatus]);

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const fullUrl = `${window.location.origin}/podcast/${podcast.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: podcast.title,
          text: podcast.description,
          url: fullUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback or just log as requested, but copying is better UX
      try {
        await navigator.clipboard.writeText(fullUrl);
        // alert("Link copied to clipboard!"); // Optional
        console.log("Link copied to clipboard");
      } catch (err) {
        console.log("Failed to copy link");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col w-[200px] sm:w-[240px] shrink-0 group cursor-pointer bg-[#1A1A1A] p-3 rounded-2xl hover:bg-[#222] transition-colors">
        {/* Cover Image */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3">
          <Picture
            src={podcast.picture_url || "/placeholder.png"}
            alt={podcast.title}
            className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1 mb-4 h-[52px]">
          <h3
            onClick={() =>
              startTransition(() => {
                router.push(`/podcast/${podcast?.id}`);
              })
            }
            className="text-white font-bold text-base hover:text-primary-300 transition-[.3] leading-tight line-clamp-1">
            {podcast.title}
          </h3>
          <p className="text-gray-400 text-xs truncate">
            By:{" "}
            {podcast.author ||
              `${podcast.publisher?.first_name} ${podcast.publisher?.last_name}`}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            className={`flex-1 flex items-center justify-center gap-2 h-9 rounded-full text-xs font-bold transition-all duration-200
            ${
              following ?
                "bg-green_1-500 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}>
            {following ?
              <FaCheck size={10} />
            : <FaPlus size={10} />}
            {following ? "Following" : "Follow"}
          </button>

          <button
            onClick={handleNativeShare}
            className="size-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors border border-white/5 shrink-0">
            <IoShareSocialOutline size={16} />
          </button>
        </div>
      </div>

      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default TopJollyCard;
