import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import "../css/BonsSummary.css";

const BonsSummary = () => {
    const [bonsData, setBonsData] = useState([]);
    const [timePeriod, setTimePeriod] = useState("monthly");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const SAVINGS_PER_BON = 0.15; // Savings per bon in euros
    const CO2_SAVINGS_PER_BON = 0.05; // Example CO2 savings per bon in kg

    useEffect(() => {
        const fetchBonsData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5002/api/receipts/customer/1/deposits");
                if (!response.ok) throw new Error("Failed to fetch data.");
                const data = await response.json();
                setBonsData(data.receipts);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchBonsData();
    }, []);

    const totalBons = bonsData.reduce((sum, bon) => sum + parseInt(bon.total_quantity, 10), 0);
    const potentialSavings = (totalBons * SAVINGS_PER_BON).toFixed(2);
    const totalCO2Savings = (totalBons * CO2_SAVINGS_PER_BON).toFixed(2);

    const formatDataForGraph = () => {
        const groupedData = {};
        bonsData.forEach(bon => {
            const date = new Date(bon.create_date);
            let key;
            if (timePeriod === "weekly") key = new Date(date.setDate(date.getDate() - date.getDay())).toISOString().slice(0, 10);
            else if (timePeriod === "monthly") key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
            else if (timePeriod === "yearly") key = date.getFullYear().toString();
            if (!groupedData[key]) groupedData[key] = 0;
            groupedData[key] += parseInt(bon.total_quantity, 10);
        });
        return Object.entries(groupedData)
            .map(([date, quantity]) => ({ x: new Date(date), y: quantity }))
            .sort((a, b) => a.x - b.x);
    };

    const chartData = {
        labels: formatDataForGraph().map(bon => bon.x.toLocaleDateString()),
        datasets: [
            {
                label: "Total Quantity of Bons",
                data: formatDataForGraph().map(bon => bon.y),
                fill: false,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
            },
            {
                label: "Average Quantity",
                data: Array(formatDataForGraph().length).fill(totalBons / formatDataForGraph().length),
                borderDash: [5, 5],
                borderColor: "rgba(150,150,150,0.5)",
                fill: false,
            },
        ],
    };

    if (loading) return <div>Loading Bons summary...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bons-summary">
            <h3>Bons Summary</h3>

            {/* Display Total Bons and Potential Savings */}
            <div className="bons-totals">
                <p><strong>Total Bons:</strong> {totalBons}</p>
                <p><strong>Potential Savings:</strong> {potentialSavings}€</p>
                <p><strong>CO2 Savings:</strong> {totalCO2Savings} kg CO2</p>
            </div>

            {/* Additional Insights */}
            <div className="bons-insights">
                <p><em>This savings is equivalent to planting approximately {(totalCO2Savings / 20).toFixed(1)} trees!</em></p>
            </div>

            {/* Time Period Selector */}
            <div className="time-period-selector">
                {["weekly", "monthly", "yearly"].map(period => (
                    <button
                        key={period}
                        onClick={() => setTimePeriod(period)}
                        className={timePeriod === period ? "active" : ""}
                    >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                ))}
            </div>

            {/* Graph */}
            <Line data={chartData} options={{ responsive: true }} />
        </div>
    );
};

BonsSummary.propTypes = {
    bonsData: PropTypes.arrayOf(
        PropTypes.shape({
            create_date: PropTypes.string.isRequired,
            total_quantity: PropTypes.string.isRequired,
        })
    ),
};

export default BonsSummary;