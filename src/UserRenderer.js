import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Card,
    Typography,
    TextField,
    Checkbox,
    Switch,
    Slider,
    Select,
    MenuItem,
    Divider,
    LinearProgress,
} from "@mui/material";

export default function UserRenderer({ layoutId }) {
    const [widgets, setWidgets] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/layouts/${layoutId}`)
            .then((res) => {
                const parsed = JSON.parse(res.data.schemaJson || "[]");
                setWidgets(parsed);
            })
            .catch((err) => console.error("Failed to load layout", err));
    }, [layoutId]);

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
                style={{
                    width: "390px",
                    height: "844px",
                    background: "#fff",
                    borderRadius: "40px",
                    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
                    border: "8px solid #000",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Inner Scrollable Screen */}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "20px",
                        background: "#f8f9fa",
                    }}
                >
                    {widgets.length === 0 ? (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{ textAlign: "center", marginTop: "50%" }}
                        >
                            📲 No layout found
                        </Typography>
                    ) : (
                        widgets.map((w) => (
                            <div
                                key={w.id}
                                style={{
                                    marginBottom: "12px",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    background: "#fff",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                }}
                            >
                                {renderWidget(w)}
                            </div>
                        ))
                    )}
                </div>

                {/* Home indicator */}
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

/* 🧩 Widget rendering logic (same as Admin canvas) */
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
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                        handleAction(w.props.action?.url, w.props.action?.method)
                    }
                >
                    {w.props.text || "Button"}
                </Button>
            );

        case "card":
            return (
                <Card style={{ padding: "1rem" }}>
                    <Typography>{w.props.text || "Card Content"}</Typography>
                </Card>
            );

        case "image":
            return (
                <img
                    src={w.props.src || "https://via.placeholder.com/300x150.png"}
                    alt="img"
                    style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
                />
            );

        case "checkbox":
            return (
                <label style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox /> {w.props.label || "Checkbox"}
                </label>
            );

        case "switch":
            return (
                <label style={{ display: "flex", alignItems: "center" }}>
                    <Switch /> {w.props.label || "Switch"}
                </label>
            );

        case "dropdown":
            return (
                <Select fullWidth size="small" displayEmpty>
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

/* 🔹 Simple API handler for button clicks */
async function handleAction(url, method = "GET") {
    if (!url) return;
    try {
        const res = await axios({ method, url });
        console.log("API response:", res.data);
        alert("Action success! Check console for data.");
    } catch (err) {
        console.error("Action failed:", err);
        alert("API call failed.");
    }
}
