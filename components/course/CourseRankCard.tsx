import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import type { Course } from '@/lib/types';

export default function CourseRankCard({ course, rank }: { course: Course; rank: number }) {
  const cover = course.images.find((i) => i.isCover) ?? course.images[0];

  return (
    <Link
      href={`/courses/${course.id}`}
      className="block w-[170px] flex-shrink-0 snap-start"
    >
      <div className="relative h-[120px] w-full overflow-hidden rounded-2xl bg-paper-200 shadow-card">
        {cover && (
          <Image
            src={cover.imageUrl}
            alt={course.titleKo}
            fill
            sizes="170px"
            className="object-cover"
          />
        )}
        <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-accent-500 font-serif text-sm font-bold italic text-white shadow-soft">
          {rank}
        </span>
      </div>
      <div className="mt-2 px-0.5">
        <h4 className="line-clamp-2 font-serif text-[13.5px] font-bold leading-snug text-ink-900">
          {course.titleKo}
        </h4>
        <p className="mt-0.5 text-[11px] italic text-ink-500">{course.regionNameKo}</p>
        <div className="mt-1 flex items-center gap-1 text-[11.5px] text-ink-700">
          <Star className="h-3.5 w-3.5 fill-accent-400 stroke-accent-400" />
          <span className="font-serif font-semibold">{course.ratingAvg.toFixed(1)}</span>
          <span className="text-ink-400">({course.ratingCount})</span>
        </div>
      </div>
    </Link>
  );
}
