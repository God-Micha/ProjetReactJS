import { Switch } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from './themeContext'; // Assurez-vous de créer ce contexte ou de l'adapter à votre code

const ThemeSwitcher = ({ toggleTheme }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div>
            <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                name="themeSwitch"
            />
        </div>
    );
};

export default ThemeSwitcher
