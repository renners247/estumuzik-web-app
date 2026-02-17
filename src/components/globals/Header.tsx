"use client";

import { Fragment, useState } from "react";
import { RiLogoutBoxLine, RiCloseLine, RiMenuLine } from "react-icons/ri";
import {
	MdOutlinePodcasts,
	MdOutlineGridView,
	MdOutlineLibraryMusic,
} from "react-icons/md";
import { signOut } from "../utils/data";
import { useAppSelector } from "../Hooks";
import { Menu, Transition } from "@headlessui/react";
import { FiUser } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import Search from "./Search";

const Header = () => {
	const { user } = useAppSelector((state: any) => state.auth);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	const ProfileData = user;

	const initials = ProfileData?.first_name
		?.split(" ")
		?.map((word: string) => word[0]?.toUpperCase())
		?.join("")
		.slice(0, 2);

	const mobileNavItems = [
		{ href: "/", label: "Discover", icon: <MdOutlinePodcasts size={22} /> },
		{
			href: "/category",
			label: "Categories",
			icon: <MdOutlineGridView size={22} />,
		},
		{
			href: "/library",
			label: "Library",
			icon: <MdOutlineLibraryMusic size={22} />,
		},
	];

	const handleMobileNavigate = (href: string) => {
		router.push(href);
		setIsMobileMenuOpen(false);
	};

	const getHeaderTitle = () => {
		if (pathname === "/" || pathname === "/home") return "Discover";
		if (pathname.startsWith("/category")) return "Categories";
		if (pathname.startsWith("/library")) return "Library";
		if (pathname.startsWith("/search")) return "Search";
		if (pathname.startsWith("/profile")) return "Profile";
		return "Discover";
	};

	return (
		<>
			<div className='sticky top-0 z-40 w-full bg-black-100/95 backdrop-blur-md border-b border-white/5'>
				<div className='w-full flex flex-col lg:flex-row lg:items-center justify-between px-4 py-3 lg:px-6 lg:py-4 gap-3 lg:gap-0'>
					{/* Top Container: Title + Hamburger/Profile */}
					<div className='flex items-center justify-between lg:justify-start w-full lg:w-auto'>
						{/* Hamburger (Mobile only) */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className='lg:hidden text-white p-1 hover:bg-white/10 rounded-lg transition-colors'
						>
							{isMobileMenuOpen ? (
								<RiCloseLine size={24} />
							) : (
								<RiMenuLine size={24} />
							)}
						</button>

						<h1 className='text-xl lg:text-2xl font-bold text-white tracking-tight'>
							{getHeaderTitle()}
						</h1>

						{/* Mobile-only Profile & Logout */}
						<div className='flex lg:hidden items-center gap-2'>
							<div className='w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold text-sm'>
								{initials}
							</div>
						</div>
					</div>

					{/* Search Bar */}
					<div className='w-full max-w-xl lg:ml-12'>
						<Search />
					</div>

					{/* Desktop-only Profile & Logout */}
					<div className='hidden lg:flex items-center gap-5'>
						<Menu as='div' className='relative menu inline-block text-left'>
							<div>
								<Menu.Button className='menu-button w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold text-lg text-white cursor-pointer focus:outline-none p-1 hover:scale-110 transition-transform duration-200 active:scale-95'>
									{initials}
								</Menu.Button>
							</div>

							<Transition
								as={Fragment}
								enter='transition ease-out duration-200'
								enterFrom='transform opacity-0 scale-95 -translate-y-2'
								enterTo='transform opacity-100 scale-100 translate-y-0'
								leave='transition ease-in duration-150'
								leaveFrom='transform opacity-100 scale-100 translate-y-0'
								leaveTo='transform opacity-0 scale-95 -translate-y-2'
							>
								<Menu.Items className='menu-items absolute right-0 mt-2 w-72 origin-top-right rounded-lg bg-black-100 shadow-xl backdrop-blur-sm focus:outline-none p-2 z-50 overflow-hidden'>
									<div className='absolute inset-0 overflow-hidden'>
										<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
									</div>

									<Menu.Item>
										{({ active }) => (
											<a
												href={"/profile"}
												className={`relative font-light group flex w-full items-center rounded-md px-3 py-2 text-sm transition-all duration-200`}
											>
												<span className='text-lg mr-3 transition-transform duration-200 group-hover:scale-110'>
													<FiUser color='white' />
												</span>
												<span className='transition-all text-white duration-200 group-hover:translate-x-1'>
													Profile
												</span>
											</a>
										)}
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>

						<button
							onClick={() => signOut()}
							className='text-gray-400 hover:text-white transition-colors p-2'
						>
							<RiLogoutBoxLine size={24} />
						</button>
					</div>
				</div>

				{/* Mobile Navigation Drawer */}
				{isMobileMenuOpen && (
					<div className='lg:hidden border-t border-white/5 bg-black-100 px-4 py-3 space-y-1 animate-in slide-in-from-top-2 duration-200'>
						{mobileNavItems.map((item) => (
							<button
								key={item.href}
								onClick={() => handleMobileNavigate(item.href)}
								className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
									pathname === item.href
										? "bg-white/10 text-white"
										: "text-gray-400 hover:text-white hover:bg-white/5"
								}`}
							>
								<span
									className={
										pathname === item.href ? "text-white" : "text-gray-400"
									}
								>
									{item.icon}
								</span>
								{item.label}
							</button>
						))}

						{/* Mobile Logout */}
						<button
							onClick={() => signOut()}
							className='flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-white/5 transition-all duration-200'
						>
							<RiLogoutBoxLine size={22} />
							Log out
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Header;
