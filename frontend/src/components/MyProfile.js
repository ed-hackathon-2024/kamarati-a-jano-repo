import React from "react";
import "../css/MyProfile.css";

const MyProfile = ({ user }) => {
    return (
        <div className="my-profile">
            <h2>My Profile</h2>
            <div className="profile-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Total Deposits:</strong> {user.totalDeposits}</p>
                <p><strong>Badges Earned:</strong> {user.badges.join(", ")}</p>
            </div>
        </div>
    );
};

export default MyProfile;