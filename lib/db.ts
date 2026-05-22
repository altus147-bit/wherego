import { supabase, isSupabaseConfigured } from './supabase';
import type { Region, Course, CoursePlace, CourseImage, CollectedSource } from './types';

// Supabase의 snake_case → 우리 코드의 camelCase 변환

function rowToRegion(row: any): Region {
  return {
    id: row.id,
    nameKo: row.name_ko,
    nameEn: row.name_en ?? '',
    province: row.province ?? '',
    description: row.description ?? '',
    thumbnailUrl: row.thumbnail_url ?? '',
    courseCount: row.course_count ?? 0,
    createdAt: row.created_at ?? '',
    updatedAt: row.created_at ?? '',
  };
}

function rowToPlace(row: any): CoursePlace {
  return {
    id: row.id,
    courseId: row.course_id,
    order: row.order,
    placeNameKo: row.place_name_ko,
    placeNameEn: row.place_name_en ?? '',
    category: row.category ?? 'etc',
    addressKo: row.address_ko ?? '',
    addressEn: row.address_en ?? '',
    lat: row.lat ?? 0,
    lng: row.lng ?? 0,
    stayMinutes: row.stay_minutes ?? 60,
    descriptionKo: row.description_ko ?? '',
    descriptionEn: row.description_en ?? '',
    externalMapUrl: row.external_map_url ?? '',
    emoji: row.emoji ?? '',
    tipKo: row.tip_ko ?? '',
    openHoursKo: row.open_hours_ko ?? '',
    phone: row.phone ?? '',
    admissionFee: row.admission_fee ?? '',
  };
}

function rowToImage(row: any): CourseImage {
  return {
    id: row.id,
    courseId: row.course_id,
    imageUrl: row.image_url,
    imageType: row.image_type ?? 'api_allowed',
    sourceUrl: row.source_url ?? '',
    sourceAuthor: row.source_author ?? '',
    licenseNote: row.license_note ?? '',
    order: row.order ?? 1,
    isCover: row.is_cover ?? false,
  };
}

function rowToCourse(row: any, places: CoursePlace[] = [], images: CourseImage[] = []): Course {
  return {
    id: row.id,
    titleKo: row.title_ko,
    titleEn: row.title_en ?? '',
    summaryKo: row.summary_ko ?? '',
    summaryEn: row.summary_en ?? '',
    regionId: row.region_id ?? '',
    regionNameKo: row.region_name_ko ?? '',
    durationMinutesMin: row.duration_minutes_min ?? 0,
    durationMinutesMax: row.duration_minutes_max ?? 0,
    estimatedBudgetMin: row.estimated_budget_min ?? 0,
    estimatedBudgetMax: row.estimated_budget_max ?? 0,
    transportType: row.transport_type ?? 'mixed',
    recommendedPeopleMin: row.recommended_people_min ?? 1,
    recommendedPeopleMax: row.recommended_people_max ?? 4,
    tags: row.tags ?? [],
    ratingAvg: row.rating_avg ?? 0,
    ratingCount: row.rating_count ?? 0,
    recommendCount: row.recommend_count ?? 0,
    saveCount: row.save_count ?? 0,
    viewCount: row.view_count ?? 0,
    score: row.score ?? 0,
    sourceType: row.source_type ?? 'curated',
    sourcePlatform: row.source_platform ?? 'naver_blog',
    sourceTitle: row.source_title ?? '',
    sourceAuthor: row.source_author ?? '',
    sourceUrl: row.source_url ?? '',
    collectedAt: row.collected_at ?? '',
    status: row.status ?? 'approved',
    createdBy: row.created_by ?? '',

    createdAt: row.created_at ?? '',
    updatedAt: row.updated_at ?? '',
    places,
    images,
    foreignerTips: undefined,
  };
}

function rowToCollected(row: any): CollectedSource {
  return {
    id: row.id,
    keyword: row.keyword ?? '',
    regionId: row.region_id ?? '',
    regionNameKo: row.region_name_ko ?? '',
    title: row.title,
    summary: row.summary ?? '',
    sourceUrl: row.source_url,
    sourceAuthor: row.source_author ?? '',
    sourcePlatform: row.source_platform ?? 'naver_blog',
    collectedAt: row.collected_at ?? '',
    status: row.status ?? 'pending',
    reviewedBy: row.reviewed_by ?? '',
    reviewedAt: row.reviewed_at ?? '',
    rejectionReason: row.rejection_reason ?? '',
  };
}

