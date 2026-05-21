import { NextResponse } from 'next/server';
import { collectedSources } from '@/data/collected';

// POST /api/admin/collected-sources/[id]/reject
// Body: { reason?: string }
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const item = collectedSources.find((s) => s.id === params.id);
  if (!item) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  const body = (await request.json().catch(() => ({}))) as { reason?: string };
  item.status = 'rejected';
  item.rejectionReason = body.reason ?? '관리자 반려';
  return NextResponse.json({ data: item });
}
