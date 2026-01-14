import LazyVimeo from "@/components/lazy-vimeo";

export default function HeroHome() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
        {/* Hero content */}
        <div className="py-10 md:py-20">
          {/* Section header */}
          <div className="pb-8 text-center md:pb-20">
            <h1
              className="section-heading pb-4 font-nacelle text-3xl font-semibold leading-tight md:pb-5 md:text-5xl md:leading-normal"
              data-aos="fade-up"
            >
              Marketing που πάει το Brand σου στο επόμενο επίπεδο 
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-6 text-base text-[#5b4a2a] sm:text-lg md:mb-8 md:text-xl"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Συστήματα υψηλής απόδοσης σχεδιασμένα για αύξηση εσόδων, όχι απλά views.
              </p>

             
            </div>
          </div>
          <div
            className="mx-auto aspect-video w-full max-w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-[#f1d79e]/60 -mt-3 mb-8 md:mt-[-50px] md:mb-[50px] md:max-w-3xl"
            data-aos="fade-up"
            data-aos-delay={400}
          >
            <LazyVimeo
              videoId="1128212394"
              title="Main landing page video"
              params="autoplay=0&title=0&byline=0&portrait=0"
              className="h-full w-full"
            />
          </div>
          <div
            className="mt-8 flex w-full justify-center"
            data-aos="fade-up"
            data-aos-delay={300}
          >
            <a
              href="mailto:hello@elitemedia.com"
              className="btn btn-shine px-5 py-3 text-sm rounded-[1rem] group w-full bg-[linear-gradient(to_right,var(--color-gold-500),var(--color-indigo-200),var(--color-indigo-500))] bg-[length:200%_auto] text-[#2b2216] hover:brightness-105 sm:w-auto md:px-10 md:py-4 md:text-lg"
            >
              Επικοινωνήστε μαζί μας
            </a>
          </div>
        </div>
        
      </div>
    </section>
  );
}
