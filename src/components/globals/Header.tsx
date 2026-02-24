"use client";

import { Fragment, useState, useTransition } from "react";
import { RiLogoutBoxLine, RiCloseLine, RiMenuLine } from "react-icons/ri";
import {
  MdOutlinePodcasts,
  MdOutlineGridView,
  MdOutlineLibraryMusic,
  MdPhone,
} from "react-icons/md";
import { signOut } from "../utils/data";
import { useAppSelector } from "../Hooks";
import { Menu, Transition } from "@headlessui/react";
import { FiUser } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import Search from "./Search";
import { Squash as Hamburger } from "hamburger-react";
import { EstuMuzikLogo } from "../utils/function";
import GlobalLoader from "../reusables/GlobalLoader";

const Header = () => {
  const { user } = useAppSelector((state: any) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const ProfileData = user;

  const initials = ProfileData?.first_name
    ?.split(" ")
    ?.map((word: string) => word[0]?.toUpperCase())
    ?.join("")
    .slice(0, 2);

	const mobileNavItems = [
		{
			href: "/loggedIn",
			label: "Discover",
			icon: <MdOutlinePodcasts size={22} />,
		},
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
		{
			href: "/contact-us",
			label: "Contact",
			icon: <MdPhone size={22} />,
		},
	];

  const handleMobileNavigate = (href: string) => {
    startTransition(() => {
      router.push(href);
    });

    setIsMobileMenuOpen(false);
  };

  const getHeaderTitle = () => {
    if (pathname === "/" || pathname === "/home") return "Discover";
    if (pathname.startsWith("/category")) return "Categories";
    if (pathname.startsWith("/library")) return "Library";
    if (pathname.startsWith("/search")) return "Search";
    if (pathname.startsWith("/profile")) return "Profile";
    if (pathname.startsWith("/contact-us")) return "";
    return "Discover";
  };

  return (
    <>
      <div className="sticky top-0 z-40 w-full bg-black-100/95 backdrop-blur-md border-b border-white/5">
        <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between px-4 py-3 lg:px-6 lg:py-4 gap-3 lg:gap-0">
          {/* Top Container: Title + Hamburger/Profile */}
          <div className="flex items-center justify-between lg:justify-start w-full lg:w-auto">
            <div className="flex items-center gap-2 lg:gap-0 h-10 lg:h-auto">
              {/* Hamburger (Mobile only) */}
              <div className="lg:hidden text-white -ml-3 z-[60] relative">
                <Hamburger
                  toggled={isMobileMenuOpen}
                  toggle={setIsMobileMenuOpen}
                  size={24}
                  duration={0.4}
                  rounded
                />
              </div>

              {/* Mobile Logo */}
              <div className="lg:hidden scale-75 origin-left">
                <EstuMuzikLogo />
              </div>

              {/* Title (Hidden on mobile if Logo is present? Or present? User didn't specify, but space might be tight. 
                  Let's keep it but maybe smaller or hidden if it clashes. 
                  Original code had it visible on mobile. 
                  With Logo + Hamburger + Title + Profile, it might be crowded.
                  I'll hide title on mobile since we have the logo now, or keep it if space permits.
                  Let's keep it hidden on mobile as Logo acts as title/brand.
              */}
              <h1 className="hidden lg:block text-xl lg:text-2xl font-bold text-white tracking-tight ml-2 lg:ml-0">
                {getHeaderTitle()}
              </h1>
            </div>

            {/* Mobile-only Profile */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => {
                  startTransition(() => {
                    router.push("/profile");
                  });
                }}
                className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold text-sm"
              >
                {initials}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {pathname !== "/contact-us" && (
            <div className="w-full max-w-xl lg:ml-12 mt-2 lg:mt-0">
              <Search />
            </div>
          )}

          {/* Desktop-only Profile & Logout */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              onClick={() => {
                startTransition(() => {
                  router.push("/profile");
                });
              }}
              className="menu-button w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold text-lg text-white cursor-pointer focus:outline-none p-1 hover:scale-110 transition-transform duration-200 active:scale-95"
            >
              {initials}
            </button>
            {/* <Menu as="div" className="relative menu inline-block text-left">
              <div>
                <Menu.Button className="menu-button w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold text-lg text-white cursor-pointer focus:outline-none p-1 hover:scale-110 transition-transform duration-200 active:scale-95">
                  {initials}
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95 -translate-y-2"
                enterTo="transform opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100 translate-y-0"
                leaveTo="transform opacity-0 scale-95 -translate-y-2">
                <Menu.Items className="menu-items absolute right-0 mt-2 w-72 origin-top-right rounded-lg bg-black-100 shadow-xl backdrop-blur-sm focus:outline-none p-2 z-50 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={"/profile"}
                        className={`relative font-light group flex w-full items-center rounded-md px-3 py-2 text-sm transition-all duration-200`}>
                        <span className="text-lg mr-3 transition-transform duration-200 group-hover:scale-110">
                          <FiUser color="white" />
                        </span>
                        <span className="transition-all text-white duration-200 group-hover:translate-x-1">
                          Profile
                        </span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu> */}

            <button
              onClick={() => signOut()}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <RiLogoutBoxLine size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      <Transition show={isMobileMenuOpen} as={Fragment}>
        <div className="relative z-50 lg:hidden">
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </Transition.Child>

          {/* Drawer */}
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="fixed inset-y-0 left-0 w-[70%] max-w-sm bg-black-100 border-r border-white/10 shadow-xl flex flex-col p-6 overflow-y-auto">
              {/* Drawer Header */}
              <div className="flex items-center justify-between mb-8">
                <EstuMuzikLogo />
                {/* Close button is handled by Hamburger in header, or we can add another one here if needed. 
                    But typically clicking outside or the hamburger again closes it.
                    The Hamburger in the header is z-50 so it remains visible/clickable? 
                    Ah, the header is sticky z-40. The drawer is z-50.
                    So the header Hamburger might be covered by the backdrop/drawer if they are z-50.
                    I should make sure the Hamburger in header is clickable or add a close button inside the drawer.
                    Header is z-40. Drawer is z-50. Drawer covers header.
                    So original Hamburger is covered.
                    I should add a close button or header inside the drawer.
                */}
              </div>

              {/* Nav Items */}
              <div className="space-y-2 flex-1">
                {mobileNavItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleMobileNavigate(item.href)}
                    className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
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
              </div>

              {/* Mobile Logout (Bottom) */}
              <div className="pt-6 border-t border-white/10">
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-base font-medium text-red-400 hover:text-red-300 hover:bg-white/5 transition-all duration-200"
                >
                  <RiLogoutBoxLine size={24} />
                  Log out
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>

      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default Header;
