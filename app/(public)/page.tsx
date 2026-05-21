import Link from 'next/link';
import Image from 'next/image';
import { Flame, Heart, Users, Utensils, Leaf, CloudRain, Globe2 } from 'lucide-react';

import AppHeader from '@/components/layout/AppHeader';
import SectionHeader from '@/components/ui/SectionHeader';
import CourseRankCard from '@/components/course/CourseRankCard';
import { regions } from '@/data/regions';
import { topCourses } from '@/data/courses';

const regionChips = [
  { id: 'all', label: '전체' },
  { id: 'rg-seoul', label: '서울' },
  { id: 'rg-busan', label: '부산' },
  { id: 'rg-jeju', label: '제주' },
  { id: 'rg-gangneung', label: '강릉' },
  { id: 'rg-jeonju', label: '전주' },
  { id: 'rg-incheon', label: '인천' },
];

const themes = [
  { id: 'date', label: '데이트', icon: Heart, tint: 'bg-pink-50 text-pink-500' },
  { id: 'family', label: '가족여행', icon: Users, tint: 'bg-orange-50 text-orange-500' },
  { id: 'eats', label: '맛집투어', icon: Utensils, tint: 'bg-amber-50 text-amber-600' },
  { id: 'nature', label: '자연/힐링', icon: Leaf, tint: 'bg-emerald-50 text-emerald-600' },
  { id: 'rain', label: '비 오는 날', icon: CloudRain, tint: 'bg-sky-50 text-sky-600' },
  { id: 'foreign', label: '외국인 추천', icon: Globe2, tint: 'bg-brand-50 text-brand-600' },
];

export default function HomePage() {
  const top5 = topCourses(5);

  return (
    <div>
      <AppHeader />

      <div className="space-y-6 pb-6">
        {/* Hero banner */}
        <section className="px-4">
          <Link
            href="/courses"
            className="relative block aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-card"
          >
            <Image
              src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1600&q=80"
              alt="이번 주말, 어디로 떠나볼까요?"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 440px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink-900/55 via-ink-900/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-6 text-white">
              <p className="text-[13px] font-medium text-white/85">이번 주말,</p>
              <h2 className="mt-1 text-[22px] font-bold leading-tight">
                어디로 떠나볼까요?
              </h2>
              <p className="mt-2 text-[12.5px] text-white/85">
                국내 최고의 여행 코스를 추천해드려요
              </p>
            </div>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              <span className="h-1.5 w-5 rounded-full bg-white" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            </div>
          </Link>
        </section>

        {/* Region quick filter */}
        <section className="overflow-hidden">
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
            {regionChips.map((r) => (
              <Link
                key={r.id}
                href={r.id === 'all' ? '/region' : `/region/${r.id}`}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                    r.id === 'all'
                      ? 'border-brand-200 bg-brand-50 text-brand-600'
                      : 'border-ink-100 bg-white text-ink-700'
                  }`}
                >
                  {r.id === 'all' ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13Z" />
                      <circle cx="12" cy="9" r="2.4" />
                    </svg>
                  )}
                </span>
                <span className="text-[11.5px] font-medium text-ink-700">{r.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Top 5 courses */}
        <section className="px-4">
          <SectionHeader
            title={
              <>
                <Flame className="h-5 w-5 text-orange-500" strokeWidth={2.4} /> 인기 코스 TOP 5
              </>
            }
            moreHref="/courses"
          />
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
            {top5.map((c, i) => (
              <CourseRankCard key={c.id} course={c} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* Theme grid */}
        <section className="px-4">
          <SectionHeader title="테마로 찾아보기" moreHref="/courses" />
          <div className="grid grid-cols-3 gap-2">
            {themes.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.id}
                  href={`/courses?theme=${t.id}`}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-white py-4 shadow-card transition active:scale-95"
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.tint}`}>
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <span className="text-[12.5px] font-semibold text-ink-700">{t.label}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Region preview band */}
        <section className="px-4">
          <SectionHeader title="지역별로 둘러보기" moreHref="/region" />
          <div className="grid grid-cols-2 gap-3">
            {regions.slice(0, 4).map((r) => (
              <Link
                key={r.id}
                href={`/region/${r.id}`}
                className="group relative block aspect-[5/3] overflow-hidden rounded-2xl bg-ink-100 shadow-card"
              >
                <Image
                  src={r.thumbnailUrl}
                  alt={r.nameKo}
                  fill
                  sizes="(max-width: 768px) 50vw, 220px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/65 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 text-white">
                  <p className="text-[13px] font-bold leading-tight">{r.nameKo}</p>
                  <p className="text-[11px] text-white/80">코스 {r.courseCount}개</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Curation note */}
        <section className="mx-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
          <h3 className="text-[13.5px] font-bold text-brand-700">큐레이션 정책</h3>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-700">
            모든 코스는 출처가 확인된 공개 콘텐츠와 사용자 제보를 관리자가 검수한 뒤 공개됩니다.
            외부 이미지를 무단으로 저장하지 않고, 원문 출처를 항상 함께 표시합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
