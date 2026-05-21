import Link from 'next/link';
import { ChevronLeft, Search, SlidersHorizontal } from 'lucide-react';

import CourseCard from '@/components/course/CourseCard';
import { courses } from '@/data/courses';

const sortChips = ['추천순', '최신순', '별점순', '저장순'];
const filterChips = ['당일치기', '1박 2일', '뚜벅이 가능', '차량 추천', '데이트', '가족', '외국인 추천'];

export default function CourseListPage() {
  const sorted = [...courses]
    .filter((c) => c.status === 'approved')
    .sort((a, b) => b.score - a.score);

  return (
    <div>
      <header className="sticky top-0 z-20 flex items-center gap-2 bg-white/90 px-3 py-3 backdrop-blur">
        <Link
          href="/"
          aria-label="뒤로가기"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-900 hover:bg-ink-100"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.4} />
        </Link>
        <h1 className="flex-1 text-[16px] font-bold text-ink-900">코스 목록</h1>
        <button
          aria-label="검색"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100"
        >
          <Search className="h-5 w-5" strokeWidth={2} />
        </button>
      </header>

      <div className="space-y-2 px-4 pb-2 pt-1">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {sortChips.map((s, i) => (
            <button
              key={s}
              className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
                i === 0
                  ? 'bg-brand-500 text-white shadow-soft'
                  : 'border border-ink-200 bg-white text-ink-700'
              }`}
            >
              {s}
            </button>
          ))}
          <button className="flex flex-shrink-0 items-center gap-1 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-[13px] font-medium text-ink-700">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            필터
          </button>
        </div>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {filterChips.map((f) => (
            <button
              key={f}
              className="flex-shrink-0 rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-[12px] text-ink-600"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 px-4 py-4">
        {sorted.map((c, i) => (
          <CourseCard key={c.id} course={c} rank={i < 3 ? i + 1 : undefined} />
        ))}
      </div>
    </div>
  );
}
