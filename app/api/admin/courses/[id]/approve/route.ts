import { NextResponse } from 'next/server';
import { findCourse } from '@/data/courses';

// POST /api/admin/courses/:id/approve
// MOCK: in real impl, update courses.status='approved', set reviewedBy/reviewedAt.
export async function POST(_req: Request, ctx: { params: { id: string } }) {
  const course = findCourse(ctx.params.id);
  if (!course) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  return NextResponse.json({
    ok: true,
    courseId: course.id,
    status: 'approved',
    reviewedAt: new Date().toISOString(),
    note: 'MOCK: 코스가 승인 처리되어 사용자에게 노출됩니다.',
  });
}
