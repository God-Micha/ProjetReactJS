import React, {useRef, useEffect} from 'react';
import axios from "axios";

const Canvas = (props) => {
    let {selectedColor} = props;
    const canvasRef = useRef(null);
    const canvasSize = 640;
    const squareSize = 10;
    const nbPixels = canvasSize / squareSize;

    let CHUNK_WIDTH, CHUNK_HEIGHT;
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        // Initialisation du canvas avec une grille de pixels blancs
        for (let i = 0; i < nbPixels; ++i) {
            for (let j = 0; j < nbPixels; ++j) {
                context.fillStyle = 'white';
                context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
                context.strokeRect(i * squareSize, j * squareSize, squareSize, squareSize);
            }
        }
    }, []);
    /**
     * Ajoute un pixel noir sur le canvas en fonction de la position du clic, on récupère d'abord les coordonnées du clic sur le viewport,
     * puis on les convertit en coordonnées relatives au canvas, on calcule les coordonnées du pixel sur lequel on a cliqué, et enfin on dessine le pixel noir sur le canvas.
     * @param e
     */
    const addPixel = async(e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const context = canvas.getContext('2d');
        const i = Math.floor(x / squareSize);
        const j = Math.floor(y / squareSize);
        await updateOrCreateChunk(i, j, selectedColor);

        context.fillStyle = selectedColor;
        context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
    };

    const updateOrCreateChunk = async (x, y, color) => {
        try {
            debugger
            const response = await axios.patch(`http://localhost:3001/api/chunks}`, {
                x: x,
                y: y,
                color: color,
            }, {
                validateStatus: function (status) {
                    return status === 404 || status === 200;
                }
            });
            if(response.status === 404) {
                const postResponse = await axios.post('http://localhost:3001/api/chunks', {
                    x: x,
                    y: y,
                    color: color,
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            onClick={addPixel}
            style={{border: '1px solid black'}}
        />
    );
};

export default Canvas;
