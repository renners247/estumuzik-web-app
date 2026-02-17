"use client";

import { useQuery } from "react-query";
import { FaStar } from "react-icons/fa";
import { getEditorPick } from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";
import EditorsPickCard from "@/components/Cards/EditorsPickCard";
import { Skeleton } from "@heroui/react";

const EditorsPick = () => {
  const { data: editorPickData, isLoading } = useQuery(
    ["editorPick"],
    async () => {
      const response = await APICall(getEditorPick, false, false);
      return response?.data?.data?.data;
    },
    {
      staleTime: 1000 * 60 * 5,
    },
  );

  const episode = editorPickData;

  return (
    <div className="space-y-4 mb-10">
      {/* Header */}
      <div className="flex items-center gap-2 px-2">
        <FaStar className="text-purple_1-100 text-2xl" />
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Editor's pick
        </h2>
      </div>

      {/* Card */}
      <div className="px-2">
        {isLoading ?
          <div className="w-full h-[250px] bg-bg-500 rounded-2xl p-6 flex gap-8 items-center">
            <Skeleton className="size-[200px] rounded-xl bg-white/5 shrink-0" />
            <div className="flex flex-col gap-4 w-full">
              <Skeleton className="h-6 w-32 rounded bg-white/5" />
              <Skeleton className="h-8 w-3/4 rounded bg-white/5" />
              <Skeleton className="h-20 w-full rounded bg-white/5" />
              <div className="flex gap-3">
                <Skeleton className="h-10 w-28 rounded-full bg-white/5" />
                <Skeleton className="size-10 rounded-full bg-white/5" />
              </div>
            </div>
          </div>
        : <EditorsPickCard episode={episode} />}
      </div>
    </div>
  );
};

export default EditorsPick;
