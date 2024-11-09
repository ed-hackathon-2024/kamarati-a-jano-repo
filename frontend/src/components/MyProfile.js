import React from "react";
import "../css/MyProfile.css";
import ReceiptSummary from "./ReceiptSummary";

const MyProfile = ({ user}) => {
    return (
        <div className="my-profile">
            <h2>My Profile</h2>
            <div className="profile-info">
                <p><strong>Name:</strong> {user}</p>
            </div>
            <ReceiptSummary receiptId={1} />  {/* Pass the receiptId here */}
        </div>
    );
};

export default MyProfile;
