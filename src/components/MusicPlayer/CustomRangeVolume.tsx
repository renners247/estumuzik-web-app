"use client";
import React, { useState, useRef, useEffect, MouseEvent } from "react";
import {
	BsFillVolumeMuteFill,
	BsFillVolumeUpFill,
	BsVolumeDownFill,
} from "react-icons/bs";

interface CustomRangeVolumeProps {
	sliderValue: number | undefined;
	onChange?: (value: number) => void;
	onAfterChange?: (value: number) => void;
	minValue?: number;
	maxValue?: number;
	backgroundColor?: string;
	sliderColor?: string;
	circleColor?: string;
	circleRefTop?: string;
	setVolume: (value: number) => void; // Fixed type for easier dispatching
	width?: string;
	height?: string;
}

const CustomRangeVolume: React.FC<CustomRangeVolumeProps> = ({
	sliderValue = 0,
	onChange,
	onAfterChange,
	minValue = 0,
	maxValue = 100,
	backgroundColor = "#333333", // Dark MTN Track
	sliderColor = "#FFCC00", // Official MTN Yellow
	circleColor = "#FFCC00",
	circleRefTop = "50%",
	setVolume,
	width = "w-full",
	height = "h-[3px]",
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const sliderRef = useRef<HTMLDivElement>(null);
	const circleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseMove = (event: any) => {
			if (isDragging && sliderRef.current) {
				const sliderRect = sliderRef.current.getBoundingClientRect();
				const percentage =
					((event.clientX - sliderRect.left) / sliderRect.width) * maxValue;
				const clampedPercentage = Math.max(
					minValue,
					Math.min(maxValue, percentage),
				);
				if (onChange) {
					onChange(clampedPercentage);
				}
			}
		};

		const handleMouseUp = () => {
			setIsDragging(false);
			if (onAfterChange) {
				onAfterChange(sliderValue!);
			}
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};

		if (isDragging) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging, sliderValue, minValue, maxValue, onChange, onAfterChange]);

	const handleMouseDown = (event: MouseEvent) => {
		setIsDragging(true);
		if (sliderRef.current) {
			const sliderRect = sliderRef.current.getBoundingClientRect();
			const percentage =
				((event.clientX - sliderRect.left) / sliderRect.width) * maxValue;
			const clampedPercentage = Math.max(
				minValue,
				Math.min(maxValue, percentage),
			);
			if (onChange) {
				onChange(clampedPercentage);
			}
		}
	};

	return (
		<div className='flex items-center gap-2 group'>
			{/* Volume Icons with MTN Yellow Hover */}
			<div className='w-8 flex justify-center'>
				{sliderValue > 50 ? (
					<BsFillVolumeUpFill
						size={22}
						onClick={() => setVolume(0)}
						className='text-white transition hover:text-[#FFCC00] cursor-pointer'
					/>
				) : sliderValue > 0 ? (
					<BsVolumeDownFill
						size={22}
						onClick={() => setVolume(0)}
						className='text-white transition hover:text-[#FFCC00] cursor-pointer'
					/>
				) : (
					<BsFillVolumeMuteFill
						size={22}
						onClick={() => setVolume(1)} // Toggles back to 100%
						className='text-gray-500 transition hover:text-[#FFCC00] cursor-pointer'
					/>
				)}
			</div>

			{/* Slider Track */}
			<div className={`relative flex items-center ${width} ${height}`}>
				<div
					ref={sliderRef}
					className={`w-full h-full rounded-full cursor-pointer relative overflow-visible`}
					onMouseDown={handleMouseDown}
					style={{ background: backgroundColor }}
				>
					{/* Progress Fill */}
					<div
						className={`absolute top-0 left-0 h-full rounded-full transition-all duration-75`}
						style={{
							width: `${sliderValue}%`,
							background: sliderColor,
						}}
					/>

					{/* Seeker Circle - Only shows on hover or drag */}
					<div
						ref={circleRef}
						className={`absolute size-3 rounded-full border-2 border-white shadow-md transition-all duration-150 cursor-pointer 
							${isDragging ? "scale-110" : "scale-0 group-hover:scale-100"}`}
						style={{
							top: circleRefTop,
							left: `${sliderValue}%`,
							transform: "translate(-50%, -50%)",
							background: circleColor,
						}}
						onMouseDown={handleMouseDown}
					/>
				</div>
			</div>
		</div>
	);
};

export default CustomRangeVolume;
