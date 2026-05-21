import { type ReactNode } from 'react';

type Variant = 'pill' | 'pill-outline' | 'chip' | 'chip-solid';

const styles: Record<Variant, string> = {
  pill: 'rounded-full border border-brand-200 bg-white text-brand-700',
  'pill-outline': 'rounded-full border border-ink-200 bg-white text-ink-700',
  chip: 'rounded-full border border-ink-200 bg-white text-ink-700',
  'chip-solid': 'rounded-full bg-brand-500 text-white border border-brand-500',
};

export default function Chip({
  children,
  variant = 'pill',
  icon,
}: {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-medium ${styles[variant]}`}
    >
      {icon}
      {children}
    </span>
  );
}
