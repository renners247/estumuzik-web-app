import { ButtonHTMLAttributes } from "react";
import { FaPlus, FaShareAlt } from "react-icons/fa";
import TooltipWrapper from "../common/TooltipWrapper";
import { useAppDispatch, useAppSelector } from "../Hooks";
import {
	setEpisodeToPlaylistId,
	toggleLoginModal,
	toggleSocialShareModal,
	toggleViewPlaylistModal,
} from "../Redux/ToggleModal";
import { useQueryClient } from "react-query";
import { setSocialShareEpisode } from "../Redux/Share";

interface ShareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	episode: any;
	color?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
	episode,
	color = "white",
	...props
}) => {
	const dispatch = useAppDispatch();

	const handleShareClick = () => {
		dispatch(setSocialShareEpisode(episode));
		dispatch(toggleSocialShareModal());
	};

	return (
		<button onClick={handleShareClick}>
			<TooltipWrapper content='Share episode' position='left'>
				<FaShareAlt
					size={18}
					color={color}
					className='cursor-pointer hover:scale-110 transition-[.4]'
				/>
			</TooltipWrapper>
		</button>
	);
};

export default ShareButton;
