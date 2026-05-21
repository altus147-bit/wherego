import { NextResponse } from 'next/server';
import { findCourse } from '@/data/courses';

interface RejectBody {
  reason?: string;
}

// POST /api/admin/courses/:id/reject
// MOCK: in real impl, update courses.status='rejected', store rejectionReason.
export async function POST(req: Request, ctx: { params: { id: string } }) {
  const course = findCourse(ctx.params.id);
  if (!course) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const body = (await req.json().catch(() => ({}))) as RejectBody;
  const reason = body.reason?.trim() || '사유 미입력';

  return NextResponse.json({
    ok: true,
    courseId: course.id,
    status: 'rejected',
    rejectionReason: reason,
    reviewedAt: new Date().toISOString(),
    note: 'MOCK: 코스가 반려 처리되었습니다.',
  });
}
