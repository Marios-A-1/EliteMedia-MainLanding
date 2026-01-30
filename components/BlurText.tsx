'use client';

import { motion, Transition, Easing } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';
import type { ElementType, HTMLAttributes, CSSProperties, ReactNode } from 'react';
import { isValidElement } from 'react';

type BlurTextProps = {
  as?: ElementType;
  text?: string;
  children?: ReactNode;
  delay?: number;
  className?: string;
  spanClassName?: string;
  getSpanClassName?: (segment: string, index: number) => string;
  spanStyle?: CSSProperties;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
} & Omit<HTMLAttributes<HTMLElement>, 'className'>;

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const extractText = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) {
    if (node.type === 'br') return '\n';
    return extractText(node.props.children);
  }
  return '';
};

const BlurText: React.FC<BlurTextProps> = ({
  as: Component = 'p',
  text = '',
  children,
  delay = 200,
  className = '',
  spanClassName = '',
  getSpanClassName,
  spanStyle,
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  ...rest
}) => {
  const resolvedText = text || extractText(children);
  const normalizedText =
    animateBy === 'words' ? resolvedText.replace(/\n/g, ' \n ') : resolvedText;
  const elements = animateBy === 'words' ? normalizedText.split(' ') : normalizedText.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(target);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  if (!resolvedText.trim()) {
    return (
      <Component ref={ref} className={`blur-text ${className} text-center`} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      className={`blur-text ${className} flex flex-wrap justify-center text-center`}
      {...rest}
    >
      {elements.map((segment, index) => {
        if (segment === '\n') {
          return <span key={`br-${index}`} className="basis-full h-0" aria-hidden="true" />;
        }
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        const resolvedSpanClassName = getSpanClassName ? getSpanClassName(segment, index) : spanClassName;

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            className={resolvedSpanClassName}
            style={{
              display: 'inline-block',
              willChange: 'transform, filter, opacity',
              ...spanStyle
            }}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' &&
              segment !== '\n' &&
              index < elements.length - 1 &&
              elements[index + 1] !== '\n' &&
              '\u00A0'}
          </motion.span>
        );
      })}
    </Component>
  );
};

export default BlurText;
