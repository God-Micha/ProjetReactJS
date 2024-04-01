const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "Non autorisé." });
    }

    try {
        const decodedToken = jwt.verify(token, 'votre_secret_jwt');
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide ou expiré." });
    }
};
