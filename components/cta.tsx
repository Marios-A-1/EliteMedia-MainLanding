import Image from "next/image";
import BlurredShape from "@/public/images/blurred-shape.svg";

export default function Cta() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-24 ml-20 -translate-x-1/2"
        aria-hidden="true"
      >
      </div>
      <div className="max-w6xl mx-auto px-4 sm:px-6">
        <div className="py-10 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="section-heading pb-6 md:pb-8"
              data-aos="fade-up"
            >
              Χτίσε το content που ταιριάζει στο brand σου
            </h2>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <div
            className="mt-8 flex w-full justify-center"
            data-aos="fade-up"
            data-aos-delay={300}
          >
            <a
              href="mailto:hello@elitemedia.com"
              className="btn px-5 py-3 text-sm rounded-[1rem] group w-full animate-[gradient-pause_7s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gold-500),var(--color-indigo-500),var(--color-indigo-200),var(--color-indigo-500),var(--color-gold-500))] bg-[length:200%_auto] text-[#2b2216] shadow-[0_10px_25px_rgba(145,105,20,0.25)] hover:brightness-105 sm:w-auto md:px-10 md:py-4 md:text-lg"
            >
              Επικοινωνήστε μαζί μας
            </a>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
