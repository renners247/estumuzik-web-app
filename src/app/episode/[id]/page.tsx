import EpisodeContent from "../_components/EpisodeContent";
import Applayout from "@/components/globals/Applayout";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	return (
		<Applayout>
			<EpisodeContent episodeId={id} />
		</Applayout>
	);
};

export default page;
