const express = require('express');
const router = express.Router();
const Chunk = require('../models/Chunk');


const CHUNK_WIDTH = 10;
const CHUNK_HEIGHT = 10;
const SQUARE_SIZE = 10;
router.get('/getChunk/:chunkX/:chunkY', async (req, res) => {
    const chunkX = parseInt(req.params.chunkX, 10);
    const chunkY = parseInt(req.params.chunkY, 10);

    try {
        let chunk = await Chunk.findOne({'coordinates.x': chunkX, 'coordinates.y': chunkY});

        if (!chunk) {
            const defaultPixels = Array.from({length: CHUNK_HEIGHT}, () =>
                Array.from({ length: CHUNK_WIDTH }, () => ({ color: '#FFFFFF' }))
            );
            chunk = {
                chunkId: `${chunkX}_${chunkY}`,
                coordinates: {x: chunkX, y: chunkY},
                pixels: defaultPixels,
            };
        }

        res.json(chunk);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching chunk data'});
    }
});


router.get('/metaDatas', async (req, res) => {
    try {
        const canvasWidth = 100;
        const canvasHeight = 100;
        const chunkWidth = CHUNK_WIDTH;
        const chunkHeight = CHUNK_HEIGHT;
        const squareSize = SQUARE_SIZE;
        res.json({canvasWidth, canvasHeight, chunkWidth, chunkHeight, squareSize});
    } catch (err) {
        res.json({message: err});
    }
});

router.post('/', async (req, res) => {
    const {x, y, color} = req.body;
    const chunkX = Math.floor((x) / CHUNK_WIDTH);
    const chunkY = Math.floor((y) / CHUNK_HEIGHT);
    const posX = x % CHUNK_WIDTH;
    const posY = y % CHUNK_HEIGHT;

    try {
        let chunk = await Chunk.findOne({'coordinates.x': chunkX, 'coordinates.y': chunkY});
        if (!chunk) {
            let defaultPixels = Array.from({length: CHUNK_HEIGHT}, () => Array.from({length: CHUNK_WIDTH}, () => ({color: '#FFFFFF'})));
            defaultPixels[posY][posX] = {color};
            chunk = new Chunk({
                chunkId: `${chunkX}_${chunkY}`,
                coordinates: {x: chunkX, y: chunkY},
                pixels: defaultPixels,
            });
        } else {
            chunk.pixels[posY][posX] = {color};
            chunk.updatedAt = new Date();
        }
        await chunk.save();
        res.json({message: 'Pixel updated successfully'});
    } catch (err) {
        res.status(400).json({message: err});
    }
});

router.patch('/updatePixel', async (req, res) => {
    const { x, y, color } = req.body;
    const chunkX = Math.floor(x / CHUNK_WIDTH);
    const chunkY = Math.floor(y / CHUNK_HEIGHT);
    const posX = x % CHUNK_WIDTH;
    const posY = y % CHUNK_HEIGHT;

    try {
        let chunk = await Chunk.findOne({ 'coordinates.x': chunkX, 'coordinates.y': chunkY });

        if (!chunk) {
            return res.status(404).json({ message: 'Chunk not found' });
        }
        chunk.pixels[posY][posX] = { color };
        chunk.updatedAt = new Date();

        await chunk.save();

        res.json({ message: 'Pixel updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating pixel' });
    }
});



router.delete('/:id', async (req, res) => {
    try {
        const removedGrid = await Grid.findByIdAndDelete(req.params.id);
        res.json(removedGrid);
    } catch (err) {
        res.status(400).json({message: err});
    }
});
module.exports = router;