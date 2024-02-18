import logo from './logo.svg';
import './App.css';
import Canvas from "./components/canvas/Canvas";
import {useState} from "react";
import ColorPicker from "./components/colorPicker/ColorPicker";

function App() {
    const [selectedColor, setSelectedColor] = useState('#000000');

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
  return (
      <div className="App">
        <h1>Truc avec des pixels</h1>
          <ColorPicker onColorChange={handleColorChange} />
          <Canvas selectedColor={selectedColor} />
      </div>
  );
}

export default App;
