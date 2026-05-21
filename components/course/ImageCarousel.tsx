'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';
import type { CourseImage } from '@/lib/types';
import SafeImage from '@/components/ui/SafeImage';

export default function ImageCarousel({
  images,
  alt,
  backHref = '/',
}: {
  images: CourseImage[];
  alt: string;
  backHref?: string;
}) {
  const [i, setI] = useState(0);
  const total = images.length;
  const prev = useCallback(() => setI((x) => (x - 1 + total) % total), [total]);
  const next = useCallback(() => setI((x) => (x + 1) % total), [total]);
  const current = images[i];

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
      {current && (
        <SafeImage
          key={current.id}
          src={current.imageUrl}
          alt={alt}
          seed={current.id}
          className="absolute inset-0 h-full w-full object-cover"
          width={800}
          height={600}
        />
      )}

      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3">
        <Link
          href={backHref}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink-900 shadow-soft backdrop-blur"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.4} />
        </Link>
        <div className="flex items-center gap-2">
          <button
            aria-label="저장"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink-900 shadow-soft backdrop-blur"
          >
            <Heart className="h-5 w-5" strokeWidth={2.2} />
          </button>
          <button
            aria-label="공유"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink-900 shadow-soft backdrop-blur"
          >
            <Share2 className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="이전 사진"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink-900 shadow-soft backdrop-blur"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.4} />
          </button>
          <button
            onClick={next}
            aria-label="다음 사진"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink-900 shadow-soft backdrop-blur"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={2.4} />
          </button>
        </>
      )}

      <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-ink-900/70 px-3 py-1 text-[12px] font-medium text-white backdrop-blur">
        {i + 1} / {total}
      </div>
    </div>
  );
}
