import Applayout from "@/components/globals/Applayout";
import React from "react";
import CategoryPage from "./_components/CategoryPage";
import AppMenu from "../AppMenu";

const page = () => {
  return (
    <Applayout>
      <CategoryPage />
      <AppMenu />
    </Applayout>
  );
};

export default page;
