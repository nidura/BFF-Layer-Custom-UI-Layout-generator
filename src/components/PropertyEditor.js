import React from 'react';

export default function PropertyEditor({ widget, onChange }) {
    if (!widget) return <div style={{ padding: '1rem' }}>Select a widget</div>;
    const p = widget.props || {};
    const set = (k, v) => onChange({ ...widget, props: { ...(widget.props || {}), [k]: v } });

    return (
        <div style={{ width: 250, padding: '1rem', borderLeft: '1px solid #ddd' }}>
            <h3>Properties</h3>

            {widget.type === 'header' && (
                <>
                    <label>Title</label>
                    <input type="text" value={p.title || ''} onChange={e => set('title', e.target.value)} />
                    <label>Caption</label>
                    <input type="text" value={p.caption || ''} onChange={e => set('caption', e.target.value)} />
                    <label>
                        <input type="checkbox" checked={!!p.centerTitle} onChange={e => set('centerTitle', e.target.checked)} />
                        Center title
                    </label>
                    <h4>Colors</h4>
                    <label>Background</label>
                    <input type="color" value={p.bgColor || '#ffffff'} onChange={e => set('bgColor', e.target.value)} />
                    <label>Text</label>
                    <input type="color" value={p.textColor || '#111111'} onChange={e => set('textColor', e.target.value)} />
                    <label>Border</label>
                    <input type="color" value={p.borderColor || '#e5e7eb'} onChange={e => set('borderColor', e.target.value)} />
                </>
            )}

            {widget.type === 'pill-card' && (
                <>
                    <h4>Pill Card</h4>
                    <label>Title</label>
                    <input type="text" value={p.title || ''} onChange={e => set('title', e.target.value)} />
                    <label>Subtitle</label>
                    <input type="text" value={p.subtitle || ''} onChange={e => set('subtitle', e.target.value)} />

                    <h4>Accent</h4>
                    <label>Word</label>
                    <input
                        type="text"
                        value={p.accent?.text || ''}
                        onChange={e => set('accent', { ...(p.accent || {}), text: e.target.value })}
                    />
                    <label>Color</label>
                    <input
                        type="color"
                        value={p.accent?.color || '#E11D48'}
                        onChange={e => set('accent', { ...(p.accent || {}), color: e.target.value })}
                    />

                    <h4>Left Icon</h4>
                    <label>Circle color</label>
                    <input
                        type="color"
                        value={p.left?.bg || '#f1f5f9'}
                        onChange={e => set('left', { ...(p.left || {}), bg: e.target.value })}
                    />
                    <label>Emoji</label>
                    <input
                        type="text"
                        value={p.left?.emoji || '💳'}
                        onChange={e => set('left', { ...(p.left || {}), emoji: e.target.value })}
                    />

                    <h4>Trailing</h4>
                    <label>Type</label>
                    <select value={p.trailing || 'arrow'} onChange={e => set('trailing', e.target.value)}>
                        <option value="arrow">arrow</option>
                        <option value="none">none</option>
                    </select>

                    <h4>Colors</h4>
                    <label>Background</label>
                    <input type="color" value={p.bgColor || '#F3F7FC'} onChange={e => set('bgColor', e.target.value)} />
                    <label>Text</label>
                    <input type="color" value={p.textColor || '#0f172a'} onChange={e => set('textColor', e.target.value)} />
                    <label>Border</label>
                    <input type="color" value={p.borderColor || '#e5e7eb'} onChange={e => set('borderColor', e.target.value)} />

                    <h4>Action</h4>
                    <label>URL</label>
                    <input
                        type="text"
                        value={p.action?.url || ''}
                        onChange={e => set('action', { ...(p.action || {}), url: e.target.value })}
                    />
                    <label>Method</label>
                    <select
                        value={p.action?.method || 'GET'}
                        onChange={e => set('action', { ...(p.action || {}), method: e.target.value })}
                    >
                        <option>GET</option>
                        <option>POST</option>
                    </select>
                </>
            )}

            {/* existing editors for other widget types remain unchanged */}
        </div>
    );
}
