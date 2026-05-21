import { createClient } from '@supabase/supabase-js';

// Vercel/로컬 환경변수에서 읽음
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 환경변수가 설정되어 있는지 확인하는 헬퍼 (테스트 페이지에서 사용)
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

// Supabase 클라이언트 생성
// 환경변수가 없으면 더미 값으로 만들어서 빌드는 통과시킴 (런타임에 isSupabaseConfigured로 체크)
export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-key',
);
