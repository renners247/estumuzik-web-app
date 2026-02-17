"use client";

import { useQuery } from "react-query";
import { Skeleton } from "@heroui/react";
import GoBack from "../../../_components/GoBack";
import { APICall } from "@/components/utils/extra";
import { getPlaylistsEpisodes } from "@/components/utils/endpoints"; // Ensure this is exported
import NewestEpisodeCard from "@/components/Cards/NewestEpisodeCard";

interface PlaylistIdProps {
	playlistId: string;
}

const PlaylistEpisodes = ({ playlistId }: PlaylistIdProps) => {
	const { data: playlistEpisodes, isLoading } = useQuery(
		["playlistEpisodes", playlistId],
		async () => {
			const response = await APICall(
				getPlaylistsEpisodes,
				[playlistId],
				false,
				false,
			);

			return response?.data?.data?.data;
		},
		{
			staleTime: 1000 * 60 * 5,
		},
	);

	const episodes: PodcastEpisode[] = playlistEpisodes?.data || [];

	return (
		<div className='space-y-6 mt-10'>
			{/* Header */}
			<div className='space-y-8'>
				<GoBack />
				<div className='flex items-center justify-between px-2'>
					<h2 className='text-2xl font-bold text-white tracking-tight'>
						Episodes in Playlist
					</h2>

					<button className='px-5 py-1.5 border border-white/20 text-xs font-bold text-white rounded-full uppercase hover:bg-white/10 transition-all'>
						See all
					</button>
				</div>
			</div>

			{/* Grid Layout */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-2'>
				{isLoading ? (
					Array.from({ length: 9 }).map((_, i) => (
						<div key={i} className='flex items-center gap-4'>
							<Skeleton className='w-6 h-4 rounded bg-white/5' />
							<Skeleton className='size-16 rounded-lg shrink-0 bg-white/5' />
							<div className='flex-1 space-y-2'>
								<Skeleton className='h-4 w-3/4 rounded bg-white/5' />
								<Skeleton className='h-3 w-full rounded bg-white/5' />
								<Skeleton className='h-3 w-1/2 rounded bg-white/5' />
							</div>
						</div>
					))
				) : episodes.length > 0 ? (
					episodes
						.slice(0, 9)
						.map((episode, index) => (
							<NewestEpisodeCard
								key={episode.id}
								episode={episode}
								index={index}
								allEpisodes={episodes}
							/>
						))
				) : (
					<h3 className='font-bold text-lg text-zinc-100 truncate group-hover:text-white'>
						No episodes found
					</h3>
				)}
			</div>
		</div>
	);
};

export default PlaylistEpisodes;
