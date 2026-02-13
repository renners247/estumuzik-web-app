"use client";
import React from "react";
import { FaHeart, FaPlay } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { RiShareLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import Picture from "@/components/picture/Index";

interface PodcastEpisode {
	id: number;
	podcast_id: number;
	content_url: string;
	title: string;
	season: number | null;
	number: number | null;
	picture_url: string;
	description: string;
	explicit: boolean;
	duration: number;
	created_at: string;
	updated_at: string;
	play_count: number;
	like_count: number;
	average_rating: number | null;
	published_at: string;
	podcast: {
		id: number;
		user_id: number;
		title: string;
		author: string;
		category_name: string;
		category_type: string;
		picture_url: string;
		cover_picture_url: string | null;
		description: string;
		embeddable_player_settings: any | null;
		created_at: string;
		updated_at: string;
		publisher: {
			id: number;
			first_name: string;
			last_name: string;
			company_name: string;
			email: string;
			profile_image_url: string | null;
			created_at: string;
			updated_at: string;
		};
	};
}

interface PodcastProps {
	data: PodcastEpisode;
}

const PodcastCard = ({ data }: PodcastProps) => {
	// Map data safely
	const episodeThumbnail = data.picture_url;
	const podcastCover =
		data.podcast.cover_picture_url || data.podcast.picture_url;
	const category = data.podcast.category_name;

	return (
		<div className='relative w-full max-w-[340px] bg-mtn-dark-gradient rounded-[32px] overflow-hidden shadow-2xl group transition-all duration-300 hover:scale-[1.02] border border-white/5'>
			{/* 1. Background Image Overlay (The top 60% of card) */}
			<div className='absolute top-0 left-0 w-full h-3/5 opacity-50 z-0'>
				<Picture
					src={podcastCover}
					alt={data.podcast.title}
					className='w-full h-full object-cover grayscale-[30%]'
				/>
				{/* Dark fade transition to the bottom gradient */}
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#062c1b]/40 to-[#0a1a12]'></div>
			</div>

			{/* 2. Content Container */}
			<div className='relative z-10 p-5 flex flex-col'>
				{/* Brand Header (Change Africa Style) */}
				<div className='flex justify-center items-center mb-4 pt-2 opacity-80'>
					<div className='flex flex-col items-center'>
						<div className='flex gap-[2px]'>
							<div className='w-3 h-8 bg-gray-300 -skew-x-12'></div>
							<div className='w-3 h-8 bg-gray-300 -skew-x-12'></div>
						</div>
					</div>
					<div className='ml-3 text-white text-[10px] font-bold leading-tight uppercase tracking-tighter'>
						{data.podcast.author || "Change Africa"} <br /> Podcast
					</div>
				</div>

				{/* 3. Overlapping Thumbnail with Play Button */}
				<div className='relative size-32 mx-auto lg:mx-0 mb-6 mt-4 shadow-2xl'>
					<Picture
						src={episodeThumbnail}
						alt={data.title}
						className='w-full h-full object-cover rounded-2xl border-2 border-white/10'
					/>
					{/* Play Button - Centered on Thumbnail */}
					<div className='absolute inset-0 flex items-center justify-center'>
						<button className='bg-primary-500 size-12 grid place-items-center rounded-full text-white shadow-[0_0_20px_rgba(255,204,0,0.4)] hover:scale-110 transition-transform cursor-pointer group-hover:bg-primary-400'>
							<FaPlay className='text-xl ml-1' />
						</button>
					</div>
				</div>

				{/* 4. Text Content Section */}
				<div className='flex flex-col gap-1.5 mb-5'>
					<span className='text-gray-400 text-xs font-semibold uppercase tracking-wider'>
						{category}
					</span>
					<h3 className='text-white font-bold text-lg leading-tight tracking-wide line-clamp-1'>
						{data.title}
					</h3>
					<p className='text-gray-400 text-xs line-clamp-3 leading-relaxed font-normal opacity-80'>
						{data.description}
					</p>
				</div>

				{/* 5. Action Buttons */}
				<div className='flex items-center gap-3.5'>
					<button
						title='Like'
						className='size-11 flex items-center justify-center rounded-full border border-gray-500/40 text-white hover:bg-white/10 hover:border-white transition-all'
					>
						<FaHeart size={16} />
					</button>

					<button
						title='Add to Playlist'
						className='size-11 flex items-center justify-center rounded-full border border-gray-500/40 text-white hover:bg-white/10 hover:border-white transition-all'
					>
						<MdPlaylistAdd size={22} />
					</button>

					<button
						title='Share'
						className='size-11 flex items-center justify-center rounded-full border border-gray-500/40 text-white hover:bg-white/10 hover:border-white transition-all'
					>
						<RiShareLine size={20} />
					</button>

					<button
						title='Follow'
						className='size-11 flex items-center justify-center rounded-full border border-gray-500/40 text-white hover:bg-white/10 hover:border-white transition-all'
					>
						<AiOutlinePlus size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default PodcastCard;
