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
    <div className="bg-paper-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-paper-200 bg-paper-50/95 px-3 py-3.5 backdrop-blur">
        <Link
          href="/"
          aria-label="뒤로가기"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-900 hover:bg-paper-100"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
        </Link>
        <h1 className="flex-1 font-serif text-[17px] font-bold italic text-ink-900">
          코스 컬렉션
        </h1>
        <button
          aria-label="검색"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-paper-100"
        >
          <Search className="h-5 w-5" strokeWidth={1.8} />
        </button>
      </header>

      {/* 정렬 + 필터 */}
      <div className="space-y-2 px-4 pb-2 pt-3">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {sortChips.map((s, i) => (
            <button
              key={s}
              className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium ${
                i === 0
                  ? 'bg-ink-900 text-paper-50'
                  : 'border border-paper-300 bg-white text-ink-700'
              }`}
            >
              {s}
            </button>
          ))}
          <button className="flex flex-shrink-0 items-center gap-1 rounded-full border border-paper-300 bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink-700">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            필터
          </button>
        </div>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {filterChips.map((f) => (
            <button
              key={f}
              className="flex-shrink-0 rounded-full border border-paper-200 bg-paper-100 px-3 py-1 text-[12px] text-ink-700"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 리스트 */}
      <div className="space-y-3 px-4 py-4">
        {sorted.map((c, i) => (
          <CourseCard key={c.id} course={c} rank={i < 3 ? i + 1 : undefined} />
        ))}
      </div>
    </div>
  );
}
