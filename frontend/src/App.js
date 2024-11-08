import './css/App.css';
import Homepage from "./components/HomePage";
import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MyProfile from "./components/MyProfile";
import AuthForm from "./components/AuthForm";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showAuthForm, setShowAuthForm] = useState(false);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
    };

    const handleAuthFormClose = () => {
        setShowAuthForm(false);
    };

    return (
        <div className="App gradient-background">
            <Header onLogin={() => setShowAuthForm(true)} />
            {showAuthForm && <AuthForm onClose={handleAuthFormClose} onLogin={handleLogin} />}
            {isLoggedIn ? <MyProfile user={user} /> : <Homepage />}
            <Footer />
        </div>
    );
}

export default App;