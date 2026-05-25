# 어디갈까? (Wherego) — MVP

전국 여행 코스 큐레이션 매거진 웹앱의 MVP입니다.
Next.js 14 (App Router) + TypeScript + Tailwind CSS 기반으로 작성되었으며, 첨부 디자인 시안에 맞춰 모바일 우선 매거진형 UI를 구현했습니다.

> **MVP 단계**: 외부 API 없이 mock data 만으로 홈 / 지역 / 코스 목록 / 코스 상세 / 등록 / 저장 / 내 정보 / 관리자 검수 화면이 모두 동작합니다. 추후 Supabase, Google/Kakao Maps, 네이버 블로그 검색 API 등을 붙일 수 있는 구조로 설계되어 있습니다.

---

## 1. 실행 방법

```bash
npm install
npm run dev
```

- 공용 화면: <http://localhost:3000>
- 관리자 검수 화면: <http://localhost:3000/admin>
- 코스 상세 예시: <http://localhost:3000/courses/cs-gn-001> (강릉 바다 감성 당일치기 코스 — 시안 1번 이미지 그대로 구현)

데스크톱에서 보면 모바일 프레임(440px)이 가운데 카드로 표시되고, 모바일 뷰포트에서는 전체 화면을 차지합니다.

---

## 2. 디렉터리 구조

```
wherego/
├── app/
│   ├── (public)/               # 사용자 화면 (모바일 프레임 + 하단탭바)
│   │   ├── page.tsx            # 홈
│   │   ├── region/             # 지역 목록 / 지역 상세
│   │   ├── courses/            # 코스 목록 / 코스 상세
│   │   ├── register/           # 사용자 코스 등록
│   │   ├── saved/              # 저장한 코스
│   │   └── profile/            # 내 정보
│   ├── admin/                  # 관리자 (데스크톱 사이드바 레이아웃)
│   │   ├── layout.tsx
│   │   └── page.tsx            # 수집 콘텐츠 관리 대시보드
│   └── api/                    # API 라우트 (mock)
│       ├── courses/
│       │   ├── route.ts                       # GET /api/courses
│       │   └── [id]/
│       │       ├── route.ts                   # GET /api/courses/:id
│       │       ├── recommend/route.ts         # POST 추천
│       │       ├── save/route.ts              # POST 저장
│       │       └── report/route.ts            # POST 신고
│       ├── regions/
│       │   ├── route.ts                       # GET /api/regions
│       │   └── [id]/courses/route.ts          # GET /api/regions/:id/courses
│       ├── admin/
│       │   ├── collected-sources/             # 수집 콘텐츠 GET / 승인 / 반려
│       │   └── courses/                       # 코스 GET / 승인 / 반려
│       └── collect/                           # 외부 API 수집기 (mock)
│           ├── _lib.ts                        # 공통 ingest 정책 (rate limit / dedupe / pending)
│           ├── naver-blog/route.ts
│           ├── public-data/route.ts
│           └── google-places/route.ts
├── components/
│   ├── layout/                 # AppHeader, BottomNav
│   ├── course/                 # CourseCard, ImageCarousel, CourseTimeline,
│   │                           # CourseMapPreview (순수 SVG), SourceInfoCard 등
│   └── ui/                     # Chip, SectionHeader
├── data/
│   ├── regions.ts              # 6개 지역 mock
│   ├── courses.ts              # 8개 코스 mock (강릉 시안 코스 포함)
│   └── collected.ts            # 수집 콘텐츠 mock (검수대기/승인/반려 섞여있음)
├── lib/
│   ├── types.ts                # 전체 도메인 타입 + 종합 점수 계산 함수
│   ├── format.ts               # 예산/시간/플랫폼 라벨 포맷터
│   ├── supabase.ts             # Supabase 클라이언트 + isSupabaseConfigured()
│   └── db.ts                   # Supabase row(snake_case) → 도메인 타입(camelCase) 변환
├── tailwind.config.js          # brand 컬러 팔레트, Pretendard 폰트
└── ...
```

