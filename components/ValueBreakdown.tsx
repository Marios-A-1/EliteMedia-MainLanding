'use client';

// import { Card } from '@/components/ui/card';

/* =========================
   Types
========================= */

export type ValueBreakdownItem = {
  label: string;
  amount: string;
  description?: string;
  strike?: boolean;
  highlight?: boolean;
};

type ValueBreakdownContent = {
  items: ValueBreakdownItem[];
};

type ValueBreakdownProps = {
  content: ValueBreakdownContent;
};

/* =========================
   Component
========================= */

export default function ValueBreakdown({ content }: ValueBreakdownProps) {
  const { items } = content;

  return (
    <div className="mx-auto max-w-3xl grid gap-4 md:grid-cols-3">
      {items.map(
        ({ label, amount, description, strike, highlight }, index) => (
          <div
            key={`${label}-${index}`}
            className={`group relative flex h-46 flex-col items-center gap-3 overflow-hidden rounded-[1rem] border-3 bg-white p-8 text-center shadow md:shadow ${
              index === 2
                ? 'bg-[#f2b6111b] border-2 border-amber-400 '
                :  index === 1
                ? 'decoration-gray-500 border-gray-400'
                : 'bg-[#f2b6116c] '
            }`}
          >
            {/* subtle bg gradient */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            </div>

            {/* label */}
            <p
              className={`text-[15px] font-black ${
                index === 0
                  ? 'text-gray-400'
                  : index === 1
                  ? 'text-gray-500'
                  : 'text-primary/90'
              }`}
            >
              {label}
            </p>

            {/* amount */}
            <p
              className={`text-3xl font-black ${
                strike
                  ? `line-through decoration-2 ${
                      index === 0
                        ? 'decoration-gray-400'
                        : index === 1
                        ? 'decoration-gray-500'
                        : 'decoration-primary/60'
                    }`
                  : ''
              } ${
                index === 0
                  ? 'text-gray-400'
                  : index === 1
                  ? 'text-gray-500'
                  : 'text-grey'
              } ${
                highlight
                  ? 'text-amber-400/90 drop-shadow-[0_0_12px_rgba(251,191,36,0.45)]'
                  : ''
              }`}
            >
              {amount}
            </p>

            {/* description (optional) */}
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
}
