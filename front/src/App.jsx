import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import setupAxiosConfig from "./axiosConfig";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import PixelBoard from "./components/pixelBoard/PixelBoard";
import AdminPage from "./components/admin/AdminPage";
import PixelBoardForm from "./components/pixelBoard/PixelBoardForm";
import Homepage from './components/homepage/Homepage';

function App() {
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        setupAxiosConfig();
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Navigate replace to="/homepage" />} />
                    <Route path="/login" element={!isLoggedIn ? <LogIn /> : <Navigate replace to="/homepage" />} />
                    <Route path="/canvas" element={isLoggedIn ? <PixelBoard /> : <Navigate replace to="/login" />} />
                    <Route path="/homepage" element={isLoggedIn ? <Homepage/>: <Navigate replace to="/login" />} />
                    <Route path="/" element={<Navigate replace to="/login" />} />
                    <Route path="/admin" element={isLoggedIn ? <AdminPage/>: <Navigate replace to="/login" />}/>
                    <Route path="/admin/newpixelboard" element={isLoggedIn ? <PixelBoardForm/>: <Navigate replace to="/login" />}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
