import { NextResponse } from 'next/server';
import { ingest } from '../_lib';

// POST /api/collect/public-data
// Future: 한국관광공사 TourAPI, 공공데이터포털 등 공식 API를 호출.
// 공공데이터는 라이선스가 명시되어 있는 경우가 많아 사용 시 반드시 명시할 것.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { regionId?: string };
  const regionId = body.regionId ?? 'rg-jeju';

  const r = ingest({
    keyword: '제주 코스',
    regionId,
    regionNameKo: '제주도',
    title: '제주 동쪽 자연 힐링 코스 (공공데이터 기반)',
    summary: '한국관광공사 TourAPI 기반 자동 생성 후보',
    sourceUrl: `https://api.visitkorea.or.kr/?id=${Date.now()}`,
    sourceAuthor: '한국관광공사',
    sourcePlatform: 'public_api',
  });

  return NextResponse.json({
    note: 'MOCK: 공공데이터 TourAPI 등 연동 전입니다.',
    saved: r.ok ? 1 : 0,
    item: r.item,
    skipped: r.ok ? undefined : { reason: r.reason },
  });
}
