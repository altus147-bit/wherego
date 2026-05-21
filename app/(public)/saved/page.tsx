import AppHeader from '@/components/layout/AppHeader';
import CourseCard from '@/components/course/CourseCard';
import { courses } from '@/data/courses';

export default function SavedPage() {
  // For the MVP we just show a few approved courses as "saved".
  const saved = courses.filter((c) => c.status === 'approved').slice(0, 3);

  return (
    <div>
      <AppHeader title="저장한 코스" showBell={false} />
      <div className="space-y-3 px-4 pb-6">
        {saved.length === 0 ? (
          <p className="rounded-2xl bg-ink-50 p-8 text-center text-[13px] text-ink-500">
            아직 저장한 코스가 없어요.
          </p>
        ) : (
          saved.map((c) => <CourseCard key={c.id} course={c} />)
        )}
      </div>
    </div>
  );
}
