import Link from 'next/link';
import { Search, Bell } from 'lucide-react';

export default function AppHeader({
  title = '어디갈까',
  showSearch = true,
  showBell = true,
}: {
  title?: string;
  showSearch?: boolean;
  showBell?: boolean;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-paper-200 bg-paper-50/95 px-5 py-3.5 backdrop-blur">
      <Link href="/" className="flex items-baseline gap-2">
        {/* 매거진 로고 글리프 */}
        <span className="font-serif text-[20px] font-extrabold italic tracking-tight text-ink-900">
          {title}
        </span>
        <span className="font-serif text-[11px] italic text-accent-500">
          magazine
        </span>
      </Link>

      <div className="flex items-center gap-1">
        {showSearch && (
          <button
            aria-label="검색"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-paper-100"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>
        )}
        {showBell && (
          <button
            aria-label="알림"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-paper-100"
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent-500" />
          </button>
        )}
      </div>
    </header>
  );
}
