import type { TransportType } from '@/lib/types';

export function formatBudgetRange(min: number, max: number): string {
  // Display as 만원 units (e.g. 5~7만 원)
  const minMan = Math.round(min / 10000);
  const maxMan = Math.round(max / 10000);
  if (minMan === maxMan) return `1인 ${minMan}만 원`;
  return `1인 ${minMan}~${maxMan}만 원`;
}

export function formatDurationRange(minMin: number, maxMin: number): string {
  // Convert minutes → hours, e.g. 6~8시간
  const minH = Math.round(minMin / 60);
  const maxH = Math.round(maxMin / 60);
  if (minH === maxH) return `${minH}시간`;
  return `${minH}~${maxH}시간`;
}

export function formatPeopleRange(min: number, max: number): string {
  if (min === max) return `${min}명`;
  return `${min}~${max}명`;
}

export function transportLabel(t: TransportType): string {
  switch (t) {
    case 'walk':
      return '도보';
    case 'public_transport':
      return '대중교통';
    case 'car':
      return '차량';
    case 'mixed':
      return '도보 + 차량';
  }
}

export function statusLabel(s: string): string {
  switch (s) {
    case 'pending':
      return '검수대기';
    case 'approved':
      return '승인';
    case 'rejected':
      return '반려';
    case 'hidden':
      return '숨김';
    case 'draft':
      return '임시저장';
    default:
      return s;
  }
}

export function platformLabel(p: string): string {
  switch (p) {
    case 'naver_blog':
      return '네이버 블로그';
    case 'tistory_blog':
      return '티스토리 블로그';
    case 'google_places':
      return 'Google Places';
    case 'public_api':
      return '공공데이터';
    case 'partner':
      return '파트너';
    case 'manual':
      return '직접 등록';
    default:
      return p;
  }
}

export function formatDateKo(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}
