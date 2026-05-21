import { courses } from '@/data/courses';
import { statusLabel, formatDateKo } from '@/lib/format';

export default function CourseAdminPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-[22px] font-bold text-ink-900">코스 관리</h1>
        <p className="mt-1 text-[13px] text-ink-500">
          승인 완료된 코스를 관리합니다. 신고된 코스는 hidden 처리할 수 있습니다.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        <table className="w-full text-left">
          <thead className="bg-ink-50 text-[12px] text-ink-500">
            <tr>
              <th className="px-4 py-3 font-medium">제목</th>
              <th className="px-4 py-3 font-medium">지역</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">조회수</th>
              <th className="px-4 py-3 font-medium">평점</th>
              <th className="px-4 py-3 font-medium">등록일</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-ink-800">
            {courses.map((c) => (
              <tr key={c.id} className="border-t border-ink-100">
                <td className="px-4 py-3 font-semibold">{c.titleKo}</td>
                <td className="px-4 py-3">{c.regionNameKo}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-[11.5px] font-medium ${
                      c.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : c.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {statusLabel(c.status)}
                  </span>
                </td>
                <td className="px-4 py-3">{c.viewCount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  {c.ratingAvg.toFixed(1)} ({c.ratingCount})
                </td>
                <td className="px-4 py-3 text-ink-500">{formatDateKo(c.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[11.5px] text-ink-400">
        Mock 데이터입니다. Supabase 연결 후 실제 코스 데이터와 연동됩니다.
      </p>
    </div>
  );
}
