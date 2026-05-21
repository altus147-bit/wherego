import type { CollectedSource, SourcePlatform } from '@/lib/types';

// Per-platform daily rate limits. Real values should be tuned to each
// provider's terms of service. Centralized so all collectors share the cap.
export const DAILY_COLLECT_LIMIT: Record<SourcePlatform, number> = {
  naver_blog: 200,
  google_places: 200,
  public_api: 500,
  tistory_blog: 100,
  partner: 1000,
  manual: 9999,
};

// In-memory store used by mock collectors. Replace with Supabase insert.
const dedupeUrls = new Set<string>();
const todayCount: Record<string, number> = {};

function todayKey(platform: SourcePlatform): string {
  const d = new Date();
  return `${platform}:${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
}

export interface CollectResult {
  ok: boolean;
  reason?: 'rate_limited' | 'duplicate' | 'invalid';
  item?: CollectedSource;
}

// Single entry point all collectors go through.
// - enforces per-platform daily limits,
// - dedupes by source URL,
// - always saves with status: 'pending' (never approved on collection).
// In the real implementation, blog/article body text is NEVER persisted —
// only title, short summary, source metadata.
export function ingest(
  candidate: Omit<CollectedSource, 'id' | 'collectedAt' | 'status'>
): CollectResult {
  const key = todayKey(candidate.sourcePlatform);
  const count = todayCount[key] ?? 0;
  if (count >= DAILY_COLLECT_LIMIT[candidate.sourcePlatform]) {
    return { ok: false, reason: 'rate_limited' };
  }

  if (dedupeUrls.has(candidate.sourceUrl)) {
    return { ok: false, reason: 'duplicate' };
  }

  if (!candidate.sourceUrl || !candidate.title) {
    return { ok: false, reason: 'invalid' };
  }

  dedupeUrls.add(candidate.sourceUrl);
  todayCount[key] = count + 1;

  const item: CollectedSource = {
    ...candidate,
    id: `cl-${Math.random().toString(36).slice(2, 10)}`,
    collectedAt: new Date().toISOString(),
    status: 'pending', // ALWAYS pending. Admin must approve before public exposure.
  };
  return { ok: true, item };
}
