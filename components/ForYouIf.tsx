export default function ForYouIf() {
  return (
 <div className="mx-auto max-w-2xl pb-8 text-center mt-10 md:pb-12">
          <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-400/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-400/50">
            <span className="inline-flex bg-linear-to-r from-indigo-600 to-indigo-300 bg-clip-text text-transparent">
              Για ποίον είναι
            </span>
          </div>    
  <section className="px-6 flex flex-col gap-5  mb-20 lg:flex-cols-2 lg:gap-8 max-w-4xl mx-auto">

  <h3 className="section-heading pb-4">
    Αυτό είναι για εσένα αν:
  </h3>

  <div className="relative flex items-center justify-center rounded-2xl bg-gold-200 px-5 py-4 shadow-[0_10px_30px_rgba(247,97,161,0.08)]">
    <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-white text-sm font-semibold shadow-lg">
      ✓
    </div>
    <p className="text-sm text-center font-medium md:text-base leading-relaxed text-gold-900">
      Πουλάς high-ticket B2B, αλλά το pipeline σου δεν είναι προβλέψιμο (άλλοτε γεμάτο, άλλοτε άδειο)
    </p>
  </div>

  <div className="relative flex items-center justify-center rounded-2xl bg-gold-200 px-5 py-4 shadow-[0_10px_30px_rgba(247,97,161,0.08)]">
    <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-white text-sm font-semibold shadow-lg">
      ✓
    </div>
    <p className="text-sm text-center font-medium md:text-base leading-relaxed text-gold-900">
      Κάνεις content/ads “όποτε προλάβεις”, αλλά δεν σου φέρνουν σταθερά qualified leads και calls
    </p>
  </div>

  <div className="relative flex items-center justify-center rounded-2xl bg-gold-200 px-5 py-4 shadow-[0_10px_30px_rgba(247,97,161,0.08)]">
    <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-white text-sm font-semibold shadow-lg">
      ✓
    </div>
    <p className="text-sm text-center font-medium md:text-base leading-relaxed text-gold-900">
      Θες να χτίσεις authority στο niche σου ώστε να σε διαλέγουν πριν καν μιλήσετε για τιμή
    </p>
  </div>

  <div className="relative flex items-center justify-center rounded-2xl bg-gold-200 px-5 py-4 shadow-[0_10px_30px_rgba(247,97,161,0.08)]">
    <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-white text-sm font-semibold shadow-lg">
      ✓
    </div>
    <p className="text-sm text-center font-medium md:text-base leading-relaxed text-gold-900">
      Θες σύστημα “done-with-you / done-for-you” που να ταιριάζει στην επιχείρησή σου: messaging, content, distribution & funnel
    </p>
  </div>
</section>
</div>
  )
}
