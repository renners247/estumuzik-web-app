import AppMenu from "../../AppMenu";
import Favorites from "./_components/Favorites";
import Applayout from "@/components/globals/Applayout";

const page = () => {
  return (
    <Applayout>
      <Favorites />
      <AppMenu />
    </Applayout>
  );
};

export default page;
