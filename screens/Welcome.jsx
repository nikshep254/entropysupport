import { Ticker, Btn, BentoPill } from '../components/UI';
import { EZ_IMPORT_URL } from '../constants';

export default function Welcome({ mode, setMode, onStart }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Ticker />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        textAlign: 'center',
      }}>
        {/* Logo mark */}
        <div className="fade-up-1" style={{ marginBottom: '6px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            border: '1px solid #222',
            borderRadius: '12px',
            marginBottom: '14px',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#888" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <p style={{ fontSize: '10px', color: '#444', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            lifeplot
          </p>
        </div>

        {/* Bento pill hint */}
        <div className="fade-up-2" style={{ marginTop: '20px', marginBottom: '4px' }}>
          <BentoPill />
        </div>

        {/* Headline */}
        <div className="fade-up-3" style={{ marginBottom: '14px', maxWidth: '560px' }}>
          <h1 style={{
            fontSize: 'clamp(30px,5vw,48px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#ffffff',
          }}>
            Reconstruct your life<br />before entropyzero.
          </h1>
        </div>

        <div className="fade-up-4" style={{ marginBottom: '44px', maxWidth: '460px' }}>
          <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.75 }}>
            Fill in your life phases. Mark key events. Get a realistic synthetic life index chart
            from birth to today — importable directly into entropyzero.
          </p>
        </div>

        {/* Mode cards */}
        <div className="fade-up-5" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          width: '100%',
          maxWidth: '520px',
          marginBottom: '36px',
        }}>
          {[
            { id: 'fresh', emoji: '🌱', label: 'Fresh start',       desc: 'New to entropyzero. Generate full history from birth, import as your starting chart data.' },
            { id: 'mix',   emoji: '🔗', label: 'Mix with existing', desc: 'Already on entropyzero. Stitch synthetic history to your real data. One seamless chart.' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              style={{
                fontFamily: "'Geist Mono', monospace",
                textAlign: 'left',
                padding: '18px',
                borderRadius: '14px',
                border: `1px solid ${mode === m.id ? '#333' : '#141414'}`,
                background: mode === m.id ? '#161616' : '#0d0d0d',
                cursor: 'pointer',
                transition: 'all 0.18s',
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '10px' }}>{m.emoji}</div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>{m.label}</p>
              <p style={{ fontSize: '9px', color: '#444', lineHeight: 1.65 }}>{m.desc}</p>
              {mode === m.id && (
                <p style={{ fontSize: '9px', color: '#555', marginTop: '10px' }}>✓ selected</p>
              )}
            </button>
          ))}
        </div>

        <div className="fade-up-5">
          <Btn onClick={onStart} style={{ fontSize: '13px', padding: '13px 32px' }}>
            Start →
          </Btn>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid #111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <p style={{ fontSize: '9px', color: '#222', letterSpacing: '0.1em' }}>LIFEPLOT v1.0 · by Nikshep Doggalli</p>
        <a href={EZ_IMPORT_URL} target="_blank" rel="noreferrer"
          style={{ fontSize: '9px', color: '#2a2a2a', textDecoration: 'none', letterSpacing: '0.08em' }}>
          entropyzero ↗
        </a>
      </div>
    </div>
  );
}
