import React, { useState } from 'react';
import '../css/AuthForm.css';

const AuthForm = ({ onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleFormType = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="auth-form-overlay">
            <div className="auth-form">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                <form>
                    <label>
                        Email:
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" required />
                    </label>
                    {isSignUp && (
                        <label>
                            Confirm Password:
                            <input type="password" name="confirmPassword" required />
                        </label>
                    )}
                    <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                </form>
                <button className="toggle-button" onClick={toggleFormType}>
                    {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                </button>
            </div>
        </div>
    );
};

export default AuthForm;