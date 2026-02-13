
"use client";

import { RiMoreFill } from "react-icons/ri";
import { MdHomeFilled } from "react-icons/md";
import { FaDice, FaHeart, FaUser } from "react-icons/fa";

import Link from "next/link";
import Picture from "../picture/Index";
import { usePathname } from "next/navigation";

const MobileNavbar = () => {
  const pathname = usePathname();

  return (
    <div>
      <ul className="bg-black-100 grid grid-cols-5 justify-between place-items-center h-20 w-full mx-auto fixed right-0 left-0 bottom-0 rounded-md lg:hidden">
        <Link href={"/home"}>
          <li className="space-y-1.5 grid grid-cols-1 place-items-center place-content-center">
            <MdHomeFilled
              color={`${pathname === "/home" ? "green" : "#B6B6B6"}`}
            />
            <span
              className={`text-center text-gray-400 text-sm ${
                pathname === "/home" ? "active" : ""
              }`}
            >
              Home
            </span>
          </li>
        </Link>
        <Link href={"/games"}>
          <li className="space-y-1.5 grid grid-cols-1 place-items-center place-content-center">
            <FaDice color={`${pathname === "/games" ? "green" : "#B6B6B6"}`} />
            <span
              className={`text-center text-gray-400 text-sm ${
                pathname === "/games" ? "active" : ""
              }`}
            >
              Games
            </span>
          </li>
        </Link>
        <Link href={"/result"}>
          <li className="space-y-1.5 grid grid-cols-1 place-items-center place-content-center">
            <Picture src={""} alt="" className="w-auto h-auto" />
            <span
              className={`text-center text-gray-400 text-sm ${
                pathname === "/result" ? "active" : ""
              }`}
            >
              Result
            </span>
          </li>
        </Link>
        <Link href={"/me"}>
          <li className="space-y-1.5 grid grid-cols-1 place-items-center place-content-center">
            <FaUser color={`${pathname === "/me" ? "green" : "#B6B6B6"}`} />
            <span
              className={`text-center text-gray-400 text-sm${
                pathname === "/me" ? "active" : ""
              }`}
            >
              Me
            </span>
          </li>
        </Link>
        <button>
          <li className="space-y-1.5 grid grid-cols-1 place-items-center place-content-center">
            <RiMoreFill color="gray" />
            <span className={`text-center text-gray-400 text-sm`}>More</span>
          </li>
        </button>
      </ul>
    </div>
  );
};

export default MobileNavbar;
