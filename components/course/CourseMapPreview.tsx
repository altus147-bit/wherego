import type { CoursePlace } from '@/lib/types';

// Lightweight, dependency-free map preview.
// Once the real map API is wired up, swap this for the actual provider
// while keeping the same props (CoursePlace[]).
export default function CourseMapPreview({ places }: { places: CoursePlace[] }) {
  const pts = places.map((p) => ({ x: p.lng, y: p.lat, order: p.order, name: p.placeNameKo }));

  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  // Pad the bounding box so markers don't sit on the edges.
  const padX = Math.max((maxX - minX) * 0.2, 0.003);
  const padY = Math.max((maxY - minY) * 0.2, 0.003);

  const W = 600;
  const H = 280;

  const toPx = (lng: number, lat: number) => {
    const x = ((lng - (minX - padX)) / (maxX - minX + 2 * padX)) * W;
    // Invert y because SVG y grows downward but latitude grows northward.
    const y = H - ((lat - (minY - padY)) / (maxY - minY + 2 * padY)) * H;
    return { x, y };
  };

  const projected = pts.map((p) => ({ ...p, ...toPx(p.x, p.y) }));
  const path = projected.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink-100 bg-[#eef3fb]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-[200px] w-full"
        role="img"
        aria-label="코스 동선 미리보기"
      >
        {/* faux street grid */}
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#dde6f3" strokeWidth="1" />
          </pattern>
          <pattern id="grid2" width="160" height="160" patternUnits="userSpaceOnUse">
            <path d="M 160 0 L 0 0 0 160" fill="none" stroke="#cdd9ea" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />
        <rect width={W} height={H} fill="url(#grid2)" />
        {/* a couple of "roads" for texture */}
        <path d={`M0 ${H * 0.62} Q ${W * 0.5} ${H * 0.45} ${W} ${H * 0.7}`} stroke="#c4d3e6" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d={`M${W * 0.2} 0 L ${W * 0.35} ${H}`} stroke="#d1deec" strokeWidth="3" fill="none" />

        {/* route line */}
        <path
          d={path}
          stroke="#6c75ff"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 8"
        />

        {/* markers */}
        {projected.map((p) => (
          <g key={p.order}>
            <circle cx={p.x} cy={p.y} r={16} fill="#6c75ff" stroke="white" strokeWidth="3" />
            <text
              x={p.x}
              y={p.y + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="white"
            >
              {p.order}
            </text>
            <text
              x={p.x}
              y={p.y + 32}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="#3a3f55"
            >
              {p.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
