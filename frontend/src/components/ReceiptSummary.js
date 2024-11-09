import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../css/ReceiptSummary.css";  // Optional: style the component as needed

const ReceiptSummary = ({ receiptId }) => {
    const [receipt, setReceipt] = useState(null);  // State to hold the receipt data
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state

    // Fetch receipt data when the component mounts
    useEffect(() => {
        const fetchReceiptData = async () => {
            try {
                const response = await fetch(`http://localhost:5002/api/products/receipt/${receiptId}`);

                // Check if the response is JSON
                const contentType = response.headers.get("Content-Type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Expected JSON, but got something else.");
                }

                // Parse the response as JSON
                const data = await response.json();
                setReceipt(data);  // Set the receipt data in state
                setLoading(false);  // Set loading to false after the fetch is complete
            } catch (error) {
                console.error("Failed to fetch receipt:", error);
                setError("Failed to fetch receipt: " + error.message);
                setLoading(false);
            }
        };

        fetchReceiptData();
    }, [receiptId]);  // Fetch the receipt only when receiptId changes

    // Handle loading state
    if (loading) {
        return <div>Loading receipt...</div>;
    }

    // Handle error state
    if (error) {
        return <div>{error}</div>;
    }

    // Handle when receipt data is available
    if (receipt) {
        return (
            <div className="receipt-summary">
                <h3>Receipt Summary</h3>
                <p><strong>Receipt Date:</strong> {receipt.create_date}</p>
                <table className="receipt-table">
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {receipt.products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name.trim()}</td>
                            <td>${parseFloat(product.price).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return <div>Receipt not found.</div>;  // Handle the case when receipt data is not found
};

ReceiptSummary.propTypes = {
    receiptId: PropTypes.number.isRequired,  // Ensure that receiptId is provided
};

export default ReceiptSummary;
