import { useState } from "react";
import { ChevronDown, ChevronRight, Save, Trash2 } from "lucide-react";
import { MILESTONES, COLORS, GAMEMODES } from "../utils/globalVars";
import { ScoreDial, Badge, MiniSparkline, MatchDetail } from "./index";

export function MatchCard({
  match,
  analysis,
  expanded,
  isSaved,
  onToggle,
  onSave,
  onDelete,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const activeMilestones = MILESTONES.filter((m) => analysis.flags[m.key]);

  return (
    <div
      style={{
        position: "relative",
        background: COLORS.panel,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 12,
        overflow: "hidden",
        transition: "border-color 120ms ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isSaved ? (
        <Trash2
          size={16}
          color={COLORS.combat}
          onClick={onDelete}
          style={{
            position: "absolute",
            zIndex: 1,
            cursor: "pointer",
            top: "5px",
            right: "5px",
            display: isHovered ? "block" : "none",
          }}
        />
      ) : (
        <Save
          size={16}
          color={COLORS.eco}
          onClick={onSave}
          style={{
            position: "absolute",
            zIndex: 1,
            cursor: "pointer",
            top: "5px",
            right: "5px",
            display: isHovered ? "block" : "none",
          }}
        />
      )}
      <button
        onClick={onToggle}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "14px 16px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <ScoreDial score={analysis.score} />
        <div style={{ minWidth: 0, flex: "1 1 220px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 15.5,
                color: COLORS.ink,
              }}
            >
              {match.map}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: COLORS.muted,
              }}
            >
              {GAMEMODES[match.gamemode]} · {match.durationMin}m ·{" "}
              {match.playerCount}p
            </span>
          </div>
          <div
            style={{ display: "flex", gap: 6, marginTop: 7, flexWrap: "wrap" }}
          >
            {activeMilestones.length > 0 ? (
              activeMilestones.map((m) => (
                <Badge
                  key={m.key}
                  def={m}
                  magnitude={analysis.magnitudes[m.key]}
                />
              ))
            ) : (
              <span
                style={{
                  fontSize: 11.5,
                  color: COLORS.faint,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                no milestones fired
              </span>
            )}
          </div>
        </div>
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <MiniSparkline series={match.series} winner={match.winner} />
          {expanded ? (
            <ChevronDown size={16} color={COLORS.muted} />
          ) : (
            <ChevronRight size={16} color={COLORS.muted} />
          )}
        </div>
      </button>
      {expanded && <MatchDetail match={match} analysis={analysis} />}
    </div>
  );
}
