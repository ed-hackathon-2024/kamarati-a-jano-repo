import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../css/ReceiptSummary.css";  // Optional: style the component as needed

const ReceiptSummary = ({ availableReceipts }) => {
    const [receiptId, setReceiptId] = useState(null);  // State to store selected receipt ID
    const [receipt, setReceipt] = useState(null);  // State to hold the receipt data
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState(null);  // Error state

    // Fetch receipt data when the receiptId changes
    useEffect(() => {
        if (!receiptId) return; // Don't fetch if no receipt is selected

        const fetchReceiptData = async () => {
            setLoading(true);  // Set loading to true when fetching
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
                setError(null);  // Clear any previous errors
            } catch (error) {
                console.error("Failed to fetch receipt:", error);
                setError("Failed to fetch receipt: " + error.message);
                setLoading(false);
            }
        };

        fetchReceiptData();
    }, [receiptId]);  // Re-fetch data when receiptId changes

    // Handle loading state
    if (loading) {
        return <div>Loading receipt...</div>;
    }

    // Handle error state
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="receipt-summary">
            <h3>Receipt Summary</h3>

            {/* Clickable receipt numbers */}
            <div className="receipt-selector">
                <p>Select a receipt:</p>
                <div className="receipt-buttons">
                    {availableReceipts.map((receiptOption) => (
                        <button
                            key={receiptOption.id}
                            onClick={() => setReceiptId(receiptOption.id)}
                            className={receiptId === receiptOption.id ? "active" : ""}
                        >
                            {receiptOption.id}
                        </button>
                    ))}
                </div>
            </div>

            {/* Display receipt details */}
            {receipt ? (
                <div className="receipt-details">
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
            ) : (
                <div>Please select a receipt to view details.</div>
            )}
        </div>
    );
};

ReceiptSummary.propTypes = {
    availableReceipts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
    })).isRequired,  // Expecting an array of receipt options with 'id'
};

export default ReceiptSummary;
