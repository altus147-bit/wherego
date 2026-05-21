import Link from 'next/link';
import AppHeader from '@/components/layout/AppHeader';
import { Bookmark, ThumbsUp, FileText, Bell, Shield, ChevronRight } from 'lucide-react';

const items = [
  { href: '/saved', label: '저장한 코스', icon: Bookmark, value: '3' },
  { href: '#', label: '추천한 코스', icon: ThumbsUp, value: '12' },
  { href: '#', label: '내가 등록한 코스', icon: FileText, value: '2' },
  { href: '#', label: '알림 설정', icon: Bell, value: '' },
  { href: '/admin', label: '관리자 모드', icon: Shield, value: '' },
];

export default function ProfilePage() {
  return (
    <div>
      <AppHeader title="내 정보" showBell={false} />
      <div className="space-y-6 px-4 pb-6">
        {/* User card */}
        <div className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-card">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-sky2-500 text-xl font-bold text-white">
            여
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-bold text-ink-900">여행하는 게스트</p>
            <p className="mt-0.5 text-[12px] text-ink-500">로그인하고 코스를 저장해보세요</p>
          </div>
          <button className="rounded-full bg-brand-50 px-3 py-1.5 text-[12.5px] font-semibold text-brand-700">
            로그인
          </button>
        </div>

        {/* Menu */}
        <ul className="overflow-hidden rounded-3xl bg-white shadow-card">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <li
                key={it.label}
                className={i !== items.length - 1 ? 'border-b border-ink-100' : ''}
              >
                <Link href={it.href} className="flex items-center gap-3 px-4 py-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-50 text-ink-700">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                  <span className="flex-1 text-[14px] font-medium text-ink-900">{it.label}</span>
                  {it.value && (
                    <span className="text-[12.5px] font-semibold text-ink-400">{it.value}</span>
                  )}
                  <ChevronRight className="h-[18px] w-[18px] text-ink-300" />
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="px-2 text-[11px] leading-relaxed text-ink-400">
          v0.1.0 · 어디갈까? MVP · 모든 외부 콘텐츠는 출처와 함께 표시되며, 관리자 검수를 거쳐 공개됩니다.
        </p>
      </div>
    </div>
  );
}
