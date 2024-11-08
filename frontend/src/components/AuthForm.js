import React, { useState } from 'react';
import axios from 'axios';
import '../css/AuthForm.css';

const AuthForm = ({ onClose, onLogin }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const toggleFormType = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form with:', { username, password, isSignUp });
        try {
            const response = await axios.post('http://127.0.0.1:5002/api/authenticate', {
                username: username,
                password: password
            });
            console.log(`Status Code: ${response.status}`);
            console.log('Response JSON:', response.data);
            onLogin(response.data.user.username);  // Pass `username` directly
            onClose();
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    };

    return (
        <div className="auth-form-overlay">
            <div className="auth-form">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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