import { Modal, ModalContent, useDisclosure } from "@heroui/react";
import React from "react";
import { FaShareAlt } from "react-icons/fa";
import EpisodeSocialShareModal from "../share/EpisodeSocialShareModal";

interface PodcastEpisodeShareButtonProps {
	data: PodcastEpisode;
	className?: string;
}
const PodcastEpisodeShareButton = ({
	data,
	className,
}: PodcastEpisodeShareButtonProps) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<>
			<button
				onClick={onOpen}
				className={`flex items-center justify-center border border-white rounded-full p-1.5 lg:p-2 hover:bg-white/10 hover:scale-105 transition-all duration-200 cursor-pointer ${className}`}
			>
				<FaShareAlt className='text-xs lg:text-sm' />
			</button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement='center'
				size='lg'
				backdrop='blur'
				shadow='md'
				className='bg-primary-600/30'
			>
				<ModalContent>
					{(onClose) => <EpisodeSocialShareModal episodeData={data} />}
				</ModalContent>
			</Modal>
		</>
	);
};

export default PodcastEpisodeShareButton;
