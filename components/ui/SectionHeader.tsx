import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { type ReactNode } from 'react';

export default function SectionHeader({
  title,
  moreHref,
  icon,
}: {
  title: ReactNode;
  moreHref?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between px-1">
      <h2 className="flex items-center gap-1.5 text-[16px] font-bold text-ink-900">
        {icon}
        {title}
      </h2>
      {moreHref && (
        <Link
          href={moreHref}
          className="flex items-center gap-0.5 text-[12.5px] font-medium text-ink-500"
        >
          더보기
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      )}
    </div>
  );
}
