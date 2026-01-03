export const metadata = {
  title: "Home - Open PRO",
  description: "Page description",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import ChromaGrid from "@/components/chroma-grid";
import Carousel from "@/components/carousel";

// const partners = [
//  {
//       image: 'https://i.pravatar.cc/300?img=8',
//       title: 'Alex Rivera',
//       subtitle: 'Full Stack Developer',
//       handle: '@alexrivera',
//       borderColor: '#4F46E5',
//       gradient: 'linear-gradient(145deg, #4F46E5, #000)',
//       url: 'https://github.com/'
//     },
//     {
//       image: 'https://i.pravatar.cc/300?img=11',
//       title: 'Jordan Chen',
//       subtitle: 'DevOps Engineer',
//       handle: '@jordanchen',
//       borderColor: '#10B981',
//       gradient: 'linear-gradient(210deg, #10B981, #000)',
//       url: 'https://linkedin.com/in/'
//     },
//     {
//       image: 'https://i.pravatar.cc/300?img=3',
//       title: 'Morgan Blake',
//       subtitle: 'UI/UX Designer',
//       handle: '@morganblake',
//       borderColor: '#F59E0B',
//       gradient: 'linear-gradient(165deg, #F59E0B, #000)',
//       url: 'https://dribbble.com/'
//     },
//     {
//       image: 'https://i.pravatar.cc/300?img=16',
//       title: 'Casey Park',
//       subtitle: 'Data Scientist',
//       handle: '@caseypark',
//       borderColor: '#EF4444',
//       gradient: 'linear-gradient(195deg, #EF4444, #000)',
//       url: 'https://kaggle.com/'
//     },
//     {
//       image: 'https://i.pravatar.cc/300?img=25',
//       title: 'Sam Kim',
//       subtitle: 'Mobile Developer',
//       handle: '@thesamkim',
//       borderColor: '#8B5CF6',
//       gradient: 'linear-gradient(225deg, #8B5CF6, #000)',
//       url: 'https://github.com/'
//     },
//     {
//       image: 'https://i.pravatar.cc/300?img=60',
//       title: 'Tyler Rodriguez',
//       subtitle: 'Cloud Architect',
//       handle: '@tylerrod',
//       borderColor: '#06B6D4',
//       gradient: 'linear-gradient(135deg, #06B6D4, #000)',
//       url: 'https://aws.amazon.com/'
//     }
// ];

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Features />
      <Testimonials />
      {/* <ChromaGrid items={partners} className="my-6 flex-1 md:my-10" /> */}
      <Cta />
    </>
  );
}
