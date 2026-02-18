import React from "react";
import Applayout from "@/components/globals/Applayout";
import AppMenu from "../AppMenu";
import LibraryPage from "./_components/LibraryPage";

const page = () => {
	return (
		<Applayout>
			<LibraryPage />
			{/* <AppMenu /> */}
		</Applayout>
	);
};

export default page;
