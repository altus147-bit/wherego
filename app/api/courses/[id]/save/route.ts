import { NextResponse } from 'next/server';
import { findCourse } from '@/data/courses';

// POST /api/courses/:id/save
// MOCK: in real impl, toggle user_course_actions row (actionType='save').
export async function POST(_req: Request, ctx: { params: { id: string } }) {
  const course = findCourse(ctx.params.id);
  if (!course) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  return NextResponse.json({
    ok: true,
    courseId: course.id,
    saved: true,
    saveCount: course.saveCount + 1,
    note: 'MOCK: 실제 구현 시 로그인 사용자만 저장 가능합니다.',
  });
}
