"use client";

import React, { ReactNode } from "react";
import SideNav from "./SideNav";
import Header from "./Header";
import Footer from "./Footer";

interface AppLayoutProps {
	children: ReactNode;
	className?: string;
}

const Applayout = ({ children, className }: AppLayoutProps) => {
	return (
		<>
			<main className='flex relative h-screen'>
				<SideNav />
				<div className='overflow-y-scroll w-full lg:w-[85%] relative bg-black-100'>
					<Header />
					<div
						className={`w-full relative md:px-2 lg:px-4 pb-5 lg:mt-0 ${className}`}
					>
						{children}
					</div>
					<Footer />
				</div>
			</main>
		</>
	);
};

export default Applayout;
