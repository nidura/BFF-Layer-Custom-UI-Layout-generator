import React from "react";

export default function PropertyEditor({ widget, onChange }) {
    if (!widget) return <div style={{ padding: "1rem" }}>Select a widget</div>;

    const updateProp = (field, value) =>
        onChange({ ...widget, props: { ...widget.props, [field]: value } });

    const updateAction = (key, value) => {
        const currentAction = widget.props.action || {};
        onChange({
            ...widget,
            props: { ...widget.props, action: { ...currentAction, [key]: value } },
        });
    };

    return (
        <div style={{ width: "250px", padding: "1rem", borderLeft: "1px solid #ddd" }}>
            <h3>Properties</h3>


            {/* Label */}
            {widget.type === "label" && (
                <>
                    <label>Text:</label>
                    <input
                        type="text"
                        placeholder="Label text"
                        value={widget.props.text || ""}
                        onChange={(e) => updateProp("text", e.target.value)}
                    />
                </>
            )}

            {/* Text Field / Number Field */}
            {["textfield", "numberfield"].includes(widget.type) && (
                <>
                    <label>Field Label:</label>
                    <input
                        type="text"
                        placeholder="Enter label"
                        value={widget.props.label || ""}
                        onChange={(e) => updateProp("label", e.target.value)}
                    />
                </>
            )}

            {/* Card */}
            {widget.type === "card" && (
                <>
                    <label>Card Text:</label>
                    <textarea
                        placeholder="Card text"
                        value={widget.props.text || ""}
                        onChange={(e) => updateProp("text", e.target.value)}
                    />
                </>
            )}

            {/* 🟢 Button with full action config */}
            {widget.type === "button" && (
                <div>
                    <label>Button Text:</label>
                    <input
                        type="text"
                        placeholder="Button label"
                        value={widget.props.text || ""}
                        onChange={(e) => updateProp("text", e.target.value)}
                    />

                    <label>HTTP Method:</label>
                    <select
                        value={widget.props.action?.method || "GET"}
                        onChange={(e) => updateAction("method", e.target.value)}
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                    </select>

                    <label>API URL:</label>
                    <input
                        type="text"
                        placeholder="https://api.example.com"
                        value={widget.props.action?.url || ""}
                        onChange={(e) => updateAction("url", e.target.value)}
                    />
                </div>
            )}

            {widget.type === "image" && (
                <>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        placeholder="https://..."
                        value={widget.props.src || ""}
                        onChange={(e) => updateProp("src", e.target.value)}
                    />
                </>
            )}

            {widget.type === "checkbox" && (
                <>
                    <label>Label:</label>
                    <input
                        type="text"
                        value={widget.props.label || ""}
                        onChange={(e) => updateProp("label", e.target.value)}
                    />
                </>
            )}

            {widget.type === "switch" && (
                <>
                    <label>Label:</label>
                    <input
                        type="text"
                        value={widget.props.label || ""}
                        onChange={(e) => updateProp("label", e.target.value)}
                    />
                </>
            )}

            {widget.type === "dropdown" && (
                <>
                    <label>Options (comma separated):</label>
                    <input
                        type="text"
                        placeholder="One,Two,Three"
                        value={(widget.props.options || []).join(",")}
                        onChange={(e) =>
                            updateProp("options", e.target.value.split(",").map((s) => s.trim()))
                        }
                    />
                </>
            )}

            {widget.type === "slider" && (
                <>
                    <label>Min:</label>
                    <input
                        type="number"
                        value={widget.props.min || 0}
                        onChange={(e) => updateProp("min", e.target.value)}
                    />
                    <label>Max:</label>
                    <input
                        type="number"
                        value={widget.props.max || 100}
                        onChange={(e) => updateProp("max", e.target.value)}
                    />
                </>
            )}

            {widget.type === "progress" && (
                <>
                    <label>Label:</label>
                    <input
                        type="text"
                        value={widget.props.label || ""}
                        onChange={(e) => updateProp("label", e.target.value)}
                    />
                    <label>Value (0–100):</label>
                    <input
                        type="number"
                        value={widget.props.value || 60}
                        onChange={(e) => updateProp("value", Number(e.target.value))}
                    />
                </>
            )}


        </div>
    );
}
