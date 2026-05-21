import BottomNav from '@/components/layout/BottomNav';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-frame flex min-h-screen flex-col">
      <main className="flex-1 pb-2">{children}</main>
      <BottomNav />
    </div>
  );
}
