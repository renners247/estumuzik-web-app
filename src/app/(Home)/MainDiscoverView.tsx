"use client";
import PodcastCard from "@/components/Cards/_components/PodcastCard";
import { APICall } from "@/components/utils/extra";
import React from "react";
import { useQuery } from "react-query";

const PODCAST_DATA = [
	{
		category: "Change Africa Podcast",
		title: "Caleb Maru: Navigating Afric...",
		description:
			"In this episode of the Change Africa Podcast, we host Tarek Mouganie, the multifaceted founder and CEO of Affinity Africa.",
		coverImage:
			"https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500",
		thumbnail:
			"https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=200",
		isLiked: false,
	},
	{
		category: "Living African",
		title: "Caleb Maru: Navigating Afric...",
		description:
			"In this episode of the Change Africa Podcast, we host Tarek Mouganie, the multifaceted founder and CEO of Affinity Africa.",
		coverImage:
			"https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=500",
		thumbnail:
			"https://images.unsplash.com/photo-1514525253361-bee8718a34a1?q=80&w=200",
		isLiked: true, // This one will show the green heart
	},
	{
		category: "I Said What I Said",
		title: "Caleb Maru: Navigating Afric...",
		description:
			"In this episode of the Change Africa Podcast, we host Tarek Mouganie, the multifaceted founder and CEO of Affinity Africa.",
		coverImage:
			"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500",
		thumbnail:
			"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200",
		isLiked: false,
	},
	{
		category: "Finance For Hippies",
		title: "Caleb Maru: Navigating Afric...",
		description:
			"In this episode of the Change Africa Podcast, we host Tarek Mouganie, the multifaceted founder and CEO of Affinity Africa.",
		coverImage:
			"https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500",
		thumbnail:
			"https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=200",
		isLiked: false,
	},
];

const MainDiscoverView = () => {
	//       const { data: coursesData, isLoading: coursesDataIsLoading } = useQuery(
	//     ["most-viewed-courses", 1, 20],
	//     async () => {
	//       const response = await APICall(getMostViewedCourses, [1, 20]);
	//       return response?.data?.data?.data || [];
	//     },
	//     {
	//       staleTime: Infinity,
	//       refetchOnWindowFocus: true,
	//       cacheTime: 0,
	//     }
	//   );

	//   const CoursesData: ViewedPopularCourse[] = coursesData || [];
	return (
		<div className='p-6'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
				{PODCAST_DATA.map((podcast, index) => (
					<PodcastCard key={index} data={podcast} />
				))}
			</div>
		</div>
	);
};

export default MainDiscoverView;
