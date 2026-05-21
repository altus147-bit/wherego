import { redirect } from 'next/navigation';

// 수집 관리 페이지는 메인 대시보드와 동일한 내용을 보여줍니다.
// 사이드바 메뉴에서 클릭 시 404를 막기 위해 /admin으로 리다이렉트합니다.
export default function CollectedAdminPage() {
  redirect('/admin');
}
