import React from 'react';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="footer-content">
                <div className="footer-logo">EcoBuddy</div>
                <p>Contact us: support@ecobuddy.com</p>
                <p>&copy; {new Date().getFullYear()} EcoBuddy. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;