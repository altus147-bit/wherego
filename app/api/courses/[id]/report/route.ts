import { NextResponse } from 'next/server';
import { findCourse } from '@/data/courses';
import type { ReportReason } from '@/lib/types';

const ALLOWED_REASONS: ReportReason[] = [
  'copyright',
  'wrong_info',
  'closed_place',
  'inappropriate',
  'spam',
  'other',
];

interface ReportBody {
  reason?: ReportReason;
  description?: string;
}

// POST /api/courses/:id/report
// MOCK: in real impl, insert reports row with status='pending'.
// Admin can review and set course status='hidden' if necessary.
export async function POST(req: Request, ctx: { params: { id: string } }) {
  const course = findCourse(ctx.params.id);
  if (!course) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const body = (await req.json().catch(() => ({}))) as ReportBody;
  if (!body.reason || !ALLOWED_REASONS.includes(body.reason)) {
    return NextResponse.json({ error: 'invalid_reason' }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    courseId: course.id,
    reportId: `rp-${Math.random().toString(36).slice(2, 10)}`,
    status: 'pending',
    note: 'MOCK: 신고가 접수되었습니다. 관리자 검수 후 처리됩니다.',
  });
}
