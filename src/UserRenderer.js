import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Typography, TextField, Checkbox, Switch, Slider, Select, MenuItem, Divider, LinearProgress } from '@mui/material';

export default function UserRenderer({ layoutId }) {
    const [widgets, setWidgets] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!layoutId) return;
        setLoading(true);
        axios
            .get(`http://localhost:8080/api/layouts/${layoutId}`)
            .then((res) => {
                const parsed = JSON.parse(res.data.schemaJson || '[]');
                setWidgets(parsed);
            })
            .catch((err) => console.error('Failed to load layout', err))
            .finally(() => setLoading(false));
    }, [layoutId]);

    const accented = (title, accent) => {
        if (!accent?.text || !title?.includes(accent.text)) return title || '';
        const parts = title.split(accent.text);
        return (
            <span>
        {parts[0]}
                <span style={{ color: accent.color || '#E11D48' }}>{accent.text}</span>
                {parts.slice(1).join(accent.text)}
      </span>
        );
    };

    const renderWidget = (w) => {
        const p = w.props || {};
        switch (w.type) {
            case 'header':
                return (
                    <div
                        key={w.id}
                        style={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 2,
                            margin: 0,
                            padding: 12,
                            background: p.bgColor || '#ffffff',
                            color: p.textColor || '#111',
                            borderBottom: p.borderColor ? `1px solid ${p.borderColor}` : '1px solid rgba(0,0,0,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: p.centerTitle ? 'center' : 'flex-start',
                            gap: 12
                        }}
                    >
                        <div style={{ textAlign: p.centerTitle ? 'center' : 'left' }}>
                            <div style={{ fontWeight: 700 }}>{p.title || 'Header'}</div>
                            {p.caption ? <div style={{ fontSize: 12, opacity: 0.85 }}>{p.caption}</div> : null}
                        </div>
                    </div>
                );

            case 'pill-card': {
                const doAction = async (e) => {
                    if (e) e.stopPropagation();
                    if (p.action?.url) {
                        try { await axios({ url: p.action.url, method: p.action.method || 'GET' }); }
                        catch (err) { console.error('Pill card action failed', err); }
                    }
                };
                const size = p.left?.size ?? 44;
                return (
                    <div key={w.id} style={{ margin: '10px 16px' }}>
                        <Card
                            onClick={doAction}
                            style={{
                                width: '100%',
                                padding: 12,
                                background: p.bgColor || '#F3F7FC',
                                color: p.textColor || '#0f172a',
                                border: p.borderColor ? `1px solid ${p.borderColor}` : '1px solid rgba(0,0,0,0.04)',
                                borderRadius: p.radius ?? 14,
                                boxShadow: p.shadow ? '0 10px 18px rgba(2, 44, 107, 0.08)' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 12
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div
                                    style={{
                                        width: size,
                                        height: size,
                                        borderRadius: size / 2,
                                        background: p.left?.bg || '#f1f5f9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {p.left?.url ? (
                                        <img
                                            src={p.left.url}
                                            alt=""
                                            style={{ width: '70%', height: '70%', objectFit: 'contain' }}
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    ) : (
                                        <span style={{ fontSize: Math.round(size * 0.4) }}>{p.left?.emoji || '•'}</span>
                                    )}
                                </div>
                                <div>
                                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                                        {accented(p.title || '', p.accent)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {p.subtitle || ''}
                                    </Typography>
                                </div>
                            </div>
                            {p.trailing === 'arrow' ? (
                                <button
                                    onClick={doAction}
                                    style={{ background: 'transparent', border: 'none', color: '#60a5fa', fontSize: 18 }}
                                >
                                    →
                                </button>
                            ) : null}
                        </Card>
                    </div>
                );
            }

            case 'label':
                return (
                    <div key={w.id} style={{ margin: '8px 16px' }}>
                        <Typography
                            variant="body1"
                            style={{
                                color: p.textColor || '#111',
                                background: p.bgColor || 'transparent',
                                padding: p.bgColor ? '8px 12px' : 0,
                                borderRadius: 8,
                                border: p.borderColor ? `1px solid ${p.borderColor}` : 'none'
                            }}
                        >
                            {p.text || 'Label'}
                        </Typography>
                    </div>
                );

            case 'button':
                return (
                    <div key={w.id} style={{ margin: '8px 16px' }}>
                        <Button
                            variant={p.variant || 'contained'}
                            style={{
                                color: p.textColor || (p.variant === 'contained' ? '#fff' : undefined),
                                background: p.bgColor || undefined,
                                borderColor: p.borderColor || undefined,
                                borderStyle: p.borderColor ? 'solid' : undefined,
                                borderWidth: p.borderColor ? 1 : undefined
                            }}
                            onClick={async () => {
                                if (p.action?.url) {
                                    try { await axios({ url: p.action.url, method: p.action.method || 'GET' }); }
                                    catch (err) { console.error('Button action failed', err); }
                                }
                            }}
                        >
                            {p.text || 'Button'}
                        </Button>
                    </div>
                );

            case 'card':
                return (
                    <div key={w.id} style={{ margin: '8px 16px' }}>
                        <Card style={{ padding: 12 }}>
                            <Typography variant="subtitle2">{p.title || 'Card'}</Typography>
                            <Typography variant="body2">{p.text || 'Card content'}</Typography>
                        </Card>
                    </div>
                );

            case 'textfield':
                return (
                    <div key={w.id} style={{ margin: '8px 16px' }}>
                        <TextField
                            label={p.label || 'Text Field'}
                            fullWidth
                            size="small"
                            sx={{
                                '& .MuiInputBase-root': {
                                    background: p.bgColor || undefined,
                                    color: p.textColor || undefined
                                },
                                '& .MuiInputLabel-root': {
                                    color: p.labelColor || undefined
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: p.borderColor || undefined
                                }
                            }}
                        />
                    </div>
                );

            case 'numberfield':
                return (
                    <div key={w.id} style={{ margin: '8px 16px' }}>
                        <TextField
                            type="number"
                            label={p.label || 'Number Field'}
                            fullWidth
                            size="small"
                            sx={{
                                '& .MuiInputBase-root': {
                                    background: p.bgColor || undefined,
                                    color: p.textColor || undefined
                                },
                                '& .MuiInputLabel-root': {
                                    color: p.labelColor || undefined
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: p.borderColor || undefined
                                }
                            }}
                        />
                    </div>
                );

            case 'checkbox':
                return (
                    <div key={w.id} style={{ margin: '8px 16px', display: 'flex', alignItems: 'center' }}>
                        <Checkbox />
                        <Typography variant="body2">{p.label || 'Checkbox'}</Typography>
                    </div>
                );

            case 'switch':
                return (
                    <div key={w.id} style={{ margin: '8px 16px', display: 'flex', alignItems: 'center' }}>
                        <Switch />
                        <Typography variant="body2" style={{ marginLeft: 8 }}>
                            {p.label || 'Switch'}
                        </Typography>
                    </div>
                );

            case 'dropdown':
                return (
                    <div key={w.id} style={{ margin: '8px 16px' }}>
                        <Select fullWidth size="small" value="">
                            {(p.options || ['Option 1', 'Option 2']).map((opt, i) => (
                                <MenuItem key={i} value={opt}>
                                    {opt}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                );

            case 'slider':
                return (
                    <div key={w.id} style={{ margin: '8px 16px' }}>
                        <Slider defaultValue={p.value ?? 30} />
                    </div>
                );

            case 'datepicker':
                return (
                    <div key={w.id} style={{ margin: '8px 16px' }}>
                        <TextField type="date" fullWidth size="small" />
                    </div>
                );

            case 'progress':
                return (
                    <div key={w.id} style={{ margin: '8px 16px' }}>
                        <LinearProgress variant="determinate" value={p.value ?? 40} />
                    </div>
                );

            case 'divider':
                return (
                    <div key={w.id} style={{ margin: '8px 16px' }}>
                        <Divider />
                    </div>
                );

            case 'image':
                return (
                    <div key={w.id} style={{ margin: '8px 16px' }}>
                        <div
                            style={{
                                width: '100%',
                                height: 160,
                                background: '#e5e7eb',
                                borderRadius: 12,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#6b7280'
                            }}
                        >
                            {p.alt || 'Image'}
                        </div>
                    </div>
                );

            case 'footer':
                return (
                    <div
                        key={w.id}
                        style={{
                            position: 'sticky',
                            bottom: 0,
                            zIndex: 2,
                            padding: 8,
                            background: p.bgColor || '#ffffff',
                            color: p.textColor || '#111',
                            borderTop: p.borderColor ? `1px solid ${p.borderColor}` : '1px solid rgba(0,0,0,0.08)',
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}
                    >
                        {(p.actions || []).map((a, i) => (
                            <button
                                key={i}
                                style={{ background: 'transparent', border: 'none', color: 'inherit', padding: 8 }}
                            >
                                {a.icon ? <span style={{ marginRight: 6 }}>{a.icon}</span> : null}
                                {a.label || 'Action'}
                            </button>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    if (loading) return <div style={{ padding: 16 }}><LinearProgress /></div>;

    return <div>{widgets.map(renderWidget)}</div>;
}
