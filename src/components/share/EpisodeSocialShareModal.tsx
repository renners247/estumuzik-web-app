import React, { useEffect, useState } from "react";
import { BaseUrl } from "../utils/endpoints";

interface EpisodeSocialShareModallProps {
	episodeData: PodcastEpisode;
}

const EpisodeSocialShareModal = ({
	episodeData,
}: EpisodeSocialShareModallProps) => {
	const id = episodeData?.id;
	const title = episodeData?.title;
	const imageUrl = episodeData?.picture_url;
	const description = episodeData?.description;
	const shareUrl = `${BaseUrl}/courses/${id}`;
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (copied) {
			timer = setTimeout(() => {
				setCopied(false);
			}, 3000);
		}
		return () => clearTimeout(timer);
	}, [copied]);
	return (
		<div className='px-2 py-3 sm:pt-8 sm:pb-6'>
			<h3 className='text-white text-center mx-auto leading-normal sm:leading-[1.7] font-extralight text-xs sm:text-sm md:text-base w-full max-w-[320px] xs:max-w-[360px] sm:max-w-none mt-2 sm:mt-3 px-2 sm:px-3'>
				Share this page on your social accounts. You can also share directly
				with your contact by copying the link.
			</h3>

			<div className='mt-3 xs:mt-4 sm:mt-5 lg:mt-6 flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3 lg:gap-4 justify-center px-0.5'>
				{/* {socialMediaPlatforms.map((platform, index) => {
					const { Button, Icon, color } = platform;
					return (
						<div key={index} className='flex flex-col items-center'>
							<Button
								title={title}
								description={description}
								media={imageUrl ?? ""}
								appId={APP_ID}
								url={shareUrl}
								className='rounded-xl h-fit p-0.5 sm:p-1'
							>
								<Icon
									color={color}
									className='rounded-xl transition-all duration-300 hover:scale-110 w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12'
								/>
							</Button>
							
						</div>
					);
				})} */}
			</div>
		</div>
	);
};

export default EpisodeSocialShareModal;
