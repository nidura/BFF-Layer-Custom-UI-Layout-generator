import React, { useState, useEffect } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import WidgetPalette from "./WidgetPalette";
import Canvas from "./Canvas";
import PropertyEditor from "./PropertyEditor";
import LayoutManager from "../LayoutManager";
import { v4 as uuid } from "uuid";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";

export default function AdminPortal() {
    // Journeys
    const [journeys, setJourneys] = useState([]);
    const [activeJourney, setActiveJourney] = useState(null);

    // Layouts
    const [layouts, setLayouts] = useState([]);
    const [activeLayout, setActiveLayout] = useState(null);

    // Designer
    const [widgets, setWidgets] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [activeWidgetType, setActiveWidgetType] = useState(null);

    // Load journeys
    useEffect(() => {
        axios.get("http://localhost:8080/api/journeys")
            .then((res) => {
                const js = res.data || [];
                setJourneys(js);
                if (!activeJourney && js.length) setActiveJourney(js[0]);
            })
            .catch((e) => console.error("Failed to load journeys", e));
    }, []);

    // Load layouts for active journey
    useEffect(() => {
        if (!activeJourney) {
            setLayouts([]);
            setActiveLayout(null);
            setWidgets([]);
            setSelectedId(null);
            return;
        }
        axios.get(`http://localhost:8080/api/layouts/by-journey/${activeJourney.id}`)
            .then((res) => setLayouts(res.data || []))
            .catch((e) => console.error("Failed to load layouts", e));
        setActiveLayout(null);
        setWidgets([]);
        setSelectedId(null);
    }, [activeJourney]);

    // Load widgets when active layout changes
    useEffect(() => {
        if (!activeLayout) {
            setWidgets([]);
            return;
        }
        axios.get(`http://localhost:8080/api/layouts/${activeLayout.id}`)
            .then((res) => {
                const parsed = JSON.parse(res.data.schemaJson || "[]");
                setWidgets(parsed);
            })
            .catch((err) => console.error("Failed to load layout", err));
        setSelectedId(null);
    }, [activeLayout]);

    // DnD drop handler
    const handleDrop = (event) => {
        const { over, active } = event;
        if (over && over.id === "canvas") {
            setWidgets((prev) => [...prev, { id: uuid(), type: active.id, props: {} }]);
        }
    };

    const updateWidget = (updated) => {
        setWidgets((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
    };

    const deleteWidget = (id) => {
        setWidgets((prev) => prev.filter((w) => w.id !== id));
        if (selectedId === id) setSelectedId(null);
    };

    // Create layout only if journey selected
    const handleCreateLayout = async (name) => {
        if (!activeJourney) {
            alert("Create/select a journey first");
            return;
        }
        const created = await axios
            .post("http://localhost:8080/api/layouts", {
                name,
                schemaJson: "[]",
                journey: { id: activeJourney.id },
            })
            .then((r) => r.data);
        setLayouts((prev) => [...prev, created]);
        setActiveLayout(created);
    };

    // Save current layout with schema and journey
    const saveLayout = async () => {
        if (!activeLayout || !activeJourney) {
            alert("Select a journey and layout first");
            return;
        }
        const payload = {
            id: activeLayout.id,
            name: activeLayout.name,
            schemaJson: JSON.stringify(widgets),
            journey: { id: activeJourney.id },
        };
        const saved = await axios
            .post("http://localhost:8080/api/layouts", payload)
            .then((r) => r.data);
        setActiveLayout(saved);
        const res = await axios.get(
            `http://localhost:8080/api/layouts/by-journey/${activeJourney.id}`
        );
        setLayouts(res.data || []);
    };

    // Inline Journey sidebar
    function JourneySidebar() {
        const [name, setName] = useState("");
        const createJourney = async (nm) => {
            const j = await axios
                .post("http://localhost:8080/api/journeys", { name: nm })
                .then((r) => r.data);
            setJourneys((prev) => [...prev, j]);
            setActiveJourney(j);
        };
        return (
            <div
                style={{
                    width: 220,
                    borderRight: "1px solid #ddd",
                    padding: "1rem",
                    background: "#fff",
                    overflowY: "auto",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Journeys
                </Typography>
                {journeys.map((j) => (
                    <div
                        key={j.id}
                        onClick={() => setActiveJourney(j)}
                        style={{
                            padding: 8,
                            borderRadius: 6,
                            marginBottom: 6,
                            cursor: "pointer",
                            background: activeJourney?.id === j.id ? "#007bff" : "#f8f9fa",
                            color: activeJourney?.id === j.id ? "#fff" : "#000",
                        }}
                    >
                        {j.name}
                    </div>
                ))}
                <div style={{ marginTop: 12 }}>
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="New journey name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        style={{ marginTop: 8 }}
                        onClick={() => {
                            const v = name.trim();
                            if (!v) return;
                            createJourney(v);
                            setName("");
                        }}
                    >
                        Create
                    </Button>
                </div>
            </div>
        );
    }

    function PreviewWidget({ type }) {
        switch (type) {
            case "label":
                return <Card style={{ padding: 8 }}>Label</Card>;
            case "textfield":
                return <Card style={{ padding: 8 }}>Text Field</Card>;
            case "button":
                return <Card style={{ padding: 8 }}>Button</Card>;
            case "header":
                return <Card style={{ padding: 8 }}>Header</Card>;
            case "footer":
                return <Card style={{ padding: 8 }}>Footer</Card>;
            default:
                return <Card style={{ padding: 8 }}>{type}</Card>;
        }
    }

    return (
        <DndContext
            onDragStart={(e) => setActiveWidgetType(e.active.id)}
            onDragEnd={(e) => {
                handleDrop(e);
                setActiveWidgetType(null);
            }}
        >
            <div style={{ display: "flex", height: "100vh" }}>
                {/* Journeys */}
                <JourneySidebar />

                {/* Layouts */}
                <LayoutManager
                    layouts={layouts}
                    activeLayout={activeLayout}
                    onSelect={setActiveLayout}
                    onCreate={handleCreateLayout}
                    disabled={!activeJourney}
                />

                {/* Designer */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            padding: "8px 12px",
                            borderBottom: "1px solid #eee",
                            display: "flex",
                            gap: 8,
                        }}
                    >
                        <Button variant="contained" onClick={saveLayout}>
                            Save Layout
                        </Button>
                        {activeLayout ? (
                            <Typography variant="body2" style={{ marginLeft: 8 }}>
                                Editing: {activeLayout.name}
                            </Typography>
                        ) : null}
                    </div>

                    <div style={{ display: "flex", flex: 1 }}>
                        <WidgetPalette />
                        <Canvas
                            widgets={widgets}
                            onSelect={setSelectedId}
                            onDelete={(id) => deleteWidget(id)}
                        />
                        <PropertyEditor
                            widget={widgets.find((w) => w.id === selectedId)}
                            onChange={updateWidget}
                        />
                    </div>
                </div>

                {/* Drag preview */}
                <DragOverlay>
                    {activeWidgetType ? <PreviewWidget type={activeWidgetType} /> : null}
                </DragOverlay>
            </div>
        </DndContext>
    );
}
