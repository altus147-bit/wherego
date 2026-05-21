const mockReports = [
  {
    id: 'rp-001',
    courseTitle: '강릉 바다 감성 가득 당일치기 코스',
    reason: '저작권 의심',
    description: '원문 블로그 사진을 무단 사용하고 있는 것 같습니다.',
    reportedAt: '2024.05.21',
    status: '검수대기',
  },
  {
    id: 'rp-002',
    courseTitle: '부산 영도 감성 여행 코스',
    reason: '폐업한 가게 포함',
    description: '깡깡이마을의 안내된 카페가 작년에 문을 닫았습니다.',
    reportedAt: '2024.05.18',
    status: '확인중',
  },
  {
    id: 'rp-003',
    courseTitle: '제주 동쪽 자연 힐링 코스',
    reason: '잘못된 정보',
    description: '비자림 입장료가 변경되었습니다.',
    reportedAt: '2024.05.15',
    status: '처리완료',
  },
];

export default function ReportsAdminPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-[22px] font-bold text-ink-900">신고 관리</h1>
        <p className="mt-1 text-[13px] text-ink-500">
          사용자가 신고한 코스를 검토합니다. 검토 결과에 따라 코스를 hidden 처리할 수 있습니다.
        </p>
      </header>

      <div className="space-y-3">
        {mockReports.map((r) => (
          <div key={r.id} className="rounded-2xl bg-white p-4 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11.5px] text-ink-500">{r.reportedAt} · 신고 사유</p>
                <h3 className="mt-1 text-[15px] font-bold text-ink-900">{r.reason}</h3>
              </div>
              <span
                className={`rounded-md px-2 py-1 text-[11.5px] font-medium ${
                  r.status === '처리완료'
                    ? 'bg-emerald-50 text-emerald-700'
                    : r.status === '확인중'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-rose-50 text-rose-700'
                }`}
              >
                {r.status}
              </span>
            </div>
            <p className="mt-2 text-[12.5px] text-ink-500">
              대상 코스: <span className="font-medium text-ink-700">{r.courseTitle}</span>
            </p>
            <p className="mt-3 rounded-xl bg-ink-50 px-3 py-2 text-[13px] text-ink-700">
              {r.description}
            </p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg bg-emerald-50 px-3 py-1.5 text-[12.5px] font-semibold text-emerald-700">
                확인 완료
              </button>
              <button className="rounded-lg bg-rose-50 px-3 py-1.5 text-[12.5px] font-semibold text-rose-700">
                코스 숨김 처리
              </button>
              <button className="rounded-lg bg-ink-100 px-3 py-1.5 text-[12.5px] font-semibold text-ink-700">
                상세 보기
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11.5px] text-ink-400">
        Mock 데이터입니다. Supabase 연결 후 실제 신고 데이터와 연동됩니다.
      </p>
    </div>
  );
}
