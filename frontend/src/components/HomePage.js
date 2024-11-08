import React from "react";
import "../css/HomePage.css";

const HomePage = () => {
    return (
        <div className="home-page">
            <header className="header">
                <nav className="nav">
                    <a href="#about">About</a>
                    <a href="#features">Features</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>

            <section className="introduction">
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

            <section id="about" className="about">
                <h2>About EcoBuddy</h2>
                <p>
                    EcoBuddy is a platform dedicated to helping individuals track their recycling efforts and understand
                    the impact they are making on the environment. Our mission is to promote sustainable living and
                    encourage more people to participate in recycling programs.
                </p>
                <p>
                    We provide tools and resources to make recycling easier and more rewarding. With EcoBuddy, you can
                    monitor your recycling habits, set goals, and earn rewards for your efforts. Join us in making a
                    difference and protecting our planet for future generations.
                </p>
            </section>

            <section className="environment">
                <h2>Why It Matters</h2>
                <p>
                    By tracking your recyclables, EcoBuddy helps you reduce waste and
                    carbon emissions. Together, we can make a significant impact on our planet!
                </p>
                <p>
                    Recycling is one of the easiest ways to have a positive impact on the world in which we live.
                    It is important to both the natural environment and us. We must act fast as the amount of waste
                    we create is increasing all the time.
                </p>
                <p>
                    Recycling conserves resources, saves energy, helps protect the environment, and reduces landfill.
                    When we recycle, used materials are converted into new products, reducing the need to consume
                    natural resources.
                </p>
            </section>

            <section id="contact" className="contact">
                <h2>Contact Us</h2>
                <p>
                    Have questions or need support? Reach out to us at <a
                    href="mailto:support@ecobuddy.com">support@ecobuddy.com</a>.
                    We are here to help you with any inquiries or issues you may have.
                </p>
                <p>
                    Follow us on social media to stay updated with the latest news and tips on recycling and sustainable
                    living:
                </p>
                <ul>
                    <li><a href="https://facebook.com/ecobuddy">Facebook</a></li>
                    <li><a href="https://twitter.com/ecobuddy">Twitter</a></li>
                    <li><a href="https://instagram.com/ecobuddy">Instagram</a></li>
                </ul>
            </section>
        </div>
    );
};

export default HomePage;