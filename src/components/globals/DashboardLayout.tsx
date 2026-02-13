import React, { ReactNode } from "react";
import SideNav from "./SideNav";
import Header from "./Header";

interface AppLayoutProps {
	children: ReactNode;
	className?: string;
}

const DashboardLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
	return (
		<>
			{/* <DrawerContainer /> */}
			<main className='flex w-full relative h-screen bg-primary-100-100'>
				<SideNav />
				<div className='overflow-y-scroll w-full lg:w-[80%] xl:w-[82%] relative bg-primary-100-100'>
					<Header />
					<div
						className={`w-full relative pt-20 xl:pt-24 pb-12 px-2 sm:px-5 ${className}`}
					>
						{children}
					</div>
				</div>
			</main>
		</>
	);
};

export default DashboardLayout;
