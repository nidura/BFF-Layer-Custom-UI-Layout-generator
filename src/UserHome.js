import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserRenderer from './UserRenderer';
import { Card, Button, Typography, Select, MenuItem, LinearProgress } from '@mui/material';

export default function UserHome() {
    const [journeys, setJourneys] = useState([]);
    const [journeyId, setJourneyId] = useState(null);
    const [layouts, setLayouts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedLayoutId, setSelectedLayoutId] = useState(null);

    // Load journeys at start
    useEffect(() => {
        axios.get('http://localhost:8080/api/journeys')
            .then(res => {
                const js = res.data || [];
                setJourneys(js);
                if (js.length) setJourneyId(js[0].id);
            })
            .catch(err => console.error('Failed to load journeys', err));
    }, []);

    // Load layouts for selected journey
    useEffect(() => {
        if (!journeyId) return;
        setLoading(true);
        axios.get(`http://localhost:8080/api/layouts/by-journey/${journeyId}`)
            .then(res => setLayouts(res.data || []))
            .catch(err => console.error('Failed to load layouts by journey', err))
            .finally(() => setLoading(false));
        setSelectedLayoutId(null);
    }, [journeyId]);

    return (
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 320 }}>
                <Typography variant="h6" gutterBottom>User Journeys</Typography>

                <Typography variant="subtitle2" gutterBottom>Select Journey</Typography>
                <Select
                    fullWidth
                    size="small"
                    value={journeyId || ''}
                    onChange={e => setJourneyId(e.target.value)}
                >
                    {journeys.map(j => (
                        <MenuItem key={j.id} value={j.id}>{j.name}</MenuItem>
                    ))}
                </Select>

                <div style={{ marginTop: 12 }}>
                    <Typography variant="subtitle2" gutterBottom>Layouts</Typography>
                    {loading ? <LinearProgress /> : null}
                    {layouts.map(l => (
                        <Card
                            key={l.id}
                            style={{
                                padding: 12,
                                marginBottom: 8,
                                border: selectedLayoutId === l.id ? '2px solid #007bff' : '1px solid #ddd'
                            }}
                        >
                            <Typography variant="subtitle1">{l.name || `Layout ${l.id}`}</Typography>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => setSelectedLayoutId(l.id)}
                                style={{ marginTop: 8 }}
                            >
                                View
                            </Button>
                        </Card>
                    ))}
                    {!loading && layouts.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">No layouts in this journey</Typography>
                    ) : null}
                </div>
            </div>

            <div style={{ flex: 1 }}>
                {selectedLayoutId ? (
                    <UserRenderer layoutId={selectedLayoutId} />
                ) : (
                    <Typography variant="body2" color="text.secondary">Select a layout to preview</Typography>
                )}
            </div>
        </div>
    );
}
