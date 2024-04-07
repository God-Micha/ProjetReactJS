// theme-context.js
import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Création du contexte
export const ThemeContext = createContext({
    toggleTheme: () => {}, // Fonction pour basculer le thème
    currentTheme: 'light' // Valeur initiale du thème
});

// Fournisseur de thème qui encapsule les composants enfants avec le thème choisi
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // État pour suivre le thème actuel

    const themeObject = useMemo(() => {
        // Création de l'objet thème utilisant createTheme de Material-UI
        return createTheme({
            palette: {
                mode: theme, // Basculer entre 'light' et 'dark'
            },
        });
    }, [theme]);

    const toggleTheme = () => {
        // Fonction pour basculer entre les thèmes clair et sombre
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ currentTheme: theme, toggleTheme }}>
            <MuiThemeProvider theme={themeObject}>
                <CssBaseline /> // Utilise CssBaseline pour normaliser les styles de base à travers les navigateurs
                {children} // Composants enfants qui utiliseront ce contexte
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
