import React, { useState } from 'react';
import '../css/Header.css';
import logo from '../assets/logo.png';
import AuthForm from './AuthForm';

const Header = () => {
    const [isAuthFormVisible, setAuthFormVisible] = useState(false);

    const handleSignInClick = () => {
        setAuthFormVisible(true);
    };

    const handleCloseAuthForm = () => {
        setAuthFormVisible(false);
    };

    return (
        <header className="header-container">
            <div className="logo-container">
                <img src={logo} alt="Eco Buddy Logo" className="logo-image" /> {/* Add the logo image */}
                <h1 className="logo-text">Eco Buddy</h1>
            </div>
            <div className="auth-options">
                <button className="auth-button" onClick={handleSignInClick}>Sign In</button>
            </div>
            {isAuthFormVisible && <AuthForm onClose={handleCloseAuthForm} />}
        </header>
    );
};

export default Header;