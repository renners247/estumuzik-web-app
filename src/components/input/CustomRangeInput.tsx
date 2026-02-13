"use client";
import React, { useState, useRef, useEffect, MouseEvent } from "react";

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
	width?: string;
	height?: string;
}

const CustomRangeInput: React.FC<CustomRangeInputProps> = ({
	sliderValue,
	onChange,
	onAfterChange,
	minValue = 0,
	maxValue = 100,
	backgroundColor = "#333333", // Dark MTN track
	sliderColor = "#FFCC00", // Official MTN Yellow
	circleColor = "#FFCC00", // Official MTN Yellow seeker
	circleRefTop = "50%", // Perfect centering
	width = "w-full",
	height = "h-1", // Sleek thin line
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const sliderRef = useRef<HTMLDivElement>(null);
	const circleRef = useRef<HTMLDivElement>(null);

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

	return (
		<div className={`relative flex items-center group ${width} ${height}`}>
			<div
				ref={sliderRef}
				className={`w-full ${height} rounded-full cursor-pointer transition-all duration-300 group-hover:h-1.5`}
				onMouseDown={handleMouseDown}
				style={{
					position: "relative",
					background: backgroundColor,
				}}
			>
				{/* Progress Fill */}
				<div
					className={`absolute top-0 left-0 h-full rounded-full`}
					style={{
						width: `${sliderValue}%`,
						background: sliderColor,
						boxShadow: isDragging ? `0 0 8px ${sliderColor}80` : "none",
					}}
				/>

				{/* Seeker Circle */}
				<div
					ref={circleRef}
					className={`absolute size-3 rounded-full cursor-pointer transition-all duration-150 
						${isDragging ? "scale-125 shadow-lg" : "scale-0 group-hover:scale-100"}
						flex items-center justify-center`}
					style={{
						top: circleRefTop,
						left: `${sliderValue}%`,
						transform: "translate(-50%, -50%)",
						background: circleColor,
						border: "2px solid white", // Adds a premium border to the seeker
						boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
					}}
					onMouseDown={handleMouseDown}
				/>
			</div>
		</div>
	);
};

export default CustomRangeInput;
