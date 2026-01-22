import LazyVimeo from "@/components/lazy-vimeo";
import { title } from "process";
import type { ReactNode } from "react";

type HeroContent = {
  title?: ReactNode;
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
  return (
    <section className="relative px-4 mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 -mt-10">
        {/* Hero content */}
        <div className="py-10 md:py-20">
          {/* Section header */}
          <div className="pb-8 text-center md:pb-20">
            <h1
              className="section-heading pb-4   text-3xl font-semibold leading-tight md:pb-5 md:text-5xl md:leading-normal"
              data-aos="fade-up"
            >
              {content?.title}
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-6 lg:px-24 text-lg text-[#5b4a2a] sm:text-lg md:mb-8 md:text-2xl"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                {content?.description }
              </p>

             
            </div>
          </div>
          <div
            className="mx-auto aspect-video w-full max-w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-[#f1d79e]/60 -mt-3 mb-8 md:mt-[-50px] md:mb-[50px] md:max-w-3xl"
            data-aos="fade-up"
            data-aos-delay={400}
          >
            <LazyVimeo
              videoId={content?.videoId ?? "1128212394"}
              title={content?.videoTitle ?? "Main landing page video"}
              params={content?.videoParams ?? "autoplay=0&title=0&byline=0&portrait=0"}
              className="h-full w-full"
            />
          </div>
              <p
                className="-mt-4 mb-3 hidden text-center text-xs text-[#5b4a2a] md:mt-6 md:block"
                data-aos="fade-up"
                data-aos-delay={200}>
                {content?.ctaDescription}
              </p>
          <div
            className="mt-8 flex w-full justify-center"
            data-aos="fade-up"
            data-aos-delay={300}
          >
            <a
              href={content?.ctaHref ?? "mailto:hello@elitemedia.com"}
              className="btn btn-shine px-5 py-3 text-sm rounded-[1rem] group w-full bg-[linear-gradient(to_right,var(--color-gold-500),var(--color-indigo-200),var(--color-indigo-500))] bg-[length:200%_auto] text-[#2b2216] hover:brightness-105 sm:w-auto md:px-10 md:py-4 md:text-lg"
            >
              {content?.ctaLabel}
            </a>
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
