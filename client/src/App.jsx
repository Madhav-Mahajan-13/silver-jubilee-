import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import './App.css';
import HomePage from "./pages/Home";
import Registration from "./pages/Registration";
import EventFlow from "./pages/EventFlow";
import Memories from "./pages/Memories";

function App(){
  useEffect(() => {
    // Function to create falling stars
    const createStars = () => {
      const starCount = 150; // Number of stars to create
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        // Randomize position and delay
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 3 + 3}s`; // Random speed for falling
        star.style.animationDelay = `${Math.random() * 2}s`; // Random delay
        document.body.appendChild(star);
      }
    };

    createStars(); // Create stars when component is mounted

    // Cleanup function to remove stars on unmount
    return () => {
      const stars = document.querySelectorAll(".star");
      stars.forEach(star => star.remove());
    };
  }, []); // Empty dependency array ensures this runs only once when the app is mounted

  return (
    <Router>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/eventflow" element={<EventFlow />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;