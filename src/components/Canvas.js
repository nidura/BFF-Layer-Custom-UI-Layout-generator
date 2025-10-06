import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import LinearProgress from '@mui/material/LinearProgress';

export default function Canvas({ widgets, onSelect, onDelete }) {
    const { setNodeRef } = useDroppable({ id: 'canvas' });

    const frameStyle = {
        width: '390px',
        height: '844px',
        background: '#fff',
        borderRadius: '40px',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        position: 'relative',
        border: '8px solid #000',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
    };

    const outerStyle = {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#e9ecef',
        minHeight: '100vh'
    };

    const screenStyle = {
        flex: 1,
        overflowY: 'auto',
        padding: 20,
        background: '#f8f9fa',
        position: 'relative'
    };

    const selectable = (id, extra = {}) => ({
        ...extra,
        cursor: 'pointer',
        position: 'relative',
        outline: 'none'
    });

    const deleteButton = (id) => (
        <IconButton
            size="small"
            onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(id);
            }}
            style={{
                position: 'absolute',
                top: -10,
                right: -10,
                background: '#fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
            }}
        >
            <DeleteIcon fontSize="small" />
        </IconButton>
    );

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

    const renderHeader = (w) => {
        const p = w.props || {};
        return (
            <div
                key={w.id}
                onClick={() => onSelect && onSelect(w.id)}
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
                    gap: 12,
                    ...selectable(w.id)
                }}
            >
                {deleteButton(w.id)}
                <div style={{ textAlign: p.centerTitle ? 'center' : 'left' }}>
                    <div style={{ fontWeight: 700 }}>{p.title || 'Header'}</div>
                    {p.caption ? <div style={{ fontSize: 12, opacity: 0.85 }}>{p.caption}</div> : null}
                </div>
            </div>
        );
    };

    const renderFooter = (w) => {
        const p = w.props || {};
        return (
            <div
                key={w.id}
                onClick={() => onSelect && onSelect(w.id)}
                style={{
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 2,
                    padding: 8,
                    background: p.bgColor || '#ffffff',
                    color: p.textColor || '#111',
                    borderTop: p.borderColor ? `1px solid ${p.borderColor}` : '1px solid rgba(0,0,0,0.08)',
                    display: 'flex',
                    justifyContent: 'space-around',
                    ...selectable(w.id)
                }}
            >
                {deleteButton(w.id)}
                {(p.actions || [{ label: 'Home' }, { label: 'Search' }, { label: 'Profile' }]).map((a, i) => (
                    <button key={i} style={{ background: 'transparent', border: 'none', color: 'inherit', padding: 8 }}>
                        {a.icon ? <span style={{ marginRight: 6 }}>{a.icon}</span> : null}
                        {a.label}
                    </button>
                ))}
            </div>
        );
    };

    const renderPillCard = (w) => {
        const p = w.props || {};
        const size = p.left?.size ?? 44;
        return (
            <div
                key={w.id}
                onClick={() => onSelect && onSelect(w.id)}
                style={{ position: 'relative', margin: '10px 16px', cursor: 'pointer' }}
            >
                {deleteButton(w.id)}
                <Card
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
                    {p.trailing === 'arrow' ? <span style={{ color: '#60a5fa', fontSize: 18 }}>→</span> : null}
                </Card>
            </div>
        );
    };

    const renderWidget = (w) => {
        switch (w.type) {
            case 'header': return renderHeader(w);
            case 'footer': return renderFooter(w);
            case 'pill-card': return renderPillCard(w);

            case 'label':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px', position: 'relative' })}
                    >
                        {deleteButton(w.id)}
                        <Typography
                            variant="body1"
                            style={{
                                color: w.props?.textColor || '#111',
                                background: w.props?.bgColor || 'transparent',
                                padding: w.props?.bgColor ? '8px 12px' : 0,
                                borderRadius: 8,
                                border: w.props?.borderColor ? `1px solid ${w.props.borderColor}` : 'none'
                            }}
                        >
                            {w.props?.text || 'Label'}
                        </Typography>
                    </div>
                );

            case 'button':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px' })}
                    >
                        {deleteButton(w.id)}
                        <Button
                            variant={w.props?.variant || 'contained'}
                            style={{
                                color: w.props?.textColor || (w.props?.variant === 'contained' ? '#fff' : undefined),
                                background: w.props?.bgColor || undefined,
                                borderColor: w.props?.borderColor || undefined,
                                borderStyle: w.props?.borderColor ? 'solid' : undefined,
                                borderWidth: w.props?.borderColor ? 1 : undefined
                            }}
                        >
                            {w.props?.text || 'Button'}
                        </Button>
                    </div>
                );

            case 'card': {
                const p = w.props || {};
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={{ position: 'relative', margin: '8px 16px', cursor: 'pointer' }}
                    >
                        {deleteButton(w.id)}
                        <Card
                            style={{
                                padding: 12,
                                background: p.bgColor || '#fff',
                                color: p.textColor || '#111',
                                border: p.borderColor ? `1px solid ${p.borderColor}` : '1px solid #eee',
                                borderRadius: 12,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 12
                            }}
                        >
                            <div>
                                <Typography variant="subtitle2">{p.title || 'Card'}</Typography>
                                <Typography variant="body2">{p.text || 'Card content'}</Typography>
                            </div>
                        </Card>
                    </div>
                );
            }

            case 'textfield':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px' })}
                    >
                        {deleteButton(w.id)}
                        <TextField
                            label={w.props?.label || 'Text Field'}
                            fullWidth
                            size="small"
                            sx={{
                                '& .MuiInputBase-root': {
                                    background: w.props?.bgColor || undefined,
                                    color: w.props?.textColor || undefined
                                },
                                '& .MuiInputLabel-root': {
                                    color: w.props?.labelColor || undefined
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: w.props?.borderColor || undefined
                                }
                            }}
                        />
                    </div>
                );

            case 'numberfield':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px' })}
                    >
                        {deleteButton(w.id)}
                        <TextField
                            type="number"
                            label={w.props?.label || 'Number Field'}
                            fullWidth
                            size="small"
                            sx={{
                                '& .MuiInputBase-root': {
                                    background: w.props?.bgColor || undefined,
                                    color: w.props?.textColor || undefined
                                },
                                '& .MuiInputLabel-root': {
                                    color: w.props?.labelColor || undefined
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: w.props?.borderColor || undefined
                                }
                            }}
                        />
                    </div>
                );

            case 'checkbox':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px', display: 'flex', alignItems: 'center' })}
                    >
                        {deleteButton(w.id)}
                        <Checkbox />
                        <Typography variant="body2">{w.props?.label || 'Checkbox'}</Typography>
                    </div>
                );

            case 'switch':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px', display: 'flex', alignItems: 'center' })}
                    >
                        {deleteButton(w.id)}
                        <Switch />
                        <Typography variant="body2" style={{ marginLeft: 8 }}>
                            {w.props?.label || 'Switch'}
                        </Typography>
                    </div>
                );

            case 'dropdown':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px' })}
                    >
                        {deleteButton(w.id)}
                        <Select fullWidth size="small" value="">
                            {(w.props?.options || ['Option 1', 'Option 2']).map((opt, i) => (
                                <MenuItem key={i} value={opt}>
                                    {opt}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                );

            case 'slider':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px' })}
                    >
                        {deleteButton(w.id)}
                        <Slider defaultValue={w.props?.value ?? 30} />
                    </div>
                );

            case 'datepicker':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px' })}
                    >
                        {deleteButton(w.id)}
                        <TextField type="date" fullWidth size="small" />
                    </div>
                );

            case 'progress':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px' })}
                    >
                        {deleteButton(w.id)}
                        <LinearProgress variant="determinate" value={w.props?.value ?? 40} />
                    </div>
                );

            case 'divider':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px' })}
                    >
                        {deleteButton(w.id)}
                        <Divider />
                    </div>
                );

            case 'image':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px' })}
                    >
                        {deleteButton(w.id)}
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
                            {w.props?.alt || 'Image'}
                        </div>
                    </div>
                );

            case 'table':
                return (
                    <div
                        key={w.id}
                        onClick={() => onSelect && onSelect(w.id)}
                        style={selectable(w.id, { margin: '8px 16px' })}
                    >
                        {deleteButton(w.id)}
                        <Card style={{ padding: 12 }}>
                            <Typography variant="subtitle2">Table (placeholder)</Typography>
                            <Divider style={{ margin: '8px 0' }} />
                            <Typography variant="body2" color="text.secondary">
                                Add a real table component later
                            </Typography>
                        </Card>
                    </div>
                );

            default:
                return (
                    <div key={w.id} style={{ margin: '8px 16px' }}>
                        <Typography variant="body2" color="text.secondary">
                            Unsupported widget: {w.type}
                        </Typography>
                    </div>
                );
        }
    };

    return (
        <div style={outerStyle}>
            <div ref={setNodeRef} style={frameStyle}>
                <div style={screenStyle}>
                    {widgets.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', marginTop: 50 }}>
                            Drag widgets here
                        </Typography>
                    ) : (
                        widgets.map(renderWidget)
                    )}
                </div>
            </div>
        </div>
    );
}
