import { Search } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import RegionCard from '@/components/course/RegionCard';
import { regions } from '@/data/regions';

const provinceChips = ['전체', '서울', '부산', '제주', '강원', '전라', '인천'];

export default function RegionPage() {
  return (
    <div>
      <AppHeader title="지역" showBell={false} />
      <div className="space-y-4 px-4 pb-6">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-2xl border border-ink-100 bg-white px-3 py-2.5 shadow-card">
          <Search className="h-[18px] w-[18px] text-ink-400" />
          <input
            type="text"
            placeholder="지역을 검색해보세요"
            className="w-full bg-transparent text-[14px] outline-none placeholder:text-ink-400"
          />
        </div>

        {/* Province chips */}
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {provinceChips.map((p, i) => (
            <button
              key={p}
              className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
                i === 0
                  ? 'bg-brand-500 text-white shadow-soft'
                  : 'border border-ink-200 bg-white text-ink-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {regions.map((r) => (
            <RegionCard key={r.id} region={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
