const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        res.status(201).json({ message: "Utilisateur créé avec succès !", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token: token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion." });
    }
});
module.exports = router;