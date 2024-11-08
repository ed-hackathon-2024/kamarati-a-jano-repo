import React from "react";
import "../css/HomePage.css";

const HomePage = () => {
    return (
        <div className="home-page">
            <header className="header">
                <nav className="nav">
                    <a href="#features">Features</a>
                    <a href="#environment">Environmental Impact</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>

            <section className="hero">
                <h1>Welcome to EcoBuddy</h1>
                <p>Your ultimate companion for tracking bottle deposits and saving the planet!</p>
            </section>

            <section id="features" className="features">
                <h2>Features</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <h3>Track Deposits</h3>
                        <p>Easily track your refundable bottle deposits and see how much you save!</p>
                    </div>
                    <div className="feature-card">
                        <h3>Environmental Impact</h3>
                        <p>Visualize the positive impact of your recycling efforts on the environment.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Earn badges and rewards</h3>
                        <p>Challenge yourself to achieve recycling milestones and earn rewards.</p>
                    </div>
                </div>
            </section>

            <section id="environment" className="environment">
                <h2>Why It Matters</h2>
                <p>
                    By tracking your recyclables, EcoBuddy helps you reduce waste and
                    carbon emissions. Together, we can make a significant impact on our planet!
                </p>
            </section>
        </div>
    );
};

export default HomePage;
