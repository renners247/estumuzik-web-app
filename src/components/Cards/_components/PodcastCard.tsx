"use client";
import React from "react";
// Using the nearest matching React Icons based on the UI
import { FaHeart, FaPlay } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { RiShareLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import Picture from "@/components/picture/Index";

interface PodcastProps {
	category: string;
	title: string;
	description: string;
	coverImage: string;
	thumbnail: string;
	isLiked?: boolean;
}

const PodcastCard = ({ data }: { data: PodcastProps }) => {
	return (
		<div className='relative w-full max-w-[340px] bg-mtn-dark-gradient/80 rounded-lg overflow-hidden shadow-2xl group transition-all duration-300 hover:scale-[1.02]'>
			{/* Background Image Overlay with Fade */}
			<div className='absolute top-0 left-0 w-full h-3/5 opacity-40'>
				<Picture
					src={data.coverImage}
					alt=''
					className='w-full h-full object-cover grayscale-[20%]'
				/>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-primary-700'></div>
			</div>

			<div className='relative py-4 px-3 flex flex-col bg-mtn-dark-gradient/80'>
				{/* Overlapping Small Thumbnail with Center Play Button */}
				<div className='relative size-20 mb-4 mt-16'>
					<Picture
						src={data.coverImage}
						alt='thumb'
						className='w-full h-full object-cover rounded-xl shadow-lg border border-white/5'
					/>
					{/* Play Button Overlay - Large and Centered */}
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='bg-primary-500 size-10 grid place-items-center rounded-full text-white shadow-xl hover:scale-110 transition-transform cursor-pointer'>
							<FaPlay className='text-lg ml-1' />
						</div>
					</div>
				</div>

				{/* Content Section */}
				<div className='flex flex-col gap-2 mb-3'>
					<span className='text-gray-400 text-sm font-medium'>
						{data.category}
					</span>
					<h3 className='text-white font-bold text-xl tracking-wide line-clamp-1'>
						{data.title}
					</h3>
					<p className='text-gray-300/70 text-sm line-clamp-3 leading-relaxed font-light'>
						{data.description}
					</p>
				</div>

				{/* Action Buttons - Distinct Circular Outlines */}
				<div className='flex items-center gap-4'>
					<button className='w-12 h-12 flex items-center justify-center rounded-full border border-gray-400/50 text-white hover:bg-white/10 transition-colors'>
						<FaHeart size={18} />
					</button>

					<button className='w-12 h-12 flex items-center justify-center rounded-full border border-gray-400/50 text-white hover:bg-white/10 transition-colors'>
						<MdPlaylistAdd size={24} />
					</button>

					<button className='w-12 h-12 flex items-center justify-center rounded-full border border-gray-400/50 text-white hover:bg-white/10 transition-colors'>
						<RiShareLine size={22} />
					</button>

					<button className='w-12 h-12 flex items-center justify-center rounded-full border border-gray-400/50 text-white hover:bg-white/10 transition-colors'>
						<AiOutlinePlus size={22} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default PodcastCard;
