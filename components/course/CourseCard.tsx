import Link from 'next/link';
import Image from 'next/image';
import { Star, Bookmark } from 'lucide-react';
import type { Course } from '@/lib/types';

export default function CourseCard({ course, rank }: { course: Course; rank?: number }) {
  const cover = course.images.find((i) => i.isCover) ?? course.images[0];
  return (
    <Link
      href={`/courses/${course.id}`}
      className="flex gap-3 rounded-2xl bg-white p-3 shadow-card transition active:scale-[0.99]"
    >
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-ink-100">
        {cover && (
          <Image
            src={cover.imageUrl}
            alt={course.titleKo}
            fill
            sizes="96px"
            className="object-cover"
          />
        )}
        {rank !== undefined && (
          <span className="absolute left-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-brand-500 text-xs font-bold text-white shadow-soft">
            {rank}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-ink-900">
            {course.titleKo}
          </h3>
          <p className="mt-1 truncate text-[12px] text-ink-500">
            {course.regionNameKo} · {course.tags[0] ?? '여행'}
          </p>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[13px] text-ink-700">
            <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
            <span className="font-semibold">{course.ratingAvg.toFixed(1)}</span>
            <span className="text-ink-400">({course.ratingCount})</span>
          </div>
          <Bookmark className="h-5 w-5 text-ink-300" />
        </div>
      </div>
    </Link>
  );
}
