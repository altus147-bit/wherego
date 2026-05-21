import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Star,
  Clock,
  Car,
  Wallet,
  Users,
  Bookmark,
  ThumbsUp,
  Map as MapIcon,
  FileText,
  ExternalLink,
  Flag,
  ChevronRight,
  ListChecks,
} from 'lucide-react';

import { findCourse as findMockCourse, courses as mockCourses } from '@/data/courses';
import { fetchCourse } from '@/lib/db';
import Chip from '@/components/ui/Chip';
import ImageCarousel from '@/components/course/ImageCarousel';
import CourseMapPreview from '@/components/course/CourseMapPreview';
import SourceInfoCard from '@/components/course/SourceInfoCard';
import {
  formatBudgetRange,
  formatDurationRange,
  formatPeopleRange,
  transportLabel,
} from '@/lib/format';

// DB에서 매번 새로 조회
export const dynamic = 'force-dynamic';

// generateStaticParams 비활성화 (DB 사용 시 의미 없음)

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  // DB에서 먼저, 없으면 mock으로 폴백
  const dbCourse = await fetchCourse(params.id);
  const course = dbCourse ?? findMockCourse(params.id);
  if (!course) notFound();

  return (
    <div className="pb-8">
      <ImageCarousel images={course.images} alt={course.titleKo} backHref="/courses" />

      {/* 흰색 카드 슬라이드업 — 시안 그대로 */}
      <section className="relative -mt-5 rounded-t-3xl bg-white px-5 pb-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-[22px] font-extrabold leading-tight text-ink-900">
            {course.titleKo}
          </h1>
          <button
            aria-label="저장"
            className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-ink-300 hover:bg-ink-100"
          >
            <Bookmark className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>

        {/* 칩들 */}
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip
            variant="pill"
            icon={
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13Z" />
                <circle cx="12" cy="9" r="2" />
              </svg>
            }
          >
            {course.regionNameKo}
          </Chip>
          <Chip
            variant="pill"
            icon={<Clock className="h-3.5 w-3.5" strokeWidth={2.4} />}
          >
            {course.tags[0] ?? '여행'}
          </Chip>
        </div>

        {/* 요약 */}
        <p className="mt-3 text-[14px] leading-relaxed text-ink-700">
          {course.summaryKo}
        </p>

        {/* 추천점수 + 소요시간 행 */}
        <div className="my-5 grid grid-cols-2 gap-1 border-y border-ink-100 py-4">
          <div className="flex items-center gap-3 pl-1">
            <Star className="h-7 w-7 fill-yellow-400 stroke-yellow-400" />
            <div>
              <p className="text-[11.5px] text-ink-500">추천 점수</p>
              <p className="text-[17px] font-bold text-ink-900">{course.ratingAvg.toFixed(1)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 border-l border-ink-100 pl-4">
            <Clock className="h-6 w-6 text-brand-500" strokeWidth={2.2} />
            <div>
              <p className="text-[11.5px] text-ink-500">예상 소요 시간</p>
              <p className="text-[15px] font-bold text-ink-900">
                {formatDurationRange(course.durationMinutesMin, course.durationMinutesMax)}
              </p>
            </div>
          </div>
        </div>

        {/* 빠른 정보 3개 */}
        <div className="grid grid-cols-3 gap-2">
          <Stat label="이동방법" value={transportLabel(course.transportType)} icon={<Car className="h-4 w-4 text-brand-500" strokeWidth={2.2} />} />
          <Stat
            label="예산"
            value={formatBudgetRange(course.estimatedBudgetMin, course.estimatedBudgetMax)}
            icon={<Wallet className="h-4 w-4 text-brand-500" strokeWidth={2.2} />}
          />
          <Stat
            label="추천 인원"
            value={formatPeopleRange(course.recommendedPeopleMin, course.recommendedPeopleMax)}
            icon={<Users className="h-4 w-4 text-brand-500" strokeWidth={2.2} />}
          />
        </div>

        {/* 액션 버튼 */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-2xl border border-ink-200 bg-white py-3 text-[14px] font-semibold text-ink-900 transition active:scale-[0.98]">
            <Bookmark className="h-[18px] w-[18px]" strokeWidth={2.2} />
            저장하기
          </button>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3 text-[14px] font-semibold text-white shadow-soft transition active:scale-[0.98]">
            <ThumbsUp className="h-[18px] w-[18px]" strokeWidth={2.2} />
            추천하기 ({course.recommendCount})
          </button>
        </div>
      </section>

      {/* 코스 순서 — 클릭하면 장소 상세로 이동 */}
      <section className="px-5 pt-3">
        <div className="mb-3 flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-brand-500" strokeWidth={2.2} />
          <h2 className="text-[16px] font-bold text-ink-900">코스 순서</h2>
        </div>
        <ol className="space-y-2">
          {course.places.map((place) => (
            <li key={place.id}>
              <Link
                href={`/courses/${course.id}/places/${place.id}`}
                className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-card transition active:scale-[0.99]"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-[13px] font-bold text-white">
                  {place.order}
                </span>
                {place.emoji && (
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-ink-50 text-[20px]">
                    {place.emoji}
                  </span>
                )}
                <span className="flex-1 truncate text-[14.5px] font-semibold text-ink-900">
                  {place.placeNameKo}
                </span>
                <ChevronRight className="h-5 w-5 flex-shrink-0 text-ink-300" strokeWidth={2.2} />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* 지도/원문 출처 버튼 */}
      <section className="space-y-2 px-5 pt-5">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-[14px] font-bold text-white shadow-soft transition active:scale-[0.99]">
          <MapIcon className="h-5 w-5" strokeWidth={2.2} />
          지도에서 보기
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-white py-3.5 text-[14px] font-bold text-brand-700 transition active:scale-[0.99]">
          <FileText className="h-[18px] w-[18px]" strokeWidth={2.2} />
          원문 출처 보기
        </button>
        <a
          href={course.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-1 text-[13px] font-semibold text-brand-600"
        >
          원문 블로그로 이동
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.2} />
        </a>
      </section>

      {/* 미니 지도 */}
      <section className="px-5 pt-4">
        <CourseMapPreview places={course.places} />
      </section>

      {/* 원문 출처 카드 */}
      <section className="px-5 pt-5">
        <SourceInfoCard course={course} />
      </section>

      {/* 신고 */}
      <section className="px-5 pt-4">
        <button className="flex w-full items-center justify-center gap-1.5 py-2.5 text-[12.5px] font-medium text-ink-400">
          <Flag className="h-3.5 w-3.5" strokeWidth={2} />
          신고하기
        </button>
        <Link
          href="/courses"
          className="block text-center text-[12px] text-ink-400 underline-offset-2 hover:underline"
        >
          ← 코스 목록으로 돌아가기
        </Link>
      </section>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-ink-50 px-3 py-2.5">
      <div className="flex items-center gap-1">
        {icon}
        <p className="text-[11px] text-ink-500">{label}</p>
      </div>
      <p className="mt-1 text-[12.5px] font-bold leading-tight text-ink-900">{value}</p>
    </div>
  );
}
