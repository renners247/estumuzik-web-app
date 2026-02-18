"use client";

import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { APICall } from "@/components/utils/extra";
import {
	getPlaylists,
	addEpisodeToPlaylist,
	createPlaylist,
} from "../utils/endpoints";
import ConfirmAddModal from "./ConfirmAddModal";

interface AddToPlaylistModalProps {
	onClose: () => void;
	episode: PodcastEpisode;
}

// Loading skeleton for playlist items
const PlaylistSkeleton = () => (
	<div className='space-y-1'>
		{[...Array(4)].map((_, i) => (
			<div key={i} className='flex items-center gap-4 p-3 rounded-xl'>
				<div className='w-10 h-10 rounded-lg bg-zinc-800 animate-pulse flex-shrink-0' />
				<div className='flex-1 space-y-2'>
					<div className='h-3 bg-zinc-800 rounded-full animate-pulse w-3/4' />
					<div className='h-2 bg-zinc-800/60 rounded-full animate-pulse w-1/4' />
				</div>
			</div>
		))}
	</div>
);

const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({
	onClose,
	episode,
}) => {
	const queryClient = useQueryClient();

	const { data: playlistsData, isLoading: isLoadingPlaylists } = useQuery(
		["playlists"],
		async () => {
			const response = await APICall(getPlaylists, false, false);
			return response?.data?.data?.data;
		},
	);

	const playlists: Playlist[] = playlistsData?.data;

	const [searchQuery, setSearchQuery] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const [newPlaylistName, setNewPlaylistName] = useState("");
	const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
		null,
	);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	// Add episode to playlist mutation
	const addEpisodeMutation = useMutation(
		(playlistId: number) =>
			APICall(
				addEpisodeToPlaylist,
				[playlistId, { episode_id: episode.id }],
				true,
				true,
			),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["playlists"]);
				setIsConfirmOpen(false);
				setSelectedPlaylist(null);
				onClose();
			},
			onError: (error) => {
				console.error("Error adding episode to playlist:", error);
			},
		},
	);

	// Create playlist mutation
	const createPlaylistMutation = useMutation(
		(name: string) => APICall(createPlaylist, [{ name }], true, true),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["playlists"]);
				setNewPlaylistName("");
				setIsCreating(false);
			},
			onError: (error) => {
				console.error("Error creating playlist:", error);
			},
		},
	);

	const handlePlaylistClick = (playlist: Playlist) => {
		setSelectedPlaylist(playlist);
		setIsConfirmOpen(true);
	};

	const handleConfirmAdd = () => {
		if (!selectedPlaylist) return;
		addEpisodeMutation.mutate(selectedPlaylist.id);
	};

	const handleCloseConfirm = () => {
		if (addEpisodeMutation.isLoading) return;
		setIsConfirmOpen(false);
		setSelectedPlaylist(null);
	};

	const handleCreate = () => {
		if (!newPlaylistName.trim() || createPlaylistMutation.isLoading) return;
		createPlaylistMutation.mutate(newPlaylistName.trim());
	};

	const filteredPlaylists = playlists?.filter((p) =>
		p.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<>
			<div className='relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200'>
				{/* Header */}
				<div className='p-6 border-b border-zinc-900 flex items-center justify-between'>
					<div>
						<h2 className='text-xl font-bold text-white'>Add to playlist</h2>
						<p className='text-zinc-500 text-xs mt-1 truncate max-w-[280px]'>
							Adding:{" "}
							<span className='text-indigo-400 font-medium'>
								{episode.title}
							</span>
						</p>
					</div>
				</div>

				{/* Search / Create Toggle */}
				<div className='p-4 space-y-4'>
					{!isCreating ? (
						<div className='relative w-full group'>
							<input
								type='text'
								placeholder='Find a playlist...'
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
					) : (
						<div className='flex gap-2 animate-in slide-in-from-top-2 duration-200'>
							<input
								autoFocus
								type='text'
								placeholder='New playlist name...'
								value={newPlaylistName}
								onChange={(e) => setNewPlaylistName(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleCreate()}
								disabled={createPlaylistMutation.isLoading}
								className='flex-1 px-4 py-2 bg-zinc-900 border border-indigo-500/30 rounded-lg text-sm focus:outline-none focus:border-indigo-500 transition-all text-zinc-200 disabled:opacity-50'
							/>
							<button
								onClick={handleCreate}
								disabled={
									!newPlaylistName.trim() || createPlaylistMutation.isLoading
								}
								className='px-4 py-2 w-20 bg-primary-400 text-black-100 text-xs font-bold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
							>
								{createPlaylistMutation.isLoading ? (
									<div className='animate-spin rounded-full h-3.5 w-3.5 border-2 border-black-100 border-t-transparent' />
								) : (
									"Create"
								)}
							</button>
							<button
								onClick={() => {
									if (createPlaylistMutation.isLoading) return;
									setIsCreating(false);
									setNewPlaylistName("");
								}}
								disabled={createPlaylistMutation.isLoading}
								className='p-2 text-zinc-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
							>
								<i className='fa-solid fa-xmark'></i>
							</button>
						</div>
					)}
				</div>

				{/* Playlist List */}
				<div className='flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin'>
					{!isCreating && (
						<button
							onClick={() => setIsCreating(true)}
							className='w-full flex items-center gap-4 p-3 rounded-xl hover:bg-indigo-600/10 group transition-all mb-2'
						>
							<div className='w-10 h-10 rounded-lg bg-zinc-900 border border-dashed border-zinc-700 flex items-center justify-center group-hover:border-indigo-500 group-hover:bg-indigo-600/20 transition-all'>
								<span className='text-zinc-500 group-hover:text-indigo-400 text-xl'>
									+
								</span>
							</div>
							<span className='text-sm font-bold text-zinc-300 group-hover:text-white'>
								Create new playlist
							</span>
						</button>
					)}

					<div className='space-y-1'>
						{isLoadingPlaylists ? (
							<PlaylistSkeleton />
						) : (
							<>
								{filteredPlaylists?.map((playlist) => (
									<button
										key={playlist.id}
										onClick={() => handlePlaylistClick(playlist)}
										className='w-full flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-800/50 group transition-all text-left'
									>
										<div className='w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800 border border-zinc-800'>
											{playlist.images && playlist.images[0] ? (
												<img
													src={playlist.images[0]}
													alt=''
													className='w-full h-full object-cover'
												/>
											) : (
												<div className='w-full h-full flex items-center justify-center'>
													<i className='fa-solid fa-music text-xs text-zinc-600'></i>
												</div>
											)}
										</div>
										<div className='flex-1 min-w-0'>
											<p className='text-sm font-bold text-zinc-200 truncate group-hover:text-white'>
												{playlist.name}
											</p>
											<p className='text-[10px] text-zinc-500 font-medium uppercase tracking-wider'>
												{playlist.episode_count}{" "}
												{playlist.episode_count === 1 ? "Episode" : "Episodes"}
											</p>
										</div>
										<div className='opacity-0 group-hover:opacity-100 transition-opacity'>
											<i className='fa-solid fa-plus-circle text-indigo-500'></i>
										</div>
									</button>
								))}

								{filteredPlaylists?.length === 0 && searchQuery && (
									<div className='py-8 text-center'>
										<p className='text-zinc-600 text-sm'>
											No playlists match "{searchQuery}"
										</p>
									</div>
								)}

								{filteredPlaylists?.length === 0 &&
									!searchQuery &&
									!isLoadingPlaylists && (
										<div className='py-8 text-center'>
											<p className='text-zinc-600 text-sm'>
												No playlists yet. Create one above!
											</p>
										</div>
									)}
							</>
						)}
					</div>
				</div>

				{/* Footer */}
				<div className='p-4 bg-zinc-900/50 border-t border-zinc-900 text-center'>
					<button
						onClick={onClose}
						className='text-xs font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest'
					>
						Cancel
					</button>
				</div>
			</div>

			{/* Confirmation Modal */}
			{isConfirmOpen && (
				<ConfirmAddModal
					isOpen={isConfirmOpen}
					onClose={handleCloseConfirm}
					playlist={selectedPlaylist}
					episode={episode}
					onConfirm={handleConfirmAdd}
					isLoading={addEpisodeMutation.isLoading}
				/>
			)}
		</>
	);
};

export default AddToPlaylistModal;
