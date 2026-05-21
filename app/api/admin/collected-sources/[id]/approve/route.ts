import { NextResponse } from 'next/server';
import { collectedSources } from '@/data/collected';

// POST /api/admin/collected-sources/[id]/approve
// In production this is the moment a pending row becomes publicly visible.
// The handler should also create the corresponding `courses` row.
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const item = collectedSources.find((s) => s.id === params.id);
  if (!item) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  item.status = 'approved';
  return NextResponse.json({ data: item });
}
