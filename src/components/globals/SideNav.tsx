"use client";

import { ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
	MdOutlinePodcasts,
	MdOutlineGridView,
	MdOutlineLibraryMusic,
} from "react-icons/md";
import GlobalLoader from "../reusables/GlobalLoader";
import { EstuMuzikLogo } from "../utils/function";

interface NavItem {
	href: string;
	label: string;
	icon: ReactNode;
}

const SidebarItem = ({
	item,
	isActive,
	onClick,
}: {
	item: NavItem;
	isActive: boolean;
	onClick: (href: string) => void;
}) => {
	return (
		<button
			onClick={() => onClick(item.href)}
			className={`group flex items-center w-full px-4 py-3 text-base transition-all duration-200 rounded-md mb-1
        ${
					isActive
						? "bg-[#161616] text-white" // Subtle dark highlight for active item
						: "text-gray-400 hover:text-white hover:bg-white/5"
				}`}
		>
			<span
				className={`text-2xl mr-4 ${isActive ? "text-white" : "text-gray-400"}`}
			>
				{item.icon}
			</span>
			<span
				className={`font-medium ${isActive ? "text-white" : "text-gray-400"}`}
			>
				{item.label}
			</span>
		</button>
	);
};

const Sidebar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const navItems: NavItem[] = [
		{
			href: "/discover",
			label: "Discover",
			icon: <MdOutlinePodcasts />, // Matches the broadcast icon in UI
		},
		{
			href: "/categories",
			label: "Categories",
			icon: <MdOutlineGridView />, // Matches the grid icon in UI
		},
		{
			href: "/library",
			label: "Library",
			icon: <MdOutlineLibraryMusic />, // Matches the person/music icon in UI
		},
	];

	const handleNavigate = (href: string) => {
		startTransition(() => {
			router.push(href);
		});
	};

	return (
		<>
			<aside className='w-[260px] h-screen bg-black-100 hidden lg:flex flex-col p-4 border-r border-white/5'>
				{/* Logo Section */}

				{/* Navigation Items */}
				<div className='pl-4 mb-3'>
					<EstuMuzikLogo />
				</div>
				<nav className='flex-1'>
					<div className='space-y-2'>
						{navItems.map((item) => (
							<SidebarItem
								key={item.href}
								item={item}
								isActive={pathname === item.href}
								onClick={handleNavigate}
							/>
						))}
					</div>
				</nav>
			</aside>

			<GlobalLoader isPending={isPending} />
		</>
	);
};

export default Sidebar;
