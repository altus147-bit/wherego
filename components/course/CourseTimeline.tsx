import { ChevronRight, ListChecks } from 'lucide-react';
import type { CoursePlace } from '@/lib/types';

export default function CourseTimeline({ places }: { places: CoursePlace[] }) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2 px-1">
        <ListChecks className="h-5 w-5 text-brand-500" strokeWidth={2.2} />
        <h3 className="text-[16px] font-bold text-ink-900">코스 순서</h3>
      </div>

      <div className="overflow-hidden rounded-2xl bg-ink-50">
        <ul>
          {places.map((p, idx) => (
            <li
              key={p.id}
              className={`flex items-center gap-3 px-3 py-3 ${
                idx !== places.length - 1 ? 'border-b border-ink-100' : ''
              }`}
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-[13px] font-bold text-white shadow-soft">
                {p.order}
              </span>
              <span className="text-2xl leading-none">{p.emoji ?? '📍'}</span>
              <span className="flex-1 text-[14.5px] font-semibold text-ink-900">
                {p.placeNameKo}
              </span>
              <ChevronRight className="h-5 w-5 text-ink-300" strokeWidth={2} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
