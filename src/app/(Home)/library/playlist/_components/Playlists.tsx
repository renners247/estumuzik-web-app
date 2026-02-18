"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import GoBack from "../../_components/GoBack";
import { APICall } from "@/components/utils/extra";
import PlaylistCard from "@/components/Cards/PlaylistCard";
import {
  getPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} from "@/components/utils/endpoints";
import { RiSearchLine } from "react-icons/ri";
import { Plus } from "lucide-react";
import {
  PlaylistFormModal,
  PlaylistDeleteModal,
} from "@/components/Modal/PlaylistModals";

const Playlists = () => {
  const queryClient = useQueryClient();
  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPlaylists, setTotalPlaylists] = useState<number | null>(null);

  // Modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Playlist | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Playlist | null>(null);

  const { data: playlistsData, isLoading } = useQuery(
    ["playlists", currentPage, perPage, searchQuery],
    async () => {
      const response = await APICall(
        getPlaylists,
        [currentPage, perPage, searchQuery],
        false,
        false,
      );
      const total = response?.data?.data?.data?.total;
      setTotalPlaylists(total);
      return response?.data?.data?.data;
    },
  );

  const playlists: Playlist[] = playlistsData?.data;

  // ── Mutations ────────────────────────────────────────────────────────────────

  const createMutation = useMutation(
    (name: string) => APICall(createPlaylist, [{ name }], true, true),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["playlists"]);
        setIsCreateOpen(false);
      },
      onError: (error) => console.error("Create error:", error),
    },
  );

  const editMutation = useMutation(
    (name: string) =>
      APICall(updatePlaylist, [editTarget!.id, { name }], true, true),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["playlists"]);
        setEditTarget(null);
      },
      onError: (error) => console.error("Edit error:", error),
    },
  );

  const deleteMutation = useMutation(
    () => APICall(deletePlaylist, [deleteTarget!.id], true, true),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["playlists"]);
        setDeleteTarget(null);
      },
      onError: (error) => console.error("Delete error:", error),
    },
  );

  // ── Skeleton ─────────────────────────────────────────────────────────────────

  const PlaylistCardSkeleton = () => (
    <div className="group relative bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl animate-pulse">
      <div className="relative mb-4">
        <div className="w-full aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-music text-4xl text-zinc-700"></i>
        </div>
        <div className="absolute bottom-2 right-2 w-12 h-12 bg-zinc-700/50 rounded-full" />
      </div>
      <div className="space-y-3">
        <div className="h-6 w-3/4 bg-zinc-800 rounded-md" />
        <div className="h-4 w-1/3 bg-zinc-800 rounded-md" />
      </div>
      <div className="mt-4 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 bg-zinc-800 rounded" />
          <div className="h-3 w-12 bg-zinc-800 rounded" />
        </div>
        <div className="h-3 w-16 bg-zinc-800 rounded" />
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-6 mt-10">
        {/* Header */}
        <div className="space-y-8">
          <GoBack />
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Your Playlists
            </h2>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <Plus size={16} />
              New Playlist
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="w-full max-w-md mb-6 lg:mb-8">
          <div className="relative w-full group">
            <input
              type="text"
              placeholder="Search for Playlists"
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <PlaylistCardSkeleton key={i} />
              ))
            : playlists?.map((playlist, index) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  allPlaylists={playlists}
                  index={index}
                  onEdit={(p) => setEditTarget(p)}
                  onDelete={(p) => setDeleteTarget(p)}
                />
              ))}
        </div>

        {/* Pagination */}
        {totalPlaylists && totalPlaylists > perPage && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(totalPlaylists / perPage) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentPage === index + 1
                        ? "bg-primary-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && playlists?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
            <RiSearchLine size={48} className="mb-4 opacity-40" />
            <p className="text-sm">
              {searchQuery
                ? `No playlists found for "${searchQuery}"`
                : "You have no playlists yet. Create one!"}
            </p>
          </div>
        )}
      </div>

      {/* ── Modals ─────────────────────────────────────────────────────────────── */}

      {/* Create */}
      <PlaylistFormModal
        isOpen={isCreateOpen}
        onClose={() => {
          if (createMutation.isLoading) return;
          setIsCreateOpen(false);
        }}
        onConfirm={(name) => createMutation.mutate(name)}
        isLoading={createMutation.isLoading}
        mode="create"
      />

      {/* Edit */}
      <PlaylistFormModal
        isOpen={!!editTarget}
        onClose={() => {
          if (editMutation.isLoading) return;
          setEditTarget(null);
        }}
        onConfirm={(name) => editMutation.mutate(name)}
        isLoading={editMutation.isLoading}
        mode="edit"
        initialName={editTarget?.name ?? ""}
      />

      {/* Delete */}
      <PlaylistDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => {
          if (deleteMutation.isLoading) return;
          setDeleteTarget(null);
        }}
        onConfirm={() => deleteMutation.mutate()}
        isLoading={deleteMutation.isLoading}
        playlistName={deleteTarget?.name ?? ""}
      />
    </>
  );
};

export default Playlists;
