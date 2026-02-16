import Applayout from "@/components/globals/Applayout";
import AppMenu from "@/app/(Home)/AppMenu";
import PlaylistEpisodes from "./_components/PlaylistEpisodes";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const { id } = params;

  return (
    <Applayout>
      <PlaylistEpisodes playlistId={id} />
      <AppMenu />
    </Applayout>
  );
};

export default Page;