// ============================================
// 조회 함수들
// ============================================

export async function fetchAllRegions(): Promise<Region[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('regions')
    .select('*')
    .order('course_count', { ascending: false });
  if (error || !data) {
    console.error('fetchAllRegions error:', error);
    return [];
  }
  return data.map(rowToRegion);
}

export async function fetchRegion(id: string): Promise<Region | null> {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('regions')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error || !data) return null;
  return rowToRegion(data);
}

export async function fetchAllCourses(): Promise<Course[]> {
  if (!isSupabaseConfigured()) return [];
  // 1. courses
  const { data: cRows, error: cErr } = await supabase
    .from('courses')
    .select('*')
    .eq('status', 'approved')
    .order('score', { ascending: false });
  if (cErr || !cRows) {
    console.error('fetchAllCourses error:', cErr);
    return [];
  }
  // 2. all images for all courses
  const ids = cRows.map((r) => r.id);
  const { data: imgs } = await supabase
    .from('course_images')
    .select('*')
    .in('course_id', ids);
  // 3. all places for all courses
  const { data: pls } = await supabase
    .from('course_places')
    .select('*')
    .in('course_id', ids)
    .order('order', { ascending: true });

  return cRows.map((c) =>
    rowToCourse(
      c,
      (pls ?? []).filter((p) => p.course_id === c.id).map(rowToPlace),
      (imgs ?? []).filter((i) => i.course_id === c.id).map(rowToImage),
    ),
  );
}

export async function fetchCourse(id: string): Promise<Course | null> {
  if (!isSupabaseConfigured()) return null;
  const { data: c, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error || !c) return null;
  const { data: pls } = await supabase
    .from('course_places')
    .select('*')
    .eq('course_id', id)
    .order('order', { ascending: true });
  const { data: imgs } = await supabase
    .from('course_images')
    .select('*')
    .eq('course_id', id)
    .order('order', { ascending: true });
  return rowToCourse(c, (pls ?? []).map(rowToPlace), (imgs ?? []).map(rowToImage));
}

export async function fetchCoursesByRegion(regionId: string): Promise<Course[]> {
  if (!isSupabaseConfigured()) return [];
  const { data: cRows } = await supabase
    .from('courses')
    .select('*')
    .eq('region_id', regionId)
    .eq('status', 'approved')
    .order('score', { ascending: false });
  if (!cRows) return [];
  const ids = cRows.map((r) => r.id);
  const { data: imgs } = await supabase
    .from('course_images')
    .select('*')
    .in('course_id', ids);
  return cRows.map((c) =>
    rowToCourse(
      c,
      [],
      (imgs ?? []).filter((i) => i.course_id === c.id).map(rowToImage),
    ),
  );
}

export async function fetchTopCourses(limit: number = 5): Promise<Course[]> {
  if (!isSupabaseConfigured()) return [];
  const { data: cRows } = await supabase
    .from('courses')
    .select('*')
    .eq('status', 'approved')
    .order('score', { ascending: false })
    .limit(limit);
  if (!cRows) return [];
  const ids = cRows.map((r) => r.id);
  const { data: imgs } = await supabase
    .from('course_images')
    .select('*')
    .in('course_id', ids);
  return cRows.map((c) =>
    rowToCourse(
      c,
      [],
      (imgs ?? []).filter((i) => i.course_id === c.id).map(rowToImage),
    ),
  );
}

export async function fetchCollectedSources(): Promise<CollectedSource[]> {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase
    .from('collected_sources')
    .select('*')
    .order('collected_at', { ascending: false });
  return (data ?? []).map(rowToCollected);
}

export async function fetchCollectedStats() {
  if (!isSupabaseConfigured()) return { total: 0, pending: 0, approved: 0, rejected: 0 };
  const { count: total } = await supabase
    .from('collected_sources')
    .select('*', { count: 'exact', head: true });
  const { count: pending } = await supabase
    .from('collected_sources')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');
  const { count: approved } = await supabase
    .from('collected_sources')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved');
  const { count: rejected } = await supabase
    .from('collected_sources')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'rejected');
  return {
    total: total ?? 0,
    pending: pending ?? 0,
    approved: approved ?? 0,
    rejected: rejected ?? 0,
  };
}
