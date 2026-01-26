import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import BlurText from "@/components/BlurText";

export type ForYouIfItem = {
  badge?: ReactNode;
  text?: ReactNode;
};

export type ForYouIfContent = {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  items?: ForYouIfItem[];
};

type ForYouIfProps = {
  content: ForYouIfContent;
};

export default function ForYouIf({ content }: ForYouIfProps) {
  return (
 <div className="mx-auto max-w-2xl px-2 pb-8 text-center mt-10 md:pb-12">
          <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-amber-400 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-amber-400">
            <BlurText
              as="span"
              delay={50}
              spanClassName="bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent"
            >
              {content.eyebrow}
            </BlurText>
          </div>    
  <section className="px-6 flex flex-col gap-5  mb-20 lg:flex-cols-2 lg:gap-8 max-w-4xl mx-auto">

  <BlurText
    as="h3"
    className="section-heading pb-4"
    delay={250}
    animateBy="words"
    direction="top"
  >
    {content.heading}
  </BlurText>

  {content.items?.map((item, index) => (
    <div
      key={`for-you-if-${index}`}
      className="relative  flex items-center justify-center rounded-2xl  bg-amber-200/30 border-0 border-amber-400  px-5 py-4 shadow-[0_10px_30px_rgba(247,97,161,0.08)]"
    >
      <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-amber-400 bg-white text-sm font-bold shadow-lg">
        <CheckCircle2></CheckCircle2>
      </div>
      <p className="text-md md:text-lg text-center font-bold  leading-relaxed text-indigo-900">
        {item.text}
      </p>
    </div>
  ))}
</section>
</div>
  )
}
