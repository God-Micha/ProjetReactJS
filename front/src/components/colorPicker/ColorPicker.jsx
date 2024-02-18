import React from 'react';

const ColorPicker = ({ onColorChange }) => {
    return (
        <div>
            <label htmlFor="color-picker">Choisissez une couleur : </label>
            <input
                id="color-picker"
                type="color"
                onChange={(e) => onColorChange(e.target.value)}
                style={{ marginLeft: '10px' }}
            />
        </div>
    );
};

export default ColorPicker;
