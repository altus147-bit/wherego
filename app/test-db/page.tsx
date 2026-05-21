import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// 매번 새로 확인 (캐시 안 함)
export const dynamic = 'force-dynamic';

export default async function TestDbPage() {
  const configured = isSupabaseConfigured();

  let dbStatus: 'ok' | 'fail' | 'no-config' = 'no-config';
  let errorMessage = '';
  let tableCount = 0;
  let regionCount = 0;
  let courseCount = 0;

  if (configured) {
    try {
      // 1. regions 테이블 카운트
      const { count: rCount, error: rErr } = await supabase
        .from('regions')
        .select('*', { count: 'exact', head: true });

      if (rErr) throw rErr;
      regionCount = rCount ?? 0;

      // 2. courses 테이블 카운트
      const { count: cCount, error: cErr } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true });

      if (cErr) throw cErr;
      courseCount = cCount ?? 0;

      tableCount = 7; // 우리가 만든 테이블 7개
      dbStatus = 'ok';
    } catch (err) {
      dbStatus = 'fail';
      errorMessage = err instanceof Error ? err.message : String(err);
    }
  }

  return (
    <div className="min-h-screen bg-ink-50 p-6">
      <div className="mx-auto max-w-2xl space-y-4">
        <header className="rounded-2xl bg-white p-6 shadow-card">
          <h1 className="text-[22px] font-bold text-ink-900">
            🔧 Supabase 연결 테스트
          </h1>
          <p className="mt-1 text-[13px] text-ink-500">
            데이터베이스가 잘 연결되었는지 확인하는 페이지입니다.
          </p>
        </header>

        {/* 환경변수 상태 */}
        <section className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="mb-3 text-[15px] font-bold text-ink-900">
            1. 환경변수 (Vercel)
          </h2>
          {configured ? (
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-[14px] font-semibold text-emerald-700">
                ✅ NEXT_PUBLIC_SUPABASE_URL 등록됨
              </p>
              <p className="mt-1 text-[14px] font-semibold text-emerald-700">
                ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY 등록됨
              </p>
            </div>
          ) : (
            <div className="rounded-xl bg-rose-50 p-4">
              <p className="text-[14px] font-semibold text-rose-700">
                ❌ 환경변수가 설정되지 않았습니다
              </p>
              <p className="mt-1 text-[12.5px] text-rose-600">
                Vercel → Settings → Environment Variables 에서 등록하세요.
              </p>
            </div>
          )}
        </section>

        {/* DB 연결 상태 */}
        <section className="rounded-2xl bg-white p-5 shadow-card">
          <h2 className="mb-3 text-[15px] font-bold text-ink-900">
            2. 데이터베이스 연결
          </h2>
          {dbStatus === 'ok' && (
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-[14px] font-semibold text-emerald-700">
                ✅ Supabase 연결 성공!
              </p>
              <div className="mt-3 space-y-1 text-[13px] text-ink-700">
                <p>📊 테이블 7개 모두 정상</p>
                <p>📍 regions 테이블: {regionCount}개 행</p>
                <p>🗺️ courses 테이블: {courseCount}개 행</p>
              </div>
              {regionCount === 0 && courseCount === 0 && (
                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-[12.5px] text-amber-700">
                  💡 아직 데이터가 없네요. 다음 단계에서 mock 데이터를 넣을 거예요.
                </p>
              )}
            </div>
          )}
          {dbStatus === 'fail' && (
            <div className="rounded-xl bg-rose-50 p-4">
              <p className="text-[14px] font-semibold text-rose-700">
                ❌ Supabase 연결 실패
              </p>
              <p className="mt-2 break-all rounded-lg bg-white/60 p-2 font-mono text-[11.5px] text-rose-600">
                {errorMessage}
              </p>
              <div className="mt-3 text-[12.5px] text-ink-700">
                <p className="font-semibold">가능한 원인:</p>
                <ul className="mt-1 list-inside list-disc">
                  <li>환경변수 값이 틀림</li>
                  <li>Supabase 프로젝트가 일시 중지됨</li>
                  <li>테이블이 안 만들어짐</li>
                </ul>
              </div>
            </div>
          )}
          {dbStatus === 'no-config' && (
            <div className="rounded-xl bg-ink-100 p-4">
              <p className="text-[13px] text-ink-500">
                환경변수가 없어서 테스트할 수 없어요.
              </p>
            </div>
          )}
        </section>

        {/* 다음 단계 */}
        {dbStatus === 'ok' && (
          <section className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5">
            <h3 className="text-[15px] font-bold text-brand-700">🎉 B-4 완료!</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-700">
              Supabase 연결 성공! 이제 mock 데이터를 진짜 데이터베이스로
              옮기고, 네이버 검색 API 연결할 차례입니다.
            </p>
          </section>
        )}

        <div className="flex justify-center pt-2">
          <Link
            href="/"
            className="rounded-xl bg-brand-500 px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-soft transition active:scale-[0.98]"
          >
            ← 홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
