import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import "../css/ReceiptSummary.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ReceiptSummary = ({ availableReceipts }) => {
    const [receiptId, setReceiptId] = useState(null);
    const [receipt, setReceipt] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timePeriod, setTimePeriod] = useState("monthly");  // Default to monthly
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const receiptsPerPage = 10; // Display 10 receipts per page

    const roundUp = (num) => Math.ceil(num);

    // Calculate total pages
    const totalPages = Math.ceil(availableReceipts.length / receiptsPerPage);

    // Get receipts for the current page
    const currentReceipts = availableReceipts.slice(
        (currentPage - 1) * receiptsPerPage,
        currentPage * receiptsPerPage
    );

    // Function to group receipts by selected time period (weekly, monthly, yearly)
    const groupReceiptsByTimePeriod = () => {
        const grouped = {};

        availableReceipts.forEach((receipt) => {
            const date = new Date(receipt.date);
            let periodKey;

            if (timePeriod === "weekly") {
                const week = getWeekNumber(date);
                periodKey = `${date.getFullYear()}-W${week}`;
            } else if (timePeriod === "monthly") {
                periodKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
            } else if (timePeriod === "yearly") {
                periodKey = `${date.getFullYear()}`;
            }

            if (!grouped[periodKey]) {
                grouped[periodKey] = 0;
            }
            grouped[periodKey]++;
        });

        return grouped;
    };

    const getWeekNumber = (date) => {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + 1) / 7);
    };

    const graphData = () => {
        const groupedData = groupReceiptsByTimePeriod();
        const labels = Object.keys(groupedData);
        const data = labels.map((label) => roundUp(groupedData[label]));

        return {
            labels,
            datasets: [
                {
                    label: "Receipts over Time",
                    data,
                    borderColor: "rgba(75,192,192,1)",
                    backgroundColor: "rgba(75,192,192,0.2)",
                    fill: true,
                }
            ]
        };
    };

    const handleTimePeriodChange = (period) => {
        setTimePeriod(period);
    };

    const fetchReceiptData = async () => {
        if (!receiptId) return;
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5002/api/products/receipt/${receiptId}`);
            const contentType = response.headers.get("Content-Type");

            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Expected JSON, but got something else.");
            }

            const data = await response.json();
            setReceipt(data);
            setLoading(false);
            setError(null);
        } catch (error) {
            setError("Failed to fetch receipt: " + error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReceiptData();
    }, [receiptId]);

    if (loading) {
        return <div>Loading receipt...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="receipt-summary">
            <h3>Receipt Summary</h3>

            {/* Time period selection buttons */}
            <div className="time-period-selector">
                <button onClick={() => handleTimePeriodChange("weekly")}>Weekly</button>
                <button onClick={() => handleTimePeriodChange("monthly")}>Monthly</button>
                <button onClick={() => handleTimePeriodChange("yearly")}>Yearly</button>
            </div>

            {/* Graph Section */}
            <div className="receipt-graph">
                <h4>Receipts Over Time ({timePeriod})</h4>
                <Line data={graphData()} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </div>

            {/* Receipt pagination and selection */}
            <div className="receipt-selector">
                <p>Select a receipt:</p>
                <div className="receipt-buttons">
                    {currentReceipts.map((receiptOption) => (
                        <button
                            key={receiptOption.id}
                            onClick={() => setReceiptId(receiptOption.id)}
                            className={receiptId === receiptOption.id ? "active" : ""}
                        >
                            {receiptOption.id}
                        </button>
                    ))}
                </div>
                <div className="pagination-controls">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
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
        date: PropTypes.string.isRequired
    })).isRequired,
};

export default ReceiptSummary;
