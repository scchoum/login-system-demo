import './AppHeader.css';
import React from 'react';
import AppBranding from './AppBranding';
import AppOptions from './AppOptions';

const AppHeader = (props) => {
    return (
        <header className="app-header">
            <div className="container">
                <AppBranding/>
                <AppOptions authenticated={props.authenticated} onLogout={props.onLogout} />
            </div>
        </header>
    )
}


export default AppHeader;