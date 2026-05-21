import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import CourseCard from '@/components/course/CourseCard';
import SafeImage from '@/components/ui/SafeImage';
import { findRegion, regions } from '@/data/regions';
import { coursesByRegion } from '@/data/courses';

export function generateStaticParams() {
  return regions.map((r) => ({ id: r.id }));
}

export default function RegionDetailPage({ params }: { params: { id: string } }) {
  const region = findRegion(params.id);
  if (!region) notFound();

  const list = coursesByRegion(region.id);

  return (
    <div>
      {/* Hero header */}
      <div className="relative h-[200px] w-full overflow-hidden bg-ink-100">
        <SafeImage
          src={region.thumbnailUrl}
          alt={region.nameKo}
          seed={`region-${region.id}`}
          className="absolute inset-0 h-full w-full object-cover"
          width={800}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/75 via-ink-900/30 to-ink-900/40" />
        <Link
          href="/region"
          aria-label="뒤로가기"
          className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink-900 shadow-soft backdrop-blur"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.4} />
        </Link>
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4 text-white">
          <p className="text-[12.5px] font-medium text-white/85">{region.province}</p>
          <h1 className="mt-1 text-[22px] font-bold leading-tight">{region.nameKo}</h1>
          <p className="mt-1 text-[12.5px] text-white/85">코스 {region.courseCount}개 · {region.description}</p>
        </div>
      </div>

      <div className="space-y-3 px-4 py-5">
        <h2 className="px-1 text-[15px] font-bold text-ink-900">
          {region.nameKo} 추천 코스
        </h2>
        {list.length === 0 ? (
          <p className="rounded-2xl bg-ink-50 p-6 text-center text-[13px] text-ink-500">
            아직 등록된 코스가 없어요. 첫 번째 코스를 등록해보세요.
          </p>
        ) : (
          list.map((c) => <CourseCard key={c.id} course={c} />)
        )}
      </div>
    </div>
  );
}
