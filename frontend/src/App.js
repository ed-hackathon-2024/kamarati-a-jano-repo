import './css/App.css';
import Homepage from "./components/HomePage";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
      <div className="App">
          <Header/>
          <Homepage/>
          <Footer/>
      </div>
  );
}

export default App;
