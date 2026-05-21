import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  Bookmark,
  Heart,
  Share2,
  ChevronLeft,
  ExternalLink,
  Flag,
  MapPin,
  ChevronRight,
} from 'lucide-react';

import { findCourse, courses } from '@/data/courses';
import CourseMapPreview from '@/components/course/CourseMapPreview';
import {
  formatBudgetRange,
  formatDurationRange,
  formatPeopleRange,
  transportLabel,
  formatDateKo,
  platformLabel,
} from '@/lib/format';

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = findCourse(params.id);
  if (!course) notFound();

  const coverImage = course.images[0]?.imageUrl ?? '';
  const readingMinutes = Math.max(2, Math.round(course.places.length * 1.2));

  return (
    <article className="bg-paper-50 pb-28 text-ink-900">
      {/* ===== 1. 매거진 표지 ===== */}
      <header className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
        {coverImage && (
          <Image
            src={coverImage}
            alt={course.titleKo}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 440px"
            className="object-cover"
          />
        )}
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />

        {/* 상단 네비게이션 */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-5">
          <Link
            href="/courses"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition active:scale-95"
            aria-label="뒤로"
          >
            <ChevronLeft className="h-5 w-5 text-white" strokeWidth={2.2} />
          </Link>
          <div className="flex gap-2">
            <button
              aria-label="공유"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition active:scale-95"
            >
              <Share2 className="h-5 w-5 text-white" strokeWidth={2.2} />
            </button>
            <button
              aria-label="저장"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition active:scale-95"
            >
              <Bookmark className="h-5 w-5 text-white" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* 표지 텍스트 */}
        <div className="absolute inset-x-0 bottom-0 px-7 pb-14 text-white">
          <p className="magazine-label mb-4 text-white/85">
            EDITOR'S PICK · {course.regionNameKo}
          </p>
          <h1 className="magazine-title text-[34px] leading-[1.15] text-white drop-shadow-md">
            {course.titleKo}
          </h1>
          <div className="mt-6 flex items-center gap-3 text-[12px] text-white/85">
            <span className="font-serif italic">vol. {course.id.slice(-3)}</span>
            <span className="h-[3px] w-[3px] rounded-full bg-white/60" />
            <span>{readingMinutes}분 분량</span>
            <span className="h-[3px] w-[3px] rounded-full bg-white/60" />
            <span>{formatDateKo(course.createdAt)}</span>
          </div>
        </div>
      </header>

      {/* ===== 2. 인트로 (드롭캡 + 감성 카피) ===== */}
      <section className="px-7 pt-12">
        <div className="divider-thin mb-8" />
        <p className="magazine-label mb-5 text-center text-accent-500">
          PROLOGUE
        </p>

        <p className="magazine-body dropcap text-ink-800">
          {course.summaryKo}{' '}
          이 여정은 단순한 이동이 아니라, 하루를 천천히 음미하는 시간입니다.
          파도 소리와 커피 향, 사람들의 웃음 사이로 발걸음을 옮겨 보세요.
        </p>

        {/* 인용구 */}
        <figure className="my-10 px-2">
          <p className="magazine-quote text-center text-[20px] leading-[1.7] text-accent-600">
            "여행은 목적지가 아니라,<br />
            그곳에서 만나는 순간들이다."
          </p>
        </figure>

        <div className="divider-thin mb-2" />
      </section>

      {/* ===== 3. 코스 메타 (작은 정보 박스) ===== */}
      <section className="mx-7 my-8 border-y border-paper-200 py-6">
        <div className="grid grid-cols-3 gap-3 text-center">
          <MetaItem
            label="소요 시간"
            value={formatDurationRange(course.durationMinutesMin, course.durationMinutesMax)}
          />
          <MetaItem
            label="예산"
            value={formatBudgetRange(course.estimatedBudgetMin, course.estimatedBudgetMax)}
          />
          <MetaItem
            label="추천 인원"
            value={formatPeopleRange(course.recommendedPeopleMin, course.recommendedPeopleMax)}
          />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-paper-300 px-3 py-1 text-[11px] font-medium tracking-wide text-ink-700"
            >
              # {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ===== 4. 챕터별 장소 ===== */}
      <section className="px-7 pt-4">
        <div className="mb-8 text-center">
          <p className="magazine-label mb-3 text-accent-500">ITINERARY</p>
          <h2 className="magazine-title text-[22px] text-ink-900">
            오늘의 여정
          </h2>
          <p className="mt-2 text-[12px] text-ink-500">
            총 {course.places.length}곳 · {transportLabel(course.transportType)}
          </p>
        </div>

        <ol className="space-y-14">
          {course.places.map((place, idx) => (
            <li key={place.id}>
              <ChapterPlace
                courseId={course.id}
                placeId={place.id}
                number={idx + 1}
                total={course.places.length}
                name={place.placeNameKo}
                category={place.category ?? ''}
                summary={place.descriptionKo ?? ''}
                address={place.addressKo ?? ''}
                stayMinutes={place.stayMinutes ?? null}
                imageUrl={course.images[idx]?.imageUrl ?? course.images[0]?.imageUrl ?? ''}
                tip={place.tipKo ?? null}
                emoji={place.emoji ?? ''}
              />
            </li>
          ))}
        </ol>
      </section>

      {/* ===== 5. 동선 지도 ===== */}
      <section className="px-7 pt-16">
        <div className="mb-6 text-center">
          <p className="magazine-label mb-3 text-accent-500">ROUTE</p>
          <h2 className="magazine-title text-[22px] text-ink-900">
            한눈에 보는 동선
          </h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-paper-200 bg-white">
          <CourseMapPreview places={course.places} />
        </div>
        <p className="mt-3 text-center text-[11.5px] italic text-ink-400">
          * 실제 도로 거리는 카카오/네이버 지도에서 확인하세요.
        </p>
      </section>

      {/* ===== 6. 에필로그 ===== */}
      <section className="mt-16 bg-paper-100 px-7 py-14">
        <p className="magazine-label mb-4 text-center text-accent-500">
          EPILOGUE
        </p>
        <h2 className="magazine-title mb-6 text-center text-[20px] leading-snug text-ink-900">
          돌아오는 길에 기억해야 할 것들
        </h2>
        <p className="magazine-body text-center text-ink-700">
          좋은 여행은 사진보다 마음에 남는 장면이 더 많은 여행입니다.<br />
          오늘 이 코스가 당신의 평범한 하루에 작은 쉼표가 되었길 바라며.
        </p>

        <div className="mt-10 flex justify-center gap-3">
          <button className="flex items-center gap-2 rounded-full border border-ink-900 bg-white px-5 py-3 text-[13px] font-semibold text-ink-900 transition active:scale-95">
            <Bookmark className="h-4 w-4" strokeWidth={2.2} />
            이 코스 저장하기
          </button>
          <button className="flex items-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-[13px] font-semibold text-white shadow-soft transition active:scale-95">
            <Heart className="h-4 w-4" strokeWidth={2.2} />
            추천 {course.recommendCount}
          </button>
        </div>
      </section>

      {/* ===== 7. 출처 (잡지 끝 크레딧 스타일) ===== */}
      <section className="px-7 pt-12">
        <div className="divider-thin mb-6" />
        <p className="magazine-label mb-4 text-center text-ink-500">
          ABOUT THIS STORY
        </p>
        <div className="space-y-3 text-center text-[12.5px] text-ink-700">
          <p>
            <span className="text-ink-400">큐레이션</span>{' '}
            <span className="font-serif italic text-ink-800">어디갈까? 편집부</span>
          </p>
          <p>
            <span className="text-ink-400">원문 출처</span>{' '}
            <span className="font-serif italic text-ink-800">
              {course.sourceAuthor ?? '익명'} · {platformLabel(course.sourcePlatform)}
            </span>
          </p>
          <p className="text-ink-400">
            수집일 {formatDateKo(course.collectedAt)}
          </p>
        </div>

        <a
          href={course.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-6 flex w-fit items-center gap-1.5 text-[12.5px] font-semibold text-accent-600 underline-offset-4 hover:underline"
        >
          원문 보러가기
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.2} />
        </a>

        <div className="mt-10 flex flex-col items-center gap-3">
          <button className="flex items-center gap-1.5 text-[11.5px] text-ink-400">
            <Flag className="h-3 w-3" strokeWidth={2} />
            잘못된 정보 신고하기
          </button>
          <Link
            href="/courses"
            className="text-[11.5px] text-ink-400 underline-offset-2 hover:underline"
          >
            ← 다른 코스 더 보기
          </Link>
        </div>
      </section>
    </article>
  );
}

