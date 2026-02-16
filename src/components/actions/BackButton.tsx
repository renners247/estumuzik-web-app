"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdChevronLeft } from "react-icons/md";

const BackButton = () => {
	const router = useRouter();
	return (
		<button
			onClick={() => router.back()}
			className='flex items-center justify-center group transition-[.4] bg-dark-300 rounded-[8px] px-2 py-1 sm:p-2 mb-4 sm:mb-8'
		>
			<MdChevronLeft className='group-hover:-translate-x-1 text-sm sm:text-xl text-white/80' />
			<span className='text-white hover:text-white/90 font-normal text-xs leading-5'>
				Back
			</span>
		</button>
	);
};

export default BackButton;
