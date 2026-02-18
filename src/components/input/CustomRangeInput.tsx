"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

interface CustomRangeInputProps {
	sliderValue: number; // 0 to 100
	onChange?: (value: number) => void;
	onAfterChange?: (value: number) => void;
	minValue?: number;
	maxValue?: number;
	backgroundColor?: string;
	sliderColor?: string;
	circleColor?: string;
	width?: string;
	height?: string;
}

const CustomRangeInput: React.FC<CustomRangeInputProps> = ({
	sliderValue,
	onChange,
	onAfterChange,
	minValue = 0,
	maxValue = 100,
	backgroundColor = "#2D2D2D",
	sliderColor = "#FFCC00",
	circleColor = "#FFCC00",
	width = "w-full",
	height = "h-1",
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const [localValue, setLocalValue] = useState(sliderValue);
	const sliderRef = useRef<HTMLDivElement>(null);

	// Sync local value with prop value when NOT dragging
	useEffect(() => {
		if (!isDragging) {
			setLocalValue(sliderValue);
		}
	}, [sliderValue, isDragging]);

	// Unified calculation logic for Mouse and Touch
	const calculateValue = useCallback(
		(clientX: number) => {
			if (!sliderRef.current) return 0;
			const rect = sliderRef.current.getBoundingClientRect();
			const x = clientX - rect.left;
			const percentage = (x / rect.width) * maxValue;
			return Math.min(maxValue, Math.max(minValue, percentage));
		},
		[maxValue, minValue],
	);

	const handleMove = useCallback(
		(clientX: number) => {
			if (isDragging) {
				const newValue = calculateValue(clientX);
				setLocalValue(newValue); // Update visual immediately
				if (onChange) onChange(newValue); // Update parent (MusicPlayer)
			}
		},
		[isDragging, calculateValue, onChange],
	);

	const handleEnd = useCallback(() => {
		if (isDragging) {
			setIsDragging(false);
			if (onAfterChange) onAfterChange(localValue);
		}
	}, [isDragging, localValue, onAfterChange]);

	// Window listeners for smooth dragging outside the bar
	useEffect(() => {
		const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
		const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
		const onMouseUp = () => handleEnd();
		const onTouchEnd = () => handleEnd();

		if (isDragging) {
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
			window.addEventListener("touchmove", onTouchMove);
			window.addEventListener("touchend", onTouchEnd);
		}

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
			window.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("touchend", onTouchEnd);
		};
	}, [isDragging, handleMove, handleEnd]);

	const handleStart = (clientX: number) => {
		setIsDragging(true);
		const newValue = calculateValue(clientX);
		setLocalValue(newValue);
		if (onChange) onChange(newValue);
	};

	return (
		<div
			className={`relative flex items-center group ${width} h-6 cursor-pointer`}
		>
			<div
				ref={sliderRef}
				className={`w-full ${height} rounded-full transition-all duration-300 group-hover:h-1.5 relative`}
				style={{ background: backgroundColor }}
				onMouseDown={(e) => handleStart(e.clientX)}
				onTouchStart={(e) => handleStart(e.touches[0].clientX)}
			>
				{/* Progress Fill */}
				<div
					className='absolute top-0 left-0 h-full rounded-full pointer-events-none'
					style={{
						width: `${localValue}%`,
						background: sliderColor,
						boxShadow: isDragging ? `0 0 12px ${sliderColor}` : "none",
					}}
				/>

				{/* Seeker Circle (The Nut/Bolt) */}
				<div
					className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white transition-transform duration-150 shadow-md pointer-events-none
            ${isDragging ? "size-4 scale-110" : "size-3 scale-0 group-hover:scale-100"}`}
					style={{
						left: `${localValue}%`,
						background: circleColor,
					}}
				/>
			</div>
		</div>
	);
};

export default CustomRangeInput;