/* ============ 부속 컴포넌트 ============ */

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="magazine-label mb-1.5">{label}</p>
      <p className="font-serif text-[14px] font-bold text-ink-900">{value}</p>
    </div>
  );
}

function ChapterPlace({
  courseId,
  placeId,
  number,
  total,
  name,
  category,
  summary,
  address,
  stayMinutes,
  imageUrl,
  tip,
  emoji,
}: {
  courseId: string;
  placeId: string;
  number: number;
  total: number;
  name: string;
  category: string;
  summary: string;
  address: string;
  stayMinutes: number | null;
  imageUrl: string;
  tip: string | null;
  emoji: string;
}) {
  return (
    <Link
      href={`/courses/${courseId}/places/${placeId}`}
      className="group block"
    >
      {/* 챕터 헤더 */}
      <div className="mb-5 flex items-baseline gap-4">
        <span className="chapter-number text-[44px]">
          {String(number).padStart(2, '0')}
        </span>
        <div className="flex-1 border-b border-paper-300 pb-2">
          <p className="magazine-label text-ink-500">
            CH. {number} / {String(total).padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* 장소 이미지 */}
      {imageUrl && (
        <div className="relative -mx-7 mb-5 aspect-[4/3] overflow-hidden bg-paper-200">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 440px"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          {emoji && (
            <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[20px] shadow-card">
              {emoji}
            </span>
          )}
        </div>
      )}

      {/* 장소 이름 */}
      <h3 className="magazine-title text-[24px] leading-tight text-ink-900">
        {name}
      </h3>
      {category && (
        <p className="mt-1.5 font-serif text-[12px] italic text-accent-600">
          {category}
        </p>
      )}

      {/* 본문 */}
      {summary && (
        <p className="magazine-body mt-4 text-ink-800">{summary}</p>
      )}

      {/* 팁 박스 */}
      {tip && (
        <div className="mt-5 border-l-2 border-accent-400 bg-paper-100/60 px-4 py-3">
          <p className="magazine-label mb-1 text-accent-600">EDITOR'S TIP</p>
          <p className="font-serif text-[13.5px] leading-relaxed text-ink-700">
            {tip}
          </p>
        </div>
      )}

      {/* 정보 박스 */}
      <div className="mt-5 space-y-2 text-[12.5px] text-ink-700">
        {address && (
          <div className="flex gap-2">
            <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-ink-400" strokeWidth={2} />
            <span className="font-serif leading-relaxed">{address}</span>
          </div>
        )}
        {stayMinutes && (
          <div className="flex gap-2">
            <Clock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-ink-400" strokeWidth={2} />
            <span className="font-serif">머무는 시간 약 {stayMinutes}분</span>
          </div>
        )}
      </div>

      {/* 상세보기 안내 */}
      <div className="mt-5 flex items-center gap-1 text-[11.5px] font-semibold text-accent-600 transition group-hover:gap-2">
        장소 자세히 보기
        <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
      </div>
    </Link>
  );
}
