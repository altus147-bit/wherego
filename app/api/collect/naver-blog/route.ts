import { NextResponse } from 'next/server';
import { ingest } from '../_lib';

// POST /api/collect/naver-blog
// Body: { keyword: string, regionId: string }
//
// Real implementation will:
//   1. Call the Naver Search API (네이버 검색 API → 블로그) with the keyword.
//   2. For each hit, extract title + short snippet + source URL + author.
//      *** DO NOT save the full blog body. ***
//      *** DO NOT download blog images to our storage. ***
//   3. Call ingest() — it dedupes, rate-limits, and saves as `pending`.
//   4. Return how many candidates were saved.
//
// In MVP we return synthetic candidates so the admin queue feels real.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    keyword?: string;
    regionId?: string;
  };
  const keyword = body.keyword ?? '강릉 당일치기 코스';
  const regionId = body.regionId ?? 'rg-gangneung';

  const fakeHits = [
    { title: `${keyword} 추천`, author: '여행하는 김작가', summary: '바다와 카페가 있는 하루 코스' },
    { title: `${keyword} 베스트`, author: '강릉토박이', summary: '현지인이 직접 다닌 코스 모음' },
  ];

  const saved = [];
  const skipped = [];
  for (const hit of fakeHits) {
    const r = ingest({
      keyword,
      regionId,
      regionNameKo: '강릉시',
      title: hit.title,
      summary: hit.summary,
      sourceUrl: `https://blog.naver.com/example/${encodeURIComponent(hit.title)}`,
      sourceAuthor: hit.author,
      sourcePlatform: 'naver_blog',
    });
    if (r.ok && r.item) saved.push(r.item);
    else skipped.push({ title: hit.title, reason: r.reason });
  }

  return NextResponse.json({
    note: 'MOCK: 실제 네이버 검색 API 연동 전입니다. 구조만 동작합니다.',
    saved: saved.length,
    skipped,
    items: saved,
  });
}
