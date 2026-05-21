import { ExternalLink } from 'lucide-react';
import type { Course } from '@/lib/types';
import { formatDateKo, platformLabel } from '@/lib/format';

export default function SourceInfoCard({ course }: { course: Course }) {
  const cover = course.images.find((i) => i.isCover) ?? course.images[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card">
      <div className="flex gap-3 p-3">
        {cover && (
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-ink-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover.imageUrl}
              alt={course.sourceTitle}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-ink-500">원문 출처</p>
          <h4 className="mt-0.5 line-clamp-2 text-[14px] font-bold leading-snug text-ink-900">
            {course.sourceTitle}
          </h4>
          <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-ink-500">
            {platformLabel(course.sourcePlatform)} · {course.sourceAuthor}
          </p>
          <p className="mt-0.5 text-[11.5px] text-ink-400">
            수집일 {formatDateKo(course.collectedAt)}
          </p>
        </div>
      </div>

      <a
        href={course.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-3 mb-3 flex items-center justify-center gap-1.5 rounded-xl border border-brand-200 bg-brand-50 py-2.5 text-[13px] font-semibold text-brand-700 transition active:scale-[0.99]"
      >
        원문 블로그 보기
        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.2} />
      </a>
    </div>
  );
}
