const express = require('express');
const router = express.Router();
const Canvas = require('../models/Canvas');
const isAuth = require('../middleware/isAuth');
router.use(isAuth);

router.post('/', async (req, res) => {
    try {
        const {creator, name} = req.body;
        const creationDate = new Date();
        let endDate = new Date(creationDate);
        endDate.setDate(endDate.getDate() + 1);
        const editDelay = 5;
        const newCanvas = new Canvas({
            creator: creator,
            name: name,
            createdAt: creationDate,
            endDate: endDate,
            editDelay: editDelay,
        });
        const savedCanvas = await newCanvas.save();
        res.status(201).json(savedCanvas);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const canvases = await Canvas.find().populate('chunks');
        res.json(canvases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const canvas = await Canvas.findById(req.params.id).populate('chunks');
        if (!canvas) {
            return res.status(404).json({ message: 'Canvas not found' });
        }
        res.json(canvas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;