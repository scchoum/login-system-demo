import './Signup.css';
import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { signup, login, getCurrentUser } from '../../util/APIUtils';
import { ACCESS_TOKEN } from '../../constants/Constants';

const Signup = (props) => {
    if (props.authenticated) {
        return (<Redirect to={{
            pathname: "/",
            state: { from: props.location }
        }} />);
    }

    return (
        <div className="signup-container">
            <div className="signup-content">
                <h1 className="signup-title">Signup with LoginTest</h1>
                <SignupForm {...props} />
                <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
            </div>
        </div>
    );
}

const SignupForm = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        signup({
            name: name,
            email: email,
            password: password
        }).then(() => {
            alert("You are successfully registered!");

            login({
                email: email,
                password: password
            }).then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);

                getCurrentUser()
                .then(response => {
                    props.setAuthenticated(true);
                    props.setCurrentUser(response);
                });
            
                props.history.push("/");
            })

        }).catch(error => {
            alert((error && error.message) || "Oops! Something wrong. Please try again!");
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <input type="text" name="name" 
                    className="form-control" placeholder="Name"
                    value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
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
                <button type="submit" className="btn btn-block btn-primary" >Sign Up</button>
            </div>
        </form>
    );
}

export default Signup;