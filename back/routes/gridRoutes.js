import {processBatch, batch} from './batch';
const express = require('express');
const router = express.Router();
const Chunk = require('../models/Chunk');


const CHUNK_WIDTH = 100;
const CHUNK_HEIGHT = 100;
router.get('/getChunk/:chunkX/:chunkY', async (req, res) => {
    const chunkX = parseInt(req.params.chunkX, 10);
    const chunkY = parseInt(req.params.chunkY, 10);

    try {
        let chunk = await Chunk.findOne({ 'coordinates.x': chunkX, 'coordinates.y': chunkY });

        if (!chunk) {
            const defaultPixels = Array.from({ length: CHUNK_HEIGHT }, () =>
                Array.from({ length: CHUNK_WIDTH }, () => '#FFFFFF')
            );
            chunk = {
                chunkId: `${chunkX}_${chunkY}`,
                coordinates: { x: chunkX, y: chunkY },
                pixels: defaultPixels,
            };
        }

        res.json(chunk);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching chunk data' });
    }
});


router.get('/metaDatas', async (req, res) => {
    try {
        const canvasWidth = 10000;
        const canvasHeight = 10000;
        const chunkWidth = CHUNK_WIDTH;
        const chunkHeight = CHUNK_HEIGHT;
        res.json({canvasWidth, canvasHeight, chunkWidth, chunkHeight});
    } catch (err) {
        res.json({message: err});
    }
});

router.post('/', async (req, res) => {
    const {x, y, color} = req.body;
    const chunkX = Math.floor(x / CHUNK_WIDTH);
    const chunkY = Math.floor(y / CHUNK_HEIGHT);

    //Calculate the position of the pixel in the chunk
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
        res.json({ message: 'Pixel updated successfully' });
    } catch (err) {
        res.status(400).json({message: err});
    }
});

router.patch('/:id', async (req, res) => {
    const {x, y, color} = req.body;
    if (!batch[req.params.id]) {
        batch[req.params.id] = [];
    }
    batch[req.params.id].push({x, y, color});
    res.status(204).end();
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