import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableItem = ({ id, label }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ id });
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                margin: '8px 0',
                padding: '10px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: 8,
                background: '#f1f5f9',
                color: '#0f172a',
                cursor: 'grab',
                userSelect: 'none'
            }}
        >
            {label}
        </div>
    );
};

export default function WidgetPalette() {
    const widgets = [
        { id: 'header', label: 'Header' },
        { id: 'label', label: 'Label' },
        { id: 'textfield', label: 'Text Field' },
        { id: 'numberfield', label: 'Number Field' },
        { id: 'button', label: 'Button' },
        { id: 'card', label: 'Card' },
        { id: 'pill-card', label: 'Pill Card' },
        { id: 'table', label: 'Table' },
        { id: 'image', label: 'Image' },
        { id: 'checkbox', label: 'Checkbox' },
        { id: 'switch', label: 'Switch' },
        { id: 'dropdown', label: 'Dropdown' },
        { id: 'slider', label: 'Slider' },
        { id: 'datepicker', label: 'Date Picker' },
        { id: 'progress', label: 'Progress Bar' },
        { id: 'divider', label: 'Divider' },
        { id: 'footer', label: 'Footer' }
    ];

    return (
        <div style={{ width: 180, padding: '1rem', borderRight: '1px solid #ddd' }}>
            <h3 style={{ marginTop: 0 }}>Widget Palette</h3>
            {widgets.map(w => (
                <DraggableItem key={w.id} id={w.id} label={w.label} />
            ))}
        </div>
    );
}
