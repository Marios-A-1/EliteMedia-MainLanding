export default function HeroHome() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
        {/* Hero content */}
        <div className="py-10 md:py-20">
          {/* Section header */}
          <div className="pb-8 text-center md:pb-20">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold leading-tight text-transparent md:pb-5 md:text-5xl md:leading-normal"
              data-aos="fade-up"
            >
              Marketing που πάει το Brand σου στο επόμενο επίπεδο 
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-6 text-base text-white sm:text-lg md:mb-8 md:text-xl"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Συστήματα υψηλής απόδοσης σχεδιασμένα για αύξηση εσόδων, όχι απλά views.
              </p>

             
            </div>
          </div>

          <div
            className="aspect-video w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/30 -mt-3 mb-8 md:mt-[-50px] md:mb-[50px]"
            data-aos="fade-up"
            data-aos-delay={400}
          >
            <iframe
              src="https://player.vimeo.com/video/1128212394?autoplay=0&title=0&byline=0&portrait=0"
              title="Main landing page video"
              className="h-full w-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              width={800}
            />
          </div>
         <div
                className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md mt-15"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                <a
                  className="btn group w-full bg-linear-to-t from-indigo-700 to-indigo-400 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                  href="#0"
                >
                  <span className="relative inline-flex items-center justify-center">
                    Start Building
                    <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                      -&gt;
                    </span>
                  </span>
                </a>
              </div>
        </div>
        
      </div>
    </section>
  );
}
