import { NextResponse } from 'next/server';
import { collectedSources } from '@/data/collected';

// GET /api/admin/collected-sources?status=pending
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  let list = collectedSources;
  if (status) list = list.filter((s) => s.status === status);
  return NextResponse.json({ data: list, total: list.length });
}
