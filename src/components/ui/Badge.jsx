export function Badge({ def, magnitude }) {
  const Icon = def.icon;
  return (
    <span
      title={`${def.label} (${Math.round(magnitude * 100)}%)`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 8px",
        borderRadius: 999,
        color: `var(${def.color})`,
        opacity: 0.7,
        fontSize: 11.5,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        letterSpacing: "0.01em",
      }}
    >
      <Icon size={12} strokeWidth={2.4} />
      {def.label}
    </span>
  );
}
