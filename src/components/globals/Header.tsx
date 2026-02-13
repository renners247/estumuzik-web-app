"use client";

import { RiSearchLine, RiLogoutBoxLine } from "react-icons/ri";
import { Avatar } from "@heroui/react";
import { signOut } from "../utils/data";

import { useAppSelector } from "../Hooks";

const Header = () => {
  const { user } = useAppSelector((state: any) => state.auth);

  const ProfileData = user;

  const initials = ProfileData?.first_name
    ?.split(" ")
    ?.map((word: string) => word[0]?.toUpperCase())
    ?.join("")
    .slice(0, 2);

  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between px-4 py-4 lg:px-6 lg:py-5 bg-transparent gap-5 lg:gap-0">
      {/* Top Container: Discover Title + Profile (Profile moves to top right on mobile) */}
      <div className="flex items-center justify-between lg:justify-start lg:flex-col lg:items-start lg:gap-6 w-full lg:w-auto">
        <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
          Discover
        </h1>

        {/* Mobile-only Profile & Logout (hidden on Desktop because they are in the right section) */}
        <div className="flex lg:hidden items-center gap-3">
          <div className="p-[2px] rounded-full border-2 border-[#E8D4A2]">
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="w-8 h-8"
            />
          </div>
          <button className="text-gray-400 p-1">
            <RiLogoutBoxLine size={20} />
          </button>
        </div>
      </div>

      {/* Search Bar: Stacks below title on mobile, centered/left-aligned on desktop */}
      <div className="w-full max-w-xl lg:ml-12">
        <div className="relative w-full lg:max-w-md group">
          <input
            type="text"
            placeholder="Search keyword or name"
            className="w-full bg-[#111111] text-gray-300 text-sm py-3 px-5 lg:py-3.5 lg:px-6 rounded-full 
                     outline-none border border-transparent focus:border-[#FFCC00]/50 
                     transition-all duration-300 placeholder:text-gray-500"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
            <RiSearchLine size={18} className="lg:size-5" />
          </div>
        </div>
      </div>

      {/* Desktop-only Profile & Logout (hidden on Mobile) */}
      <div className="hidden lg:flex items-center gap-5">
        <div className="relative cursor-pointer hover:scale-105 transition-transform">
          {/* <div className='p-[2px] rounded-full border-2 border-[#E8D4A2]'>
						<Avatar
							src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
							className='w-10 h-10 text-large'
							isBordered={false}
						/>
					</div> */}
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold text-lg text-white">
            {initials}
          </div>
        </div>

        <button
          onClick={() => signOut()}
          className="text-gray-400 hover:text-white transition-colors p-2"
        >
          <RiLogoutBoxLine size={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;
