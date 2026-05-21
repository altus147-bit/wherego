import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  ExternalLink,
  Share2,
  Bookmark,
  Navigation,
  Phone,
  Ticket,
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
    <div className="pb-8">
      {/* 표지 이미지 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
        {placeImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={placeImage}
            alt={place.placeNameKo}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3">
          <Link
            href={`/courses/${course.id}`}
            aria-label="코스로 돌아가기"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink-900 shadow-soft backdrop-blur"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.4} />
          </Link>
          <div className="flex items-center gap-2">
            <button
              aria-label="저장"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink-900 shadow-soft backdrop-blur"
            >
              <Bookmark className="h-5 w-5" strokeWidth={2.2} />
            </button>
            <button
              aria-label="공유"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink-900 shadow-soft backdrop-blur"
            >
              <Share2 className="h-5 w-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
        {/* 순서 뱃지 */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1.5 text-[12px] font-bold text-white shadow-soft">
          {place.emoji && <span className="text-[14px]">{place.emoji}</span>}
          <span>
            {order}번째 코스 · {order} / {total}
          </span>
        </div>
      </div>

      {/* 흰색 카드 슬라이드업 */}
      <section className="relative -mt-5 rounded-t-3xl bg-white px-5 pb-5 pt-5">
        <h1 className="text-[22px] font-extrabold leading-tight text-ink-900">
          {place.placeNameKo}
        </h1>
        <p className="mt-1 text-[12.5px] font-medium text-brand-600">
          {categoryLabel(place.category)} · {course.regionNameKo}
        </p>

        {place.descriptionKo && (
          <p className="mt-4 text-[14px] leading-relaxed text-ink-700">
            {place.descriptionKo}
          </p>
        )}

        {/* 머무는 시간 큰 박스 */}
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3.5">
          <Clock className="h-6 w-6 flex-shrink-0 text-brand-500" strokeWidth={2.2} />
          <div className="flex-1">
            <p className="text-[11.5px] text-ink-500">머무는 시간</p>
            <p className="text-[15px] font-bold text-ink-900">약 {place.stayMinutes}분</p>
          </div>
        </div>
      </section>

      {/* 정보 박스 */}
      <section className="px-5">
        <h2 className="mb-3 text-[15px] font-bold text-ink-900">장소 정보</h2>
        <div className="space-y-2.5">
          <InfoRow
            icon={<MapPin className="h-[18px] w-[18px]" strokeWidth={2} />}
            label="주소"
            value={place.addressKo || '주소 정보 없음'}
          />
          {place.openHoursKo && (
            <InfoRow
              icon={<Clock className="h-[18px] w-[18px]" strokeWidth={2} />}
              label="운영 시간"
              value={place.openHoursKo}
            />
          )}
          {place.phone && (
            <InfoRow
              icon={<Phone className="h-[18px] w-[18px]" strokeWidth={2} />}
              label="전화"
              value={place.phone}
            />
          )}
          {place.admissionFee && (
            <InfoRow
              icon={<Ticket className="h-[18px] w-[18px]" strokeWidth={2} />}
              label="입장료"
              value={place.admissionFee}
            />
          )}
        </div>
      </section>

      {/* 에디터 팁 */}
      {place.tipKo && (
        <section className="mx-5 mt-5 rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
          <h3 className="text-[13.5px] font-bold text-brand-700">💡 여행 팁</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-700">{place.tipKo}</p>
        </section>
      )}

      {/* 길찾기 버튼 */}
      <section className="space-y-2 px-5 pt-5">
        <h2 className="mb-2 text-[15px] font-bold text-ink-900">길찾기</h2>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#03c75a] py-3 text-[13.5px] font-bold text-white transition active:scale-[0.98]"
          >
            <Navigation className="h-[18px] w-[18px]" strokeWidth={2.2} />
            네이버 지도
          </a>
          <a
            href={kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#ffe812] py-3 text-[13.5px] font-bold text-ink-900 transition active:scale-[0.98]"
          >
            <Navigation className="h-[18px] w-[18px]" strokeWidth={2.2} />
            카카오맵
          </a>
        </div>
      </section>

      {/* 출처 */}
      <section className="mt-6 px-5">
        <div className="rounded-2xl border border-ink-100 bg-ink-50 p-4">
          <p className="text-[12px] text-ink-500">이 장소 정보의 원문 출처</p>
          <p className="mt-1 text-[13.5px] font-semibold text-ink-900">
            {course.sourceTitle}
          </p>
          <a
            href={course.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-1 text-[12.5px] font-semibold text-brand-600"
          >
            원문 보러가기
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.2} />
          </a>
        </div>
      </section>

      {/* 이전/다음 코스 */}
      <section className="mt-6 px-5">
        <div className="grid grid-cols-2 gap-2">
          {prev ? (
            <Link
              href={`/courses/${course.id}/places/${prev.id}`}
              className="flex items-center gap-2 rounded-2xl bg-white p-3 shadow-card transition active:scale-[0.99]"
            >
              <ChevronLeft className="h-5 w-5 flex-shrink-0 text-ink-400" strokeWidth={2.2} />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-ink-500">이전 코스</p>
                <p className="truncate text-[13px] font-bold text-ink-900">{prev.placeNameKo}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/courses/${course.id}/places/${next.id}`}
              className="flex items-center gap-2 rounded-2xl bg-white p-3 text-right shadow-card transition active:scale-[0.99]"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-ink-500">다음 코스</p>
                <p className="truncate text-[13px] font-bold text-ink-900">{next.placeNameKo}</p>
              </div>
              <ChevronRight className="h-5 w-5 flex-shrink-0 text-brand-500" strokeWidth={2.2} />
            </Link>
          ) : (
            <Link
              href={`/courses/${course.id}`}
              className="flex items-center gap-2 rounded-2xl bg-brand-500 p-3 text-right shadow-soft transition active:scale-[0.99]"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-white/85">마지막 코스</p>
                <p className="truncate text-[13px] font-bold text-white">코스로 돌아가기</p>
              </div>
              <ChevronRight className="h-5 w-5 flex-shrink-0 text-white" strokeWidth={2.2} />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

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
    <div className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-card">
      <div className="mt-0.5 flex-shrink-0 text-brand-500">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-[11.5px] text-ink-500">{label}</p>
        <p className="mt-0.5 text-[13.5px] font-semibold leading-relaxed text-ink-900">
          {value}
        </p>
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
