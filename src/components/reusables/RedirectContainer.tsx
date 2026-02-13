"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const RedirectContainer = () => {
	useEffect(() => {
		redirect("/dashboard");
	}, []);
	return <></>;
};

export default RedirectContainer;
