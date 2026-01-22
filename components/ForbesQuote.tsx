import { ExternalLinkIcon } from "lucide-react";
import type { ReactNode } from "react";

type ForbesQuoteContent = {
  href?: string;
  quote?: ReactNode;
  sourceText?: ReactNode;
  logoSrc?: string;
  logoAlt?: string;
};

type ForbesQuoteProps = {
  content?: ForbesQuoteContent;
};

export default function ForbesQuote({ content }: ForbesQuoteProps) {
  return (
    <section className="mx-auto mt-4 max-w-3xl max-h-300 px-4">
      <a
        href={content?.href ?? "https://www.forbesgreece.gr/story/3934912/elitemedia-to-elliniko-agency-pou-katalabainei-kalutera-ton-ellina-ap-oso-katalabainei-o-idios-ton-eauto-tou"}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl py-6  px-4 -pr-6 border-amber-300/60 bg-gradient-to-br from-gold-500/10 via-gold-200/40 to-gold-500/50 p-6 transition hover:shadow-lg"
      >
        <blockquote className="text-md font-serif font-bold text-neutral-800 leading-relaxed">
          {content?.quote ?? <>“EliteMedia: Το ελληνικό agency που καταλαβαίνει καλύτερα τον Έλληνα απ’ όσο καταλαβαίνει ο ίδιος τον εαυτό του”</>}
        </blockquote>
        
        <div className="mt-6 flex items-center gap-2 opacity-80 justify-end group-hover:opacity-100">
            <span className="text-xs text-neutral-500">{content?.sourceText ?? <>Διαβάστε το πλήρες άρθρο στο </>}</span>
          <img
          style={{marginTop: '-6px'}}
            src={content?.logoSrc ?? "/images/Forbes_logo.svg"}
            alt={content?.logoAlt ?? "Forbes"}
            className="h-4 w-auto"
          />
            {/* <ExternalLinkIcon className="justify-self-end h-4 w-4 -mt-2 -mr-6 text-neutral-500" /> */}
        </div>
      </a>
    </section>
  )
}
