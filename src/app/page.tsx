// import RedirectContainer from "@/components/reusables/RedirectContainer";
import { Metadata } from "next";
import Applayout from "@/components/globals/Applayout";
import { SEODATA, websiteUrl } from "../components/utils/seoConstants";
import AppMenu from "./(Home)/AppMenu";
import MainDiscoverView from "./(Home)/MainDiscoverView";
import TopJolly from "./(Home)/_components/TopJolly";
import Handpicked from "./(Home)/_components/Handpicked";
import EditorsPick from "./(Home)/_components/EditorsPick";
import NewestEpisodes from "./(Home)/_components/NewestEpisodes";
import SearchByPopularKeywords from "./(Home)/_components/SearchByPopularKeywords";

const { description, keywords, title, url } = SEODATA.default;
export const metadata: Metadata = {
  title,
  description,
  keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords,
  robots: { index: true, follow: true },
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "website",
    images: [
      {
        url: SEODATA.defaultOGImage,
        width: 1200,
        height: 630,
        alt: `${title} Open Graph Image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SEODATA.defaultOGImage],
  },
};

const page = () => {
  return (
    <Applayout className="px-2 lg:px-0 mt-4 lg:mt-16">
      <MainDiscoverView />
      <EditorsPick />
      <TopJolly />
      <NewestEpisodes />
      <Handpicked />
      <SearchByPopularKeywords />
      {/* <AppMenu /> */}
    </Applayout>
  );
};

export default page;
