import { NextResponse } from 'next/server';
import { findCourse } from '@/data/courses';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const course = findCourse(params.id);
  if (!course) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  return NextResponse.json({ data: course });
}
