export const metadata = {
  title: "Events - Open PRO",
  description: "Page description",
};

import Hero from "@/components/hero-home";
import ForbesQuote from "@/components/ForbesQuote";
import Carousel from "@/components/carousel";
import OldNew from "@/components/OldNew";
import Features from "@/components/features";
import ForYouIf from "@/components/ForYouIf";
import Testimonials from "@/components/testimonials";
import HowWeDoIt from "@/components/HowWeDoIt";
import Cta from "@/components/cta";
const eventsHero={
  title: <>Βγάλε τα πρώτα σου 1000 online σε 90 μέρες ως τελείως αρχάριος</>,
  description: <>Μεταμορφώστε τα events σας με στρατηγικό marketing που αυξάνει τη συμμετοχή και την αφοσίωση.</>,
  videoId: "1128212394",
  videoTitle: "Events video",
  videoParams: "autoplay=0&title=0&byline=0&portrait=0",
  ctaLabel: <>Your CTA</>,
  ctaHref: "mailto:hello@elitemedia.com",
}
export default function EventsPage() {
  return (
    <>
      <Hero content={eventsHero}/>
      {/* <OldNew /> */}
      {/* <Features /> */}
      {/* <ForYouIf /> */}
      <Testimonials />
      <ForbesQuote />
      <HowWeDoIt />
      <Cta />
    </>
  );
}
