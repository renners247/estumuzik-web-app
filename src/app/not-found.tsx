import Applayout from "@/components/globals/Applayout";
import React from "react";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
	return (
		<div className='h-screen grid place-items-center'>
			<div className='flex flex-col justify-center items-center'>
				<TbError404 className='animate-bounce text-primary-300 text-4xl' />
				<h3 className='text-base font-semibold text-primary-300'>
					Page not found
				</h3>
			</div>
		</div>
	);
};

export default NotFound;
