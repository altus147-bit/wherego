import Link from 'next/link';
import { Search, Bell } from 'lucide-react';

export default function AppHeader({
  title = '어디갈까?',
  showSearch = true,
  showBell = true,
}: {
  title?: string;
  showSearch?: boolean;
  showBell?: boolean;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-white/90 px-4 py-3 backdrop-blur">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-sky2-500 text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13Z" />
            <circle cx="12" cy="9" r="2.4" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <span className="text-[17px] font-bold tracking-tight text-ink-900">{title}</span>
      </Link>

      <div className="flex items-center gap-1">
        {showSearch && (
          <button
            aria-label="검색"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100"
          >
            <Search className="h-5 w-5" strokeWidth={2} />
          </button>
        )}
        {showBell && (
          <button
            aria-label="알림"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100"
          >
            <Bell className="h-5 w-5" strokeWidth={2} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
          </button>
        )}
      </div>
    </header>
  );
}
