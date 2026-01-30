import type { ReactNode } from "react";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";
import HowItWorks from "@/components/HowItWorks";
import HowWeDoIt from "@/components/HowWeDoIt";

type HowColumnsSectionProps = {
  id?: string;
  className?: string;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  subheading?: ReactNode;
  howItWorksContent?: React.ComponentProps<typeof HowItWorks>["content"];
  howWeDoItContent?: React.ComponentProps<typeof HowWeDoIt>["content"];
};

export default function HowColumnsSection({
  id = "giati-elite-media",
  className,
  eyebrow,
  heading,
  subheading,
  howItWorksContent,
  howWeDoItContent,
}: HowColumnsSectionProps) {
  const rootClassName = ["mt-24", className].filter(Boolean).join(" ");

  return (
    <div id={id} className={rootClassName}>
      <div className="mx-auto max-w-2xl text-center ">
        <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-amber-400 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-amber-400">
          <BlurText
            as="span"
            delay={50}
            spanClassName="bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent"
          >
            {eyebrow}
          </BlurText>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1100px]  px-4 sm:px-6">
        <div className=" pb-8 text-center">
          <BlurText
            as="h2"
            className="section-heading text-neutral-900 pb-4"
            delay={50}
            animateBy="words"
            direction="top"
          >
            {heading}
          </BlurText>
          <AnimatedContent
            ease="power3.out"
            duration={1.1}
            delay={0.3}
            distance={100}
          >
            <p className="section-description ">{subheading}</p>
          </AnimatedContent>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-0 lg:items-start">
          <HowItWorks content={howItWorksContent} />
          <HowWeDoIt content={howWeDoItContent} />
        </div>
      </div>
    </div>
  );
}
