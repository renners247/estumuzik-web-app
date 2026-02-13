"use client";
import React, { useState, useRef, useEffect, MouseEvent } from "react";
import {
	BsFillVolumeMuteFill,
	BsFillVolumeUpFill,
	BsVolumeDownFill,
} from "react-icons/bs";

interface CustomRangeInputProps {
	sliderValue: number | undefined;
	onChange?: (value: number) => void;
	onAfterChange?: (value: number) => void;
	minValue?: number;
	maxValue?: number;
	backgroundColor?: string;
	sliderColor?: string;
	circleColor?: string;
	circleRefTop?: string;
	setVolume: React.Dispatch<React.SetStateAction<number>>;
	width?: string;
	height?: string;
}

const CustomRangeVolume: React.FC<CustomRangeInputProps> = ({
	sliderValue,
	onChange,
	onAfterChange,
	minValue = 0,
	maxValue = 100,
	backgroundColor = "gray",
	sliderColor = "red",
	circleColor = "red",
	circleRefTop = "0.08rem",
	setVolume,
	width = "w-full",
	height = "h-1",
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const sliderRef = useRef<any>(null);
	const circleRef = useRef<any>(null);

	useEffect(() => {
		const handleMouseMove = (event: any) => {
			if (isDragging && sliderRef.current && circleRef.current) {
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

				const circleLeft = (clampedPercentage / maxValue) * sliderRect.width;
				circleRef.current.style.left = `${circleLeft}px`;
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

			const circleLeft = (clampedPercentage / maxValue) * sliderRect.width;
			circleRef.current.style.left = `${circleLeft}px`;
		}
	};

	return (
		<div className='flex items-center gap-2'>
			{sliderValue! <= 100 && sliderValue! > 50 && (
				<BsFillVolumeUpFill
					size={25}
					onClick={() => setVolume(0)}
					className='text-white transition hover:text-green-100 cursor-pointer'
				/>
			)}
			{sliderValue! <= 50 && sliderValue! > 0 && (
				<BsVolumeDownFill
					size={25}
					onClick={() => setVolume(0)}
					className='text-white transition hover:text-green-100 cursor-pointer'
				/>
			)}
			{sliderValue! === 0 && (
				<BsFillVolumeMuteFill
					size={25}
					onClick={() => setVolume(1)}
					className='text-white transition hover:text-green-100 cursor-pointer'
				/>
			)}
			<div className={`relative ${width} ${height}`}>
				<div
					ref={sliderRef}
					className={`w-full ${height} rounded-full cursor-pointer`}
					onMouseDown={handleMouseDown}
					style={{
						position: "relative",
						...(backgroundColor && { background: backgroundColor }),
					}}
				>
					<div
						className={`absolute top-0 left-0 h-full rounded-full`}
						style={{
							width: `${sliderValue}%`,
							...(sliderColor && { background: sliderColor }),
						}}
					/>
					<div
						ref={circleRef}
						className={`absolute w-[14px] h-[14px] hover:w-[12px] hover:h-[12px] transition rounded-full cursor-pointer`}
						style={{
							top: circleRefTop,
							left: `calc(${sliderValue}% - 2px)`,
							transform: "translate(-50%, -50%)",
							...(circleColor && { background: circleColor }),
						}}
						onMouseDown={handleMouseDown}
					/>
				</div>
			</div>
		</div>
	);
};

export default CustomRangeVolume;
