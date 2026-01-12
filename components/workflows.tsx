import Image from "next/image";
import WorflowImg01 from "@/public/images/logo.webp";
import WorflowImg02 from "@/public/images/logo.webp";
import WorflowImg03 from "@/public/images/logo.webp";
import Spotlight from "@/components/spotlight";
import Carousel from "./carousel";

export default function Workflows() {
  return (
    <section id="services" className="scroll-mt-20 mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-8 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-8 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Services
              </span>
            </div>
            <h2 className="section-heading pb-4">
              Η προσφορά μου
            </h2>
            {/* <p className="text-base text-[#5b4a2a] md:text-lg">
              Simple and elegant interface to start collaborating
            </p> */}
          </div>
          {/* Spotlight items */}

          <Spotlight className="group mx-auto flex flex-col max-w-full items-start gap-4 overflow-visible pb-2 px-8 sm:px-6 md:grid md:max-w-sm md:pb-0 md:gap-6 lg:max-w-none lg:grid-cols-3">
            {/* Card 1 */}
            <a
              className="group/card relative h-full w-full shrink-0 overflow-hidden rounded-2xl bg-[#464646] p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/50 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500/70 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 md:w-auto md:shrink"
              href="#0"
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-[#fff] after:absolute after:inset-0 after:bg-linear-to-br">
                
                {/* Image */}
                <Image
                style={{padding:66}}
                  className="inline-flex"
                  src={WorflowImg01}
                  width={350}
                  height={288}
                  alt="Workflow 01"
                />
                {/* Content */}
                <div className="p-4 md:p-6">
                  <div className="mb-3">
                    <span className="
                      inline-flex items-center
                      rounded-full
                      bg-[#eae7df]
                      px-3 py-0.5
                      text-xs font-medium
                      tracking-wide
                      text-[var(--color-gold-accent)]
                    "><span className="text-[#090909]">
                        Essential — 500€
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-[#5b4a2a] md:text-base">
                    • 10 απλά, καθαρά videos για social media
                    <br />
                    • Ιδανικό για σταθερή και επαγγελματική online παρουσία
                    <br />
                    • Βασικό editing & σωστό formatting
                    <br />
                    • Περιεχόμενο έτοιμο για άμεσο ανέβασμα
                  </p>
                </div>
              </div>
            </a>
            {/* Card 2 */}
            <a
              className="group/card relative h-full w-full shrink-0 overflow-hidden rounded-2xl bg-[#9f9f9f] p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/50 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500/70 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 md:w-auto md:shrink"
              href="#0"
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-[#eae8e8] after:absolute after:inset-0 after:bg-linear-to-br">
                
                {/* Image */}
                <Image
                style={{padding:66}}
                  className="inline-flex"
                  src={WorflowImg02}
                  width={350}
                  height={288}
                  alt="Workflow 02"
                />
                {/* Content */}
                <div className="p-4 md:p-6">
                  <div className="mb-3">
                      <span className="
                      inline-flex items-center
                      rounded-full
                      bg-[#d1d1d1]
                      px-3 py-0.5
                      text-xs font-medium
                      tracking-wide
                      text-[var(--color-gold-accent)]
                    "><span className="text-[#474747]">
                        Silver — 1.000€
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-[#474747] md:text-base">
                    • 8 videos υψηλής ποιότητας (premium)
                    <br />
                    • Σενάρια βασισμένα σε hooks & ψυχολογία κοινού
                    <br />
                    • Προχωρημένο editing & captions
                    <br />
                    • Βελτιστοποιημένο για retention & engagement
                  </p>
                </div>
              </div>
            </a>
            {/* Card 3 */}
            <a
              className="group/card relative h-full w-full shrink-0 overflow-hidden rounded-2xl bg-[#ffb93f] p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/50 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500/70 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 md:w-auto md:shrink"
              href="#0"
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-[#ffe7bc] after:absolute after:inset-0 after:bg-linear-to-br after:from-[#f4c74e]/20 after:via-transparent/40 after:to-[#f4c74e]/15">
              
                {/* Image */}
                <Image
                style={{padding:66}}
                  className="inline-flex"
                  src={WorflowImg03}
                  width={350}
                  height={288}
                  alt="Workflow 03"
                />
                {/* Content */}
                <div className="p-4 md:p-6">
                  <div className="mb-3">
                      <span className="
                      inline-flex items-center
                      rounded-full
                      bg-[#ffd079]
                      px-3 py-0.5
                      text-xs font-medium
                      tracking-wide
                      text-[var(--color-gold-accent)]
                    "><span className="text-[#5b4a2a]">
                        Golden Signature — Custom
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-[#5b4a2a] md:text-base">
                    • 12+ premium videos κάθε μήνα
                    <br />
                    • Στρατηγική περιεχομένου & positioning του brand
                    <br />
                    • Υποστήριξη paid ads (Meta, TikTok κ.ά.)
                    <br />
                    • Revisions, fine-tuning & συνεχής βελτιστοποίηση
                  </p>
                </div>
              </div>
            </a>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
