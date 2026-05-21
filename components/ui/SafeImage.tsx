'use client';

// 이미지 로딩 실패 시 picsum.photos로 자동 fallback.
// seed를 주면 같은 seed는 항상 같은 사진이 나옵니다.
export default function SafeImage({
  src,
  alt,
  seed,
  className,
  width = 800,
  height = 600,
}: {
  src: string;
  alt: string;
  seed: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const fallback = `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(e) => {
        const target = e.currentTarget;
        if (target.src !== fallback) {
          target.src = fallback;
        }
      }}
    />
  );
}
