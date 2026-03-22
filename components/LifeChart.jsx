import { useMemo } from 'react';
import {
  ComposedChart, Area, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceLine, CartesianGrid,
} from 'recharts';

const fmt = (n) => parseFloat(parseFloat(n).toFixed(2));

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload.find(p => p.value != null);
  if (!val) return null;
  return (
    <div style={{
      background: '#111',
      border: '1px solid #2a2a2a',
      borderRadius: '8px',
      padding: '8px 12px',
      fontFamily: "'Geist Mono', monospace",
    }}>
      <p style={{ fontSize: '9px', color: '#555', marginBottom: '3px' }}>{label}</p>
      <p style={{ fontSize: '12px', color: '#ffffff', fontWeight: 700 }}>{fmt(val.value)}</p>
    </div>
  );
};

export default function LifeChart({ data, existingData, signupDate }) {
  // ── Merge into single array for Recharts ───────────────────────────────────
  // Each point has: date, synth (or null), real (or null)
  // This way both lines share the same x-axis and the join is seamless.
  const merged = useMemo(() => {
    if (!existingData?.length) {
      // Fresh mode — single value key
      return data.map(d => ({ date: d.date, synth: d.value, real: null, timestamp: d.timestamp }));
    }

    // Build lookup for existing data
    const realMap = {};
    existingData.forEach(d => { realMap[d.date] = d.value; });

    // Synthetic points
    const synthPoints = data.map(d => ({ date: d.date, synth: d.value, real: null }));

    // Real points — start from first existing date
    const realPoints = existingData.map(d => ({ date: d.date, synth: null, real: d.value }));

    // Stitch: the last synth point becomes the bridge to real
    // Force the join: add a bridge point that has BOTH values so lines connect
    const lastSynth = synthPoints[synthPoints.length - 1];
    const firstReal = realPoints[0];
    if (lastSynth && firstReal) {
      // Bridge point at the join date carries both values
      const bridge = { date: lastSynth.date, synth: lastSynth.synth, real: lastSynth.synth };
      return [...synthPoints.slice(0, -1), bridge, ...realPoints];
    }

    return [...synthPoints, ...realPoints];
  }, [data, existingData]);

  const hasExisting = !!existingData?.length;

  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={merged} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="synthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity={0.10} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="realGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#4ade80" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="2 10" stroke="#141414" />
          <XAxis dataKey="date" hide />
          <YAxis hide domain={['dataMin - 30', 'dataMax + 30']} />
          <Tooltip content={<CustomTooltip />} />

          {signupDate && (
            <ReferenceLine
              x={signupDate}
              stroke="#333"
              strokeDasharray="4 4"
              label={{
                value: 'entropyzero →',
                fill: '#444',
                fontSize: 9,
                fontFamily: "'Geist Mono', monospace",
                position: 'insideTopRight',
              }}
            />
          )}

          {/* Synthetic history — dotted white line with soft fill */}
          <Area
            type="monotone"
            dataKey="synth"
            stroke={hasExisting ? '#555' : '#cccccc'}
            strokeWidth={hasExisting ? 1.4 : 1.8}
            strokeDasharray={hasExisting ? '6 4' : '0'}
            fill="url(#synthGrad)"
            dot={false}
            connectNulls={false}
            activeDot={hasExisting ? false : { r: 3, fill: '#fff', stroke: '#0a0a0a', strokeWidth: 2 }}
          />

          {/* Real entropyzero data — bright green solid */}
          {hasExisting && (
            <Area
              type="monotone"
              dataKey="real"
              stroke="#4ade80"
              strokeWidth={2}
              fill="url(#realGrad)"
              dot={false}
              connectNulls={false}
              activeDot={{ r: 3, fill: '#4ade80', stroke: '#0a0a0a', strokeWidth: 2 }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      {hasExisting && (
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #141414' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <svg width="20" height="8" viewBox="0 0 20 8">
              <line x1="0" y1="4" x2="20" y2="4" stroke="#555" strokeWidth="1.5" strokeDasharray="5 3" />
            </svg>
            <span style={{ fontSize: '9px', color: '#555' }}>synthetic history</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <div style={{ width: '18px', height: '2px', background: '#4ade80', borderRadius: '1px' }} />
            <span style={{ fontSize: '9px', color: '#555' }}>entropyzero data</span>
          </div>
        </div>
      )}
    </div>
  );
}
