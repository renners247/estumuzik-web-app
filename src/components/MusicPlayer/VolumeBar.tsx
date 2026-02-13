"use client";
import React from "react";
import {
	BsFillVolumeUpFill,
	BsVolumeDownFill,
	BsFillVolumeMuteFill,
} from "react-icons/bs";
import TooltipWrapper from "../common/TooltipWrapper";
import { setVolume } from "../Redux/playerOne";
import { useAppDispatch } from "../Hooks";

interface VolumeBarProps {
	value: number; // 0 to 1
	min: string;
	max: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isMinimized: boolean;
}

const VolumeBar = ({
	value,
	min,
	max,
	onChange,
	isMinimized,
}: VolumeBarProps) => {
	const dispatch = useAppDispatch();

	// Calculate percentage for the slider fill effect
	const percentage = value * 100;

	return (
		<div
			className={`hidden lg:flex items-center ${isMinimized ? "flex-col-reverse gap-4 mb-4" : "justify-end gap-2"}`}
		>
			{/* Volume Icon Logic */}
			<div className='flex items-center justify-center w-8'>
				{value > 0.5 ? (
					<TooltipWrapper content='Mute' position='top'>
						<BsFillVolumeUpFill
							size={22}
							className='text-white hover:text-[#FFCC00] cursor-pointer transition-colors'
							onClick={() => dispatch(setVolume(0))}
						/>
					</TooltipWrapper>
				) : value > 0 ? (
					<TooltipWrapper content='Mute' position='top'>
						<BsVolumeDownFill
							size={22}
							className='text-white hover:text-[#FFCC00] cursor-pointer transition-colors'
							onClick={() => dispatch(setVolume(0))}
						/>
					</TooltipWrapper>
				) : (
					<TooltipWrapper content='Unmute' position='top'>
						<BsFillVolumeMuteFill
							size={22}
							className='text-gray-500 hover:text-[#FFCC00] cursor-pointer transition-colors'
							onClick={() => dispatch(setVolume(1))} // Toggles back to full volume
						/>
					</TooltipWrapper>
				)}
			</div>

			{/* Styled Range Input */}
			<div className='relative group flex items-center'>
				<input
					type='range'
					step='any'
					value={value}
					min={min}
					max={max}
					onChange={onChange}
					className={`cursor-pointer appearance-none bg-transparent rounded-full outline-none transition-all
						${
							isMinimized
								? "w-24 h-1.5 -rotate-90 origin-center"
								: "w-20 h-1 hover:h-1.5"
						}`}
					style={{
						// Perfect MTN Gradient Fill
						background: `linear-gradient(to right, #FFCC00 ${percentage}%, #333333 ${percentage}%)`,
					}}
				/>

				{/* Custom styling for the slider "thumb" (The dot) */}
				<style jsx>{`
					input[type="range"]::-webkit-slider-thumb {
						appearance: none;
						height: 12px;
						width: 12px;
						background: #ffcc00;
						border-radius: 50%;
						border: 2px solid white;
						box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
						opacity: 0;
						transition: opacity 0.2s;
					}
					.group:hover input[type="range"]::-webkit-slider-thumb {
						opacity: 1;
					}
					input[type="range"]::-moz-range-thumb {
						height: 12px;
						width: 12px;
						background: #ffcc00;
						border-radius: 50%;
						border: 2px solid white;
						opacity: 0;
					}
					.group:hover input[type="range"]::-moz-range-thumb {
						opacity: 1;
					}
				`}</style>
			</div>
		</div>
	);
};

export default VolumeBar;
