import Hero from "@/components/sections/Hero";
import EditorialGrid from "@/components/sections/EditorialGrid";
import FullBleedImage from "@/components/sections/FullBleedImage";
import TextFeature from "@/components/sections/TextFeature";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import VideoMoment from "@/components/sections/VideoMoment";
import Newsletter from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EditorialGrid />
      <FullBleedImage />
      <TextFeature />
      <FeaturedCollection />
      <VideoMoment />
      <Newsletter />
    </>
  );
}
