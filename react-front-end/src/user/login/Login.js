import './Login.css';
import React, { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import { login, getCurrentUser } from '../../util/APIUtils';
import { ACCESS_TOKEN } from '../../constants/Constants';

const Login = (props) => {

    useEffect(() => {
        if (props.location.state && props.location.state.error) {
            setTimeout(() => {
                alert(props.location.state.error, {
                    timeout: 5000
                });
                props.history.replace({
                    pathname: props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    });

    if (props.authenticated) {
        return (<Redirect to={{
            pathname: "/",
            state: { from: props.location }
        }} />);
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login to LoginTest</h1>
                <LoginForm {...props} />
                <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
            </div>
        </div>
    );
}

const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        login({
            email: email,
            password: password
        }).then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            alert("You are successfully logged in!");

            getCurrentUser()
            .then(response => {
                props.setAuthenticated(true);
                props.setCurrentUser(response);
            });
            
            props.history.push("/");
        }).catch(error => {
            alert((error && error.message) || "Oops! Something wrong. Please try again!");
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <input type="email" name="email" 
                    className="form-control" placeholder="Email"
                    value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-item">
                <input type="password" name="password" 
                    className="form-control" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="form-item">
                <button type="submit" className="btn btn-block btn-primary">Login</button>
            </div>
        </form> 
    );
}

export default Login;