"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
	MdOutlinePodcasts,
	MdOutlineGridView,
	MdOutlineLibraryMusic,
	MdOutlinePersonOutline,
} from "react-icons/md";

const AppMenu = () => {
	const pathname = usePathname();
	const router = useRouter();

	// Navigation configuration matching the Estu Muzik Sidebar
	const navItems = [
		{
			id: "discover",
			label: "Discover",
			icon: MdOutlinePodcasts,
			url: "/discover",
		},
		{
			id: "categories",
			label: "Categories",
			icon: MdOutlineGridView,
			url: "/categories",
		},
		{
			id: "library",
			label: "Library",
			icon: MdOutlineLibraryMusic,
			url: "/library",
		},
		{
			id: "profile",
			label: "Account",
			icon: MdOutlinePersonOutline,
			url: "/profile",
		},
	];

	const handleNavigation = (url: string) => {
		router.push(url);
	};

	return (
		<div className='sm:hidden fixed bottom-0 z-50 w-full'>
			{/* 
          Main Container: 
          Using a very dark background (#0A0A0A) to match the Music UI 
          with a subtle border top 
      */}
			<div className='bg-[#0A0A0A] border-t border-white/5 backdrop-blur-lg pb-safe'>
				<div className='grid grid-cols-4 w-full h-16'>
					{navItems.map((item) => {
						const isActive = pathname === item.url;
						const Icon = item.icon;

						return (
							<button
								key={item.id}
								onClick={() => handleNavigation(item.url)}
								className='flex flex-col items-center justify-center relative group transition-all'
							>
								{/* Active Indicator (Top Bar) */}
								{isActive && (
									<div className='absolute top-0 w-12 h-1 bg-[#FFCC00] rounded-b-full shadow-[0_0_10px_rgba(255,204,0,0.5)]' />
								)}

								{/* Icon Container */}
								<div
									className={`transition-all duration-300 ${
										isActive
											? "text-[#FFCC00] scale-110"
											: "text-gray-500 group-hover:text-gray-300"
									}`}
								>
									<Icon size={26} />
								</div>

								{/* Label */}
								<span
									className={`text-[10px] mt-1 font-medium transition-colors ${
										isActive ? "text-[#FFCC00]" : "text-gray-500"
									}`}
								>
									{item.label}
								</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* Mobile Safe Area Padding for modern iPhones */}
			<div className='h-4 bg-[#0A0A0A] block sm:hidden'></div>
		</div>
	);
};

export default AppMenu;
