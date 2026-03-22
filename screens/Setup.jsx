import { useRef } from 'react';
import { Btn, Card, Label } from '../components/UI';

export default function Setup({ mode, form, setForm, existingJson, setExistingJson, onBack, onNext }) {
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const arr = Array.isArray(parsed) ? parsed : parsed.chartData;
        if (!arr || !arr[0]?.date || !arr[0]?.value) throw new Error('bad format');
        const sorted = arr.sort((a, b) => a.date.localeCompare(b.date));
        setExistingJson(sorted);
        // Auto-set startPrice to the last value in their real data
        setForm(f => ({ ...f, startPrice: parseFloat(sorted[sorted.length - 1]?.value || 500) }));
      } catch {
        alert('Invalid JSON — export from entropyzero Settings → Import/Export first.');
      }
    };
    reader.readAsText(file);
  };

  const canNext = form.name.trim() && form.dob && (mode !== 'mix' || existingJson);

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 20px' }}>
      <div className="fade-up">
        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontSize: '9px', color: '#444', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
            step 1 / 2
          </p>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Your basics
          </h2>
        </div>

        <Card style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Name */}
          <div>
            <Label>Your name</Label>
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Nikshep"
            />
          </div>

          {/* DOB */}
          <div>
            <Label>Date of birth</Label>
            <input
              type="date"
              value={form.dob}
              onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* IPO Price */}
          <div>
            <Label>
              entropyzero IPO price
              <span style={{ color: '#333', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                {' '}— your starting index value
              </span>
            </Label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {[100, 250, 500, 1000].map(p => (
                <button key={p}
                  onClick={() => setForm(f => ({ ...f, startPrice: p }))}
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: '11px', fontWeight: 600,
                    padding: '7px 14px', borderRadius: '8px', cursor: 'pointer',
                    border: `1px solid ${form.startPrice === p ? '#333' : '#1a1a1a'}`,
                    background: form.startPrice === p ? '#1e1e1e' : 'transparent',
                    color: form.startPrice === p ? '#ffffff' : '#333',
                    transition: 'all 0.12s',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <input
              type="number" min={1}
              value={form.startPrice}
              onChange={e => setForm(f => ({ ...f, startPrice: parseFloat(e.target.value) || 500 }))}
              placeholder="500"
            />
          </div>

          {/* Mix mode: existing JSON upload */}
          {mode === 'mix' && (
            <div>
              <Label>entropyzero export JSON</Label>
              <div
                onClick={() => fileRef.current?.click()}
                style={{
                  border: `1px dashed ${existingJson ? '#2a2a2a' : '#1a1a1a'}`,
                  borderRadius: '10px',
                  padding: '22px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#333'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = existingJson ? '#2a2a2a' : '#1a1a1a'; }}
              >
                <p style={{ fontSize: '11px', color: existingJson ? '#4ade80' : '#444' }}>
                  {existingJson
                    ? `✓ ${existingJson.length} data points — ${existingJson[0].date} → ${existingJson[existingJson.length - 1].date}`
                    : 'Click to upload your entropyzero export JSON'}
                </p>
                {!existingJson && (
                  <p style={{ fontSize: '9px', color: '#222', marginTop: '5px' }}>
                    entropyzero → Settings → Export Data → upload here
                  </p>
                )}
              </div>
              <input type="file" accept=".json" ref={fileRef} style={{ display: 'none' }} onChange={handleFile} />
              {existingJson && (
                <button
                  onClick={() => setExistingJson(null)}
                  style={{ fontFamily: "'Geist Mono', monospace", fontSize: '9px', color: '#333', background: 'none', border: 'none', cursor: 'pointer', marginTop: '6px' }}
                >
                  ✕ Remove
                </button>
              )}
            </div>
          )}
        </Card>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Btn variant="ghost" onClick={onBack}>← Back</Btn>
          <Btn onClick={onNext} disabled={!canNext}>Set up phases →</Btn>
        </div>
      </div>
    </div>
  );
}
