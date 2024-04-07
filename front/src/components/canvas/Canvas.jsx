import React, { useRef, useEffect } from 'react';
import axios from "axios";
import './Canvas.css';

const Canvas = ({ metaData, selectedColor, canvasId }) => {
    const canvasRef = useRef(null);
    const squareSize = metaData? metaData.squareSize : 10; // Définir la taille de chaque pixel

    useEffect(() => {
        if (metaData) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.width = metaData.canvasWidth * squareSize;
            canvas.height = metaData.canvasHeight * squareSize;

            let promises = [];

            for (let x = 0; x < metaData.canvasWidth / metaData.chunkWidth; x++) {
                for (let y = 0; y < metaData.canvasHeight / metaData.chunkHeight; y++) {
                    promises.push(drawChunk(x, y, context, squareSize, metaData));
                }
            }

            Promise.all(promises).then(() => {
                drawGrid(context, metaData.canvasWidth, metaData.canvasHeight, squareSize);
            });
        }
    }, [metaData]);

    const drawChunk = async (chunkX, chunkY, context, squareSize, metaData) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/chunks/getChunk/${chunkX}/${chunkY}/${canvasId}`);
            const chunkData = response.data;
            chunkData.pixels.forEach((row, y) => {
                row.forEach((pixel, x) => {
                    if (pixel.color !== "#FFFFFF"){
                        console.log(pixel.color);
                    }
                    context.fillStyle = pixel.color;
                    context.fillRect(
                        (chunkX * metaData.chunkWidth + x) * squareSize,
                        (chunkY * metaData.chunkHeight + y) * squareSize,
                        squareSize,
                        squareSize);
                });
            });
        } catch (error) {
            console.error(`Erreur lors du chargement du chunk (${chunkX},${chunkY}):`, error);
        }
    };

    const drawGrid = (context, canvasWidth, canvasHeight, squareSize) => {
        context.strokeStyle = '#CCCCCC';
        for (let x = 0; x <= canvasWidth * squareSize; x += squareSize) {
            for (let y = 0; y <= canvasHeight * squareSize; y += squareSize) {
                context.strokeRect(x, y, squareSize, squareSize);
            }
        }
    };

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
            const response = await axios.patch(`http://localhost:3001/api/chunks}`, {
                x: x,
                y: y,
                color: color,
                canvasId: canvasId
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
                    canvasId: canvasId
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="canvasContainer">
            <canvas
                ref={canvasRef}
                width={metaData ? metaData.canvasWidth*squareSize * squareSize : 640} // Fallback si metaData n'est pas encore chargé
                height={metaData ? metaData.canvasHeight * squareSize : 640} // Fallback si metaData n'est pas encore chargé
                onClick={addPixel}
                style={{ border: '1px solid black' }}
            />
        </div>
    );
};

export default Canvas;
