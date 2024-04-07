import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Canvas from "./components/canvas/Canvas";
import ColorPicker from "./components/colorPicker/ColorPicker";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import PixelBoard from "./components/pixelBoard/PixelBoard";
import { ThemeProvider, CssBaseline } from '@mui/material';
import {createTheme} from "@mui/material/styles";
import ThemeSwitcher from "./components/theme/themeSwitcher";


const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const appliedTheme = theme === 'light' ? lightTheme : darkTheme;


    const handleLogIn = (isLoggedIn) => {
        setIsLoggedIn(isLoggedIn);
    }

    return (
        <ThemeProvider theme={appliedTheme}>
            <CssBaseline />
            <Router>
                <div className="App">
                    <ThemeSwitcher toggleTheme={toggleTheme} />
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
        </ThemeProvider>
    );
}

export default App;
