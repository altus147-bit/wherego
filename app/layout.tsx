import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '어디갈까? · 전국 여행 코스 큐레이션',
  description:
    '허용된 API와 큐레이션 기반의 지역별 여행 코스 매거진. 출처가 분명한 한국 로컬 코스를 만나보세요.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
