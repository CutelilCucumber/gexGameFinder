export function buildSeries(points) {
  // points: [ [minute, ecoA, ecoB, dmgA, dmgB], ... ] -> fills a clean series
  return points.map(([t, ecoA, ecoB, dmgA, dmgB]) => ({
    t,
    ecoA,
    ecoB,
    dmgA,
    dmgB,
    leadPct: ecoA + ecoB === 0 ? 0.5 : ecoA / (ecoA + ecoB),
  }));
}
