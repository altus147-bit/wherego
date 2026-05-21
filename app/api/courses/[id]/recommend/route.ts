import { NextResponse } from 'next/server';
import { findCourse } from '@/data/courses';

// POST /api/courses/:id/recommend
// MOCK: in real impl, insert a row into user_course_actions with actionType='recommend',
// require auth (Supabase Auth), enforce one-per-user, then bump courses.recommendCount.
export async function POST(_req: Request, ctx: { params: { id: string } }) {
  const course = findCourse(ctx.params.id);
  if (!course) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  return NextResponse.json({
    ok: true,
    courseId: course.id,
    recommendCount: course.recommendCount + 1,
    note: 'MOCK: 실제 구현 시 Supabase Auth 사용자 ID 기반으로 1인 1회 처리됩니다.',
  });
}
