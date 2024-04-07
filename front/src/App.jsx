import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Ajoutez l'importation useAuth
import setupAxiosConfig from "./axiosConfig";

import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Board from "./components/board/Board";
import PixelBoard from "./components/pixelBoard/PixelBoard";

function App() {
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        setupAxiosConfig();
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Navigate replace to="/canvasBoard" />} />
                    <Route path="/login" element={!isLoggedIn ? <LogIn /> : <Navigate replace to="/canvasBoard" />} />
                    <Route path="/canvasBoard" element={isLoggedIn ? <Board /> : <Navigate replace to="/login" />} />
                    <Route path="/canvas" element={isLoggedIn ? <PixelBoard /> : <Navigate replace to="/login" />} />
                    <Route path="/" element={<Navigate replace to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
