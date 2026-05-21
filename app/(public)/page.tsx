import Link from 'next/link';
import Image from 'next/image';
import { Flame, Heart, Users, Utensils, Leaf, CloudRain, Globe2 } from 'lucide-react';

import AppHeader from '@/components/layout/AppHeader';
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
  { id: 'foreign', label: '외국인 추천', icon: Globe2, tint: 'bg-accent-50 text-accent-600' },
];

export default function HomePage() {
  const top5 = topCourses(5);

  return (
    <div className="bg-paper-50 pb-6">
      <AppHeader />

      <div className="space-y-7 pb-6">
        {/* ===== 1. 표지 (매거진 표지 톤) ===== */}
        <section className="px-5 pt-2">
          <Link
            href="/courses"
            className="relative block aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-card"
          >
            <Image
              src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1600&q=80"
              alt="이번 주의 여행"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 440px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/65" />
            <div className="absolute inset-x-0 top-0 p-7">
              <p className="magazine-label text-white/85">VOL. 01 · WEEKEND ISSUE</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <h2 className="magazine-title text-[30px] leading-[1.15] drop-shadow-md">
                이번 주말,<br />
                <span className="italic">어디로 떠나볼까요?</span>
              </h2>
              <p className="mt-3 font-serif text-[13px] italic text-white/90">
                — 어디갈까? 편집부가 고른 이번 주의 여정
              </p>
            </div>
          </Link>
        </section>

        {/* ===== 2. 지역 빠른 이동 ===== */}
        <section className="overflow-hidden">
          <div className="no-scrollbar flex gap-4 overflow-x-auto px-5">
            {regionChips.map((r) => (
              <Link
                key={r.id}
                href={r.id === 'all' ? '/region' : `/region/${r.id}`}
                className="flex flex-shrink-0 flex-col items-center gap-1.5"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                    r.id === 'all'
                      ? 'border-accent-200 bg-accent-50 text-accent-600'
                      : 'border-paper-200 bg-white text-ink-700'
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

        {/* ===== 3. 인기 코스 TOP 5 ===== */}
        <section>
          <div className="mb-3 flex items-baseline justify-between px-5">
            <div>
              <p className="magazine-label mb-1 text-accent-500">EDITOR'S CHOICE</p>
              <h3 className="magazine-title flex items-center gap-1.5 text-[18px] text-ink-900">
                <Flame className="h-[18px] w-[18px] text-accent-500" strokeWidth={2.4} />
                이주의 추천 코스
              </h3>
            </div>
            <Link href="/courses" className="font-serif text-[12px] italic text-ink-500 hover:text-accent-600">
              더보기 →
            </Link>
          </div>
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
            {top5.map((c, i) => (
              <CourseRankCard key={c.id} course={c} rank={i + 1} />
            ))}
            {/* 캐러셀 마지막 여백 */}
            <span className="block w-3 flex-shrink-0" />
          </div>
        </section>

        {/* ===== 4. 테마 ===== */}
        <section className="px-5">
          <div className="mb-3 text-center">
            <p className="magazine-label mb-1 text-accent-500">BY THEME</p>
            <h3 className="magazine-title text-[18px] text-ink-900">테마로 찾아보기</h3>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {themes.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.id}
                  href={`/courses?theme=${t.id}`}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white py-5 shadow-card transition active:scale-95"
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.tint}`}>
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <span className="font-serif text-[12.5px] font-bold text-ink-800">{t.label}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ===== 5. 지역별 ===== */}
        <section className="px-5">
          <div className="mb-3 text-center">
            <p className="magazine-label mb-1 text-accent-500">BY REGION</p>
            <h3 className="magazine-title text-[18px] text-ink-900">지역별로 둘러보기</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {regions.slice(0, 4).map((r) => (
              <Link
                key={r.id}
                href={`/region/${r.id}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-paper-200 shadow-card"
              >
                <Image
                  src={r.thumbnailUrl}
                  alt={r.nameKo}
                  fill
                  sizes="(max-width: 768px) 50vw, 220px"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                  <p className="font-serif text-[15px] font-bold leading-tight italic">{r.nameKo}</p>
                  <p className="text-[10.5px] tracking-wide text-white/85">코스 {r.courseCount}개</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== 6. 큐레이션 정책 (잡지 발행 정보 느낌) ===== */}
        <section className="mx-5 mt-4">
          <div className="divider-thin mb-4" />
          <p className="magazine-label mb-2 text-center text-ink-400">CURATION POLICY</p>
          <p className="text-center font-serif text-[12px] italic leading-relaxed text-ink-600">
            모든 코스는 공개된 출처를 바탕으로 편집부가 직접 검수합니다.<br />
            원문 저작자의 권리를 존중하며, 출처를 항상 함께 표시합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