---

## 3. 디자인 매핑 (시안 → 코드)

| 시안 화면 | 구현 위치 |
|---|---|
| 시안1: 강릉 코스 상세 (히어로 이미지 + 카드 슬라이드업 + 타임라인 + 지도 + 출처) | `app/(public)/courses/[id]/page.tsx` + `cs-gn-001` 데이터 |
| 시안2: 홈 (인기 코스 TOP 5 + 지역 칩 + 테마 그리드) | `app/(public)/page.tsx` |
| 시안2: 지역 목록 (검색 + 도/광역시 칩 + 2열 그리드) | `app/(public)/region/page.tsx` |
| 시안2: 코스 목록 (정렬 칩 + 필터 + 카드 리스트) | `app/(public)/courses/page.tsx` |
| 시안2: 코스 상세 / 출처 정보 | `courses/[id]` + `SourceInfoCard` |
| 시안2: 관리자 모드 (256/128/98/30 KPI + 표) | `app/admin/page.tsx` |
| 하단 탭바 (홈/지역/등록(센터 플로팅)/저장/내정보) | `components/layout/BottomNav.tsx` |

**컬러 팔레트**: `brand-500 = #6c75ff` (시안의 퍼플) + 화이트 배경 + `ink` 그레이스케일.
**폰트**: Pretendard (jsDelivr CDN으로 로드).
**지도**: 외부 API 미연결 상태이므로 `CourseMapPreview.tsx`에서 순수 SVG 격자 + 점선 동선 + 번호 마커로 시안의 지도 미리보기를 재현했습니다. 추후 Google/Kakao Maps로 바꿔도 컴포넌트 props는 그대로 유지됩니다.

---

## 4. 정책이 코드에 반영된 지점

스펙에 명시한 큐레이션 원칙들은 다음 위치에서 강제됩니다.

| 정책 | 반영 위치 |
|---|---|
| 모든 수집 데이터는 `pending` 상태로 저장 | `app/api/collect/_lib.ts` — `ingest()` 함수가 무조건 `status: 'pending'` 으로만 저장 |
| 하루 API 수집량 제한 | `DAILY_COLLECT_LIMIT` 맵 (`naver_blog: 200`, `google_places: 200`, …) — 초과 시 `rate_limited` 반환 |
| 같은 URL 중복 저장 금지 | `dedupeUrls` Set — 이미 있는 sourceUrl 이면 `duplicate` 반환 |
| 본문 전체 저장 금지 | `ingest()` 주석에 명시 + mock 데이터는 짧은 summary 만 보관. 실제 구현 시에도 `summary` 컬럼만 사용 |
| 외부 이미지 무단 저장 금지 | 등록 폼(`register/page.tsx`)에 안내 문구. mock 이미지는 모두 Unsplash (사용 가능 라이선스). 실제 구현 시 `course_images.imageType` 으로 출처 구분 |
| sourceUrl / sourceAuthor / sourcePlatform / collectedAt 항상 저장 | `lib/types.ts`의 `CollectedSource`, `Course` 타입에 필수 필드로 정의 |
| 코스 상세에 원문 출처 + 원문 이동 버튼 노출 | `courses/[id]/page.tsx` 의 "원문 출처 보기" 버튼 + "원문 블로그로 이동" 링크 + `SourceInfoCard` |
| 신고 → hidden 처리 가능 | `CourseStatus` 에 `hidden` 포함, `/api/courses/:id/report` 로 신고 접수 |
| 관리자 승인 전 사용자 노출 금지 | 공용 코스 화면은 `status === 'approved'` 만 표시 (`data/courses.ts` mock 데이터 전부 approved). pending 코스는 `/api/admin/courses?status=pending` 에서만 조회 |

---

## 5. 종합 점수 (랭킹 공식)

스펙대로 다음 가중치로 계산합니다 (`lib/types.ts` → `computeCourseScore`):

