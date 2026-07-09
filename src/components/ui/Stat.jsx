import { COLORS } from "../../utils/globalVars.js";
export function Stat({ label, value, color }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10.5,
          color: COLORS.muted,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 15,
          color,
          marginTop: 2,
        }}
      >
        {value}
      </div>
    </div>
  );
}
