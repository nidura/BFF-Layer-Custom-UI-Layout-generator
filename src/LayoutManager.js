import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function LayoutManager({ layouts, activeLayout, onSelect, onCreate, disabled = false }) {
    const [newName, setNewName] = useState("");

    return (
        <div style={{ width: 220, borderRight: '1px solid #ddd', padding: '1rem', background: '#fff', overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>Layouts</Typography>

            {layouts.map(l => (
                <div
                    key={l.id}
                    onClick={() => onSelect && onSelect(l)}
                    style={{
                        padding: 8,
                        borderRadius: 6,
                        marginBottom: 6,
                        cursor: 'pointer',
                        background: activeLayout?.id === l.id ? '#007bff' : '#f8f9fa',
                        color: activeLayout?.id === l.id ? '#fff' : '#000'
                    }}
                >
                    {l.name}
                </div>
            ))}

            <div style={{ marginTop: 12 }}>
                <TextField
                    size="small"
                    fullWidth
                    placeholder={disabled ? "Select a journey first" : "New layout name"}
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    disabled={disabled}
                />
                <Button
                    variant="contained"
                    fullWidth
                    style={{ marginTop: 8 }}
                    disabled={disabled || !newName.trim()}
                    onClick={() => {
                        const v = newName.trim();
                        if (!v) return;
                        onCreate && onCreate(v);
                        setNewName("");
                    }}
                >
                    Create
                </Button>
            </div>
        </div>
    );
}
