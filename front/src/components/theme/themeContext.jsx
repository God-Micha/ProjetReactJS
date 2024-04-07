// theme-context.js
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme';

export const ThemeContext = createContext({
    toggleTheme: () => {},
    currentTheme: 'light',
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(localStorage.getItem('theme') || preferredTheme);
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const themeObject = useMemo(() => {
        return theme === 'light' ? lightTheme : darkTheme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ currentTheme: theme, toggleTheme }}>
            <MuiThemeProvider theme={themeObject}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

