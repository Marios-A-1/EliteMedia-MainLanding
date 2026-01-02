"use client";

import Logo from "./logo";

export default function Header() {
  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/10 px-3 backdrop-blur-3xl border border-white/10 shadow-[0_20px_45px_rgba(3,0,10,0.35)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(120deg,rgba(255,255,255,0.08),rgba(255,255,255,0))_border-box] before:[mask-composite:exclude_!important] )] after:absolute after:inset-0 after:-z-10 ">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          <div className="flex flex-1 items-center justify-end">
            <a
              href="mailto:hello@elitemedia.com"
              className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.16)] transition hover:bg-[length:100%_150%]"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
