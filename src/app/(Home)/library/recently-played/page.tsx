import AppMenu from "../../AppMenu";
import Applayout from "@/components/globals/Applayout";
import RecentlyPlayed from "./_components/RecentlyPlayed";

const page = () => {
  return (
    <Applayout>
      <RecentlyPlayed />
      <AppMenu />
    </Applayout>
  );
};

export default page;
