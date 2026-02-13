"use client";

import { ReactNode, useState, useTransition } from "react";

import { MdHomeFilled } from "react-icons/md";
import { FaDice, FaHeart, FaUser } from "react-icons/fa";
import { RiSearchLine, RiMoreFill } from "react-icons/ri";

// import {
//   billiard,
//   giftIcon,
//   giftIcon2,
//   hotBadgeIcon,
//   networkLogosIcon,
//   notificationsIcon,
//   ticket,
// } from "../../../public";
import Picture from "../picture/Index";
// import { NaijaDreamsLogo } from "../utils/function";
import styles from "../../app/css/Scrollbar.module.css";
import GlobalLoader from "../reusables/GlobalLoader";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  item: NavItem;
  onClick: (href: string) => void;
}

interface SideNavProps {
  onOpen?: () => void;
}

export interface NavItem {
  href?: string; // Make href optional
  label: string;
  icon: ReactNode;
  badge?: string;
  badgeType?: "hot" | "default";
  onClick?: () => void;
}

export interface SidebarProps {
  activeId?: string;
  onNavigate?: (id: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, onClick }) => {
  const pathname = usePathname();
  const { href, label, icon, badge, onClick: itemOnClick } = item;

  const handleClick = () => {
    if (itemOnClick) {
      itemOnClick(); // Call the custom onClick if provided
    } else if (href) {
      onClick(href); // Otherwise navigate
    }
  };

  // Only check active state if href exists
  const isActive = href ? pathname === href : false;

  return (
    <button
      onClick={handleClick}
      className={`group relative flex items-center w-full px-4 py-3 text-sm transition-all duration-200 rounded-xl
        ${
          isActive
            ? "bg-gradient-to-r from-green-900/40 to-green-800/20 text-primary-100 border-l-4 border-green-500"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`}
    >
      <span
        className={`text-xl mr-4 ${isActive ? "text-green-500" : "text-gray-400 group-hover:text-white"}`}
      >
        {icon}
      </span>
      <div className="flex gap-1 items-center">
        <span className="font-medium">{label}</span>
        {/* {badge && <Picture src={hotBadgeIcon} alt="" className="w-10" />} */}
      </div>
    </button>
  );
};

const ActionButton: React.FC<{ icon: React.ReactNode; hasDot?: boolean }> = ({
  icon,
  hasDot,
}) => (
  <button className="relative p-2.5 rounded-xl bg-gray_1-300 text-gray-400 hover:bg-gray_1-400 hover:text-white transition-all">
    <span className="text-xl">{icon}</span>
    {hasDot && (
      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-gray_1-300 rounded-full"></span>
    )}
  </button>
);

const QuickActions: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-2 gap-2 2xl:w-3/4 mx-auto">
      <ActionButton icon={<RiSearchLine color="white" />} />
      <ActionButton
        icon={
          // <Picture src={giftIcon} alt="" className="w-auto h-auto shrink-0" />
          <></>
        }
      />
      <ActionButton
        icon={
          <Picture
            // src={notificationsIcon}
            src={""}
            alt=""
            className="w-auto h-auto shrink-0"
          />
        }
      />
      <ActionButton
        icon={
          <Picture
            // src={networkLogosIcon}
            src={""}
            alt=""
            className="w-auto h-auto shrink-0"
          />
        }
      />
    </div>
  );
};

const Sidebar = ({ onOpen }: SideNavProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navItems: NavItem[] = [
    {
      href: "/",
      label: "Home",
      icon: <MdHomeFilled />,
    },
    {
      href: "/xclusive-games",
      label: "Xclusive Games",
      icon: <FaDice />,
    },
    {
      href: "/result",
      label: "Result",
      icon: <FaDice />,
    },
    {
      // href removed since we're using onClick
      label: "Manage Tickets",
      icon: <FaDice />,
      onClick: onOpen, // Now this works with the updated interface
    },
    {
      href: "/account",
      label: "Account & Wallet",
      icon: <FaUser />,
    },
    {
      href: "/promotions",
      label: "Promotions",
      icon: <FaDice />,
    },
    {
      href: "/favorites",
      label: "Favorite Games",
      icon: <FaHeart />,
    },
    {
      href: "/crs",
      label: "CRS impact games",
      icon: <FaDice />,

      badge: "Hot",
      badgeType: "hot",
    },
    {
      href: "/more",
      label: "More",
      icon: <RiMoreFill />,
    },
  ];

  const handleNavigate = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <>
      <aside className="w-1/4 h-screen bg-black-600 lg:flex flex-col p-3 gap-3 hidden">
        {/* Header Card */}
        <div className="bg-black-500 rounded-3xl p-5 flex flex-col gap-6 shadow-xl border border-white/5">
          {/* Logo Section */}
          {/* <NaijaDreamsLogo /> */}

          {/* Auth Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 py-3 bg-primary-100 hover:bg-primary-100/90 text-black font-medium rounded-xl transition-all text-sm active:scale-95 shadow-lg shadow-green-900/20">
              Register
            </button>
            <button className="flex-1 py-3 border border-primary-100 text-primary-100 hover:bg-primary-100/10 font-medium rounded-xl transition-all text-sm active:scale-95">
              Log in
            </button>
          </div>

          {/* Action Buttons */}
          <QuickActions />
        </div>

        {/* Navigation Card */}
        <nav
          className={`flex-1 bg-black-500 rounded-3xl p-3 overflow-y-auto ${styles["inner-sidebar-scroll"]} shadow-xl border border-white/5`}
        >
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <SidebarItem key={index} item={item} onClick={handleNavigate} />
            ))}
          </div>
        </nav>
      </aside>
      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default Sidebar;
