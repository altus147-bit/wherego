// Domain types — mirror the Supabase/Postgres schema described in the spec.
// Using string literal unions keeps TypeScript honest about allowed values.

export type TransportType = 'walk' | 'public_transport' | 'car' | 'mixed';
export type SourceType = 'user' | 'api' | 'curated' | 'partner';
export type SourcePlatform =
  | 'naver_blog'
  | 'google_places'
  | 'public_api'
  | 'manual'
  | 'partner'
  | 'tistory_blog';
export type CourseStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'hidden';

export type PlaceCategory =
  | 'beach'
  | 'cafe'
  | 'restaurant'
  | 'market'
  | 'park'
  | 'museum'
  | 'activity'
  | 'photo_spot'
  | 'etc';

export type ImageType = 'uploaded' | 'api_allowed' | 'partner' | 'public_data';

export type ActionType = 'save' | 'recommend' | 'view' | 'report';

export type ReportReason =
  | 'copyright'
  | 'wrong_info'
  | 'closed_place'
  | 'inappropriate'
  | 'spam'
  | 'other';
export type ReportStatus = 'pending' | 'resolved' | 'dismissed';

export interface Region {
  id: string;
  nameKo: string;
  nameEn: string;
  province: string;
  description: string;
  thumbnailUrl: string;
  courseCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CoursePlace {
  id: string;
  courseId: string;
  order: number;
  placeNameKo: string;
  placeNameEn: string;
  category: PlaceCategory;
  addressKo: string;
  addressEn: string;
  lat: number;
  lng: number;
  stayMinutes: number;
  descriptionKo: string;
  descriptionEn: string;
  externalMapUrl: string;
  emoji?: string; // small visual helper used in the timeline rows
  tipKo?: string; // editor's tip shown in chapter page (magazine style)
  tipEn?: string;
  openHoursKo?: string; // 영업시간 / 운영시간
  phone?: string;
  admissionFee?: string; // 입장료
}

export interface CourseImage {
  id: string;
  courseId: string;
  imageUrl: string;
  imageType: ImageType;
  sourceUrl: string;
  sourceAuthor: string;
  licenseNote: string;
  order: number;
  isCover: boolean;
}

export interface ForeignerTips {
  titleEn?: string;
  summaryEn?: string;
  transportTipEn?: string;
  paymentTipEn?: string;
  reservationTipEn?: string;
  languageSupport?: 'none' | 'basic' | 'english_available';
  googleMapsUrl?: string;
}

export interface Course {
  id: string;
  titleKo: string;
  titleEn?: string;
  summaryKo: string;
  summaryEn?: string;
  regionId: string;
  regionNameKo: string; // denormalized for fast list rendering
  durationMinutesMin: number;
  durationMinutesMax: number;
  estimatedBudgetMin: number;
  estimatedBudgetMax: number;
  transportType: TransportType;
  recommendedPeopleMin: number;
  recommendedPeopleMax: number;
  tags: string[];
  ratingAvg: number;
  ratingCount: number;
  recommendCount: number;
  saveCount: number;
  viewCount: number;
  score: number;
  sourceType: SourceType;
  sourcePlatform: SourcePlatform;
  sourceTitle: string;
  sourceAuthor: string;
  sourceUrl: string;
  collectedAt: string;
  status: CourseStatus;
  createdBy: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
  places: CoursePlace[];
  images: CourseImage[];
  foreignerTips?: ForeignerTips;
}

export interface CollectedSource {
  id: string;
  keyword: string;
  regionId: string;
  regionNameKo: string;
  title: string;
  summary: string;
  sourceUrl: string;
  sourceAuthor: string;
  sourcePlatform: SourcePlatform;
  collectedAt: string;
  status: CourseStatus;
  adminMemo?: string;
  rejectionReason?: string;
}

// Helper used by ranking logic — keeps the scoring formula in one place.
export function computeCourseScore(c: Pick<
  Course,
  'recommendCount' | 'saveCount' | 'ratingAvg' | 'viewCount' | 'createdAt'
> & { adminScore?: number }): number {
  // Normalize to roughly 0–10 ranges so the weights actually mean something.
  const recScore = Math.min(c.recommendCount / 30, 10);
  const saveScore = Math.min(c.saveCount / 30, 10);
  const ratingScore = c.ratingAvg * 2; // 5-star → 0-10
  const viewScore = Math.min(c.viewCount / 200, 10);

  const ageDays = (Date.now() - new Date(c.createdAt).getTime()) / 86_400_000;
  const recencyScore = Math.max(0, 10 - ageDays / 18); // ~6 months to decay

  const adminScore = c.adminScore ?? 8;

  return (
    recScore * 0.25 +
    saveScore * 0.25 +
    ratingScore * 0.2 +
    viewScore * 0.1 +
    recencyScore * 0.1 +
    adminScore * 0.1
  );
}
