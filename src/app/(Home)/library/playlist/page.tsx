import AppMenu from "../../AppMenu";
import Playlists from "./_components/Playlists";
import Applayout from "@/components/globals/Applayout";

const page = () => {
  return (
    <Applayout>
      <Playlists />
      <AppMenu />
    </Applayout>
  );
};

export default page;
