export default function Sparkline({ series, winnerAllyId }) {
  if (!series || series.length < 2) return null;
  const w = 240, h = 46;
  const pts = series.map((p, i) => {
    const x = (i / (series.length - 1)) * w;
    const y = h - p.winShare * h;
    return [x, y];
  });
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="spark">
      <line x1="0" y1={h / 2} x2={w} y2={h / 2} stroke="var(--grid)" strokeDasharray="2,3" strokeWidth="1" />
      <path d={path} fill="none" stroke="var(--cyan)" strokeWidth="1.75" />
    </svg>
  );
}