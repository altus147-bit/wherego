// 코스 추천 페이지 — 사용자가 조건 입력하면 점수 매겨서 순위 보여줌

import Link from 'next/link';
import { ChevronLeft, MapPin, Clock, Wallet, Heart, Star, Compass } from 'lucide-react';

import { fetchAllCourses, fetchAllRegions } from '@/lib/db';
import { rankCourses, type UserPreference } from '@/lib/scoring';
import { courses as mockCourses } from '@/data/courses';
import { regions as mockRegions } from '@/data/regions';
import SafeImage from '@/components/ui/SafeImage';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: {
    region?: string;
    minutes?: string;
    transport?: string;
    companion?: string;
    tags?: string;
    avoid?: string;
    budget?: string;
    hour?: string;
    weather?: string;
  };
}

export default async function RecommendPage({ searchParams }: PageProps) {
  // DB에서 코스/지역 가져옴
  const dbCourses = await fetchAllCourses();
  const dbRegions = await fetchAllRegions();
  const courses = dbCourses.length > 0 ? dbCourses : mockCourses;
  const regions = dbRegions.length > 0 ? dbRegions : mockRegions;

  // 조건 입력 안 됐으면 입력 폼만 보여줌
  if (!searchParams.region) {
    return <InputForm regions={regions} />;
  }

  // 사용자 입력 파싱
  const pref: UserPreference = {
    regionId: searchParams.region,
    travelMinutes: parseInt(searchParams.minutes ?? '360', 10),
    transportType: (searchParams.transport as UserPreference['transportType']) ?? 'mixed',
    companionType: (searchParams.companion as UserPreference['companionType']) ?? 'couple',
    preferredTags: searchParams.tags ? searchParams.tags.split(',').filter(Boolean) : [],
    avoidTags: searchParams.avoid ? searchParams.avoid.split(',').filter(Boolean) : [],
    budgetLevel: (searchParams.budget as UserPreference['budgetLevel']) ?? 'mid',
    startHour: parseInt(searchParams.hour ?? '10', 10),
    weather: (searchParams.weather as UserPreference['weather']) ?? 'unknown',
  };

  // 점수 계산 + 정렬
  const ranked = rankCourses(courses, pref);
  const top5 = ranked.slice(0, 5);

  const regionName = regions.find((r) => r.id === pref.regionId)?.nameKo ?? '전체';

  return (
    <div className="min-h-screen bg-ink-50 pb-16">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-ink-100 px-4 py-3">
        <Link href="/recommend" className="inline-flex items-center text-ink-600">
          <ChevronLeft className="h-5 w-5" />
          <span className="text-[14px] font-semibold ml-1">조건 다시 입력</span>
        </Link>
      </div>

      {/* 검색 조건 요약 */}
      <div className="bg-white px-4 py-5 border-b border-ink-100">
        <p className="text-[12px] text-ink-500">검색 조건</p>
        <h1 className="mt-1 text-[20px] font-bold text-ink-900">
          {regionName} · {Math.round(pref.travelMinutes / 60)}시간 코스
        </h1>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {pref.preferredTags?.map((t) => (
            <span key={t} className="rounded-full bg-brand-50 text-brand-700 px-2 py-0.5 text-[11.5px] font-semibold">
              {t}
            </span>
          ))}
          {pref.companionType && (
            <span className="rounded-full bg-ink-100 text-ink-700 px-2 py-0.5 text-[11.5px] font-semibold">
              {companionLabel(pref.companionType)}
            </span>
          )}
        </div>
      </div>

      {/* 결과 */}
      {top5.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <p className="text-[15px] font-semibold text-ink-700">조건에 맞는 코스가 없어요</p>
          <p className="mt-2 text-[13px] text-ink-500">조건을 바꿔서 다시 시도해보세요</p>
          <Link
            href="/recommend"
            className="mt-4 inline-block rounded-lg bg-brand-500 px-4 py-2 text-[13px] font-semibold text-white"
          >
            조건 다시 입력
          </Link>
        </div>
      ) : (
        <div className="px-4 py-4 space-y-3">
          <p className="text-[13px] text-ink-500">
            <span className="font-semibold text-ink-900">{top5.length}개</span>의 코스를 점수순으로 추천드려요
          </p>

          {top5.map((item, i) => (
            <RankedCourseCard key={item.course.id} rank={i + 1} course={item.course} score={item.score} />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// 입력 폼 (조건 입력 안 됐을 때)
// ============================================

function InputForm({ regions }: { regions: { id: string; nameKo: string }[] }) {
  return (
    <div className="min-h-screen bg-ink-50 pb-16">
      <div className="sticky top-0 z-10 bg-white border-b border-ink-100 px-4 py-3">
        <Link href="/" className="inline-flex items-center text-ink-600">
          <ChevronLeft className="h-5 w-5" />
          <span className="text-[14px] font-semibold ml-1">홈으로</span>
        </Link>
      </div>

      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-ink-900">어떤 코스를 찾으세요?</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            조건을 알려주시면 AI가 점수 매겨서 1위~5위 코스를 추천해드려요
          </p>
        </div>

        <form action="/recommend" method="get" className="space-y-5">
          {/* 지역 */}
          <div>
            <label className="block text-[13px] font-semibold text-ink-900 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              지역
            </label>
            <select
              name="region"
              required
              defaultValue=""
              className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-[14px]"
            >
              <option value="" disabled>
                선택해주세요
              </option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nameKo}
                </option>
              ))}
            </select>
          </div>

          {/* 여행 시간 */}
          <div>
            <label className="block text-[13px] font-semibold text-ink-900 mb-2">
              <Clock className="inline h-4 w-4 mr-1" />
              여행 시간
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { v: '180', l: '3시간' },
                { v: '360', l: '반나절' },
                { v: '600', l: '하루' },
                { v: '1440', l: '1박2일' },
              ].map((t) => (
                <label key={t.v} className="cursor-pointer">
                  <input type="radio" name="minutes" value={t.v} defaultChecked={t.v === '360'} className="peer sr-only" />
                  <span className="block text-center rounded-lg border border-ink-200 bg-white px-2 py-2 text-[13px] font-medium peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:text-brand-700">
                    {t.l}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 동행 */}
          <div>
            <label className="block text-[13px] font-semibold text-ink-900 mb-2">
              <Heart className="inline h-4 w-4 mr-1" />
              누구랑 가요?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: 'solo', l: '혼자' },
                { v: 'couple', l: '연인' },
                { v: 'friend', l: '친구' },
                { v: 'family', l: '가족' },
                { v: 'kid', l: '아이와' },
              ].map((c) => (
                <label key={c.v} className="cursor-pointer">
                  <input type="radio" name="companion" value={c.v} defaultChecked={c.v === 'couple'} className="peer sr-only" />
                  <span className="block text-center rounded-lg border border-ink-200 bg-white px-2 py-2 text-[13px] font-medium peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:text-brand-700">
                    {c.l}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 취향 (다중 선택을 콤마로) */}
          <div>
            <label className="block text-[13px] font-semibold text-ink-900 mb-2">
              <Star className="inline h-4 w-4 mr-1" />
              취향 (여러 개 입력 가능)
            </label>
            <input
              type="text"
              name="tags"
              placeholder="예: 감성,바다,카페"
              className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-[14px] placeholder:text-ink-400"
            />
            <p className="mt-1 text-[11.5px] text-ink-500">콤마로 구분 (예: 야경,맛집,사진)</p>
          </div>

          {/* 이동수단 */}
          <div>
            <label className="block text-[13px] font-semibold text-ink-900 mb-2">
              <Compass className="inline h-4 w-4 mr-1" />
              이동수단
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { v: 'walk', l: '도보' },
                { v: 'public_transport', l: '대중교통' },
                { v: 'car', l: '자차' },
                { v: 'mixed', l: '상관없음' },
              ].map((t) => (
                <label key={t.v} className="cursor-pointer">
                  <input type="radio" name="transport" value={t.v} defaultChecked={t.v === 'mixed'} className="peer sr-only" />
                  <span className="block text-center rounded-lg border border-ink-200 bg-white px-2 py-2 text-[13px] font-medium peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:text-brand-700">
                    {t.l}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 예산 */}
          <div>
            <label className="block text-[13px] font-semibold text-ink-900 mb-2">
              <Wallet className="inline h-4 w-4 mr-1" />
              예산
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: 'low', l: '저렴하게' },
                { v: 'mid', l: '보통' },
                { v: 'high', l: '여유롭게' },
              ].map((b) => (
                <label key={b.v} className="cursor-pointer">
                  <input type="radio" name="budget" value={b.v} defaultChecked={b.v === 'mid'} className="peer sr-only" />
                  <span className="block text-center rounded-lg border border-ink-200 bg-white px-2 py-2 text-[13px] font-medium peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:text-brand-700">
                    {b.l}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 제출 */}
          <button type="submit" className="w-full mt-6 rounded-xl bg-brand-500 px-4 py-3.5 text-[15px] font-bold text-white shadow-card">
            🤖 AI 추천 받기
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================
// 코스 카드 (순위 + 점수 + 이유 표시)
// ============================================

function RankedCourseCard({
  rank,
  course,
  score,
}: {
  rank: number;
  course: any;
  score: any;
}) {
  const cover = course.images?.[0]?.imageUrl ?? '';
  const rankColor =
    rank === 1
      ? 'bg-amber-400 text-white'
      : rank === 2
      ? 'bg-ink-400 text-white'
      : rank === 3
      ? 'bg-orange-400 text-white'
      : 'bg-ink-200 text-ink-700';

  return (
    <Link href={`/courses/${course.id}`} className="block">
      <div className="rounded-2xl bg-white shadow-card overflow-hidden">
        {/* 이미지 + 순위 */}
        <div className="relative h-[140px] w-full bg-ink-100">
          {cover && <SafeImage src={cover} alt={course.titleKo} className="absolute inset-0 h-full w-full object-cover" />}
          <div className={`absolute top-3 left-3 ${rankColor} rounded-full px-3 py-1 text-[12.5px] font-bold shadow-card`}>
            {rank}위 · {score.totalScore}점
          </div>
        </div>

        {/* 본문 */}
        <div className="px-4 py-3">
          <h3 className="text-[15.5px] font-bold text-ink-900">{course.titleKo}</h3>
          <p className="mt-1 text-[12px] text-ink-500">{course.regionNameKo} · {course.places?.length ?? 0}개 장소</p>

          {/* 추천 이유 */}
          {score.reasons.length > 0 && (
            <div className="mt-2.5 rounded-lg bg-brand-50 px-3 py-2">
              <p className="text-[11.5px] font-semibold text-brand-700 mb-1">💡 추천 이유</p>
              <ul className="space-y-0.5">
                {score.reasons.slice(0, 3).map((r: string, i: number) => (
                  <li key={i} className="text-[12px] text-ink-700">
                    · {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 점수 세부 */}
          <div className="mt-2.5 grid grid-cols-4 gap-1.5 text-[10.5px] text-ink-600">
            <ScoreBar label="취향" value={score.breakdown.preference} max={30} />
            <ScoreBar label="이동" value={score.breakdown.movement} max={20} />
            <ScoreBar label="인기" value={score.breakdown.popularity} max={15} />
            <ScoreBar label="시간" value={score.breakdown.timeFit} max={10} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const rate = max > 0 ? value / max : 0;
  return (
    <div>
      <div className="flex justify-between mb-0.5">
        <span>{label}</span>
        <span className="font-semibold">{value}/{max}</span>
      </div>
      <div className="h-1 bg-ink-100 rounded-full overflow-hidden">
        <div className="h-full bg-brand-500" style={{ width: `${rate * 100}%` }} />
      </div>
    </div>
  );
}

function companionLabel(c: string): string {
  return (
    {
      solo: '혼자',
      couple: '연인과',
      friend: '친구와',
      family: '가족과',
      kid: '아이와',
    } as Record<string, string>
  )[c] ?? c;
}
