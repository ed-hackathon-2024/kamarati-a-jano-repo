import './css/App.css';
import Homepage from "./components/HomePage";
import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MyProfile from "./components/MyProfile";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        totalDeposits: 120,
        badges: ["Recycler", "Eco Warrior"]
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <div className="App gradient-background">
            <Header onLogin={handleLogin} />
            {isLoggedIn ? <MyProfile user={user} /> : <Homepage />}
            <Footer />
        </div>
    );
}

export default App;