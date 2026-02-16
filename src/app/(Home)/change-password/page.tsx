import AppMenu from "../AppMenu";
import ChangePassword from "./ChangePassword";
import Applayout from "@/components/globals/Applayout";

const page = () => {
  return (
    <Applayout>
      <ChangePassword />
      <AppMenu />
    </Applayout>
  );
};

export default page;
