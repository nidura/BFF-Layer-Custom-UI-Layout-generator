import React from 'react';

export default function PropertyEditor({ widget, onChange }) {
    if (!widget) return <div style={{ width: 250, padding: '1rem', borderLeft: '1px solid #ddd' }}>Select a widget</div>;
    const p = widget.props || {};
    const set = (k, v) => onChange({ ...widget, props: { ...(widget.props || {}), [k]: v } });

    return (
        <div style={{ width: 260, padding: '1rem', borderLeft: '1px solid #ddd', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0 }}>Properties</h3>

            {/* Header */}
            {widget.type === 'header' && (
                <>
                    <label>Title</label>
                    <input type="text" value={p.title || ''} onChange={e => set('title', e.target.value)} />
                    <label>Caption</label>
                    <input type="text" value={p.caption || ''} onChange={e => set('caption', e.target.value)} />
                    <label>
                        <input type="checkbox" checked={!!p.centerTitle} onChange={e => set('centerTitle', e.target.checked)} /> Center title
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

            {/* Pill Card */}
            {widget.type === 'pill-card' && (
                <>
                    <h4>Pill Card</h4>
                    <label>Title</label>
                    <input type="text" value={p.title || ''} onChange={e => set('title', e.target.value)} />
                    <label>Subtitle</label>
                    <input type="text" value={p.subtitle || ''} onChange={e => set('subtitle', e.target.value)} />
                    <h4>Left Icon</h4>
                    <label>Circle color</label>
                    <input type="color" value={p.left?.bg || '#f1f5f9'} onChange={e => set('left', { ...(p.left || {}), bg: e.target.value })} />
                    <label>Icon URL</label>
                    <input type="text" placeholder="https://.../icon.png" value={p.left?.url || ''} onChange={e => set('left', { ...(p.left || {}), url: e.target.value })} />
                    <label>Emoji (fallback)</label>
                    <input type="text" value={p.left?.emoji || '💳'} onChange={e => set('left', { ...(p.left || {}), emoji: e.target.value })} />
                    <label>Size (px)</label>
                    <input type="number" min={28} max={72} value={p.left?.size ?? 44} onChange={e => set('left', { ...(p.left || {}), size: Number(e.target.value || 44) })} />
                    <h4>Trailing</h4>
                    <label>Type</label>
                    <select
                        value={(typeof p.trailing === 'object' ? p.trailing.type : p.trailing) || 'arrow'}
                        onChange={e => {
                            const type = e.target.value;
                            if (type === 'chevron') set('trailing', { ...(typeof p.trailing === 'object' ? p.trailing : {}), type });
                            else set('trailing', type); // arrow or none
                        }}
                    >
                        <option value="arrow">arrow</option>
                        <option value="chevron">chevron</option>
                        <option value="none">none</option>
                    </select>
                    {(typeof p.trailing === 'object' ? p.trailing.type : p.trailing) === 'chevron' && (
                        <>
                            <label>Caret color</label>
                            <input type="color" value={p.trailing?.color || '#9AA1A9'} onChange={e => set('trailing', { ...(p.trailing || { type: 'chevron' }), color: e.target.value })} />
                            <label>Size (px)</label>
                            <input type="number" min={12} max={28} value={p.trailing?.size ?? 18} onChange={e => set('trailing', { ...(p.trailing || { type: 'chevron' }), size: Number(e.target.value || 18) })} />
                            <label>Weight (px)</label>
                            <input type="number" min={1} max={3} value={p.trailing?.weight ?? 2} onChange={e => set('trailing', { ...(p.trailing || { type: 'chevron' }), weight: Number(e.target.value || 2) })} />
                        </>
                    )}
                    <h4>Colors</h4>
                    <label>Background</label>
                    <input type="color" value={p.bgColor || '#FFFFFF'} onChange={e => set('bgColor', e.target.value)} />
                    <label>Text</label>
                    <input type="color" value={p.textColor || '#0f172a'} onChange={e => set('textColor', e.target.value)} />
                    <label>Border</label>
                    <input type="color" value={p.borderColor || '#e5e7eb'} onChange={e => set('borderColor', e.target.value)} />
                    <h4>Action</h4>
                    <label>URL</label>
                    <input type="text" value={p.action?.url || ''} onChange={e => set('action', { ...(p.action || {}), url: e.target.value })} />
                    <label>Method</label>
                    <select value={p.action?.method || 'GET'} onChange={e => set('action', { ...(p.action || {}), method: e.target.value })}>
                        <option>GET</option>
                        <option>POST</option>
                    </select>
                </>
            )}

            {/* Card */}
            {widget.type === 'card' && (
                <>
                    <h4>Card</h4>
                    <label>Title</label>
                    <input type="text" value={p.title || ''} onChange={e => set('title', e.target.value)} />
                    <label>Text</label>
                    <textarea value={p.text || ''} onChange={e => set('text', e.target.value)} />
                    <h4>Colors</h4>
                    <label>Background</label>
                    <input type="color" value={p.bgColor || '#ffffff'} onChange={e => set('bgColor', e.target.value)} />
                    <label>Text</label>
                    <input type="color" value={p.textColor || '#111111'} onChange={e => set('textColor', e.target.value)} />
                    <label>Border</label>
                    <input type="color" value={p.borderColor || '#e5e7eb'} onChange={e => set('borderColor', e.target.value)} />
                </>
            )}

            {/* Button */}
            {widget.type === 'button' && (
                <>
                    <h4>Button</h4>
                    <label>Text</label>
                    <input type="text" value={p.text || 'Button'} onChange={e => set('text', e.target.value)} />
                    <label>Variant</label>
                    <select value={p.variant || 'contained'} onChange={e => set('variant', e.target.value)}>
                        <option value="contained">contained</option>
                        <option value="outlined">outlined</option>
                        <option value="text">text</option>
                    </select>
                    <h4>Colors</h4>
                    <label>Background</label>
                    <input type="color" value={p.bgColor || ''} onChange={e => set('bgColor', e.target.value)} />
                    <label>Text</label>
                    <input type="color" value={p.textColor || ''} onChange={e => set('textColor', e.target.value)} />
                    <label>Border</label>
                    <input type="color" value={p.borderColor || ''} onChange={e => set('borderColor', e.target.value)} />
                    <h4>Action</h4>
                    <label>URL</label>
                    <input type="text" value={p.action?.url || ''} onChange={e => set('action', { ...(p.action || {}), url: e.target.value })} />
                    <label>Method</label>
                    <select value={p.action?.method || 'GET'} onChange={e => set('action', { ...(p.action || {}), method: e.target.value })}>
                        <option>GET</option>
                        <option>POST</option>
                    </select>
                </>
            )}

            {/* Label */}
            {widget.type === 'label' && (
                <>
                    <h4>Label</h4>
                    <label>Text</label>
                    <input type="text" value={p.text || ''} onChange={e => set('text', e.target.value)} />
                    <h4>Colors</h4>
                    <label>Background</label>
                    <input type="color" value={p.bgColor || ''} onChange={e => set('bgColor', e.target.value)} />
                    <label>Text</label>
                    <input type="color" value={p.textColor || ''} onChange={e => set('textColor', e.target.value)} />
                    <label>Border</label>
                    <input type="color" value={p.borderColor || ''} onChange={e => set('borderColor', e.target.value)} />
                </>
            )}

            {/* Text Field */}
            {widget.type === 'textfield' && (
                <>
                    <h4>Text Field</h4>
                    <label>Label</label>
                    <input type="text" value={p.label || ''} onChange={e => set('label', e.target.value)} />
                    <h4>Colors</h4>
                    <label>Background</label>
                    <input type="color" value={p.bgColor || ''} onChange={e => set('bgColor', e.target.value)} />
                    <label>Text</label>
                    <input type="color" value={p.textColor || ''} onChange={e => set('textColor', e.target.value)} />
                    <label>Label color</label>
                    <input type="color" value={p.labelColor || ''} onChange={e => set('labelColor', e.target.value)} />
                    <label>Border</label>
                    <input type="color" value={p.borderColor || ''} onChange={e => set('borderColor', e.target.value)} />
                </>
            )}

            {/* Number Field */}
            {widget.type === 'numberfield' && (
                <>
                    <h4>Number Field</h4>
                    <label>Label</label>
                    <input type="text" value={p.label || ''} onChange={e => set('label', e.target.value)} />
                    <h4>Colors</h4>
                    <label>Background</label>
                    <input type="color" value={p.bgColor || ''} onChange={e => set('bgColor', e.target.value)} />
                    <label>Text</label>
                    <input type="color" value={p.textColor || ''} onChange={e => set('textColor', e.target.value)} />
                    <label>Label color</label>
                    <input type="color" value={p.labelColor || ''} onChange={e => set('labelColor', e.target.value)} />
                    <label>Border</label>
                    <input type="color" value={p.borderColor || ''} onChange={e => set('borderColor', e.target.value)} />
                </>
            )}

            {/* Checkbox */}
            {widget.type === 'checkbox' && (
                <>
                    <h4>Checkbox</h4>
                    <label>Label</label>
                    <input type="text" value={p.label || ''} onChange={e => set('label', e.target.value)} />
                </>
            )}

            {/* Switch */}
            {widget.type === 'switch' && (
                <>
                    <h4>Switch</h4>
                    <label>Label</label>
                    <input type="text" value={p.label || ''} onChange={e => set('label', e.target.value)} />
                </>
            )}

            {/* Dropdown */}
            {widget.type === 'dropdown' && (
                <>
                    <h4>Dropdown</h4>
                    <label>Options (comma separated)</label>
                    <input
                        type="text"
                        value={(p.options || []).join(',')}
                        onChange={e => set('options', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    />
                </>
            )}

            {/* Slider */}
            {widget.type === 'slider' && (
                <>
                    <h4>Slider</h4>
                    <label>Value</label>
                    <input type="number" value={p.value ?? 30} onChange={e => set('value', Number(e.target.value || 0))} />
                </>
            )}

            {/* Date Picker */}
            {widget.type === 'datepicker' && (
                <>
                    <h4>Date Picker</h4>
                    <label>Value</label>
                    <input type="date" value={p.value || ''} onChange={e => set('value', e.target.value)} />
                </>
            )}

            {/* Progress */}
            {widget.type === 'progress' && (
                <>
                    <h4>Progress</h4>
                    <label>Value</label>
                    <input type="number" min={0} max={100} value={p.value ?? 40} onChange={e => set('value', Number(e.target.value || 0))} />
                </>
            )}

            {/* Image */}
            {widget.type === 'image' && (
                <>
                    <h4>Image</h4>
                    <label>URL</label>
                    <input type="text" value={p.src || ''} onChange={e => set('src', e.target.value)} />
                    <label>Alt</label>
                    <input type="text" value={p.alt || ''} onChange={e => set('alt', e.target.value)} />
                </>
            )}

            {/* Divider */}
            {widget.type === 'divider' && (
                <>
                    <h4>Divider</h4>
                    <label>Color</label>
                    <input type="color" value={p.color || '#e5e7eb'} onChange={e => set('color', e.target.value)} />
                </>
            )}

            {/* Footer */}
            {widget.type === 'footer' && (
                <>
                    <h4>Footer</h4>
                    <label>Background</label>
                    <input type="color" value={p.bgColor || '#ffffff'} onChange={e => set('bgColor', e.target.value)} />
                    <label>Text</label>
                    <input type="color" value={p.textColor || '#111111'} onChange={e => set('textColor', e.target.value)} />
                    <label>Border</label>
                    <input type="color" value={p.borderColor || '#e5e7eb'} onChange={e => set('borderColor', e.target.value)} />
                </>
            )}
        </div>
    );
}
