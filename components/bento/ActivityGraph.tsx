// A contribution-style grid. The data is generated from a fixed seed, and the
// caption says so, because Kemi is a fictional developer.

const WEEKS = 30;
const DAYS = 7;
const SEED = 42;

function seededLevels(): number[] {
  let s = SEED;
  const out: number[] = [];
  for (let i = 0; i < WEEKS * DAYS; i++) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const r = s / 2147483648;
    const weekday = i % DAYS > 0 && i % DAYS < 6;
    const bias = weekday ? 0.2 : -0.25;
    const v = r + bias;
    out.push(v < 0.35 ? 0 : v < 0.6 ? 1 : v < 0.8 ? 2 : v < 0.95 ? 3 : 4);
  }
  return out;
}

const LEVELS = seededLevels();
const CELL = 12;
const GAP = 3;

export default function ActivityGraph() {
  return (
    <svg
      className="bt-graph"
      viewBox={`0 0 ${WEEKS * (CELL + GAP)} ${DAYS * (CELL + GAP)}`}
      role="img"
      aria-label="Sample activity grid showing commits per day over 30 weeks"
    >
      {LEVELS.map((level, i) => (
        <rect
          key={i}
          x={Math.floor(i / DAYS) * (CELL + GAP)}
          y={(i % DAYS) * (CELL + GAP)}
          width={CELL}
          height={CELL}
          rx="3"
          className={`bt-l${level}`}
          style={{ animationDelay: `${Math.floor(i / DAYS) * 18}ms` }}
        />
      ))}
    </svg>
  );
}
