import { NextResponse } from 'next/server';
import { ingest } from '../_lib';

// POST /api/collect/google-places
// Future: Google Places API로 장소 좌표/주소/카테고리만 수집.
// 사용자 리뷰 원문은 대량 복사하지 않음 (이용약관 및 저작권 정책).
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { query?: string; regionId?: string };
  const query = body.query ?? 'Gangneung beach cafe';
  const regionId = body.regionId ?? 'rg-gangneung';

  const r = ingest({
    keyword: query,
    regionId,
    regionNameKo: '강릉시',
    title: `Google Places 후보: ${query}`,
    summary: 'Google Places API 기반 장소 좌표/카테고리 후보 (리뷰 본문 미포함)',
    sourceUrl: `https://maps.google.com/?q=${encodeURIComponent(query)}`,
    sourceAuthor: 'Google Maps',
    sourcePlatform: 'google_places',
  });

  return NextResponse.json({
    note: 'MOCK: Google Places API 연동 전입니다. 리뷰 원문은 절대 대량 저장하지 않습니다.',
    saved: r.ok ? 1 : 0,
    item: r.item,
    skipped: r.ok ? undefined : { reason: r.reason },
  });
}
