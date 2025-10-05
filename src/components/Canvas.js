import React from "react";
import { useDroppable } from "@dnd-kit/core";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import LinearProgress from "@mui/material/LinearProgress";


export default function Canvas({ widgets, onSelect, onDelete }) {
    const { setNodeRef } = useDroppable({ id: "canvas" });

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#e9ecef",
                minHeight: "100vh",
            }}
        >
            {/* 📱 Mobile Device Frame */}
            <div
                ref={setNodeRef}
                style={{
                    width: "390px", // iPhone 14 width
                    height: "844px", // iPhone 14 height
                    background: "#fff",
                    borderRadius: "40px",
                    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                    position: "relative",
                    overflow: "hidden",
                    border: "8px solid #000",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* 🟢 Inner Scrollable Screen */}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "20px",
                        background: "#f8f9fa",
                    }}
                >
                    {widgets.length === 0 && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{
                                textAlign: "center",
                                marginTop: "50%",
                            }}
                        >
                            📲 Drag widgets here to design your mobile UI
                        </Typography>
                    )}

                    {widgets.map((w) => (
                        <div
                            key={w.id}
                            style={{
                                position: "relative",
                                marginBottom: "12px",
                                padding: "10px",
                                borderRadius: "8px",
                                background: "#fff",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                            }}
                        >
                            {/* 🗑️ Delete Button */}
                            <IconButton
                                size="small"
                                onClick={() => onDelete(w.id)}
                                style={{
                                    position: "absolute",
                                    top: "4px",
                                    right: "4px",
                                    background: "#f8f9fa",
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>

                            {/* Render Actual Widget */}
                            <div onClick={() => onSelect(w.id)}>
                                {renderWidget(w)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom "Home Indicator" bar */}
                <div
                    style={{
                        height: "5px",
                        width: "120px",
                        background: "#222",
                        borderRadius: "3px",
                        margin: "10px auto",
                    }}
                />
            </div>
        </div>
    );
}

function renderWidget(w) {
    switch (w.type) {
        case "label":
            return (
                <Typography variant="body1" style={{ textAlign: "center" }}>
                    {w.props.text || "Label"}
                </Typography>
            );
        case "textfield":
            return (
                <TextField
                    label={w.props.label || "Text Field"}
                    variant="outlined"
                    fullWidth
                    size="small"
                />
            );
        case "numberfield":
            return (
                <TextField
                    label={w.props.label || "Number Field"}
                    type="number"
                    variant="outlined"
                    fullWidth
                    size="small"
                />
            );
        case "button":
            return (
                <Button variant="contained" fullWidth>
                    {w.props.text || "Button"}
                </Button>
            );
        case "card":
            return (
                <Card style={{ padding: "1rem" }}>
                    <Typography>{w.props.text || "Card Content"}</Typography>
                </Card>
            );
        case "table":
            return (
                <Card style={{ padding: "1rem" }}>
                    <Typography variant="body2">📊 Table Placeholder</Typography>
                </Card>
            );

        case "image":
            return (
                <img
                    src={w.props.src || "https://via.placeholder.com/300x150.png"}
                    alt="widget"
                    style={{
                        width: "100%",
                        borderRadius: "8px",
                        objectFit: "cover",
                    }}
                />
            );

        case "checkbox":
            return (
                <label style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox defaultChecked={w.props.checked || false} />
                    {w.props.label || "Checkbox"}
                </label>
            );

        case "switch":
            return (
                <label style={{ display: "flex", alignItems: "center" }}>
                    <Switch defaultChecked={w.props.checked || false} />
                    {w.props.label || "Switch"}
                </label>
            );

        case "dropdown":
            return (
                <Select
                    fullWidth
                    defaultValue=""
                    size="small"
                    displayEmpty
                >
                    <MenuItem value="">
                        {w.props.placeholder || "Select option"}
                    </MenuItem>
                    {(w.props.options || ["Option 1", "Option 2"]).map((opt) => (
                        <MenuItem key={opt} value={opt}>
                            {opt}
                        </MenuItem>
                    ))}
                </Select>
            );

        case "slider":
            return (
                <Slider
                    defaultValue={w.props.value || 50}
                    min={w.props.min || 0}
                    max={w.props.max || 100}
                />
            );

        case "datepicker":
            return (
                <TextField
                    type="date"
                    fullWidth
                    label={w.props.label || "Select Date"}
                    InputLabelProps={{ shrink: true }}
                />
            );

        case "progress":
            return (
                <div style={{ width: "100%" }}>
                    <Typography variant="body2" color="text.secondary">
                        {w.props.label || "Progress"}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={w.props.value || 60}
                        sx={{ height: 10, borderRadius: 5 }}
                    />
                </div>
            );

        case "divider":
            return <Divider />;
        default:
            return null;
    }
}
