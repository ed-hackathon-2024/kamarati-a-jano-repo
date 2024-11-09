import React, { useEffect, useState } from "react";
import "../css/MyProfile.css";
import ReceiptSummary from "./ReceiptSummary";

const MyProfile = ({ user }) => {
    const [availableReceipts, setAvailableReceipts] = useState([]); // State to store available receipt IDs
    const [loading, setLoading] = useState(true);  // Loading state for fetching receipts
    const [error, setError] = useState(null);  // Error state for fetching receipts

    useEffect(() => {
        const fetchAvailableReceipts = async () => {
            try {
                // Replace this URL with the appropriate endpoint to fetch user's receipts
                const response = await fetch("http://localhost:5002/api/receipts/customer/1");

                // Check if the response is JSON
                const contentType = response.headers.get("Content-Type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Expected JSON, but got something else.");
                }

                // Parse the response as JSON
                const data = await response.json();
                console.log("Fetched available receipts:", data);

                // Extract receipt IDs and format them into objects for ReceiptSummary
                const formattedReceipts = data.receipt_ids.map(id => ({ id }));
                console.log("Formatted receipts:", formattedReceipts);
                setAvailableReceipts(formattedReceipts);  // Set the formatted receipt IDs in state
                setLoading(false);  // Set loading to false after the fetch is complete
            } catch (error) {
                console.error("Failed to fetch available receipts:", error);
                setError("Failed to fetch available receipts: " + error.message);
                setLoading(false);
            }
        };

        fetchAvailableReceipts();
    }, []);  // Only run this effect once when the component mounts

    // Handle loading state
    if (loading) {
        return <div>Loading your profile...</div>;
    }

    // Handle error state
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="my-profile">
            <h2>My Profile</h2>
            <div className="profile-info">
                <p><strong>Name:</strong> {user}</p>
            </div>
            <ReceiptSummary availableReceipts={availableReceipts} />  {/* Pass available receipts to ReceiptSummary */}
        </div>
    );
};

export default MyProfile;
