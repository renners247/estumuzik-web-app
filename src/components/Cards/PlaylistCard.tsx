"use client";

import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { formatDate } from "../utils/function";
import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

interface PlaylistCardProps {
  playlist: Playlist;
  allPlaylists: Playlist[];
  index: number;
  onEdit: (playlist: Playlist) => void;
  onDelete: (playlist: Playlist) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  allPlaylists,
  index,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderCover = () => {
    if (!playlist.images || playlist.images.length === 0) {
      return (
        <div className="w-full aspect-square bg-zinc-800 flex items-center justify-center rounded-lg">
          <i className="fa-solid fa-music text-4xl text-zinc-600"></i>
        </div>
      );
    }
    if (playlist.images.length === 1) {
      return (
        <img
          src={playlist.images[0]}
          alt={playlist.name}
          className="w-full aspect-square object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-500"
        />
      );
    }
    const displayImages = playlist.images.slice(0, 4);
    return (
      <div className="w-full aspect-square grid grid-cols-2 grid-rows-2 gap-0.5 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
        {displayImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt=""
            className="w-full h-full object-cover"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="group relative bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl hover:bg-zinc-800/50 transition-all duration-300">
      {/* Menu Button */}
      <div ref={menuRef} className="absolute top-4 right-4 z-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen((prev) => !prev);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          <MoreVertical size={15} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-9 w-36 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <button
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                onEdit(playlist);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <Pencil size={13} className="text-indigo-400" />
              Edit
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                onDelete(playlist);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-red-400 transition-colors"
            >
              <Trash2 size={13} className="text-red-400" />
              Delete
            </button>
          </div>
        )}
      </div>

      <Link href={`playlist/${playlist.id}`} className="block">
        <div className="relative mb-4">
          {renderCover()}
          <button className="absolute bottom-2 right-2 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-primary-500">
            <FaPlay className="text-xs ml-0.5" />
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-lg text-zinc-100 truncate group-hover:text-white">
            {playlist.name}
          </h3>
          <p className="text-zinc-400 text-sm font-medium">
            {playlist.episode_count}{" "}
            {playlist.episode_count === 1 ? "Episode" : "Episodes"}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800/50 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <i className="fa-regular fa-clock"></i>
            <span>{Math.ceil(playlist.total_duration / 60)} Mins</span>
          </div>
          <span>{formatDate(playlist.created_at)}</span>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistCard;
