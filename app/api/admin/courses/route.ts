import { NextResponse } from 'next/server';
import { courses } from '@/data/courses';
import type { CourseStatus } from '@/lib/types';

const ALLOWED_STATUSES: CourseStatus[] = [
  'draft',
  'pending',
  'approved',
  'rejected',
  'hidden',
];

// GET /api/admin/courses?status=pending
// Admin-only list of courses across all statuses (consumer endpoints only show approved).
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const statusParam = searchParams.get('status');
  const status = statusParam && ALLOWED_STATUSES.includes(statusParam as CourseStatus)
    ? (statusParam as CourseStatus)
    : null;

  const items = status ? courses.filter((c) => c.status === status) : courses;
  return NextResponse.json({ total: items.length, items });
}
