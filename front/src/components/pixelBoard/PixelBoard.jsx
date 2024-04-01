import ColorPicker from "../colorPicker/ColorPicker";
import Canvas from "../canvas/Canvas";
import React, {useState} from "react";
import axios from "axios";
import './PixelBoard.css';

function PixelBoard(){
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [metaData, setMetaData] = useState(null);

    const loadCanvasMetaData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/chunks/metaDatas');
            setMetaData(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des métadonnées du canvas :", error);
        }
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    return (
        <div className="pixelBoardContainer">
            <h1>Truc avec des pixels</h1>
            <button onClick={loadCanvasMetaData}>Charger Canvas</button>
            <ColorPicker onColorChange={handleColorChange} />
            <Canvas metaData={metaData} selectedColor={selectedColor} />
        </div>
    )
}
export default PixelBoard;