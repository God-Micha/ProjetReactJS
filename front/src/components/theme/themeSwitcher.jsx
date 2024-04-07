// ThemeSwitcher.js
import React, { useContext } from 'react';
import { ThemeContext } from './themeContext';
import Switch from '@mui/material/Switch';

const ThemeSwitcher = () => {
    const { currentTheme, toggleTheme } = useContext(ThemeContext);

    return (
        <div>
            <Switch
                checked={currentTheme === 'dark'}
                onChange={toggleTheme}
                inputProps={{ 'aria-label': 'toggle theme' }}
            />
        </div>
    );
};

export default ThemeSwitcher;
