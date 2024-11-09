import React, { useEffect, useState } from "react";
import "../css/MyProfile.css";
import ReceiptSummary from "./ReceiptSummary";
import BonsSummary from "./BonsSummary";
import Badges from "./Badges";

const MyProfile = ({ user }) => {
    const [availableReceipts, setAvailableReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userBadges, setUserBadges] = useState([]);

    useEffect(() => {
        // Simulating fetching badges from an API or local data
        const badges = [
            {
                name: "First Purchase",
                image: "/assets/badges/first_purchase.png",
                description: "Awarded after your first purchase.",
                date_earned: "2024-05-01",
            },
            {
                name: "Eco Warrior",
                image: "/assets/badges/eco_warrior.png",
                description: "Awarded for reducing your carbon footprint.",
                date_earned: "2024-06-15",
            },
            {
                name: "Top Spender",
                image: "/assets/badges/top_spender.png",
                description: "Awarded for reaching the top spending tier.",
                date_earned: "2024-07-20",
            },
            {
                name: "Turtle Lover",
                image: "/assets/badges/top_spender.png",
                description: "Awarded for finding the secret turtle.",
                date_earned: "2024-09-04",
            },
            {
                name: "Frick your plastic",
                image: "/assets/badges/top_spender.png",
                description: "Awarded for using paper straws.",
                date_earned: "2023-12-20",
            },
            {
                name: "Paper is the way",
                image: "/assets/badges/top_spender.png",
                description: "Awarded for switching to paper bags.",
                date_earned: "2024-08-29",
            },
        ];
        setUserBadges(badges);
    }, []);

    useEffect(() => {
        const fetchAvailableReceipts = async () => {
            try {
                const response = await fetch("http://localhost:5002/api/receipts/customer/1");

                const contentType = response.headers.get("Content-Type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Expected JSON, but got something else.");
                }

                const data = await response.json();
                console.log("Fetched available receipts:", data);

                const formattedReceipts = data.receipts.map(receipt => ({
                    id: receipt.receipt_id,
                    date: receipt.create_date
                }));
                console.log("Formatted receipts:", formattedReceipts);

                setAvailableReceipts(formattedReceipts);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch available receipts:", error);
                setError("Failed to fetch available receipts: " + error.message);
                setLoading(false);
            }
        };

        fetchAvailableReceipts();
    }, []);

    if (loading) {
        return <div>Loading your profile...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="my-profile">
            <h2>My Profile</h2>
            <div className="profile-info">
                <p>{user}</p>
                <Badges badges={userBadges} />
            </div>
            <div className="summary-container">
                <ReceiptSummary availableReceipts={availableReceipts} />
                <BonsSummary />
            </div>
        </div>
    );
};

export default MyProfile;
