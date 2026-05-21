import Link from 'next/link';
import {
  LayoutDashboard,
  Inbox,
  Map as MapIcon,
  Users,
  Flag,
  BarChart3,
  Settings,
  ExternalLink,
} from 'lucide-react';

const menu = [
  { href: '/admin', label: '대시보드', icon: LayoutDashboard },
  { href: '/admin/collected', label: '수집 관리', icon: Inbox },
  { href: '/admin/courses', label: '코스 관리', icon: MapIcon },
  { href: '/admin/users', label: '사용자 관리', icon: Users },
  { href: '/admin/reports', label: '신고 관리', icon: Flag },
  { href: '/admin/stats', label: '통계', icon: BarChart3 },
  { href: '/admin/settings', label: '설정', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-50">
      <div className="mx-auto flex max-w-[1280px] gap-6 p-6">
        <aside className="w-[240px] flex-shrink-0">
          <div className="rounded-2xl bg-white p-4 shadow-card">
            <Link href="/admin" className="mb-5 flex items-center gap-2 px-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-sky2-500 text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13Z" />
                  <circle cx="12" cy="9" r="2.4" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <div>
                <p className="text-[14px] font-bold text-ink-900">어디갈까? 관리자</p>
                <p className="text-[11px] text-ink-500">검수 시스템</p>
              </div>
            </Link>
            <nav>
              <ul className="space-y-0.5">
                {menu.map((m) => {
                  const Icon = m.icon;
                  return (
                    <li key={m.href}>
                      <Link
                        href={m.href}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13.5px] font-medium text-ink-700 transition hover:bg-ink-50"
                      >
                        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                        {m.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <Link
              href="/"
              className="mt-6 flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium text-brand-600"
            >
              <ExternalLink className="h-3.5 w-3.5" />앱으로 이동
            </Link>
          </div>
        </aside>

        <section className="min-w-0 flex-1">{children}</section>
      </div>
    </div>
  );
}
