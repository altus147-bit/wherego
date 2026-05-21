import { Users } from 'lucide-react';

const mockUsers = [
  { id: 'u-001', name: '여행하는 리아', email: 'lia@example.com', role: '에디터', joinedAt: '2024.03.15', courseCount: 12 },
  { id: 'u-002', name: '강릉 김작가', email: 'kim@example.com', role: '에디터', joinedAt: '2024.04.02', courseCount: 8 },
  { id: 'u-003', name: '제주살이', email: 'jeju@example.com', role: '일반', joinedAt: '2024.05.10', courseCount: 2 },
  { id: 'u-004', name: 'admin', email: 'admin@wherego.kr', role: '관리자', joinedAt: '2024.01.01', courseCount: 0 },
];

export default function UsersAdminPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-[22px] font-bold text-ink-900">사용자 관리</h1>
        <p className="mt-1 text-[13px] text-ink-500">
          가입자, 에디터, 관리자를 한눈에 봅니다. 권한 변경은 Supabase Auth 연동 후 가능합니다.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        <table className="w-full text-left">
          <thead className="bg-ink-50 text-[12px] text-ink-500">
            <tr>
              <th className="px-4 py-3 font-medium">이름</th>
              <th className="px-4 py-3 font-medium">이메일</th>
              <th className="px-4 py-3 font-medium">권한</th>
              <th className="px-4 py-3 font-medium">가입일</th>
              <th className="px-4 py-3 font-medium">등록 코스</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-ink-800">
            {mockUsers.map((u) => (
              <tr key={u.id} className="border-t border-ink-100">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Users className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <span className="font-semibold">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-500">{u.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-[11.5px] font-medium ${
                      u.role === '관리자'
                        ? 'bg-rose-50 text-rose-700'
                        : u.role === '에디터'
                          ? 'bg-brand-50 text-brand-700'
                          : 'bg-ink-100 text-ink-700'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-500">{u.joinedAt}</td>
                <td className="px-4 py-3">{u.courseCount}개</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[11.5px] text-ink-400">
        Mock 데이터입니다. Supabase Auth 연동 후 실제 사용자 정보가 표시됩니다.
      </p>
    </div>
  );
}
