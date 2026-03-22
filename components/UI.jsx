// ── Shared UI primitives ──────────────────────────────────────────────────────

export const Btn = ({ children, onClick, disabled, variant = 'primary', style, ...rest }) => {
  const base = {
    fontFamily: "'Geist Mono', monospace",
    fontSize: '12px',
    fontWeight: 600,
    borderRadius: '10px',
    padding: '11px 20px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    letterSpacing: '0.02em',
    transition: 'all 0.15s',
    opacity: disabled ? 0.3 : 1,
    ...style,
  };
  const variants = {
    primary: { background: '#ffffff', color: '#0a0a0a' },
    ghost:   { background: 'transparent', color: '#888', border: '1px solid #2a2a2a' },
    danger:  { background: 'transparent', color: '#ef4444', border: '1px solid #2a1010' },
  };
  return (
    <button style={{ ...base, ...variants[variant] }} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export const Card = ({ children, style }) => (
  <div style={{
    background: '#111',
    border: '1px solid #1e1e1e',
    borderRadius: '16px',
    padding: '20px',
    ...style,
  }}>
    {children}
  </div>
);

export const CardAccent = ({ children, style }) => (
  <div style={{
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: '14px',
    padding: '16px',
    ...style,
  }}>
    {children}
  </div>
);

export const Label = ({ children, style }) => (
  <label style={{
    fontSize: '10px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    display: 'block',
    marginBottom: '5px',
    ...style,
  }}>
    {children}
  </label>
);

export const ProgressBar = ({ pct }) => (
  <div style={{ height: '2px', background: '#1a1a1a', borderRadius: '1px', overflow: 'hidden' }}>
    <div style={{
      height: '100%',
      background: '#ffffff',
      borderRadius: '1px',
      width: `${pct}%`,
      transition: 'width 0.4s ease',
    }} />
  </div>
);

// ── Bento pill — curved info pill at top of Welcome ──────────────────────────
export const BentoPill = () => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#111',
    border: '1px solid #222',
    borderRadius: '999px',
    padding: '7px 16px 7px 12px',
    marginBottom: '24px',
  }}>
    <span style={{
      background: '#1e1e1e',
      borderRadius: '999px',
      padding: '2px 8px',
      fontSize: '9px',
      color: '#888',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    }}>
      tip
    </span>
    <span style={{ fontSize: '10px', color: '#aaa', letterSpacing: '0.02em' }}>
      Choose a higher IPO value at birth — makes the curve more dramatic
    </span>
  </div>
);

export const Ticker = () => {
  const items = ['LIFE INDEX GENERATOR', 'RECONSTRUCT YOUR PAST', 'IMPORT TO ENTROPYZERO', 'LIFEPLOT v1.0', 'HYBRID STRUCTURED ENGINE', 'NO AUTH REQUIRED', 'STANDALONE APP', 'BY NIKSHEP DOGGALLI'];
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid #111',
      borderBottom: '1px solid #111',
      padding: '7px 0',
      background: '#080808',
    }}>
      <div style={{
        display: 'flex',
        gap: '48px',
        animation: 'ticker 35s linear infinite',
        width: 'max-content',
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontSize: '9px',
            color: '#2a2a2a',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            {item} ·
          </span>
        ))}
      </div>
    </div>
  );
};

export const Spinner = ({ text }) => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  }}>
    <div className="spinner" />
    {text && (
      <p style={{ fontSize: '11px', color: '#555', letterSpacing: '0.08em' }}>{text}</p>
    )}
  </div>
);
