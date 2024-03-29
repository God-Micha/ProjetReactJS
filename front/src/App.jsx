import logo from './logo.svg';
import './App.css';
import Canvas from "./components/canvas/Canvas";
import {useState} from "react";
import ColorPicker from "./components/colorPicker/ColorPicker";
import axios from "axios";

function App() {
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
      <div className="App">
        <h1>Truc avec des pixels</h1>
          <button onClick={loadCanvasMetaData}>Charger Canvas</button>
          <ColorPicker onColorChange={handleColorChange} />
          <Canvas metaData={metaData} selectedColor={selectedColor} />
      </div>
  );
}

export default App;
