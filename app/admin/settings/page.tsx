import { Key, RefreshCw, Shield, Database } from 'lucide-react';

export default function SettingsAdminPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-[22px] font-bold text-ink-900">설정</h1>
        <p className="mt-1 text-[13px] text-ink-500">
          자동 수집, API 키, 배포 환경을 관리합니다.
        </p>
      </header>

      <div className="space-y-4">
        <SettingCard
          icon={<Database className="h-5 w-5" strokeWidth={2.2} />}
          title="데이터베이스"
          status="미연결"
          statusColor="rose"
        >
          <p className="text-[13px] text-ink-700">
            현재 mock 데이터만 사용 중입니다. 진짜 코스 자동 수집을 위해서는 Supabase 연결이 필요합니다.
          </p>
          <ul className="mt-2 list-inside list-disc text-[12.5px] text-ink-600">
            <li>무료 한도: 500MB 스토리지, 동시 사용자 50명</li>
            <li>가입: supabase.com (5분)</li>
            <li>코스/장소/사용자/신고 테이블 자동 생성 스크립트 포함</li>
          </ul>
        </SettingCard>

        <SettingCard
          icon={<RefreshCw className="h-5 w-5" strokeWidth={2.2} />}
          title="자동 수집기"
          status="대기 중"
          statusColor="amber"
        >
          <p className="text-[13px] text-ink-700">
            네이버 검색 API, 공공데이터(TourAPI), Google Places를 통한 자동 수집은
            데이터베이스 연결 후 활성화됩니다.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
            <Row label="네이버 블로그 일일 한도" value="200건" />
            <Row label="공공데이터 일일 한도" value="500건" />
            <Row label="Google Places 일일 한도" value="200건" />
            <Row label="수집 주기" value="매일 04:00 KST" />
          </div>
        </SettingCard>

        <SettingCard
          icon={<Key className="h-5 w-5" strokeWidth={2.2} />}
          title="외부 API 키"
          status="미등록"
          statusColor="rose"
        >
          <p className="text-[13px] text-ink-700">
            Vercel 환경 변수로 등록합니다. 코드에 직접 적지 마세요.
          </p>
          <ul className="mt-2 space-y-1 text-[12.5px] text-ink-600">
            <li className="font-mono">NAVER_CLIENT_ID / NAVER_CLIENT_SECRET</li>
            <li className="font-mono">CLAUDE_API_KEY</li>
            <li className="font-mono">SUPABASE_URL / SUPABASE_ANON_KEY</li>
          </ul>
        </SettingCard>

        <SettingCard
          icon={<Shield className="h-5 w-5" strokeWidth={2.2} />}
          title="저작권 정책"
          status="활성"
          statusColor="emerald"
        >
          <ul className="space-y-1.5 text-[13px] text-ink-700">
            <li>• 블로그 본문 전체 저장 금지 (제목 + 요약만)</li>
            <li>• 외부 이미지 무단 다운로드 금지 (URL 링크만)</li>
            <li>• 모든 코스에 원문 출처 표시 필수</li>
            <li>• 신고 접수 시 hidden 처리</li>
          </ul>
        </SettingCard>
      </div>
    </div>
  );
}

function SettingCard({
  icon,
  title,
  status,
  statusColor,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  status: string;
  statusColor: 'emerald' | 'amber' | 'rose';
  children: React.ReactNode;
}) {
  const color =
    statusColor === 'emerald'
      ? 'bg-emerald-50 text-emerald-700'
      : statusColor === 'amber'
        ? 'bg-amber-50 text-amber-700'
        : 'bg-rose-50 text-rose-700';
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            {icon}
          </span>
          <h2 className="text-[15px] font-bold text-ink-900">{title}</h2>
        </div>
        <span className={`rounded-md px-2 py-1 text-[11.5px] font-medium ${color}`}>
          {status}
        </span>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-ink-50 px-3 py-2">
      <span className="text-ink-500">{label}</span>
      <span className="font-semibold text-ink-900">{value}</span>
    </div>
  );
}
