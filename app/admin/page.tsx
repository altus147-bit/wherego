import Link from 'next/link';
import { Search } from 'lucide-react';
import { collectedSources, collectedStats } from '@/data/collected';
import { formatDateKo, platformLabel, statusLabel } from '@/lib/format';

const statusChips = [
  { key: 'all', label: '전체', count: collectedStats.total, tone: 'default' as const },
  { key: 'pending', label: '검수대기', count: collectedStats.pending, tone: 'pending' as const },
  { key: 'approved', label: '승인', count: collectedStats.approved, tone: 'approved' as const },
  { key: 'rejected', label: '반려', count: collectedStats.rejected, tone: 'rejected' as const },
];

const toneCls: Record<'pending' | 'approved' | 'rejected', string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold text-ink-900">수집된 콘텐츠</h1>
        <p className="mt-1 text-[13px] text-ink-500">
          외부 API와 사용자 제보로 수집된 콘텐츠를 검수한 뒤 공개합니다. 자동 수집된 데이터는 절대 바로 공개되지 않습니다.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-3">
        {statusChips.map((s) => (
          <div key={s.key} className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-[12px] text-ink-500">{s.label}</p>
            <p className="mt-1 text-[22px] font-bold text-ink-900">{s.count}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white shadow-card">
        <div className="flex items-center justify-between gap-3 border-b border-ink-100 p-4">
          <div className="flex flex-wrap items-center gap-2">
            {statusChips.map((s, i) => (
              <button
                key={s.key}
                className={`rounded-full px-3 py-1 text-[12.5px] font-medium ${
                  i === 0
                    ? 'bg-brand-500 text-white'
                    : 'border border-ink-200 bg-white text-ink-700'
                }`}
              >
                {s.label} ({s.count})
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1.5">
            <Search className="h-4 w-4 text-ink-400" />
            <input
              className="w-44 bg-transparent text-[13px] outline-none placeholder:text-ink-400"
              placeholder="검색"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-ink-50 text-[12px] uppercase tracking-wide text-ink-500">
                <th className="px-4 py-2.5">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-2.5">제목</th>
                <th className="px-4 py-2.5">출처</th>
                <th className="px-4 py-2.5">지역</th>
                <th className="px-4 py-2.5">수집일</th>
                <th className="px-4 py-2.5">상태</th>
                <th className="px-4 py-2.5">작업</th>
              </tr>
            </thead>
            <tbody>
              {collectedSources.map((s) => (
                <tr key={s.id} className="border-t border-ink-100 hover:bg-ink-50/50">
                  <td className="px-4 py-3">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink-900">{s.title}</p>
                    <p className="mt-0.5 text-[11.5px] text-ink-500">{s.summary}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-700">{platformLabel(s.sourcePlatform)}</td>
                  <td className="px-4 py-3 text-ink-700">{s.regionNameKo}</td>
                  <td className="px-4 py-3 text-ink-500">{formatDateKo(s.collectedAt)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11.5px] font-semibold ${
                        toneCls[s.status as keyof typeof toneCls] ?? 'bg-ink-100 text-ink-700 border-ink-200'
                      }`}
                    >
                      {statusLabel(s.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      <button className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11.5px] font-semibold text-emerald-700">
                        승인
                      </button>
                      <button className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-[11.5px] font-semibold text-rose-700">
                        반려
                      </button>
                      <Link
                        href={s.sourceUrl}
                        target="_blank"
                        className="rounded-md border border-ink-200 bg-white px-2 py-1 text-[11.5px] font-semibold text-ink-700"
                      >
                        보기
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[11.5px] text-ink-400">
        Mock 데이터입니다. Supabase 연결 후 실제 검수 워크플로(pending → approved/rejected/hidden)로 대체됩니다.
      </p>
    </div>
  );
}
