import React from "react";
import PropTypes from "prop-types";
import "../css/Badges.css"; // Import styles for the badges

const Badges = ({ badges }) => {
    return (
        <div className="badges-container">
            <div className="badges-list">
                {badges.length === 0 ? (
                    <p>No badges earned yet!</p>
                ) : (
                    badges.map((badge, index) => (
                        <div className="badge" key={index}>
                            <img src={badge.image} alt={badge.name} className="badge-image" />
                            <div className="badge-info">
                                <p>{badge.description}</p>
                                <p className="date-earned">{badge.date_earned}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

Badges.propTypes = {
    badges: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            description: PropTypes.string,
            date_earned: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Badges;
