import { NextResponse } from 'next/server';
import { coursesByRegion } from '@/data/courses';
import { findRegion } from '@/data/regions';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const region = findRegion(params.id);
  if (!region) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  return NextResponse.json({ region, data: coursesByRegion(params.id) });
}
