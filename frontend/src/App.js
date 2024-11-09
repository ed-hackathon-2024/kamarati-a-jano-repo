// frontend/src/App.js
import React, { useState } from "react";
import './css/App.css';
import Homepage from "./components/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MyProfile from "./components/MyProfile";
import AuthForm from "./components/AuthForm";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState("Jano The Recycler");
    const [showAuthForm, setShowAuthForm] = useState(false);

    const handleLogin = (username) => {
        console.log('handleLogin called with:', username); // Add this for debugging
        setUser(username);
        setIsLoggedIn(true);
    };

    const handleAuthFormClose = () => {
        setShowAuthForm(false);
    };

    return (
        <div className="App gradient-background">
            <Header onLogin={() => setShowAuthForm(true)} />
            {showAuthForm && <AuthForm onClose={handleAuthFormClose} onLogin={handleLogin} />}
            {isLoggedIn ? <MyProfile user={user}/> : <Homepage />}
            <Footer />
        </div>
    );
}

export default App;