```
score =
  추천수    × 0.25 (정규화)
+ 저장수    × 0.25
+ 별점평균  × 0.20
+ 조회수    × 0.10
+ 최신성    × 0.10
+ 관리자점수 × 0.10
```

코스 목록의 "추천순" 정렬과 홈 "인기 코스 TOP 5" 가 이 점수를 사용합니다.

---

## 6. API 라우트 한눈에 보기

공용:
- `GET  /api/courses?regionId=&sort=score|recent|rating|saves|views&limit=`
- `GET  /api/courses/:id`
- `POST /api/courses/:id/recommend`
- `POST /api/courses/:id/save`
- `POST /api/courses/:id/report` (body: `{ reason, description }`)
- `GET  /api/regions`
- `GET  /api/regions/:id/courses`

관리자:
- `GET  /api/admin/collected-sources?status=pending`
- `POST /api/admin/collected-sources/:id/approve`
- `POST /api/admin/collected-sources/:id/reject` (body: `{ reason }`)
- `GET  /api/admin/courses?status=`
- `POST /api/admin/courses/:id/approve`
- `POST /api/admin/courses/:id/reject` (body: `{ reason }`)

수집기 (mock):
- `POST /api/collect/naver-blog` (body: `{ keyword, regionId? }`)
- `POST /api/collect/public-data`
- `POST /api/collect/google-places`

모든 수집기는 공통 `ingest()` 를 거치므로 자동으로 rate-limit + dedupe + pending 저장이 적용됩니다.

---

## 7. 다음 단계 로드맵

### P1 — 백엔드 연결
1. `npm i @supabase/supabase-js` 후 `lib/supabase.ts` 추가
2. 스펙의 7개 테이블 (regions, courses, course_places, course_images, collected_sources, user_course_actions, reports) 을 Supabase 에 마이그레이션
3. `data/*.ts` 의 mock 함수들을 Supabase 쿼리로 교체 (인터페이스는 그대로)
4. Supabase Auth 도입 후 `/api/courses/:id/recommend|save|report` 에 세션 검증 추가
5. `/api/collect/*` 의 mock 부분을 실제 네이버 검색 API / TourAPI / Google Places 호출로 교체. 본문은 절대 저장하지 말고 title + 짧은 summary + 메타데이터만.

### P1 — UI 보강
- 로그인 화면 + Supabase Auth 연동
- 사용자 등록 코스 → `/api/admin/courses` 로 흘러가 검수 받기
- 신고 모달 + 관리자 신고 관리 화면

### P2 — 지도 / 외국인 모드
- `CourseMapPreview.tsx` 를 Google Maps JS 또는 Kakao Map SDK 로 교체 (props 시그니처 동일)
- `course.foreignerTips` 필드 (`titleEn`, `summaryEn`, `transportTipEn`, `paymentTipEn`, …) 가 이미 타입에 정의되어 있음 → `/en` 라우트 추가

### P2 — 비즈니스
- 예약/쿠폰 제휴, 지역 에디터, AI 맞춤 코스 추천, 여행 일정표 자동 생성

---

## 8. 안 한 것 / 의도적으로 제외한 것

- **로그인**: MVP 라 모든 액션이 mock 응답. 추천/저장 버튼은 누르면 토스트만 띄우는 정도로 확장 가능.
- **실제 외부 API 호출**: 절대 호출하지 않음. `/api/collect/*` 는 가짜 결과를 반환합니다.
- **이미지 업로드 저장소**: `/register` 폼의 dropzone 은 UI 만 있습니다. 실제로는 Supabase Storage 가 들어갈 자리.
- **외국인 모드 라우트**: 타입과 데이터 필드는 준비되어 있지만 `/en` 라우트는 P2 로 미룸.

---

문의/수정 필요 시 `app/(public)/courses/[id]/page.tsx` 가 가장 중요한 화면이니 거기서부터 보시면 됩니다.
