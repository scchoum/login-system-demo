import './AppOptions.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

const AppOptions = (props) => {

    return (
        <div className="app-options">
            <nav className="app-nav">
                { props.authenticated ? (
                    <ul>
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        <li>
                            <button onClick={props.onLogout}>Logout</button>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup">Signup</NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );
}

export default AppOptions;