"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import GoBack from "../../_components/GoBack";
import { APICall } from "@/components/utils/extra";
import PlaylistCard from "@/components/Cards/PlaylistCard";
import { getPlaylists } from "@/components/utils/endpoints";
import { RiSearchLine } from "react-icons/ri";

const Playlists = () => {
	const [perPage, setPerPage] = useState(8);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [totalPlaylists, setTotalPlaylists] = useState(null);

	const { data: playlistsData, isLoading } = useQuery(
		["playlists", currentPage, perPage, searchQuery],
		async () => {
			const response = await APICall(
				getPlaylists,
				[currentPage, perPage, searchQuery],
				false,
				false,
			); // Fetch 3 items
			const total = response?.data?.data?.data?.total;
			setTotalPlaylists(total);
			return response?.data?.data?.data;
		},
		{
			// staleTime: 1000 * 60 * 5,
		},
	);

	const playlists: Playlist[] = playlistsData?.data;

	const PlaylistCardSkeleton = () => {
		return (
			<div className='group relative bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl animate-pulse'>
				{/* Cover Image Skeleton */}
				<div className='relative mb-4'>
					<div className='w-full aspect-square bg-zinc-800 rounded-lg flex items-center justify-center'>
						<i className='fa-solid fa-music text-4xl text-zinc-700'></i>
					</div>
					{/* Play button skeleton (hidden during loading) */}
					<div className='absolute bottom-2 right-2 w-12 h-12 bg-zinc-700/50 rounded-full' />
				</div>

				{/* Title and Episode Count Skeleton */}
				<div className='space-y-3'>
					<div className='h-6 w-3/4 bg-zinc-800 rounded-md' />
					<div className='h-4 w-1/3 bg-zinc-800 rounded-md' />
				</div>

				{/* Footer Skeleton */}
				<div className='mt-4 pt-4 border-t border-zinc-800/50 flex items-center justify-between'>
					<div className='flex items-center gap-1'>
						<div className='h-3 w-3 bg-zinc-800 rounded' />
						<div className='h-3 w-12 bg-zinc-800 rounded' />
					</div>
					<div className='h-3 w-16 bg-zinc-800 rounded' />
				</div>
			</div>
		);
	};

	return (
		<div className='space-y-6 mt-10'>
			{/* Header */}
			<div className='space-y-8'>
				<GoBack />
				<div className='flex flex-col gap-1 px-2'>
					<h2 className='text-2xl font-bold text-white tracking-tight flex items-center gap-2'>
						Your Playlists
					</h2>
				</div>
			</div>
			<div className='w-full max-w-md mb-6 lg:mb-8'>
				<div className='relative w-full group'>
					<input
						type='text'
						placeholder='Search for Playlists'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='w-full bg-[#111111] text-gray-300 text-sm py-3 px-5 pr-12 rounded-full
                       outline-none border border-transparent focus:border-[#FFCC00]/50
                       transition-all duration-300 placeholder:text-gray-500'
					/>
					<div className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'>
						<RiSearchLine size={18} />
					</div>
				</div>
			</div>
			{/* Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2'>
				{isLoading
					? Array.from({ length: 3 }).map((_, i) => <PlaylistCardSkeleton />)
					: playlists.map((playlist, index) => (
							<PlaylistCard
								key={playlist.id}
								playlist={playlist}
								allPlaylists={playlists}
								index={index}
							/>
						))}
			</div>
			{totalPlaylists && totalPlaylists > perPage && (
				<div className='flex justify-center mt-8'>
					<div className='flex gap-2'>
						{Array.from({ length: Math.ceil(totalPlaylists / perPage) }).map(
							(_, index) => (
								<button
									key={index}
									className={`w-8 h-8 rounded-full flex items-center justify-center ${
										currentPage === index + 1
											? "bg-primary-500 text-white"
											: "bg-gray-700 text-gray-300"
									}`}
									onClick={() => setCurrentPage(index + 1)}
								>
									{index + 1}
								</button>
							),
						)}
					</div>
				</div>
			)}
			{!isLoading && playlists && playlists?.length === 0 && (
				<div className='col-span-full flex flex-col items-center justify-center py-16 text-gray-500'>
					<RiSearchLine size={48} className='mb-4 opacity-40' />
					<p className='text-sm'>
						No playlists found for &quot;{searchQuery}&quot;
					</p>
				</div>
			)}
		</div>
	);
};

export default Playlists;
