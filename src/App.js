import React, { useState } from 'react';
import AdminPortal from './components/AdminPortal';
import UserHome from './UserHome';
import Button from '@mui/material/Button';

export default function App() {
    const [mode, setMode] = useState('admin');
    return (
        <div style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
            <Button onClick={() => setMode('admin')}>Admin Mode</Button>
            <Button onClick={() => setMode('user')} style={{ marginLeft: '1rem' }}>User Mode</Button>
            <div>
                {mode === 'admin' ? <AdminPortal /> : <UserHome />}
            </div>
        </div>
    );
}
