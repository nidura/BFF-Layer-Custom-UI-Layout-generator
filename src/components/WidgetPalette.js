import React from "react";
import { useDraggable } from "@dnd-kit/core";

const DraggableItem = ({ id, label }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ id });
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                margin: "8px 0",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                background: "#f5f5f5",
                cursor: "grab",
            }}
        >
            {label}
        </div>
    );
};

export default function WidgetPalette() {
    const widgets = [
        { id: "label", label: "Label" },
        { id: "textfield", label: "Text Field" },
        { id: "numberfield", label: "Number Field" },
        { id: "button", label: "Button" },
        { id: "card", label: "Card" },
        { id: "table", label: "Table" },
        { id: "image", label: "Image" },
        { id: "checkbox", label: "Checkbox" },
        { id: "switch", label: "Switch" },
        { id: "dropdown", label: "Dropdown" },
        { id: "slider", label: "Slider" },
        { id: "datepicker", label: "Date Picker" },
        { id: "progress", label: "Progress Bar" },
        { id: "divider", label: "Divider" },
    ];


    return (
        <div style={{ width: "180px", padding: "1rem", borderRight: "1px solid #ddd" }}>
            <h3>Widget Palette</h3>
            {widgets.map(w => (
                <DraggableItem key={w.id} id={w.id} label={w.label} />
            ))}
        </div>
    );
}
