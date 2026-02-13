"use client";
import React from "react";
import {
	BsFillVolumeUpFill,
	BsVolumeDownFill,
	BsFillVolumeMuteFill,
} from "react-icons/bs";
import { setVolume } from "../Redux/playerOne";
import { useAppDispatch } from "../Hooks";
import TooltipWrapper from "../common/TooltipWrapper";
interface VolumeBarProps {
	value: number;
	min: string;
	max: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isMinimized: boolean; // You might want to adjust this type based on your needs
}

const VolumeBar = ({
	value,
	min,
	max,
	onChange,
	isMinimized,
}: VolumeBarProps) => {
	const dispatch = useAppDispatch();
	return (
		<div className='hidden lg:flex items-center justify-end'>
			{value <= 1 && value > 0.5 && (
				<TooltipWrapper content='Mute' position='top'>
					<BsFillVolumeUpFill
						size={25}
						color='#D0D5DD'
						onClick={() => dispatch(setVolume(0))}
					/>
				</TooltipWrapper>
			)}
			{value <= 0.5 && value > 0 && (
				<TooltipWrapper content='Mute' position='top'>
					<BsVolumeDownFill
						size={25}
						color='#D0D5DD'
						onClick={() => dispatch(setVolume(0))}
					/>
				</TooltipWrapper>
			)}
			{value === 0 && (
				<TooltipWrapper content='Volume Up' position='top'>
					<BsFillVolumeMuteFill
						size={25}
						color='#D0D5DD'
						onClick={() => dispatch(setVolume(0))}
					/>
				</TooltipWrapper>
			)}
			<input
				type='range'
				step='any'
				value={value}
				min={min}
				max={max}
				onChange={onChange}
				// className='cursor-pointer '
				// className='w-1 h-20 ml-2 cursor-pointer flex flex-col transform rotate-90'
				className={`${
					isMinimized
						? "w-[3.5rem] h-2 transform -rotate-90 -ml-4"
						: "w-20 h-1 ml-2 flex flex-row"
				}  cursor-pointer `}
			/>
		</div>
	);
};

export default VolumeBar;
