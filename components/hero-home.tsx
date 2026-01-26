import LazyVimeo from "@/components/lazy-vimeo";
import { title } from "process";
import type { ReactNode } from "react";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";
import Image from "next/image";
import logo from "@/public/images/logo.webp";
import OfferCountdown from "./CountDown";

type HeroContent = {
  title?: ReactNode;
  titleText?: string;
  description?: ReactNode;
  videoId?: string;
  videoTitle?: string;
  videoParams?: string;
  ctaDescription?: string;
  ctaLabel?: ReactNode;
  ctaHref?: string;
};

type HeroHomeProps = {
  content?: HeroContent;
};


export default function HeroHome({ content }: HeroHomeProps) {
  const titleText = content?.titleText;

  return (
    <section className="relative px-4 mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 -mt-20 lg:-mt-20">
        {/* Hero content */}
        <div className="py-10 md:py-20">
          {/* Section header */}
          <div className="pb-8 text-center md:pb-20">
            {/* <div className="mb-4 flex justify-center" data-aos="fade-up">
              <Image src={logo} alt="Elite Media logo" width={96} height={96} />
            </div> */}
            {titleText ? (
              <BlurText
                as="h1"
                text={titleText}
                delay={250}
                animateBy="words"
                direction="top"
                className="section-heading justify-center pb-4 text-3xl font-bold leading-tight md:pb-5 md:text-5xl md:leading-normal"
                spanClassName="bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent"
  
              />
            ) : (
              <h1
                className="section-heading pb-4 bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent  text-3xl font-bold leading-tight md:pb-5 md:text-5xl md:leading-normal"
                // className="section-heading pb-4 text-3xl font-bold leading-tight md:pb-5 md:text-5xl md:leading-normal"

              >
                {content?.title}
              </h1>
            )}
            <div className="mx-auto max-w-3xl">
              <AnimatedContent ease = 'power3.out' duration={1.5} delay={0.3} distance={100}>
                <p className="section-description mb-6 lg:px-24 md:mb-8">
                  {content?.description}
                </p>
              </AnimatedContent>
            </div>
          </div>
          <AnimatedContent duration={1.5} delay={0.6} distance={100}>
            <div className="gradient-border mx-auto w-full max-w-full -mt-3 lg:mb-8 mb-14 md:mt-[-50px] md:mb-[50px] md:max-w-2xl">
              <div className="gradient-border__inner aspect-video w-full shadow-2xl">
                <LazyVimeo
                  videoId={content?.videoId ?? "1128212394"}
                  title={content?.videoTitle ?? "Main landing page video"}
                  params={content?.videoParams ?? "autoplay=0&title=0&byline=0&portrait=0"}
                  className="h-full w-full"
                />
              </div>
            </div>
          </AnimatedContent>
              <p
                className="-mt-4 mb-3 hidden text-center text-xs text-[#5b4a2a] md:mt-6 md:block"
>
                {content?.ctaDescription}
              </p>
          <div className="mt-8 flex w-full justify-center mb-25 lg:mb-12">
            <OfferCountdown />
          </div>
        </div>
              <p
                className="-mt-4 mb-3 text-center text-xs text-[#5b4a2a] md:mt-6 lg:hidden"
                data-aos="fade-up"
                data-aos-delay={200}>
                {content?.ctaDescription}
              </p>
        
      </div>
    </section>
  );
}
