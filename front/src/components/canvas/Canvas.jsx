import React, {useRef, useEffect, useState} from 'react';
import axios from "axios";
import './Canvas.css';
import socket from 'socket.io-client'
import {json} from "react-router-dom";
const io = socket('ws://localhost:3001', {
    autoConnect: false,
    transports: ['websocket'],
    reconnection: false
});

const Canvas = ({ metaData, selectedColor }) => {
    const [isConnected, setIsConnected] = useState(io.connected);
    const canvasRef = useRef(null);
    const squareSize = metaData? metaData.squareSize : 10; // Définir la taille de chaque pixel

    useEffect(() => {
        const handleUpdateChunk = (data) => {
            if(!metaData) {
                console.error('No metadata for handling chunk update');
                return;
            }
            const canvas = canvasRef.current;
            if (!canvas) {
                console.error('Canvas not available');
                return;
            }

            const context = canvas.getContext('2d');
            if (!context) {
                console.error('Failed to get drawing context');
                return;
            }
            const [x, y] = data.coordinates;
            console.log(`chunk ${x} ${y} has been updated`);
            drawChunk(x, y, context, squareSize, metaData)
                .then(() => console.log('chunk updated'))
                .catch((error) => console.error('Error drawing chunk:', error));

        };

        const handleConnect = () => {
            console.log('Connected to server');
            setIsConnected(true);
        };

        const handleDisconnect = () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        };

        const handleOnlineUsers = (onlineUsers) => {
            console.log(`Online users: ${onlineUsers}`);
        }

        io.on('update_chunk', handleUpdateChunk);
        io.on('connect', handleConnect);
        io.on('onlineUsers', handleOnlineUsers);
        io.on('disconnect', handleDisconnect);

        return () => {
            io.off('update_chunk', handleUpdateChunk);
            io.off('connect', handleConnect);
            io.off('onlineUsers', handleOnlineUsers);
            io.off('disconnect', handleDisconnect);
        };

    }, []);

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
        if(!isConnected) {
            io.connect();
            setIsConnected(true);
        }

    }, [metaData]);

    const drawChunk = async (chunkX, chunkY, context, squareSize, metaData) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/chunks/getChunk/${chunkX}/${chunkY}`);
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

        const chunk_coordinates = [i, j];
        console.log(chunk_coordinates);
        io.emit('update_chunk', { coordinates: chunk_coordinates });

        context.fillStyle = selectedColor;
        context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
    };

    const updateOrCreateChunk = async (x, y, color) => {
        try {
            const response = await axios.patch(`http://localhost:3001/api/chunks`, {
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
                console.log(postResponse.data.message);
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
