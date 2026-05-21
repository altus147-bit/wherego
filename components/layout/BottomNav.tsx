'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MapPin, PlusCircle, Bookmark, User } from 'lucide-react';

const tabs = [
  { href: '/', label: '홈', icon: Home, match: (p: string) => p === '/' },
  { href: '/region', label: '지역', icon: MapPin, match: (p: string) => p.startsWith('/region') },
  { href: '/register', label: '등록', icon: PlusCircle, match: (p: string) => p.startsWith('/register'), center: true },
  { href: '/saved', label: '저장', icon: Bookmark, match: (p: string) => p.startsWith('/saved') },
  { href: '/profile', label: '내 정보', icon: User, match: (p: string) => p.startsWith('/profile') },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky bottom-0 z-30 mt-auto border-t border-paper-200 bg-paper-50/95 backdrop-blur"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      <ul className="flex items-end justify-around px-2 pt-2 pb-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = t.match(pathname);

          if (t.center) {
            // 가운데 플로팅 등록 버튼
            return (
              <li key={t.href} className="flex flex-1 justify-center">
                <Link
                  href={t.href}
                  aria-label={t.label}
                  className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-white shadow-float ring-4 ring-paper-50 transition active:scale-95"
                >
                  <Icon className="h-7 w-7" strokeWidth={2.2} />
                </Link>
              </li>
            );
          }

          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                className={`flex flex-col items-center gap-0.5 py-1.5 text-[11px] transition ${
                  active ? 'text-accent-600' : 'text-ink-400'
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
                <span className={active ? 'font-semibold' : ''}>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
