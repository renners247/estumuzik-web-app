import { ButtonHTMLAttributes } from "react";
import { FaPlus } from "react-icons/fa";
import TooltipWrapper from "../common/TooltipWrapper";
import { useAppDispatch, useAppSelector } from "../Hooks";
import {
  setEpisodeToPlaylistId,
  toggleLoginModal,
  toggleViewPlaylistModal,
} from "../Redux/ToggleModal";
import { useQueryClient } from "react-query";

interface PlaylistButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  episodeId: number;
  color?: string;
}

const PlaylistButton: React.FC<PlaylistButtonProps> = ({
  episodeId,
  color = "white",
  ...props
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const updateCache = async () => {
    await queryClient.invalidateQueries(["playlist"], {
      refetchActive: true, // Set to true to refetch immediately
    });
  };
  const handlePlaylist = (episode: number) => {
    if (user) {
      dispatch(setEpisodeToPlaylistId(episode));
      updateCache();
      dispatch(toggleViewPlaylistModal());
    } else {
      dispatch(toggleLoginModal());
    }
  };
  return (
    <button
      onClick={() => {
        handlePlaylist(episodeId);
      }}
    >
      <TooltipWrapper content="Add to playlist" position="top">
        <FaPlus size={18} color={color} className="cursor-pointer" />
      </TooltipWrapper>
    </button>
  );
};

export default PlaylistButton;
