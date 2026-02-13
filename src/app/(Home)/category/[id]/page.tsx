import React from "react";
import Applayout from "@/components/globals/Applayout";
import AppMenu from "../../AppMenu";
import CategoryDetail from "./_components/CategoryDetail";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
    <Applayout>
      <CategoryDetail categoryId={id} />
      <AppMenu />
    </Applayout>
  );
};

export default page;
