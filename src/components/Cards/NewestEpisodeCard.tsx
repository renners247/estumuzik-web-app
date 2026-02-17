"use client";
import { FaPause, FaPlay } from "react-icons/fa";
import Picture from "../picture/Index";
import { setIsEpisodeRegistered } from "../Redux/ToggleModal";
import { playPause, setActiveSong } from "../Redux/playerOne";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { useRouter } from "next/navigation";
import GlobalLoader from "../reusables/GlobalLoader";
import { useTransition } from "react";

const NewestEpisodeCard = ({
	episode,
	index,
	allEpisodes,
}: {
	episode: PodcastEpisode;
	index: number;
	allEpisodes: PodcastEpisode[];
}) => {
	const dispatch = useAppDispatch();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const { activeSong, isPlaying, isLoading } = useAppSelector(
		(state) => state.playerOne,
	);

	// Check if THIS specific card is the one playing
	const isCurrentActiveSong = activeSong?.id === episode.id;

	const handlePauseClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(playPause(false));
	};

	const handlePlayClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		// If it's already the active song but was paused, just resume
		if (isCurrentActiveSong) {
			dispatch(playPause(true));
		} else {
			// Otherwise, load this new song and its context
			dispatch(
				setActiveSong({
					song: episode,
					data: allEpisodes,
					index: index,
				}),
			);
		}
		// Reset modal states if necessary
		dispatch(setIsEpisodeRegistered(false));
	};

	const durationInMinutes = Math.ceil(episode.duration / 60);

	const dateObj = new Date(episode.created_at);
	const formattedDate = dateObj.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "2-digit",
	});

	// Pad index with leading zero if needed (01, 02...)
	const formattedIndex = (index + 1).toString().padStart(2, "0");

	return (
		<>
			<div className='flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors'>
				{/* Index */}
				<span className='text-gray-500 font-medium text-sm w-6 text-center shrink-0'>
					{formattedIndex}
				</span>

				{/* Image with Play Overlay */}
				<div className='relative size-14 sm:size-16 shrink-0 rounded-lg overflow-hidden'>
					<Picture
						src={episode.picture_url || "/placeholder.png"}
						alt={episode.title}
						className='object-cover size-full'
					/>
					<div
						className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
							isCurrentActiveSong
								? "opacity-100"
								: "opacity-0 group-hover:opacity-100"
						}`}
					>
						{isLoading && isCurrentActiveSong ? (
							<div className='size-8 rounded-full border-2 border-white/20 border-t-primary-500 animate-spin' />
						) : (
							<button
								onClick={
									isCurrentActiveSong && isPlaying
										? handlePauseClick
										: handlePlayClick
								}
								className='bg-primary-500 size-8 grid place-items-center rounded-full text-white shadow-lg hover:scale-110 transition-transform'
							>
								{isCurrentActiveSong && isPlaying ? (
									<FaPause className='text-xs' />
								) : (
									<FaPlay className='text-xs ml-0.5' />
								)}
							</button>
						)}
					</div>
				</div>

				{/* Details */}
				<div className='flex flex-col gap-1 min-w-0 flex-1'>
					<h3
						onClick={() => {
							startTransition(() => {
								router.push(`/episode/${episode?.id}`);
							});
						}}
						className='text-white font-bold text-sm sm:text-base line-clamp-1 group-hover:text-[#FFCC00] transition-colors'
					>
						{episode?.title}
					</h3>
					<p className='text-gray-400 text-xs line-clamp-2 leading-relaxed'>
						{/* Mobile: 1 line, Desktop: 2 lines if needed, logic handled by line-clamp */}
						{episode?.description}
					</p>
					<div className='flex items-center gap-2 text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5'>
						<span>{formattedDate}</span>
						<span>•</span>
						<span>{durationInMinutes} minutes</span>
					</div>
				</div>
			</div>

			<GlobalLoader isPending={isPending} />
		</>
	);
};
export default NewestEpisodeCard;
