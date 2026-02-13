'use client'
import React, { useState, useEffect, useRef, MouseEvent } from "react";

interface VolumeSliderProps {
  volume: number | undefined;
  onChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  backgroundColor?: string;
  sliderColor?: string;
  circleColor?: string;
  width?: string;
  height?: string;
  className?: string;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({
  volume,
  onChange,
  onAfterChange,
  minValue = 0,
  maxValue = 100,
  backgroundColor = "gray",
  sliderColor = "blue",
  circleColor = "blue",
  width = "w-full",
  height = "h-1",
  className = "",
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
          Math.min(maxValue, percentage)
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
        onAfterChange(volume!);
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
  }, [isDragging, volume, minValue, maxValue, onChange, onAfterChange]);

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);
    if (sliderRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const percentage =
        ((event.clientX - sliderRect.left) / sliderRect.width) * maxValue;
      const clampedPercentage = Math.max(
        minValue,
        Math.min(maxValue, percentage)
      );
      if (onChange) {
        onChange(clampedPercentage);
      }

      const circleLeft = (clampedPercentage / maxValue) * sliderRect.width;
      circleRef.current.style.left = `${circleLeft}px`;
    }
  };

  return (
    <div className={`relative ${width} ${height} ${className}`}>
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
          className={`absolute top-0 left-0 ${height} rounded-full`}
          style={{
            width: `${volume}%`,
            ...(sliderColor && { background: sliderColor }),
          }}
        />
        <div
          ref={circleRef}
          className={`absolute w-[10px] h-[10px] hover:w-[10px] hover:h-[10px] transition rounded-full cursor-pointer`}
          style={{
            top: "2px",
            left: `calc(${volume}% - 2px)`,
            transform: "translate(-50%, -50%)",
            ...(circleColor && { background: circleColor }),
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default VolumeSlider;
