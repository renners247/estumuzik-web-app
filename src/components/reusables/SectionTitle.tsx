import React from "react";

interface SectionTitleProps {
  name: string;
}

const SectionTitle = ({ name }: SectionTitleProps) => {
  return (
    <h2 className="text-2xl font-bold text-white tracking-tight">{name}</h2>
  );
};

export default SectionTitle;
