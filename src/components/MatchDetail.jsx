import { COLORS } from "../utils/globalVars.js";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceDot,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ExternalLink } from "lucide-react";
import { Stat } from "./index";

export function MatchDetail({ match, analysis }) {
  const data = match.series;
  const dot =
    analysis.maxJumpAt != null
      ? data.find((p) => p.t === analysis.maxJumpAt)
      : null;
  return (
    <div
      style={{
        padding: "16px 20px 20px",
        borderTop: `1px solid ${COLORS.line}`,
        background: COLORS.panel2,
      }}
    >
      <div style={{ height: 190 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={`grad-${match.id}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={COLORS.eco} stopOpacity={0.35} />
                <stop offset="100%" stopColor={COLORS.eco} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="t"
              tick={{
                fill: COLORS.muted,
                fontSize: 10,
                fontFamily: "JetBrains Mono",
              }}
              axisLine={{ stroke: COLORS.line }}
              tickLine={false}
              unit="m"
            />
            <YAxis domain={[0, 1]} hide />
            <ReferenceLine y={0.5} stroke={COLORS.line} strokeDasharray="2 3" />
            <Tooltip
              contentStyle={{
                background: COLORS.panel,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: COLORS.muted }}
              formatter={(v, name) => [
                name === "leadPct"
                  ? `${Math.round(v * 100)}% ${match.teamA.name}`
                  : v,
                "",
              ]}
              labelFormatter={(t) => `minute ${t}`}
            />
            <Area
              type="monotone"
              dataKey="leadPct"
              stroke={COLORS.eco}
              strokeWidth={2}
              fill={`url(#grad-${match.id})`}
            />
            {dot && (
              <ReferenceDot
                x={dot.t}
                y={dot.leadPct}
                r={5}
                fill={COLORS.combat}
                stroke={COLORS.bg}
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))",
          gap: 14,
          marginTop: 6,
        }}
      >
        <Stat
          label="Winner's worst deficit"
          value={`${Math.round(analysis.worstDeficit * 100)}% eco share`}
          color={COLORS.eco}
        />
        <Stat
          label="Final eco gap"
          value={`${Math.round(analysis.finalGap * 100)}%`}
          color={COLORS.close}
        />
        <Stat
          label="Skill gap (ally teams)"
          value={analysis.skillGap.toFixed(1)}
          color={COLORS.upset}
        />
        <Stat
          label="Peak battle, minute"
          value={analysis.maxJumpAt != null ? `~${analysis.maxJumpAt}m` : "—"}
          color={COLORS.combat}
        />
      </div>
      <a
        href={`https://gex.honu.pw/match/${match.id}`}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginTop: 14,
          fontSize: 12.5,
          color: COLORS.ink,
          textDecoration: "none",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          border: `1px solid ${COLORS.line}`,
          padding: "6px 12px",
          borderRadius: 7,
        }}
      >
        Open in Gex <ExternalLink size={13} />
      </a>
    </div>
  );
}
