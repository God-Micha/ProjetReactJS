const express = require('express');
const router = express.Router();
const Canvas = require('../models/canvas');
const isAuth = require('../middleware/isAuth');
router.use(isAuth);

router.post('/', async (req, res) => {
    try {
        const newCanvas = new Canvas();
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