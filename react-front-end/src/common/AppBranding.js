import './AppBranding.css';
import React from 'react';
import { Link } from 'react-router-dom';

const AppBranding = () => {
    return (
        <div className="app-branding">
            <Link to="/" className="app-title">Login Test</Link>
        </div>
    )
}

export default AppBranding;