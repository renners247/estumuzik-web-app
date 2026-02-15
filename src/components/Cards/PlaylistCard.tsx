import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { formatDate } from "../utils/function";

interface PlaylistCardProps {
  playlist: Playlist;
  allPlaylists: Playlist[];
  index: number;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  allPlaylists,
  index,
}) => {
  // Logic to handle multiple images (collage style)
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

    // Grid of up to 4 images
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
    <Link href={`playlist/${playlist.id}`}>
      <div className="group relative bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer">
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
      </div>
    </Link>
  );
};

export default PlaylistCard;
