import { CheckCircle2, XCircle } from 'lucide-react'
import { Card } from 'antd'

const OLD_HABITS = [
'Ξεκινάς «content από Δευτέρα» κάθε λίγο. Ανεβάζεις 3–4 reels, μετά χάνεσαι, δεν υπάρχει πλάνο… και γυρνάς πάλι από την αρχή.',
'Trends, “gurus”, templates, «κάνε αυτό το hook». Πληροφορία παντού, σύστημα πουθενά. Χρόνος/χρήμα φεύγουν και οι πελάτες δεν έρχονται σταθερά.',
  'Μετράς likes και views, αλλά δεν ξέρεις τι δουλεύει. Νιώθεις ότι “πετάς” content και budget χωρίς έλεγχο και προβλεψιμότητα.',
]

const LEVEL_UP_WINS = [
  'Ξυπνάς και ΞΕΡΕΙΣ τι βγαίνει: θεματολογία, hooks, σενάρια, γυρίσματα, edits, uploads. Βήμα-βήμα. Καμία σύγχυση, κανένα «τι να ανεβάσω σήμερα;»”.',
  'Τελειώνεις με το random. Στήνουμε Growth Operating System: content + distribution + funnel. Κάθε βίντεο έχει σκοπό (lead/ραντεβού/πώληση) — όχι απλά views.',
  'Χτίζεις έλεγχο & αυτοπεποίθηση. Έχεις KPIs, εβδομαδιαίο review, optimization, και καθαρή εικόνα του τι φέρνει ραντεβού/πωλήσεις. Από «ελπίζω» → ξέρω.',
]

export default function OldNew() {
  return (
    <div className='px-2'>
     <div className="mx-auto max-w-2xl px-6 pb-8 text-center mt-10 md:pb-12">
          <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-amber-400 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-amber-400">
            <span className="inline-flex bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
              Οι Διαφορές
            </span>
          </div>    
            <h3 className="section-heading pb-4 -px-2">
              Μόνος σου  VS  Με  Elite Media
            </h3>
            <p className="section-description">
            Πώς αλλάζει η επιχείρησή σου όταν έχεις ένα σύστημα που δουλεύει για σένα, αντί να παλεύεις μόνος σου.
          </p>
  </div>
    <div className="grid gap-6 items-center mt-10 justify-self-center place-self-center max-w-300 md:gap-8 lg:grid-cols-2">
        

      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-5 rounded-3xl p-6">

        {/* IMAGE */}
        <div className="relative h-[160px] w-full overflow-hidden rounded-2xl bg-muted">
          <img
          loading='lazy'
            style={{
              filter: "brightness(0.8)",
            }}
            src="/images/oldEliteMedia.webp"
            className="h-full w-full object-cover"
          /> 

          {/* Soft overlay */}
          <div className="absolute inset-0 bg-gold-200/30" />

          {/* Centered label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-xl bg-white/80 px-4 py-1 text-xl font-black text-foreground">
              Μόνος σου
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {OLD_HABITS.map((item) => (
            <div
              key={item}
              className="flex items-center gap-5 rounded-2xl border border-gold-700  px-6 py-3 shadow-[0_12px_30px_rgba(247,97,161,0.05)]"
            >
              <div className="h-5 w-5" aria-hidden="true"><XCircle className="h-6 w-6 text-gold-700" /></div>
              <p className="text-sm p-2 font-bold text-black md:text-base">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex flex-col gap-5 rounded-3xl p-6">
        {/* <h3 className="text-2xl text-center font-black text-foreground md:text-3xl">
          Με το Level Her Up
        </h3> */}

        {/* IMAGE */}
        <div className="relative h-[160px] w-full overflow-hidden rounded-2xl bg-muted">
          <img
          loading='lazy'
            style={{
              objectFit: 'cover',
              filter: "brightness(0.8)",
            }}
            src="/images/NewGirls.webp"
            className="h-full w-full object-cover"
          />

          {/* Soft overlay */}
          <div className="absolute inset-0 bg-pink-200/20" />
 
          {/* Centered label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-xl bg-gold-200/80 px-4 py-1 text-xl font-black text-foreground">
              Με Elite Media
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {LEVEL_UP_WINS.map((item) => (
            <div
              key={item}
              className="flex items-center gap-5 rounded-2xl border border-gold-200 bg-gold-200/70 px-6 py-3 shadow-[0_12px_30px_rgba(247,97,161,0.05)]"
              
            >
              <div className="h-5 w-5" aria-hidden="true"><CheckCircle2 className="h-6 w-6 text-amber-400" /></div>
              <p className="text-sm p-2 font-bold text-black md:text-base">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
  )
}
