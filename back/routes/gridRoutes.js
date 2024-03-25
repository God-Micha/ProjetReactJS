import {processBatch, batch} from './batch';
import {calculateGridId} from "../utils/utils";
const express = require('express');
const router = express.Router();
const Grid = require('../models/grid');
router.get('/:id', async (req, res) => {
    try{
        const grid = await Grid.findById(req.params.id);
        res.json(grid);
    } catch (err) {
        res.json({message: err});
    }
});

router.post('/', (req, res) => {
    const { x, y, color } = req.body;
    const gridId = calculateGridId(x, y);

    if (!batch[gridId]) {
        batch[gridId] = [];
    }
    batch[gridId].push({ x, y, color });

    res.status(202).json({ message: "Mise à jour du pixel mise en file d'attente pour traitement par lots." });
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
    try{
        const removedGrid = await Grid.findByIdAndDelete(req.params.id);
        res.json(removedGrid);
    } catch (err) {
        res.status(400).json({message: err});
    }
});
module.exports = router;