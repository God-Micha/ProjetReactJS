import React, {useRef, useEffect} from 'react';

const Canvas = () => {
    const canvasRef = useRef(null);
    const canvasSize = 640;
    const squareSize = 10;
    const nbPixels = canvasSize / squareSize;

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
    const addPixel = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const context = canvas.getContext('2d');

        const i = Math.floor(x / squareSize);
        const j = Math.floor(y / squareSize);

        context.fillStyle = 'black';
        context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
    };

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
