import ColorPicker from "../colorPicker/ColorPicker";
import Canvas from "../canvas/Canvas";
import React, { useState } from "react";
import axios from "axios";
import './PixelBoard.css';
import { useLocation } from "react-router-dom";
import { Button, Container, Typography } from '@mui/material';

function PixelBoard() {
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [metaData, setMetaData] = useState(null);
    const location = useLocation();
    const { idCanvas, pixelboardName } = location.state || {};

    const loadCanvasMetaData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/chunks/metaDatas`);
            setMetaData(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des métadonnées du canvas :", error);
        }
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    return (
        <Container className="pixelBoard" maxWidth={false} sx={{ p: 0 }}>
            <div className="pixelBoardContainer">
                <Typography variant="h4" gutterBottom>
                    {pixelboardName}
                </Typography>
                <div className="pixelBoardActions">
                    <Button variant="contained" color="primary" onClick={loadCanvasMetaData}>
                        Charger Canvas
                    </Button>
                    <ColorPicker onColorChange={handleColorChange} />
                </div>
                <Canvas metaData={metaData} selectedColor={selectedColor} canvasId={idCanvas} />
            </div>
        </Container>
    );
}
export default PixelBoard;
