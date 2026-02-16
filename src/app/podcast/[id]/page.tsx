import Applayout from "@/components/globals/Applayout";
import PodcastContent from "../_components/PodcastContent";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	return (
		<Applayout>
			<PodcastContent PodcastId={id} />
		</Applayout>
	);
};

export default page;
