import React from "react";
import "../css/MyProfile.css";

const MyProfile = ({ user }) => {
    return (
        <div className="my-profile">
            <h2>My Profile</h2>
            <div className="profile-info">
                <p><strong>Name:</strong> {user}</p>
            </div>
        </div>
    );
};

export default MyProfile;