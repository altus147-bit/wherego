import { TrendingUp, Users, Eye, Bookmark } from 'lucide-react';
import { courses } from '@/data/courses';
import { collectedStats } from '@/data/collected';

export default function StatsAdminPage() {
  const totalViews = courses.reduce((sum, c) => sum + c.viewCount, 0);
  const totalSaves = courses.reduce((sum, c) => sum + c.saveCount, 0);
  const totalRecommends = courses.reduce((sum, c) => sum + c.recommendCount, 0);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-[22px] font-bold text-ink-900">통계</h1>
        <p className="mt-1 text-[13px] text-ink-500">
          코스 수집/소비 현황을 한눈에 봅니다.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard
          label="공개 코스"
          value={courses.length.toLocaleString()}
          delta="+8"
          icon={<TrendingUp className="h-5 w-5" strokeWidth={2.2} />}
          tint="bg-brand-50 text-brand-600"
        />
        <KpiCard
          label="누적 조회"
          value={totalViews.toLocaleString()}
          delta="+1,240 / 주"
          icon={<Eye className="h-5 w-5" strokeWidth={2.2} />}
          tint="bg-sky-50 text-sky-600"
        />
        <KpiCard
          label="누적 저장"
          value={totalSaves.toLocaleString()}
          delta="+98 / 주"
          icon={<Bookmark className="h-5 w-5" strokeWidth={2.2} />}
          tint="bg-emerald-50 text-emerald-600"
        />
        <KpiCard
          label="누적 추천"
          value={totalRecommends.toLocaleString()}
          delta="+122 / 주"
          icon={<Users className="h-5 w-5" strokeWidth={2.2} />}
          tint="bg-amber-50 text-amber-600"
        />
      </div>

      <section className="mt-6 rounded-2xl bg-white p-5 shadow-card">
        <h2 className="mb-3 text-[15px] font-bold text-ink-900">수집 콘텐츠 현황</h2>
        <div className="grid grid-cols-4 gap-3 text-center">
          <Stat label="전체" value={collectedStats.total} />
          <Stat label="검수대기" value={collectedStats.pending} accent="amber" />
          <Stat label="승인" value={collectedStats.approved} accent="emerald" />
          <Stat label="반려" value={collectedStats.rejected} accent="rose" />
        </div>
      </section>

      <p className="mt-3 text-[11.5px] text-ink-400">
        Mock 데이터입니다. Supabase 연결 후 실제 통계가 표시됩니다.
      </p>
    </div>
  );
}

function KpiCard({
  label,
  value,
  delta,
  icon,
  tint,
}: {
  label: string;
  value: string;
  delta: string;
  icon: React.ReactNode;
  tint: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-ink-500">{label}</p>
        <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${tint}`}>
          {icon}
        </span>
      </div>
      <p className="mt-2 text-[22px] font-bold text-ink-900">{value}</p>
      <p className="mt-0.5 text-[11.5px] text-emerald-600">{delta}</p>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: 'amber' | 'emerald' | 'rose';
}) {
  const color =
    accent === 'amber'
      ? 'text-amber-600'
      : accent === 'emerald'
        ? 'text-emerald-600'
        : accent === 'rose'
          ? 'text-rose-600'
          : 'text-ink-900';
  return (
    <div className="rounded-xl bg-ink-50 px-3 py-3">
      <p className="text-[11.5px] text-ink-500">{label}</p>
      <p className={`mt-1 text-[20px] font-bold ${color}`}>{value}</p>
    </div>
  );
}
