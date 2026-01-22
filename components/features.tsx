import Image from "next/image";
import { AntDesignOutlined, BulbOutlined, SettingOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined } from "@ant-design/icons";

export default function Features() {
  return (
    <section id="how-it-works" className="relative px-4">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-10 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-3 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-amber-400/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-amber-400/50">
              <span className="inline-flex bg-linear-to-r from-indigo-600 to-indigo-300 bg-clip-text text-transparent">
                Τι Αναλαμβάνουμε 
              </span>
            </div>
            <h2 className="section-heading pb-3">
              Στρατηγική στα social media</h2>
            <p className="text-base text-[#5b4a2a] mb-4 md:text-lg">
              Δεν ανεβάζουμε απλά posts. Χτίζουμε brand, κοινό και συστήματα που μετατρέπουν το attention σε πωλήσεις.
            </p>
          </div>
          {/* <div className="flex justify-center pb-4 md:pb-12" data-aos="fade-up">
            <Image
              className="max-w-none"
              src={FeaturesImage}
              width={400}
              height={184}
              alt="Features"
            />
          </div> */}
          {/* Items */}
          <div className="mx-auto grid max-w-4xl grid-cols-1 items-center justify-items-center gap-6 sm:gap-8 md:gap-x-0 md:gap-y-18 lg:grid-cols-2 sm:grid-cols-2">
            <article className="flex max-w-sm flex-col items-center bg-amber-100/70 border-2 border-[#d4af37] rounded-3xl px-6 py-6 text-center">
              <svg
                className="mb-3 fill-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <path d="M0 0h14v17H0V0Zm2 2v13h10V2H2Z" />
                <path
                  fillOpacity=".48"
                  d="m16.295 5.393 7.528 2.034-4.436 16.412L5.87 20.185l.522-1.93 11.585 3.132 3.392-12.55-5.597-1.514.522-1.93Z"
                />
              </svg>
              <h3 className="mb-1   text-sm font-semibold text-[#2b2216] md:text-[1rem]">
                Περιεχόμενο με Σκοπό
              </h3>
              <p className="text-sm text-[#5b4a2a] md:text-base">
                Δημιουργούμε content που τραβάει προσοχή, χτίζει αξιοπιστία και επικοινωνεί ξεκάθαρα την αξία σου. Όχι απλά likes.
              </p>
            </article>
            <article className="flex max-w-sm flex-col items-center bg-amber-100/70 border-2 border-[#d4af37] rounded-3xl px-4 py-4 text-center">
              <UsergroupAddOutlined style={{color: "#d4af37", fontSize: "24px", padding: "10px"}} />
              <h3 className="mb-1   text-sm font-semibold text-[#2b2216] md:text-[1rem]">
                Κοινότητα που Εμπιστεύεται
              </h3>
              <p className="text-sm text-[#5b4a2a] md:text-base">
                Χτίζουμε ενεργό κοινό γύρω από το brand σου, ώστε οι άνθρωποι να μην σε παρακολουθούν απλώς, αλλά να σε εμπιστεύονται.
              </p>
            </article>
            <article className="flex max-w-sm flex-col items-center bg-amber-100/70 border-2 border-[#d4af37] rounded-3xl px-4 py-4 text-center">
              <BulbOutlined style={{color: "#d4af37", fontSize: "24px", padding: "10px"}} />
              <h3 className="mb-1   text-sm font-semibold text-[#2b2216] md:text-[1rem]">
                Ψυχολογία & Σύνδεση
              </h3>
              <p className="text-sm text-[#5b4a2a] md:text-base">
                Χρησιμοποιούμε ψυχολογία, storytelling και positioning για να συνδεθείς με το κοινό σου και να ξεχωρίσεις από τον ανταγωνισμό.
              </p>
            </article>
            <article className="flex max-w-sm flex-col items-center bg-amber-100/70 border-2 border-[#d4af37] rounded-3xl px-4 py-4 text-center">
              <SettingOutlined style={{color: "#d4af37", fontSize: "24px", padding: "10px"}} />
              <h3 className="mb-1   text-sm font-semibold text-[#2b2216] md:text-[1rem]">
                Συστήματα που Πουλάνε
              </h3>
              <p className="text-sm text-[#5b4a2a] md:text-base">
                Στήνουμε ξεκάθαρα funnels και αυτοματισμούς που μετατρέπουν το content σε leads και πωλήσεις — μετρήσιμα και επαναλήψιμα.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
