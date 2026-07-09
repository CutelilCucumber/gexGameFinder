import { COLORS } from "../../utils/globalVars";

export function ScoreDial({ score }) {
  const r = 22,
    c = 2 * Math.PI * r;
  const pct = score / 100;
  const color =
    score >= 70 ? COLORS.combat : score >= 45 ? COLORS.upset : COLORS.faint;
  return (
    <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
      <svg width="56" height="56" style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke={COLORS.line}
          strokeWidth="5"
        />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={`${c * pct} ${c}`}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 600,
          fontSize: 15,
          color: COLORS.ink,
        }}
      >
        {score}
      </div>
    </div>
  );
}
