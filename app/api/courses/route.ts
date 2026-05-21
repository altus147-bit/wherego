import { NextResponse } from 'next/server';
import { courses } from '@/data/courses';

export const dynamic = 'force-static';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const regionId = searchParams.get('regionId');
  const sort = searchParams.get('sort') ?? 'score';
  const limitRaw = searchParams.get('limit');

  let list = courses.filter((c) => c.status === 'approved');
  if (regionId) list = list.filter((c) => c.regionId === regionId);

  switch (sort) {
    case 'recent':
      list = list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      break;
    case 'rating':
      list = list.sort((a, b) => b.ratingAvg - a.ratingAvg);
      break;
    case 'saves':
      list = list.sort((a, b) => b.saveCount - a.saveCount);
      break;
    case 'views':
      list = list.sort((a, b) => b.viewCount - a.viewCount);
      break;
    default:
      list = list.sort((a, b) => b.score - a.score);
  }

  const limit = limitRaw ? Number(limitRaw) : undefined;
  if (limit) list = list.slice(0, limit);

  return NextResponse.json({ data: list, total: list.length });
}
