"use client";

import { Modal, ModalBody, ModalContent } from "@heroui/react";
import { ListMusic } from "lucide-react";

interface ConfirmAddModalProps {
	isOpen: boolean;
	onClose: () => void;
	playlist: Playlist | null;
	episode: PodcastEpisode;
	onConfirm: () => void;
	isLoading: boolean;
}

const ConfirmAddModal = ({
	isOpen,
	onClose,
	playlist,
	episode,
	onConfirm,
	isLoading,
}: ConfirmAddModalProps) => {
	return (
		<Modal isOpen={isOpen} onOpenChange={onClose} size='sm'>
			<ModalContent>
				{(onClose) => (
					<ModalBody className='py-6'>
						<div className='text-center'>
							<div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-400 mb-4'>
								<ListMusic className='h-6 w-6 text-white' />
							</div>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								Add to Playlist
							</h3>
							<p className='text-sm text-gray-500 mb-6'>
								Add{" "}
								<span className='font-semibold text-gray-700'>
									"{episode.title}"
								</span>{" "}
								to{" "}
								<span className='font-semibold text-gray-700'>
									"{playlist?.name}"
								</span>
								?
							</p>
							<div className='flex gap-3 justify-center'>
								<button
									type='button'
									onClick={onClose}
									disabled={isLoading}
									className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
								>
									Cancel
								</button>
								<button
									type='button'
									onClick={onConfirm}
									disabled={isLoading}
									className='px-4 py-2 w-32 text-sm font-medium text-white bg-primary-500 hover:bg-primary-500/90 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
								>
									{isLoading ? (
										<div className='flex items-center justify-center'>
											<div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent' />
										</div>
									) : (
										"Add"
									)}
								</button>
							</div>
						</div>
					</ModalBody>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ConfirmAddModal;
