import { ChevronLeft, Plus, Upload, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const regions = ['서울', '부산', '제주', '강릉', '전주', '인천'];
const travelTypes = ['당일치기', '1박 2일', '2박 3일 이상'];
const transports = ['도보', '대중교통', '차량', '도보 + 차량'];

export default function RegisterPage() {
  return (
    <div>
      <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-ink-100 bg-white/95 px-3 py-3 backdrop-blur">
        <Link
          href="/"
          aria-label="뒤로가기"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-900 hover:bg-ink-100"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.4} />
        </Link>
        <h1 className="flex-1 text-[16px] font-bold text-ink-900">코스 등록</h1>
      </header>

      <form className="space-y-5 px-4 py-5">
        <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-3 text-[12.5px] leading-relaxed text-brand-700">
          등록하신 코스는 관리자 검수(pending)를 거친 뒤 공개돼요. 출처가 분명한 정보를 입력해 주세요.
        </div>

        <Field label="코스 제목">
          <input className={inputCls} placeholder="예: 강릉 바다 감성 당일치기 코스" />
        </Field>

        <Field label="지역">
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button
                type="button"
                key={r}
                className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-[13px] text-ink-700"
              >
                {r}
              </button>
            ))}
          </div>
        </Field>

        <Field label="짧은 소개">
          <textarea
            rows={3}
            className={inputCls}
            placeholder="코스를 한 문단으로 소개해 주세요."
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="여행 타입">
            <select className={inputCls}>
              {travelTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="이동 방법">
            <select className={inputCls}>
              {transports.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="예상 소요 시간 (시간)">
            <input type="number" className={inputCls} placeholder="6" />
          </Field>
          <Field label="예상 예산 (1인, 만원)">
            <input type="number" className={inputCls} placeholder="5" />
          </Field>
        </div>

        <Field label="추천 인원">
          <input type="text" className={inputCls} placeholder="예: 2~4명" />
        </Field>

        <Field label="장소 (1번 → 4번 순서대로)">
          <div className="space-y-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="flex items-center gap-2 rounded-2xl border border-ink-100 bg-white px-3 py-2"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-[12px] font-bold text-white">
                  {n}
                </span>
                <input
                  className="w-full bg-transparent text-[14px] outline-none placeholder:text-ink-400"
                  placeholder={`장소 ${n} 이름`}
                />
              </div>
            ))}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-1 rounded-2xl border border-dashed border-ink-300 py-2.5 text-[13px] text-ink-500"
            >
              <Plus className="h-4 w-4" /> 장소 추가
            </button>
          </div>
        </Field>

        <Field label="사진 업로드">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-ink-300 bg-ink-50 py-6 text-[13px] text-ink-500"
          >
            <Upload className="h-4 w-4" />
            직접 촬영한 사진을 업로드해 주세요
          </button>
          <p className="mt-1 text-[11px] text-ink-400">
            외부 블로그/인스타그램 이미지는 무단으로 사용할 수 없어요.
          </p>
        </Field>

        <Field label="원문 또는 참고 링크">
          <div className="flex items-center gap-2 rounded-2xl border border-ink-100 bg-white px-3 py-2.5">
            <LinkIcon className="h-4 w-4 text-ink-400" />
            <input
              className="w-full bg-transparent text-[14px] outline-none placeholder:text-ink-400"
              placeholder="https://"
            />
          </div>
        </Field>

        <button
          type="button"
          className="w-full rounded-2xl bg-brand-500 py-3.5 text-[15px] font-bold text-white shadow-soft transition active:scale-[0.99]"
        >
          검수 요청하기
        </button>
      </form>
    </div>
  );
}

const inputCls =
  'w-full rounded-2xl border border-ink-100 bg-white px-3 py-2.5 text-[14px] outline-none placeholder:text-ink-400 focus:border-brand-300';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="px-1 text-[13px] font-semibold text-ink-700">{label}</label>
      {children}
    </div>
  );
}
