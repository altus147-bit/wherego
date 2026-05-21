import type { Region } from '@/lib/types';

export const regions: Region[] = [
  {
    id: 'rg-seoul',
    nameKo: '서울특별시',
    nameEn: 'Seoul',
    province: '서울',
    description: '대한민국 수도, 트렌드와 전통이 공존하는 도시',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1538485399081-7c8970d22ec1?auto=format&fit=crop&w=900&q=80',
    courseCount: 125,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-05-21T00:00:00Z',
  },
  {
    id: 'rg-busan',
    nameKo: '부산광역시',
    nameEn: 'Busan',
    province: '부산',
    description: '바다 도시, 광안리와 해운대의 야경',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1597211684565-dca64d72bdfe?auto=format&fit=crop&w=900&q=80',
    courseCount: 98,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-05-21T00:00:00Z',
  },
  {
    id: 'rg-jeju',
    nameKo: '제주특별자치도',
    nameEn: 'Jeju',
    province: '제주',
    description: '한라산, 오름, 그리고 푸른 제주 바다',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1601723897292-aa50e89aff8e?auto=format&fit=crop&w=900&q=80',
    courseCount: 151,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-05-21T00:00:00Z',
  },
  {
    id: 'rg-gangneung',
    nameKo: '강원도 강릉시',
    nameEn: 'Gangneung',
    province: '강원',
    description: '동해 바다와 감성 카페가 가득한 도시',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&w=900&q=80',
    courseCount: 72,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-05-21T00:00:00Z',
  },
  {
    id: 'rg-jeonju',
    nameKo: '전라북도 전주시',
    nameEn: 'Jeonju',
    province: '전라',
    description: '한옥마을과 비빔밥의 미식 도시',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80',
    courseCount: 64,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-05-21T00:00:00Z',
  },
  {
    id: 'rg-incheon',
    nameKo: '인천광역시',
    nameEn: 'Incheon',
    province: '인천',
    description: '차이나타운과 송도의 도시 풍경',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1601273860842-fb50f2b8e1cd?auto=format&fit=crop&w=900&q=80',
    courseCount: 41,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-05-21T00:00:00Z',
  },
];

export function findRegion(id: string): Region | undefined {
  return regions.find((r) => r.id === id);
}
