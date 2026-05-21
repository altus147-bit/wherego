import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  MapPin,
  Clock,
  ExternalLink,
  Share2,
  Bookmark,
  Navigation,
} from 'lucide-react';

import { findCourse, courses } from '@/data/courses';

export function generateStaticParams() {
  const params: { id: string; placeId: string }[] = [];
  for (const c of courses) {
    for (const p of c.places) {
      params.push({ id: c.id, placeId: p.id });
    }
  }
  return params;
}

export default function PlaceDetailPage({
  params,
}: {
  params: { id: string; placeId: string };
}) {
  const course = findCourse(params.id);
  if (!course) notFound();
  const place = course.places.find((p) => p.id === params.placeId);
  if (!place) notFound();

  const order = place.order;
  const total = course.places.length;
  const placeImage =
    course.images[order - 1]?.imageUrl ?? course.images[0]?.imageUrl ?? '';
  const prev = course.places.find((p) => p.order === order - 1);
  const next = course.places.find((p) => p.order === order + 1);

  // 외부 지도 앱 링크
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(place.placeNameKo)}`;
  const kakaoMapUrl = `https://map.kakao.com/?q=${encodeURIComponent(place.placeNameKo)}`;

  return (
    <article className="bg-paper-50 pb-28 text-ink-900">
      {/* ===== 1. 표지 ===== */}
      <header className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        {placeImage && (
          <Image
            src={placeImage}
            alt={place.placeNameKo}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 440px"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70" />

        {/* 네비 */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-5">
          <Link
            href={`/courses/${course.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition active:scale-95"
            aria-label="코스로 돌아가기"
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
        <div className="absolute inset-x-0 bottom-0 px-7 pb-12 text-white">
          <p className="magazine-label mb-3 text-white/85">
            {course.regionNameKo} · {course.titleKo}
          </p>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="chapter-number text-[40px] text-white drop-shadow-md">
              {String(order).padStart(2, '0')}
            </span>
            <span className="font-serif text-[14px] italic text-white/80">
              CH. {order} / {String(total).padStart(2, '0')}
            </span>
          </div>
          <h1 className="magazine-title text-[32px] leading-[1.15] text-white drop-shadow-md">
            {place.placeNameKo}
          </h1>
          {place.category && (
            <p className="mt-2 font-serif text-[13px] italic text-white/90">
              {categoryLabel(place.category)}
            </p>
          )}
        </div>
      </header>

      {/* ===== 2. 본문 ===== */}
      <section className="px-7 pt-12">
        <div className="divider-thin mb-8" />

        {place.descriptionKo && (
          <p className="magazine-body dropcap text-ink-800">
            {place.descriptionKo}
          </p>
        )}

        {/* 팁 박스 */}
        {place.tipKo && (
          <div className="my-10 border-l-2 border-accent-400 bg-paper-100/60 px-5 py-4">
            <p className="magazine-label mb-2 text-accent-600">EDITOR'S TIP</p>
            <p className="magazine-quote text-[14.5px] text-ink-800">
              {place.tipKo}
            </p>
          </div>
        )}

        <div className="divider-thin my-10" />
      </section>

      {/* ===== 3. 정보 박스 ===== */}
      <section className="px-7">
        <p className="magazine-label mb-5 text-center text-accent-500">
          INFORMATION
        </p>

        <dl className="space-y-5">
          <InfoRow
            icon={<MapPin className="h-4 w-4" strokeWidth={2} />}
            label="주소"
            value={place.addressKo}
          />
          {place.openHoursKo && (
            <InfoRow
              icon={<Clock className="h-4 w-4" strokeWidth={2} />}
              label="운영 시간"
              value={place.openHoursKo}
            />
          )}
          <InfoRow
            icon={<Clock className="h-4 w-4" strokeWidth={2} />}
            label="머무는 시간"
            value={`약 ${place.stayMinutes}분`}
          />
          {place.phone && (
            <InfoRow
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              }
              label="전화"
              value={place.phone}
            />
          )}
          {place.admissionFee && (
            <InfoRow
              icon={
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              }
              label="입장료"
              value={place.admissionFee}
            />
          )}
        </dl>
      </section>

      {/* ===== 4. 길찾기 ===== */}
      <section className="mx-7 mt-10 rounded-2xl border border-paper-200 bg-white p-5">
        <p className="magazine-label mb-3 text-center text-ink-500">
          DIRECTIONS
        </p>
        <p className="mb-5 text-center font-serif text-[13px] italic text-ink-600">
          외부 지도 앱으로 길찾기를 시작합니다
        </p>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#03c75a] py-3 text-[13px] font-semibold text-white transition active:scale-95"
          >
            <Navigation className="h-4 w-4" strokeWidth={2.2} />
            네이버 지도
          </a>
          <a
            href={kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#ffe812] py-3 text-[13px] font-semibold text-ink-900 transition active:scale-95"
          >
            <Navigation className="h-4 w-4" strokeWidth={2.2} />
            카카오맵
          </a>
        </div>
      </section>

      {/* ===== 5. 출처 ===== */}
      <section className="mt-12 px-7">
        <div className="divider-thin mb-6" />
        <p className="magazine-label mb-3 text-center text-ink-500">
          ABOUT THIS PLACE
        </p>
        <p className="text-center font-serif text-[12.5px] italic text-ink-500">
          이 장소 정보는 코스의 원문 출처<br />
          <span className="text-ink-700">{course.sourceTitle}</span>에서<br />
          수집되었습니다.
        </p>
        <a
          href={course.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-4 flex w-fit items-center gap-1.5 text-[12px] font-semibold text-accent-600 underline-offset-4 hover:underline"
        >
          원문 보러가기
          <ExternalLink className="h-3 w-3" strokeWidth={2.2} />
        </a>
      </section>

      {/* ===== 6. 이전/다음 챕터 ===== */}
      <section className="mt-14 px-7">
        <div className="divider-dotted mb-6" />
        <div className="grid grid-cols-2 gap-3">
          {prev ? (
            <Link
              href={`/courses/${course.id}/places/${prev.id}`}
              className="group rounded-xl border border-paper-200 p-4 text-left transition active:scale-[0.98]"
            >
              <p className="magazine-label text-ink-400">PREV</p>
              <p className="mt-1.5 font-serif text-[13px] font-bold text-ink-900 line-clamp-1">
                {prev.placeNameKo}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/courses/${course.id}/places/${next.id}`}
              className="group rounded-xl border border-paper-200 p-4 text-right transition active:scale-[0.98]"
            >
              <p className="magazine-label text-accent-500">NEXT</p>
              <p className="mt-1.5 font-serif text-[13px] font-bold text-ink-900 line-clamp-1">
                {next.placeNameKo}
              </p>
            </Link>
          ) : (
            <Link
              href={`/courses/${course.id}`}
              className="rounded-xl border border-paper-200 p-4 text-right transition active:scale-[0.98]"
            >
              <p className="magazine-label text-accent-500">END</p>
              <p className="mt-1.5 font-serif text-[13px] font-bold text-ink-900">
                코스로 돌아가기
              </p>
            </Link>
          )}
        </div>
      </section>
    </article>
  );
}

/* ============ 부속 ============ */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-paper-200 pb-4">
      <div className="mt-0.5 flex-shrink-0 text-ink-400">{icon}</div>
      <div className="flex-1">
        <dt className="magazine-label mb-1 text-ink-500">{label}</dt>
        <dd className="font-serif text-[14px] leading-relaxed text-ink-800">
          {value}
        </dd>
      </div>
    </div>
  );
}

function categoryLabel(c: string): string {
  const map: Record<string, string> = {
    beach: '해변',
    cafe: '카페',
    market: '시장',
    park: '공원',
    restaurant: '식당',
    attraction: '명소',
    museum: '박물관',
    nature: '자연',
    accommodation: '숙소',
    shopping: '쇼핑',
    other: '기타',
  };
  return map[c] ?? c;
}
