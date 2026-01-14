export const metadata = {
  title: "Home - Open PRO",
  description: "Page description",
};
import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import HowWeDoIt from "@/components/HowWeDoIt";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import ChromaGrid from "@/components/chroma-grid";
import Carousel from "@/components/carousel";
import OldNew from "@/components/OldNew";
import ForYouIf from "@/components/ForYouIf";


export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <ForYouIf />
      <Features />
      <HowWeDoIt />
      {/* <Workflows /> */}
      <OldNew />
      <Testimonials />
      {/* <ChromaGrid items={partners} className="my-6 flex-1 md:my-10" /> */}
      <Cta />
    </>
  );
}
