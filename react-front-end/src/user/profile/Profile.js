import React from "react";
import './Profile.css';

const Profile = (props) => {
    return (
        <div className="profile-container">
            <div className="container">
                <h2 className="profile-name">{props.currentUser.name}'s Profile</h2>
                <p className="profile-email">{props.currentUser.email}</p>
            </div>
        </div>
    )
}

export default Profile;