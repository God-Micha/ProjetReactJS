import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Canvas from "./components/canvas/Canvas";
import ColorPicker from "./components/colorPicker/ColorPicker";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import PixelBoard from "./components/pixelBoard/PixelBoard";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogIn = (isLoggedIn) => {
        setIsLoggedIn(isLoggedIn);
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signup" element={!isLoggedIn ? <SignUp onLoginSuccess={() => handleLogIn(true)} /> : <Navigate replace to="/canvas" />} />
                    <Route path="/login" element={!isLoggedIn ? <LogIn onLoginSuccess={() => handleLogIn(true)} /> : <Navigate replace to="/canvas" />} />
                    <Route path="/canvas" element={isLoggedIn ? (
                        <PixelBoard/>
                    ) : <Navigate replace to="/login" />} />
                    <Route path="/" element={<Navigate replace to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
