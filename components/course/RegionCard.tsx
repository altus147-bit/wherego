import Link from 'next/link';
import type { Region } from '@/lib/types';
import SafeImage from '@/components/ui/SafeImage';

export default function RegionCard({ region }: { region: Region }) {
  return (
    <Link
      href={`/region/${region.id}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink-100 shadow-card"
    >
      <SafeImage
        src={region.thumbnailUrl}
        alt={region.nameKo}
        seed={region.id}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-active:scale-105"
        width={400}
        height={500}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 text-white">
        <h3 className="text-[15px] font-bold leading-tight drop-shadow">
          {region.nameKo}
        </h3>
        <p className="mt-0.5 text-[12px] text-white/85">코스 {region.courseCount}개</p>
      </div>
    </Link>
  );
}
